---
title: "Homework 1"
layout: "default"
parent: "Assignment 1"
printtitle: "Homework 1 - Peminjaman Buku Perpustakaan"
nav_order: 2
tampil: true
isdebug: false
assignment_id: "homework1"
variant_version: 2
selection_mode: "nim"
class_prompt: "Masukkan kelas (2025A / 2025B / 2025C):"
unlock_at:
  "2025A": "2026-09-16T13:30:00"
  "2025B": "2026-09-18T13:30:00"
  "2025C": "2026-09-16T10:00:00"
variant_dir: "assignment/assignment1/homework/variants"
description_file: "assignment/assignment1/homework/description.md"
---

{% include pyodide-exercise.html id="homework1-kelas-a" title="Memuat homework..." prompt="Mode debug aktif: pilih salah satu dari delapan variant homework." %}
