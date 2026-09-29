import json
import sys
import time
from datetime import date, timedelta
from pathlib import Path

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

HOME = Path(r"C:/Users/Lenovo/AppData/Local/hermes")
TOKEN_PATH = HOME / "google_token.json"
OUTPUT_PATH = Path(r"D:/Praktikum-Gasal-2026/attendance_forms_weeks_5_9.json")

DRIVE_FOLDER_MIME = "application/vnd.google-apps.folder"


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


def api_retry(fn, attempts=4):
    last = None
    for index in range(attempts):
        try:
            return fn()
        except HttpError as exc:
            last = exc
            status = getattr(exc.resp, "status", 0)
            if status not in (429, 500, 502, 503, 504) or index == attempts - 1:
                raise
            time.sleep(2 ** index)
        except OSError as exc:
            last = exc
            if index == attempts - 1:
                raise
            time.sleep(2 ** index)
    raise last


def exact_file(drive, name, mime_type=None):
    clauses = ["name = %s" % json.dumps(name), "trashed = false"]
    if mime_type:
        clauses.append("mimeType = %s" % json.dumps(mime_type))
    query = " and ".join(clauses)
    result = api_retry(lambda: drive.files().list(
        q=query,
        corpora="user",
        spaces="drive",
        pageSize=50,
        fields="files(id,name,mimeType,webViewLink,parents,owners(displayName,emailAddress),trashed)",
    ).execute())
    return result.get("files", [])


def create_or_reuse_folder(drive, name):
    found = exact_file(drive, name, DRIVE_FOLDER_MIME)
    if found:
        return found[0], False
    body = {"name": name, "mimeType": DRIVE_FOLDER_MIME}
    created = api_retry(lambda: drive.files().create(
        body=body,
        fields="id,name,mimeType,webViewLink,parents,owners(displayName,emailAddress)",
    ).execute())
    return created, True


def create_form(forms, title):
    body = {"info": {"title": title, "documentTitle": title}}
    return api_retry(lambda: forms.forms().create(
        body=body,
        unpublished=True,
    ).execute())


def build_items(folder_id):
    return [
        {
            "createItem": {
                "location": {"index": 0},
                "item": {
                    "title": "Nama",
                    "questionItem": {
                        "question": {
                            "required": True,
                            "textQuestion": {"paragraph": False},
                        }
                    },
                },
            }
        },
        {
            "createItem": {
                "location": {"index": 1},
                "item": {
                    "title": "NIM",
                    "questionItem": {
                        "question": {
                            "required": True,
                            "textQuestion": {"paragraph": False},
                        }
                    },
                },
            }
        },
        {
            "createItem": {
                "location": {"index": 2},
                "item": {
                    "title": "Kehadiran",
                    "questionItem": {
                        "question": {
                            "required": True,
                            "choiceQuestion": {
                                "type": "RADIO",
                                "options": [
                                    {"value": "Hadir"},
                                    {"value": "Izin"},
                                    {"value": "Sakit"},
                                ],
                                "shuffle": False,
                            },
                        }
                    },
                },
            }
        },
        {
            "createItem": {
                "location": {"index": 3},
                "item": {
                    "title": "File Praktikum",
                    "questionItem": {
                        "question": {
                            "required": True,
                            "fileUploadQuestion": {
                                "folderId": folder_id,
                                "types": ["ANY"],
                                "maxFiles": 1,
                                "maxFileSize": "10485760",
                            },
                        }
                    },
                },
            }
        },
        {
            "updateSettings": {
                "updateMask": "emailCollectionType",
                "settings": {"emailCollectionType": "DO_NOT_COLLECT"},
            }
        },
    ]


def configure_form(forms, form_id, folder_id):
    batch_body = {
        "includeFormInResponse": True,
        "requests": build_items(folder_id),
    }
    api_retry(lambda: forms.forms().batchUpdate(
        formId=form_id,
        body=batch_body,
    ).execute())
    publish_body = {
        "updateMask": "publish_state",
        "publishSettings": {
            "publishState": {
                "isPublished": True,
                "isAcceptingResponses": True,
            }
        },
    }
    api_retry(lambda: forms.forms().setPublishSettings(
        formId=form_id,
        body=publish_body,
    ).execute())


def get_form(forms, form_id):
    return api_retry(lambda: forms.forms().get(formId=form_id).execute())


def trash_file(drive, file_id):
    try:
        api_retry(lambda: drive.files().update(
            fileId=file_id,
            body={"trashed": True},
            fields="id,name,trashed",
        ).execute())
    except Exception:
        pass


def schedule():
    first_wed = date(2026, 9, 30)
    rows = []
    for week in range(5, 10):
        wed = first_wed + timedelta(days=7 * (week - 5))
        fri = wed + timedelta(days=2)
        rows.extend([
            (week, "2025A", wed),
            (week, "2025B", fri),
            (week, "2025C", wed),
        ])
    return rows


def title_for(week, class_id, day):
    return "Form Absensi Praktikum OOP %d %s 2026 (%s)" % (
        day.day,
        day.strftime("%b"),
        class_id,
    )


def main():
    creds = load_credentials()
    drive = build("drive", "v3", credentials=creds, cache_discovery=False)
    forms = build("forms", "v1", credentials=creds, cache_discovery=False)
    output = []
    created_count = 0
    reused_count = 0

    for week, class_id, day in schedule():
        title = title_for(week, class_id, day)
        folder_name = title + " (File responses)"
        print("PROCESS", week, class_id, title, flush=True)
        existing_forms = exact_file(drive, title, "application/vnd.google-apps.form")
        existing_folders = exact_file(drive, folder_name, DRIVE_FOLDER_MIME)
        form_id = None
        folder = None
        form_created = False
        folder_created = False
        try:
            if existing_forms:
                form_meta = existing_forms[0]
                form_id = form_meta["id"]
                reused_count += 1
                print("  REUSE_FORM", form_id, flush=True)
            else:
                folder, folder_created = create_or_reuse_folder(drive, folder_name)
                if not folder_created:
                    print("  REUSE_FOLDER", folder["id"], flush=True)
                else:
                    print("  CREATE_FOLDER", folder["id"], flush=True)
                form = create_form(forms, title)
                form_id = form["formId"]
                form_created = True
                created_count += 1
                print("  CREATE_FORM", form_id, flush=True)
                configure_form(forms, form_id, folder["id"])
                print("  CONFIGURED", form_id, flush=True)

            if folder is None:
                folder = existing_folders[0] if existing_folders else None
                if folder is None:
                    folder, folder_created = create_or_reuse_folder(drive, folder_name)
                    print("  CREATE_OR_REUSE_FOLDER", folder["id"], flush=True)

            live = get_form(forms, form_id)
            if not live.get("responderUri"):
                raise RuntimeError("Form has no responderUri after configuration")
            item_titles = [item.get("title", "") for item in live.get("items", [])]
            if item_titles != ["Nama", "NIM", "Kehadiran", "File Praktikum"]:
                raise RuntimeError("Unexpected item titles: %r" % item_titles)
            question = live["items"][3]["questionItem"]["question"]
            upload = question.get("fileUploadQuestion", {})
            if upload.get("folderId") != folder["id"]:
                raise RuntimeError("File upload folder mismatch")
            publish = live.get("publishSettings", {}).get("publishState", {})
            if publish.get("isPublished") is not True:
                raise RuntimeError("Form is not published")
            drive_meta = api_retry(lambda: drive.files().get(
                fileId=form_id,
                fields="id,name,mimeType,webViewLink,parents,owners(displayName,emailAddress),capabilities(canEdit,canModifyContent)",
            ).execute())
            folder_meta = api_retry(lambda: drive.files().get(
                fileId=folder["id"],
                fields="id,name,mimeType,webViewLink,parents,owners(displayName,emailAddress)",
            ).execute())
            output.append({
                "week": week,
                "class": class_id,
                "date": day.isoformat(),
                "name": title,
                "form_id": form_id,
                "form_link": drive_meta.get("webViewLink", "https://docs.google.com/forms/d/%s/edit" % form_id),
                "respond_link": live["responderUri"],
                "attachment_folder_id": folder_meta["id"],
                "attachment_link": folder_meta.get("webViewLink", "https://drive.google.com/drive/folders/%s" % folder_meta["id"]),
                "item_titles": item_titles,
                "attendance_options": ["Hadir", "Izin", "Sakit"],
                "required": [True, True, True, True],
                "linked_sheet_id": live.get("linkedSheetId"),
                "publish_state": publish,
                "form_created_now": form_created,
                "folder_created_now": folder_created,
            })
            print("  VERIFIED", form_id, live["responderUri"], flush=True)
        except Exception as exc:
            print("  ERROR", type(exc).__name__, str(exc)[:1000], flush=True)
            if form_created and form_id:
                trash_file(drive, form_id)
                print("  ROLLBACK_FORM", form_id, flush=True)
            if folder_created and folder:
                trash_file(drive, folder["id"])
                print("  ROLLBACK_FOLDER", folder["id"], flush=True)
            raise

    OUTPUT_PATH.write_text(json.dumps({
        "created_count": created_count,
        "reused_count": reused_count,
        "total": len(output),
        "forms": output,
    }, indent=2, ensure_ascii=True))
    print("DONE", len(output), "created", created_count, "reused", reused_count, flush=True)
    print("OUTPUT", OUTPUT_PATH, flush=True)


if __name__ == "__main__":
    main()
