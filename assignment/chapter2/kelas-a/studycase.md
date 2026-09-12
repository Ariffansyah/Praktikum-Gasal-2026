---
title: Study Case Kelas A
layout: default
parent: Chapter 2
grand_parent: Assignment
printtitle: Study Case Kelas A (Chapter 2) - Peminjaman Buku Perpustakaan
nav_order: 1
tampil: false
---

# Study Case Kelas A (Chapter 2): Peminjaman Buku Perpustakaan

**Tingkat:** Easy

Soal ini melatih penggunaan **attribute dengan visibility berbeda** (public, protected, private), **method instance** dengan default argument, **getter** untuk mengakses attribute private, serta **static method** untuk validasi, sebagaimana dibahas pada Modul 2.

Sebuah perpustakaan mencatat data buku dan proses peminjamannya. Setiap kali ada peminjaman, stok buku berkurang satu jika masih tersedia. Jika stok sudah habis, peminjaman ditolak dan stok tidak berubah.

## Ketentuan Class

Buat class `Buku` dengan:

- `judul`, `penulis`, `tahun_terbit`: attribute public.
- `_status_pinjam`: attribute protected, default `False`.
- `__stok`: attribute private, diisi lewat parameter `stok` di `__init__` (default `1`).
- `__init__(self, judul, penulis, tahun_terbit, stok=1)`
- `pinjam(self)`: jika `__stok > 0`, kurangi `__stok` sebanyak 1, set `_status_pinjam = True`, lalu return `True`. Jika stok habis, return `False` tanpa mengubah apa pun.
- `cek_stok(self)`: getter yang mengembalikan `__stok`.
- `@staticmethod validasi_isbn(isbn)`: mengembalikan `True` jika panjang string `isbn` adalah 10 atau 13 karakter, selain itu `False`.

## Program Utama

Baca satu baris input berisi data buku, buat object `Buku`, panggil `pinjam()` tepat satu kali, lalu cetak hasilnya beserta hasil validasi ISBN.

## Format Input

Satu baris berisi lima nilai dipisah spasi:

```
judul penulis tahun_terbit stok isbn
```

Judul dan penulis yang terdiri dari beberapa kata ditulis dengan tanda underscore (`_`) sebagai pengganti spasi.

## Format Output

Lima baris dengan format berikut (spasi setelah label menyesuaikan agar tanda `:` sejajar):

```
Judul        : <judul>
Penulis      : <penulis>
Tahun Terbit : <tahun_terbit>
Stok Tersisa : <stok setelah pinjam>
Status Pinjam: <Dipinjam / Tidak Dipinjam>
ISBN Valid   : <True / False>
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
```

## Tabel Uji

| No | Input | Stok Tersisa | Status Pinjam | ISBN Valid |
|----|-------|--------------|----------------|------------|
| 1 | `Laskar_Pelangi Andrea_Hirata 2005 3 9786020000001` | 2 | Dipinjam | True |
| 2 | `Bumi_Manusia Pramoedya_Ananta_Toer 1980 0 12345` | 0 | Tidak Dipinjam | False |
| 3 | `Negeri_5_Menara Ahmad_Fuadi 2009 1 9786020000` | 0 | Dipinjam | True |
