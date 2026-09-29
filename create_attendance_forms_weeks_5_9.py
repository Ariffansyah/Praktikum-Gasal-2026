import json
import time
from datetime import date, timedelta
from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

HOME = Path(r"C:/Users/Lenovo/AppData/Local/hermes")
TOKEN_PATH = HOME / "google_token.json"
OUTPUT_PATH = Path(r"D:/Praktikum-Gasal-2026/attendance_forms_weeks_5_9.json")
SOURCE_FORM_ID = "1Um7c_5xmb5vZ9l_q8CbDXFEwBKsMkwlFr9Pl-Mm7TKw"
FORM_MIME = "application/vnd.google-apps.form"


def load_credentials():
    payload = json.loads(TOKEN_PATH.read_text())
    scopes = sorted(set(payload.get("scopes") or payload.get("scope", "").split()))
    creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), scopes)
    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
        refreshed = json.loads(creds.to_json())
        refreshed["type"] = "authorized_user"
        refreshed["scopes"] = scopes
        tmp = TOKEN_PATH.with_suffix(".json.batchtmp")
        tmp.write_text(json.dumps(refreshed, indent=2))
        tmp.replace(TOKEN_PATH)
    if not creds.valid:
        raise RuntimeError("Google credentials are not valid")
    return creds


def retry(call, attempts=4):
    last = None
    for index in range(attempts):
        try:
            return call()
        except HttpError as exc:
            last = exc
            status = getattr(exc.resp, "status", 0)
            if status not in (429, 500, 502, 503, 504) or index == attempts - 1:
                raise
            time.sleep(2 ** index)
    raise last


def list_exact(drive, name, mime_type=None):
    clauses = ["name = %s" % json.dumps(name), "trashed = false"]
    if mime_type:
        clauses.append("mimeType = %s" % json.dumps(mime_type))
    result = retry(lambda: drive.files().list(
        q=" and ".join(clauses),
        corpora="user",
        spaces="drive",
        pageSize=50,
        fields="files(id,name,mimeType,webViewLink,parents,owners(displayName,emailAddress),trashed)",
    ).execute())
    return result.get("files", [])


def schedule():
    first_wednesday = date(2026, 9, 30)
    rows = []
    for week in range(5, 10):
        wednesday = first_wednesday + timedelta(days=7 * (week - 5))
        friday = wednesday + timedelta(days=2)
        rows.extend([
            (week, "2025A", wednesday),
            (week, "2025B", friday),
            (week, "2025C", wednesday),
        ])
    return rows


def title_for(class_id, day):
    return "Form Absensi Praktikum OOP %d %s 2026 (%s)" % (
        day.day,
        day.strftime("%b"),
        class_id,
    )


def configure_copy(forms, form_id, title):
    current = retry(lambda: forms.forms().get(formId=form_id).execute())
    requests = []

    # The source has Nama, NIM, Kehadiran, Bukti Kehadiran, File Praktikum.
    # Remove only Bukti Kehadiran; keep the existing File Praktikum upload item.
    titles = [item.get("title", "") for item in current.get("items", [])]
    if titles == ["Nama", "NIM", "Kehadiran", "Bukti Kehadiran", "File Praktikum"]:
        requests.append({"deleteItem": {"location": {"index": 3}}})
    elif titles != ["Nama", "NIM", "Kehadiran", "File Praktikum"]:
        raise RuntimeError("Unexpected copied form items: %r" % titles)

    requests.append({
        "updateFormInfo": {
            "info": {"title": title},
            "updateMask": "title",
        }
    })
    requests.append({
        "updateSettings": {
            "settings": {"emailCollectionType": "DO_NOT_COLLECT"},
            "updateMask": "emailCollectionType",
        }
    })
    retry(lambda: forms.forms().batchUpdate(
        formId=form_id,
        body={"includeFormInResponse": True, "requests": requests},
    ).execute())

    # Normalize choice order and labels after the optional delete operation.
    live = retry(lambda: forms.forms().get(formId=form_id).execute())
    items = live.get("items", [])
    if [item.get("title", "") for item in items] != ["Nama", "NIM", "Kehadiran", "File Praktikum"]:
        raise RuntimeError("Unexpected final item titles before choice update")
    choice_item = items[2]
    choice_item["questionItem"]["question"]["choiceQuestion"]["options"] = [
        {"value": "Hadir"},
        {"value": "Izin"},
        {"value": "Sakit"},
    ]
    retry(lambda: forms.forms().batchUpdate(
        formId=form_id,
        body={
            "includeFormInResponse": True,
            "requests": [{
                "updateItem": {
                    "location": {"index": 2},
                    "item": choice_item,
                    "updateMask": "questionItem.question.choiceQuestion.options",
                }
            }],
        },
    ).execute())

    retry(lambda: forms.forms().setPublishSettings(
        formId=form_id,
        body={
            "updateMask": "publish_state",
            "publishSettings": {
                "publishState": {
                    "isPublished": True,
                    "isAcceptingResponses": True,
                }
            },
        },
    ).execute())


def verify(drive, forms, form_id, expected_title):
    form = retry(lambda: forms.forms().get(formId=form_id).execute())
    item_titles = [item.get("title", "") for item in form.get("items", [])]
    if form.get("info", {}).get("title") != expected_title:
        raise RuntimeError("Title verification failed")
    if item_titles != ["Nama", "NIM", "Kehadiran", "File Praktikum"]:
        raise RuntimeError("Question title verification failed: %r" % item_titles)
    options = form["items"][2]["questionItem"]["question"]["choiceQuestion"]["options"]
    if [option.get("value") for option in options] != ["Hadir", "Izin", "Sakit"]:
        raise RuntimeError("Attendance option verification failed")
    for item in form["items"]:
        question = item["questionItem"]["question"]
        if question.get("required") is not True:
            raise RuntimeError("Required flag verification failed for %s" % item.get("title"))
    upload = form["items"][3]["questionItem"]["question"].get("fileUploadQuestion", {})
    if not upload.get("folderId"):
        raise RuntimeError("File upload folder is missing")
    publish = form.get("publishSettings", {}).get("publishState", {})
    if publish.get("isPublished") is not True:
        raise RuntimeError("Form is not published")
    drive_meta = retry(lambda: drive.files().get(
        fileId=form_id,
        fields="id,name,mimeType,webViewLink,parents,owners(displayName,emailAddress),capabilities(canEdit,canModifyContent)",
    ).execute())
    folder_meta = retry(lambda: drive.files().get(
        fileId=upload["folderId"],
        fields="id,name,mimeType,webViewLink,parents,owners(displayName,emailAddress)",
    ).execute())
    return {
        "form": form,
        "drive": drive_meta,
        "folder": folder_meta,
    }


def trash(drive, file_id):
    try:
        retry(lambda: drive.files().update(
            fileId=file_id,
            body={"trashed": True},
            fields="id,name,trashed",
        ).execute())
    except Exception:
        pass


def main():
    creds = load_credentials()
    drive = build("drive", "v3", credentials=creds, cache_discovery=False)
    forms = build("forms", "v1", credentials=creds, cache_discovery=False)

    source = verify(drive, forms, SOURCE_FORM_ID, "Form Absensi Praktikum OOP 16 Sept 2026 (2025A)")
    source_upload = source["form"]["items"][4]["questionItem"]["question"]["fileUploadQuestion"]
    source_folder_id = source_upload["folderId"]
    source_folder = source["folder"]
    print("SOURCE_UPLOAD_FOLDER", source_folder_id, source_folder.get("name"), flush=True)

    output = []
    created_ids = []
    for week, class_id, day in schedule():
        title = title_for(class_id, day)
        print("PROCESS", week, class_id, title, flush=True)
        existing = list_exact(drive, title, FORM_MIME)
        if existing:
            raise RuntimeError("Target title already exists: %s" % title)
        copied = retry(lambda: drive.files().copy(
            fileId=SOURCE_FORM_ID,
            body={"name": title},
            fields="id,name,mimeType,webViewLink,parents,owners(displayName,emailAddress),createdTime",
        ).execute())
        form_id = copied["id"]
        created_ids.append(form_id)
        print("  COPIED", form_id, flush=True)
        try:
            configure_copy(forms, form_id, title)
            checked = verify(drive, forms, form_id, title)
            form = checked["form"]
            upload = form["items"][3]["questionItem"]["question"]["fileUploadQuestion"]
            output.append({
                "week": week,
                "class": class_id,
                "date": day.isoformat(),
                "name": title,
                "form_id": form_id,
                "form_link": checked["drive"].get("webViewLink"),
                "respond_link": form.get("responderUri"),
                "response_sheet_link": None,
                "response_sheet_status": "not_linked_forms_api_no_destination_method",
                "attachment_folder_id": upload.get("folderId"),
                "attachment_link": checked["folder"].get("webViewLink"),
                "attachment_name": checked["folder"].get("name"),
                "item_titles": [item.get("title", "") for item in form.get("items", [])],
                "attendance_options": [option.get("value") for option in form["items"][2]["questionItem"]["question"]["choiceQuestion"]["options"]],
                "required": [item["questionItem"]["question"].get("required") for item in form.get("items", [])],
                "linked_sheet_id": form.get("linkedSheetId"),
                "publish_state": form.get("publishSettings", {}).get("publishState", {}),
                "source_form_id": SOURCE_FORM_ID,
            })
            print("  VERIFIED", form_id, form.get("responderUri"), flush=True)
        except Exception:
            trash(drive, form_id)
            print("  ROLLBACK", form_id, flush=True)
            raise

    payload = {
        "source_form_id": SOURCE_FORM_ID,
        "source_attachment_folder_id": source_folder_id,
        "source_attachment_link": source_folder.get("webViewLink"),
        "total": len(output),
        "forms": output,
    }
    OUTPUT_PATH.write_text(json.dumps(payload, indent=2, ensure_ascii=True))
    print("DONE", len(output), flush=True)
    print("OUTPUT", OUTPUT_PATH, flush=True)


if __name__ == "__main__":
    main()
