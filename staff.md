---
title: Staff
layout: default
nav_order: 4
---

# Staff

The practicum instructor and teaching assistants are listed below.

## Instructor

<div class="instructor-container">
  <div class="staff-member instructor-card">
    <div class="staff-role">Instructor</div>
    <div class="staff-name">Riskyana Dewi Instan Puspitasari, M. Kom.</div>
    <div class="staff-email">
      <a href="mailto:riskyanapuspitasari@unesa.ac.id">[email]</a>
    </div>
  </div>
</div>

## Teaching Assistant

<div class="staff-container" id="staff-members"></div>

<style>
.staff-container {
  display: flex;
  gap: 18px;
  margin: 24px 0 32px;
  align-items: stretch;
}

.instructor-container {
  display: flex;
  margin: 24px 0 32px;
}

.staff-member {
  flex: 1;
  background: var(--oop-sidebar);
  color: var(--oop-ink);
  border: 1px solid var(--oop-rule);
  border-radius: 12px;
  padding: 22px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  box-shadow: 0 3px 10px var(--oop-card-shadow);
}

.instructor-card {
  width: auto;
  flex: 0 1 auto;
  min-width: 400px;
}

.staff-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-bottom: 18px;
  border-radius: 50%;
  background: var(--oop-active-bg);
  color: var(--oop-active-ink);
  font-size: 13px;
  font-weight: bold;
}

.staff-name {
  font-size: 17px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 8px;
}

.staff-role {
  display: inline-block;
  margin-bottom: 10px;
  padding: 4px 8px;
  border-radius: 5px;
  background: var(--oop-blue-wash);
  font-size: 11px;
  font-weight: 600;
  color: var(--oop-muted);
}

.staff-email {
  font-size: 13px;
}

.staff-email a {
  color: var(--oop-link);
  text-decoration: none;
}

.staff-email a:hover {
  text-decoration: underline;
}

@media (max-width: 700px) {
  .staff-container {
    flex-direction: column;
  }
}
</style>

<script>
const staff = [
  {
    name: "Muhammad Fariq Faqih",
    nim: "24051204084"
  },
  {
    name: "Mohammad Ariffansyah",
    nim: "24051204099"
  },
  {
    name: "Abdullah Al-Firdaus",
    nim: "24031554008",
    role: "Koordinator"
  }
];

const container = document.getElementById("staff-members");

staff.forEach((member) => {
  const email = `${member.nim}@mhs.unesa.ac.id`;

  const item = document.createElement("div");
  item.className = "staff-member";

  item.innerHTML = `
    ${member.role ? `<div class="staff-role">${member.role}</div>` : ""}
    <div class="staff-name">${member.name}</div>
    <div class="staff-email">
      <a href="mailto:${email}">[email]</a>
    </div>
  `;

  container.appendChild(item);
});
</script>