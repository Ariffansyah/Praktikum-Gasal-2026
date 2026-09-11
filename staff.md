---

title: Staff
layout: default
nav_order: 4
---

# Staff

The practicum instructor is listed below.

## Teaching team

* **Instructor:** Riskyana Dewi Instan Puspitasari, M. Kom.

<style>
.staff-container {
  display: flex;
  gap: 18px;
  margin: 24px 0 32px;
  align-items: stretch;
}

.staff-member {
  flex: 1;
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
}

.staff-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-bottom: 18px;
  border-radius: 50%;
  background: #222;
  color: #fff;
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
  background: #f0f0f0;
  font-size: 11px;
  font-weight: 600;
  color: #555;
}

.staff-email {
  font-size: 13px;
}

.staff-email a {
  color: #777;
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

<div class="staff-container" id="staff-members"></div>

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

staff.forEach((member, index) => {
  const email = `${member.nim}@mhs.unesa.ac.id`;

  const item = document.createElement("div");
  item.className = "staff-member";

  item.innerHTML = `
    <div class="staff-number">${index + 1}</div>
    <div class="staff-name">${member.name}</div>
    ${member.role ? `<div class="staff-role">${member.role}</div>` : ""}
    <div class="staff-email">
      <a href="mailto:${email}">${email}</a>
    </div>
  `;

  container.appendChild(item);
});


