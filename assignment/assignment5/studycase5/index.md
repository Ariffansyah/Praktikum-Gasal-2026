---
title: "Live Practicum 5"
layout: "default"
parent: "Assignment 5"
printtitle: "Live Practicum 5 - Polymorphism and Class Relationships"
nav_order: 1
tampil: true
isdebug: false
assignment_id: "assignment5-kelas"
variant_version: 1
selection_mode: "kelas"
class_prompt: "Pilih kelas (2025A / 2025B / 2025C) untuk memuat Live Practicum 5."
class_options:
  - id: "2025A"
    title: "2025A - Layanan Cetak Kampus"
    variant_id: "v1"
  - id: "2025B"
    title: "2025B - Pengiriman Paket Kampus"
    variant_id: "v2"
  - id: "2025C"
    title: "2025C - Peminjaman Peralatan"
    variant_id: "v3"
unlock_at:
  "2025A": "2026-10-28T13:00:00+07:00"
  "2025B": "2026-10-30T13:00:00+07:00"
  "2025C": "2026-10-28T09:30:00+07:00"
variant_dir: "assignment/assignment5/studycase5/variants"
description_file: "assignment/assignment5/studycase5/description.md"
---

{% include pyodide-exercise.html id="assignment5-kelas" title="Memuat Live Practicum 5..." prompt="Pilih kelas sesuai jadwal praktikum." %}
