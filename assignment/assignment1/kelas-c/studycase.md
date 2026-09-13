---
title: Study Case Kelas C
layout: default
parent: Assignment 1
grand_parent: Assignment
printtitle: Study Case Kelas C (Assignment 1) - Inventori Produk Toko Online
nav_order: 3
tampil: false
---

# Study Case Kelas C (Assignment 1): Inventori Produk Toko Online

**Tingkat:** Hard

Soal ini menggabungkan materi Minggu 1 sampai 3: **class attribute** untuk mengagregasi data seluruh object (Modul 1), **`**kwargs`**, **class method**, dan **static method** (Modul 2), serta **property dengan setter tervalidasi** untuk menjaga harga dan stok tetap konsisten (Modul 3).

Sebuah toko online mengelola banyak produk sekaligus. Setiap produk punya harga, stok, dan diskon sendiri-sendiri, tetapi toko juga perlu tahu total nilai seluruh inventorinya dan memvalidasi kode produk yang masuk. Harga harus lebih besar dari nol dan stok tidak boleh negatif.

## Ketentuan Class

Buat class `Produk` dengan:

- `total_produk = 0` dan `semua_produk = []`: attribute class, bertambah/terisi setiap kali object baru dibuat.
- `nama_produk`, `kategori`: attribute public.
- `_diskon_persen`: attribute protected, default `0`, hanya diubah lewat `update_produk`.
- `__harga`, `__stok`: attribute private, diakses lewat property `harga` dan `stok`.
- `__init__(self, nama_produk, kategori, harga, stok=0)`: menambah `Produk.total_produk`, menambahkan `self` ke `Produk.semua_produk`, lalu mengisi `harga` dan `stok` lewat property agar tervalidasi sejak awal.
- `@property harga(self)` / `@harga.setter`: setter memvalidasi `nilai > 0`, jika tidak raise `ValueError("Harga harus lebih besar dari nol.")`.
- `@property stok(self)` / `@stok.setter`: setter memvalidasi `nilai >= 0`, jika tidak raise `ValueError("Stok tidak boleh negatif.")`.
- `update_produk(self, **kwargs)`: hanya memproses key `diskon_persen` dengan syarat `0 <= nilai <= 100` (nilai lain diabaikan); key selain `diskon_persen` diabaikan.
- `harga_final(self)`: mengembalikan `harga` dikurangi diskon `_diskon_persen`.
- `@classmethod total_nilai_inventori(cls)`: mengiterasi `cls.semua_produk`, menjumlahkan `harga_final() * stok` setiap produk, lalu mengembalikan totalnya.
- `@staticmethod validasi_kode_produk(kode)`: mengembalikan `True` jika `kode` diawali `"PRD-"` dan sisanya seluruhnya digit, selain itu `False`.

## Program Utama

Baca jumlah produk `N`, lalu baca `N` baris data produk. Untuk setiap produk, buat object, atur diskonnya lewat `update_produk(diskon_persen=...)`, lalu cetak harga final dan hasil validasi kode produknya. Setelah seluruh produk diproses, cetak total nilai inventori dari seluruh produk yang dibuat.

## Format Input

Baris pertama berisi `N`. Diikuti `N` baris, masing-masing:

```
nama_produk kategori harga stok diskon kode_produk
```

Nama produk dan kategori yang terdiri dari beberapa kata ditulis dengan tanda underscore (`_`) sebagai pengganti spasi.

## Format Output

Satu baris per produk (urut sesuai input):

```
<nama_produk> | Harga Final: <harga_final> | Kode Valid: <True/False>
```

Diikuti satu baris terakhir:

```
Total Nilai Inventori: <total_nilai_inventori>
```

## Kasus Uji

**Kasus 1**

Input:
```
2
Kaos_Polos Fashion 80000 50 10 PRD-00123
Mouse_Wireless Elektronik 150000 20 0 PRD001
```

Output:
```
Kaos Polos | Harga Final: 72000.0 | Kode Valid: True
Mouse Wireless | Harga Final: 150000.0 | Kode Valid: False
Total Nilai Inventori: 6600000.0
```

**Kasus 2**

Input:
```
1
Buku_Tulis Alat_Tulis 5000 100 0 PRD-99999
```

Output:
```
Buku Tulis | Harga Final: 5000.0 | Kode Valid: True
Total Nilai Inventori: 500000.0
```

**Kasus 3**

Input:
```
3
Kaos_Polos Fashion 80000 50 10 PRD-00123
Mouse_Wireless Elektronik 150000 20 0 PRD001
Charger Elektronik 100000 10 20 XYZ-123
```

Output:
```
Kaos Polos | Harga Final: 72000.0 | Kode Valid: True
Mouse Wireless | Harga Final: 150000.0 | Kode Valid: False
Charger | Harga Final: 80000.0 | Kode Valid: False
Total Nilai Inventori: 7400000.0
```

## Coba Kerangka Kode

Lengkapi bagian class `Produk` yang bertanda `TODO` (bagian pembacaan input dan pencetakan output sudah disediakan), lalu tekan **Run Tests** untuk menjalankan kode terhadap seluruh Kasus Uji di atas, persis seperti mengerjakan soal di LeetCode.

{% include pyodide-exercise.html id="assignment1-kelas-c" title="Kerangka class Produk" prompt="Lengkapi property harga dan stok (getter/setter), update_produk(**kwargs), harga_final(), total_nilai_inventori(), dan validasi_kode_produk(). Bagian pembacaan input dan pencetakan output sudah disediakan di bawah." starter="class Produk:
    total_produk = 0
    semua_produk = []

    def __init__(self, nama_produk, kategori, harga, stok=0):
        self.nama_produk = nama_produk
        self.kategori = kategori
        self._diskon_persen = 0
        # TODO: tambah Produk.total_produk sebanyak 1
        # TODO: daftarkan self ke Produk.semua_produk
        # TODO: isi harga dan stok lewat property

    @property
    def harga(self):
        # TODO: kembalikan __harga
        pass

    @harga.setter
    def harga(self, nilai):
        # TODO: validasi nilai > 0 (raise ValueError jika tidak), lalu simpan ke __harga
        pass

    @property
    def stok(self):
        # TODO: kembalikan __stok
        pass

    @stok.setter
    def stok(self, nilai):
        # TODO: validasi nilai >= 0 (raise ValueError jika tidak), lalu simpan ke __stok
        pass

    def update_produk(self, **kwargs):
        # TODO: hanya proses key 'diskon_persen' dengan syarat 0-100
        pass

    def harga_final(self):
        # TODO: harga dikurangi diskon _diskon_persen persen
        pass

    @classmethod
    def total_nilai_inventori(cls):
        # TODO: jumlahkan harga_final() * stok seluruh semua_produk
        pass

    @staticmethod
    def validasi_kode_produk(kode):
        # TODO: True jika diawali 'PRD-' dan sisanya seluruhnya digit
        pass


n = int(input())
for _ in range(n):
    nama_produk, kategori, harga, stok, diskon, kode = input().split()
    produk = Produk(nama_produk.replace(\"_\", \" \"), kategori.replace(\"_\", \" \"), int(harga), int(stok))
    produk.update_produk(diskon_persen=int(diskon))
    print(f\"{produk.nama_produk} | Harga Final: {produk.harga_final()} | Kode Valid: {Produk.validasi_kode_produk(kode)}\")

print(f\"Total Nilai Inventori: {Produk.total_nilai_inventori()}\")
" tests="2
Kaos_Polos Fashion 80000 50 10 PRD-00123
Mouse_Wireless Elektronik 150000 20 0 PRD001
@@OUTPUT@@
Kaos Polos | Harga Final: 72000.0 | Kode Valid: True
Mouse Wireless | Harga Final: 150000.0 | Kode Valid: False
Total Nilai Inventori: 6600000.0
@@CASE@@
1
Buku_Tulis Alat_Tulis 5000 100 0 PRD-99999
@@OUTPUT@@
Buku Tulis | Harga Final: 5000.0 | Kode Valid: True
Total Nilai Inventori: 500000.0
@@CASE@@
3
Kaos_Polos Fashion 80000 50 10 PRD-00123
Mouse_Wireless Elektronik 150000 20 0 PRD001
Charger Elektronik 100000 10 20 XYZ-123
@@OUTPUT@@
Kaos Polos | Harga Final: 72000.0 | Kode Valid: True
Mouse Wireless | Harga Final: 150000.0 | Kode Valid: False
Charger | Harga Final: 80000.0 | Kode Valid: False
Total Nilai Inventori: 7400000.0
" %}
