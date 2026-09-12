---
title: Study Case Kelas C
layout: default
parent: Chapter 2
grand_parent: Assignment
printtitle: Study Case Kelas C (Chapter 2) - Inventori Produk Toko Online
nav_order: 3
tampil: false
---

# Study Case Kelas C (Chapter 2): Inventori Produk Toko Online

**Tingkat:** Hard

Soal ini menggabungkan tiga topik terakhir Modul 2: **`**kwargs`** untuk pembaruan data yang dibatasi hanya pada attribute tertentu, **class method** untuk menghitung nilai gabungan dari seluruh object yang pernah dibuat, dan **static method** untuk validasi yang tidak bergantung pada data instance maupun class.

Sebuah toko online mengelola banyak produk sekaligus. Setiap produk punya harga, stok, dan diskon sendiri-sendiri, tetapi toko juga perlu tahu total nilai seluruh inventorinya dan memvalidasi kode produk yang masuk.

## Ketentuan Class

Buat class `Produk` dengan:

- `total_produk = 0` dan `semua_produk = []`: attribute class, bertambah/terisi setiap kali object baru dibuat.
- `nama_produk`, `kategori`: attribute public.
- `_diskon_persen`: attribute protected, default `0`.
- `__harga`, `__stok`: attribute private.
- `__init__(self, nama_produk, kategori, harga, stok=0)`
- `set_diskon(self, persen)`: mengubah `_diskon_persen`, dengan syarat `0 <= persen <= 100`.
- `harga_final(self)`: mengembalikan `__harga` dikurangi diskon `_diskon_persen`.
- `get_stok(self)`: getter untuk `__stok`.
- `@classmethod total_nilai_inventori(cls)`: mengiterasi `cls.semua_produk`, menjumlahkan `harga_final() * get_stok()` setiap produk, lalu mengembalikan totalnya.
- `@staticmethod validasi_kode_produk(kode)`: mengembalikan `True` jika `kode` diawali `"PRD-"` dan sisanya seluruhnya digit, selain itu `False`.

## Program Utama

Baca jumlah produk `N`, lalu baca `N` baris data produk. Untuk setiap produk, buat object, atur diskonnya, lalu cetak harga final dan hasil validasi kode produknya. Setelah seluruh produk diproses, cetak total nilai inventori dari seluruh produk yang dibuat.

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
