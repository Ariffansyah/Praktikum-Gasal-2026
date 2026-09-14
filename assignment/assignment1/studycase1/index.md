---
title: "Live Practicum 1"
layout: "default"
parent: "Assignment 1"
printtitle: "Live Practicum 1 - Peminjaman Buku Perpustakaan"
nav_order: 1
tampil: true
isdebug: false
assignment_id: "assignment1-kelas-a"
variant_version: 2
selection_mode: "kelas"
class_prompt: "Pilih kelas untuk memuat study case."
class_options:
  - id: "2025A"
    title: "2025A - Study Case 1"
    variant_id: "v1"
  - id: "2025B"
    title: "2025B - Study Case 2"
    variant_id: "v2"
  - id: "2025C"
    title: "2025C - Study Case 3"
    variant_id: "v3"
unlock_at:
  "2025A": "2026-09-16T12:30:00"
  "2025B": "2026-09-18T12:30:00"
  "2025C": "2026-09-16T09:00:00"
variant_dir: "assignment/assignment1/studycase1/variants"
description_file: "assignment/assignment1/studycase1/description.md"
---

{% include pyodide-exercise.html id="assignment1-kelas-a" title="Memuat study case kelas..." prompt="Pilih kelas untuk memuat study case." %}
