---
title: Study Case Kelas A
layout: default
parent: Assignment 1
grand_parent: Assignment
printtitle: Study Case Kelas A (Assignment 1) - Peminjaman Buku Perpustakaan
nav_order: 1
tampil: false
---

# Study Case Kelas A (Assignment 1): Peminjaman Buku Perpustakaan

**Tingkat:** Easy

Soal ini menggabungkan materi Minggu 1 sampai 3: **class attribute** yang dipakai bersama semua object (Modul 1), **attribute dengan visibility berbeda** dan **static method** (Modul 2), serta **property dengan getter dan setter** untuk validasi data (Modul 3).

Sebuah perpustakaan mencatat data buku dan proses peminjamannya. Setiap kali ada peminjaman, stok buku berkurang satu jika masih tersedia. Jika stok sudah habis, peminjaman ditolak dan stok tidak berubah. Stok juga tidak boleh diisi dengan nilai negatif.

## Ketentuan Class

Buat class `Buku` dengan:

- `total_buku = 0`: attribute class, bertambah 1 setiap kali object baru dibuat.
- `judul`, `penulis`, `tahun_terbit`: attribute public.
- `_status_pinjam`: attribute protected, default `False`.
- `__stok`: attribute private, diakses lewat property `stok`.
- `__init__(self, judul, penulis, tahun_terbit, stok=1)`: menambah `Buku.total_buku` sebanyak 1, lalu mengisi `stok` lewat property (bukan langsung ke `__stok`) agar tervalidasi sejak awal.
- `@property stok(self)`: getter yang mengembalikan `__stok`.
- `@stok.setter stok(self, nilai)`: jika `nilai < 0`, raise `ValueError("Stok tidak boleh negatif.")`; jika valid, simpan ke `__stok`.
- `pinjam(self)`: jika `stok > 0`, kurangi `stok` sebanyak 1 (lewat property), set `_status_pinjam = True`, lalu return `True`. Jika stok habis, return `False` tanpa mengubah apa pun.
- `@staticmethod validasi_isbn(isbn)`: mengembalikan `True` jika panjang string `isbn` adalah 10 atau 13 karakter, selain itu `False`.

## Program Utama

Baca satu baris input berisi data buku, buat object `Buku`, panggil `pinjam()` tepat satu kali, lalu cetak hasilnya, hasil validasi ISBN, dan jumlah total buku yang pernah didaftarkan.

## Format Input

Satu baris berisi lima nilai dipisah spasi:

```
judul penulis tahun_terbit stok isbn
```

Judul dan penulis yang terdiri dari beberapa kata ditulis dengan tanda underscore (`_`) sebagai pengganti spasi.

## Format Output

Tujuh baris dengan format berikut (spasi setelah label menyesuaikan agar tanda `:` sejajar):

```
Judul        : <judul>
Penulis      : <penulis>
Tahun Terbit : <tahun_terbit>
Stok Tersisa : <stok setelah pinjam>
Status Pinjam: <Dipinjam / Tidak Dipinjam>
ISBN Valid   : <True / False>
Total Buku   : <Buku.total_buku>
```

## Contoh Input

```
Laskar_Pelangi Andrea_Hirata 2005 3 9786020000001
```

## Contoh Output

```
Judul        : Laskar Pelangi
Penulis      : Andrea Hirata
Tahun Terbit : 2005
Stok Tersisa : 2
Status Pinjam: Dipinjam
ISBN Valid   : True
Total Buku   : 1
```

## Tabel Uji

| No | Input | Stok Tersisa | Status Pinjam | ISBN Valid | Total Buku |
|----|-------|--------------|----------------|------------|------------|
| 1 | `Laskar_Pelangi Andrea_Hirata 2005 3 9786020000001` | 2 | Dipinjam | True | 1 |
| 2 | `Bumi_Manusia Pramoedya_Ananta_Toer 1980 0 12345` | 0 | Tidak Dipinjam | False | 1 |
| 3 | `Negeri_5_Menara Ahmad_Fuadi 2009 1 9786020000` | 0 | Dipinjam | True | 1 |

## Coba Kerangka Kode

Lengkapi bagian class `Buku` yang bertanda `TODO` (bagian pembacaan input dan pencetakan output sudah disediakan), lalu tekan **Run Tests** untuk menjalankan kode terhadap seluruh kasus pada Tabel Uji, persis seperti mengerjakan soal di LeetCode.

{% include pyodide-exercise.html id="assignment1-kelas-a" title="Kerangka class Buku" prompt="Lengkapi __init__, property stok (getter/setter), pinjam(), dan validasi_isbn(). Bagian pembacaan input dan pencetakan output sudah disediakan di bawah." starter="class Buku:
    total_buku = 0

    def __init__(self, judul, penulis, tahun_terbit, stok=1):
        self.judul = judul
        self.penulis = penulis
        self.tahun_terbit = tahun_terbit
        self._status_pinjam = False
        # TODO: tambah Buku.total_buku sebanyak 1
        # TODO: isi stok lewat property (bukan langsung ke __stok)

    @property
    def stok(self):
        # TODO: kembalikan __stok
        pass

    @stok.setter
    def stok(self, nilai):
        # TODO: validasi nilai >= 0 (raise ValueError jika tidak), lalu simpan ke __stok
        pass

    def pinjam(self):
        # TODO: kurangi stok 1 jika tersedia, set _status_pinjam, return True/False
        pass

    @staticmethod
    def validasi_isbn(isbn):
        # TODO: True jika panjang isbn 10 atau 13, selain itu False
        pass


judul, penulis, tahun_terbit, stok, isbn = input().split()
buku = Buku(judul.replace(\"_\", \" \"), penulis.replace(\"_\", \" \"), int(tahun_terbit), int(stok))
hasil_pinjam = buku.pinjam()
isbn_valid = Buku.validasi_isbn(isbn)

print(f\"{'Judul':<13}: {buku.judul}\")
print(f\"{'Penulis':<13}: {buku.penulis}\")
print(f\"{'Tahun Terbit':<13}: {buku.tahun_terbit}\")
print(f\"{'Stok Tersisa':<13}: {buku.stok}\")
print(f\"{'Status Pinjam':<13}: {'Dipinjam' if hasil_pinjam else 'Tidak Dipinjam'}\")
print(f\"{'ISBN Valid':<13}: {isbn_valid}\")
print(f\"{'Total Buku':<13}: {Buku.total_buku}\")
" tests="Laskar_Pelangi Andrea_Hirata 2005 3 9786020000001
@@OUTPUT@@
Judul        : Laskar Pelangi
Penulis      : Andrea Hirata
Tahun Terbit : 2005
Stok Tersisa : 2
Status Pinjam: Dipinjam
ISBN Valid   : True
Total Buku   : 1
@@CASE@@
Bumi_Manusia Pramoedya_Ananta_Toer 1980 0 12345
@@OUTPUT@@
Judul        : Bumi Manusia
Penulis      : Pramoedya Ananta Toer
Tahun Terbit : 1980
Stok Tersisa : 0
Status Pinjam: Tidak Dipinjam
ISBN Valid   : False
Total Buku   : 1
@@CASE@@
Negeri_5_Menara Ahmad_Fuadi 2009 1 9786020000
@@OUTPUT@@
Judul        : Negeri 5 Menara
Penulis      : Ahmad Fuadi
Tahun Terbit : 2009
Stok Tersisa : 0
Status Pinjam: Dipinjam
ISBN Valid   : True
Total Buku   : 1
" %}
