---
title: Panduan Editor Python
layout: default
parent: Assignment
nav_order: 1
---

# Panduan Editor Python (Try It Yourself)

Setiap halaman study case memiliki editor Python yang berjalan langsung di browser (Pyodide), tanpa perlu install apa pun. Editor ini memiliki tombol **Run** dan **Reset**. Playground yang memiliki test case juga memiliki tombol **Run Tests**. Setelah semua test case lulus, tombol **Save File** muncul untuk mengunduh kode sebagai file Python dengan nama yang kamu masukkan.

## Run

- Menjalankan kode **persis seperti yang kamu tulis**, satu kali jalan.
- **Tidak ada input yang dikirim otomatis.** Jika kode memanggil `input()`, program akan error karena tidak ada data untuk dibaca.
- Cocok untuk mencoba class secara langsung dengan nilai yang kamu tulis sendiri di kode, misalnya:

  ```python
  class Kalkulator:
      def __init__(self):
          self.riwayat = []

      def tambah(self, a, b):
          hasil = a + b
          self.riwayat.append(hasil)
          return hasil


  kalkulator = Kalkulator()
  print(kalkulator.tambah(10, 5))
  print(kalkulator.riwayat)
  ```

- Output (atau error) apa adanya ditampilkan di panel **Output** di bawah editor.
- Gunakan ini untuk eksperimen bebas dan debugging cepat saat masih menulis logic class.

Coba langsung, tekan **Run**:

{% include pyodide-exercise.html id="panduan-run-demo" title="Contoh: Run" prompt="Tekan Run untuk menjalankan kode ini apa adanya. Coba ubah angkanya lalu Run lagi." starter="class Kalkulator:
    def __init__(self):
        self.riwayat = []

    def tambah(self, a, b):
        hasil = a + b
        self.riwayat.append(hasil)
        return hasil


kalkulator = Kalkulator()
print(kalkulator.tambah(10, 5))
print(kalkulator.riwayat)
" %}

## Run Tests

- Menjalankan **program lengkap** (yang membaca data lewat `input()` dan mencetak sesuai Format Output di soal) terhadap seluruh test case resmi dari soal, persis nilai-nilai yang ada di Tabel Uji / Kasus Uji.
- Untuk setiap test case: input dikirim otomatis ke `input()`, lalu output program dibandingkan dengan output yang diharapkan.
- Setiap test case dijalankan di lingkungan yang bersih (state class seperti `total_buku` atau `semua_produk` di-reset), jadi hasilnya konsisten seolah program dijalankan dari awal setiap kali, sama seperti menjalankan file `.py` secara terpisah untuk tiap test case.
- Hasil ditampilkan per test case: **Lulus** atau **Gagal**. Untuk yang gagal, buka **Lihat detail** untuk membandingkan Input, Expected (output yang benar), dan Actual (output kode kamu).
- Ini yang dipakai untuk mengecek apakah solusi sudah benar, mirip tombol "Run" di LeetCode/HackerRank.
- Jika semua test case lulus, tombol **Save File** muncul di samping **Run Tests**. Saat tombol ditekan, masukkan nama file pada popup. Ekstensi `.py` akan ditambahkan otomatis jika belum ditulis.
- Jika kode diubah atau ada test case yang gagal, tombol **Save File** disembunyikan sampai semua test case lulus lagi.

Contoh, program lengkap seperti ini (bukan dari soal manapun, hanya ilustrasi):

```python
class Kalkulator:
    def hitung(self, a, operator, b):
        if operator == "+":
            return a + b
        if operator == "-":
            return a - b
        if operator == "*":
            return a * b
        return a // b  # bug: seharusnya "/", bukan "//"


a, operator, b = input().split()
kalkulator = Kalkulator()
hasil = kalkulator.hitung(float(a), operator, float(b))
print(f"Hasil: {hasil}")
```

Soal ini punya tiga test case resmi. Saat **Run Tests** ditekan, kamu tidak perlu menulis nilai `a`, `operator`, `b` secara manual. Baris `input()` otomatis diisi dengan tiap baris test case, satu per satu:

| Test | Input yang dikirim otomatis | Expected |
|---|---|---|
| 1 | `10 + 5` | `Hasil: 15.0` |
| 2 | `20 - 8` | `Hasil: 12.0` |
| 3 | `9 / 2` | `Hasil: 4.5` |

Lalu hasilnya muncul sebagai daftar:

```
Test 1: Lulus
Test 2: Lulus
Test 3: Gagal
  ▸ Lihat detail
    Input:    9 / 2
    Expected: Hasil: 4.5
    Actual:   Hasil: 4.0
```

Pada contoh ini, Test 3 gagal karena baris terakhir `hitung()` memakai `//` (floor division), yang membulatkan ke bawah menjadi `4.0`, padahal seharusnya `/` agar hasilnya `4.5`.

Kalau ada yang **Gagal**, bandingkan baris **Expected** vs **Actual** di bagian detail untuk tahu tepatnya di mana logic class kamu masih salah, tidak perlu menebak-nebak lagi.

Coba langsung, tekan **Run Tests** untuk melihat 2 Lulus dan 1 Gagal seperti di atas, lalu perbaiki baris `//` menjadi `/` dan tekan **Run Tests** lagi sampai 3/3 lulus:

{% include pyodide-exercise.html id="panduan-run-tests-demo" title="Contoh: Run Tests" prompt="Tekan Run Tests untuk melihat 2 Lulus, 1 Gagal. Cari baris yang memakai // padahal seharusnya /, perbaiki, lalu tekan Run Tests lagi." starter="class Kalkulator:
    def hitung(self, a, operator, b):
        if operator == \"+\":
            return a + b
        if operator == \"-\":
            return a - b
        if operator == \"*\":
            return a * b
        return a // b  # bug: seharusnya \"/\", bukan \"//\"


a, operator, b = input().split()
kalkulator = Kalkulator()
hasil = kalkulator.hitung(float(a), operator, float(b))
print(f\"Hasil: {hasil}\")
" tests="10 + 5
@@OUTPUT@@
Hasil: 15.0
@@CASE@@
20 - 8
@@OUTPUT@@
Hasil: 12.0
@@CASE@@
9 / 2
@@OUTPUT@@
Hasil: 4.5
" %}

## Kapan Pakai yang Mana?

| | Run | Run Tests |
|---|---|---|
| Input | Kamu tulis sendiri di kode | Dikirim otomatis dari test case soal |
| Kode yang dijalankan | Apa pun yang ada di editor | Harus program lengkap (baca `input()`, cetak output) |
| Hasil | Output/error apa adanya | Lulus/Gagal per test case + detail |
| Kegunaan | Eksperimen, debug logic class | Cek kebenaran solusi lengkap |

## Tips

- Tulis solusi sebagai **program lengkap** (baca input, cetak output sesuai format soal) supaya bisa langsung dites dengan **Run Tests**.
- Kalau hanya ingin mengecek satu bagian class saja tanpa peduli format input/output, pakai **Run** dengan kode uji manual (buat object langsung, `print()` hasilnya).
- **Reset** mengembalikan editor ke kerangka kode (starter) awal, bukan ke kosong, aman dipakai untuk mulai ulang.
- Kalau menyalin kode dari luar (chat, dokumen, dsb.), salin **seluruh blok kode sekaligus** (misalnya lewat tombol copy), bukan baris per baris. Baris yang panjang bisa terpotong kalau disalin manual saat tampilannya membungkus ke baris berikutnya.
