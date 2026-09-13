---
title: Study Case Kelas B
layout: default
parent: Assignment 1
grand_parent: Assignment
printtitle: Study Case Kelas B (Assignment 1) - Slip Gaji Karyawan
nav_order: 2
tampil: true
---

# Study Case Kelas B (Assignment 1): Slip Gaji Karyawan

**Tingkat:** Medium

Soal ini menggabungkan materi Minggu 1 sampai 3: **class attribute** yang dipakai bersama semua object dan **default argument** (Modul 1 & 2), **method dengan `*args`** untuk menerima jumlah argument yang tidak tetap (Modul 2), serta **property dengan setter tervalidasi** untuk melindungi data gaji agar tidak diisi nilai yang tidak masuk akal (Modul 3).

Sebuah perusahaan menghitung gaji bersih karyawan dari gaji pokok ditambah tunjangan, dikurangi pajak. Jumlah komponen tunjangan setiap karyawan bisa berbeda-beda (bisa satu, bisa lebih), sehingga perlu ditampung dengan `*args`. Gaji pokok tidak boleh diisi nilai nol atau negatif.

## Ketentuan Class

Buat class `Karyawan` dengan:

- `pajak_persen = 5`: attribute class, berlaku sama untuk semua object.
- `nama`, `jabatan`: attribute public.
- `__gaji_pokok`: attribute private, diakses lewat property `gaji_pokok`.
- `__tunjangan`: attribute private, default `0`, diakses lewat property `tunjangan` (read-only, tanpa setter).
- `__init__(self, nama, jabatan, gaji_pokok, departemen="Umum")`: mengisi `gaji_pokok` lewat property agar tervalidasi sejak awal.
- `@property gaji_pokok(self)`: getter yang mengembalikan `__gaji_pokok`.
- `@gaji_pokok.setter gaji_pokok(self, nilai)`: jika `nilai <= 0`, raise `ValueError("Gaji pokok harus lebih besar dari nol.")`; jika valid, simpan ke `__gaji_pokok`.
- `@property tunjangan(self)`: getter read-only yang mengembalikan `__tunjangan`.
- `tambah_tunjangan(self, *args)`: menjumlahkan seluruh nilai pada `*args` ke `__tunjangan`.
- `hitung_gaji_bersih(self)`: mengembalikan `(gaji_pokok + tunjangan) - pajak_persen% * (gaji_pokok + tunjangan)`, gunakan property `gaji_pokok` dan `tunjangan` serta `Karyawan.pajak_persen`, bukan angka atau attribute private secara langsung.

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

## Coba Kerangka Kode

Lengkapi bagian class `Karyawan` yang bertanda `TODO` (bagian pembacaan input dan pencetakan output sudah disediakan), lalu tekan **Run Tests** untuk menjalankan kode terhadap seluruh kasus pada Tabel Uji, persis seperti mengerjakan soal di LeetCode.

{% include pyodide-exercise.html id="assignment1-kelas-b" title="Kerangka class Karyawan" prompt="Lengkapi property gaji_pokok (getter/setter), property tunjangan (read-only), tambah_tunjangan(*args), dan hitung_gaji_bersih(). Bagian pembacaan input dan pencetakan output sudah disediakan di bawah." starter="class Karyawan:
    pajak_persen = 5

    def __init__(self, nama, jabatan, gaji_pokok, departemen=\"Umum\"):
        self.nama = nama
        self.jabatan = jabatan
        self.departemen = departemen
        self.__tunjangan = 0
        # TODO: isi gaji_pokok lewat property (bukan langsung ke __gaji_pokok)

    @property
    def gaji_pokok(self):
        # TODO: kembalikan __gaji_pokok
        pass

    @gaji_pokok.setter
    def gaji_pokok(self, nilai):
        # TODO: validasi nilai > 0 (raise ValueError jika tidak), lalu simpan ke __gaji_pokok
        pass

    @property
    def tunjangan(self):
        # TODO: kembalikan __tunjangan (read-only, tidak ada setter)
        pass

    def tambah_tunjangan(self, *args):
        # TODO: jumlahkan seluruh args ke __tunjangan
        pass

    def hitung_gaji_bersih(self):
        # TODO: (gaji_pokok + tunjangan) dikurangi pajak_persen%
        pass


nama, jabatan, gaji_pokok = input().split()
daftar_tunjangan = [int(nilai) for nilai in input().split()]

karyawan = Karyawan(nama.replace(\"_\", \" \"), jabatan.replace(\"_\", \" \"), int(gaji_pokok))
karyawan.tambah_tunjangan(*daftar_tunjangan)

print(f\"{'Nama':<11}: {karyawan.nama}\")
print(f\"{'Jabatan':<11}: {karyawan.jabatan}\")
print(f\"{'Gaji Bersih':<11}: {karyawan.hitung_gaji_bersih()}\")
" tests="Sari Staff_IT 6000000
500000 300000 200000
@@OUTPUT@@
Nama       : Sari
Jabatan    : Staff IT
Gaji Bersih: 6650000.0
@@CASE@@
Budi Manager 12000000
1000000
@@OUTPUT@@
Nama       : Budi
Jabatan    : Manager
Gaji Bersih: 12350000.0
@@CASE@@
Dewi Staff_HR 4500000
200000 100000 50000 25000
@@OUTPUT@@
Nama       : Dewi
Jabatan    : Staff HR
Gaji Bersih: 4631250.0
" %}
