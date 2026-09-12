document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector("#weekly-schedule table");

    if (!table) return;

    const rows = table.querySelectorAll("tbody tr");

    if (rows.length < 2) return;

    const week1Assignment = rows[0].children[4];
    const week2Assignment = rows[1].children[4];

    if (!week1Assignment || !week2Assignment) return;

    week1Assignment.rowSpan = 2;
    week2Assignment.remove();
});