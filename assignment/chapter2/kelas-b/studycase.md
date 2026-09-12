---
title: Study Case Kelas B
layout: default
parent: Chapter 2
grand_parent: Assignment
printtitle: Study Case Kelas B (Chapter 2) - Slip Gaji Karyawan
nav_order: 2
tampil: false
---

# Study Case Kelas B (Chapter 2): Slip Gaji Karyawan

**Tingkat:** Medium

Soal ini melatih **method dengan `*args`** untuk menerima jumlah argument yang tidak tetap, **attribute class** yang dipakai bersama semua object, serta **encapsulation** pada data gaji yang tidak boleh diubah langsung dari luar class, sebagaimana dibahas pada Modul 2.

Sebuah perusahaan menghitung gaji bersih karyawan dari gaji pokok ditambah tunjangan, dikurangi pajak. Jumlah komponen tunjangan setiap karyawan bisa berbeda-beda (bisa satu, bisa lebih), sehingga perlu ditampung dengan `*args`.

## Ketentuan Class

Buat class `Karyawan` dengan:

- `pajak_persen = 5`: attribute class, berlaku sama untuk semua object.
- `nama`, `jabatan`: attribute public.
- `__gaji_pokok`: attribute private, wajib diisi di `__init__`.
- `__tunjangan`: attribute private, default `0`.
- `__init__(self, nama, jabatan, gaji_pokok, departemen="Umum")`
- `tambah_tunjangan(self, *args)`: menjumlahkan seluruh nilai pada `*args` ke `__tunjangan`.
- `hitung_gaji_bersih(self)`: mengembalikan `(gaji_pokok + tunjangan) - pajak_persen% * (gaji_pokok + tunjangan)`, gunakan `Karyawan.pajak_persen`, bukan angka literal.
- `get_gaji_pokok(self)`: getter untuk `__gaji_pokok`.

## Program Utama

Baca data satu karyawan, baca daftar tunjangannya (jumlahnya tidak tetap), panggil `tambah_tunjangan(*daftar_tunjangan)`, lalu cetak slip gajinya.

## Format Input

Dua baris:

```
nama jabatan gaji_pokok
tunjangan1 tunjangan2 ... (jumlah nilai tidak tetap, minimal satu)
```

Nama dan jabatan yang terdiri dari beberapa kata ditulis dengan tanda underscore (`_`) sebagai pengganti spasi.

## Format Output

```
Nama       : <nama>
Jabatan    : <jabatan>
Gaji Bersih: <hasil hitung_gaji_bersih>
```

## Contoh Input

```
Sari Staff_IT 6000000
500000 300000 200000
```

## Contoh Output

```
Nama       : Sari
Jabatan    : Staff IT
Gaji Bersih: 6650000.0
```

## Tabel Uji

| No | Baris 1 | Baris 2 | Gaji Bersih |
|----|---------|---------|-------------|
| 1 | `Sari Staff_IT 6000000` | `500000 300000 200000` | 6650000.0 |
| 2 | `Budi Manager 12000000` | `1000000` | 12350000.0 |
| 3 | `Dewi Staff_HR 4500000` | `200000 100000 50000 25000` | 4631250.0 |
