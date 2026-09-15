---
title: Quick Review 3
layout: default
parent: Quick Review
tampil: true
nav_order: 1
---
# Quick Review - Chapter 3

Recall singkat sebelum masuk ke study case. Fokusnya adalah cara menjaga state object tetap valid ketika dibaca atau diubah.

## Main topics

1. **Class, object, dan attribute**
   - Class adalah cetak biru; object adalah instance yang dibuat dari class.
   - Class attribute dipakai bersama, misalnya counter atau konstanta.
   - Instance attribute menyimpan state setiap object.

2. **Visibility dan name mangling**
   - `nama`: public, bagian dari interface yang boleh dipakai dari luar.
   - `_nama`: protected secara konvensi; ditujukan untuk internal class atau subclass.
   - `__nama`: private secara konvensi; Python mengubahnya menjadi `_NamaClass__nama` melalui name mangling.
   - Private bukan mekanisme keamanan mutlak.

3. **Encapsulation**
   - Jangan biarkan kode luar mengubah state penting secara sembarangan.
   - Sediakan method atau property sebagai interface yang mengontrol perubahan state.
   - Operasi yang gagal harus mengembalikan nilai yang sesuai dan tidak merusak state sebelumnya.

4. **`@property` dan validasi**
   - Getter membaca private attribute dengan sintaks attribute biasa.
   - Setter memeriksa tipe, rentang, atau aturan bisnis sebelum menyimpan nilai.
   - Assignment di `__init__()` juga sebaiknya melewati setter agar aturan validasi konsisten.

5. **Read-only property dan state turunan**
   - Property tanpa setter cocok untuk nilai hasil perhitungan, seperti total nilai stok, halaman tersisa, atau denda.
   - Nilai tersebut tidak disimpan terpisah; hitung dari state object saat dibaca.


## Pro Tip

1. Tandai setiap attribute sebagai public, protected, atau private.
2. Tentukan invariant: nilai apa yang tidak boleh masuk ke object?
3. Tulis getter dan setter terlebih dahulu.
4. Pastikan method memeriksa semua syarat sebelum mengubah state.
5. Periksa boundary seperti `0`, nilai maksimum, nilai negatif, dan operasi yang gagal.
6. Cocokkan nama class, signature method, label, dan format output dengan starter code.

> Playground berikut bukan jawaban study case. Gunakan untuk mengingat kembali visibility, encapsulation, property, validasi, dan method yang mengubah state secara terkontrol.

## Playground: encapsulation dan property

{% include pyodide-exercise.html id="quickreview-ch3-playground" title="Chapter 3 - Encapsulation dan Property" prompt="Jalankan starter code terlebih dahulu. Setelah itu, coba ubah nilai stok, tambahkan validasi, atau buat satu property read-only lain. Perhatikan bahwa stok berubah melalui property dan peminjaman ditangani oleh method." starter="class Buku:
    total_buku = 0

    def __init__(self, judul, stok):
        self.judul = judul
        self._status = 'Tersedia'
        Buku.total_buku += 1
        self.stok = stok

    @property
    def stok(self):
        return self.__stok

    @stok.setter
    def stok(self, nilai):
        if not isinstance(nilai, int) or nilai < 0:
            raise ValueError('Stok harus bilangan bulat tidak negatif.')
        self.__stok = nilai
        self._status = 'Tersedia' if nilai > 0 else 'Habis'

    @property
    def tersedia(self):
        return self.stok > 0

    def pinjam(self):
        if not self.tersedia:
            return False
        self.stok -= 1
        return True

buku = Buku('Belajar OOP', 2)
print('Stok awal:', buku.stok)
print('Pinjam:', buku.pinjam())
print('Stok akhir:', buku.stok)
print('Tersedia:', buku.tersedia)
print('Status:', buku._status)
print('Total buku:', Buku.total_buku)
" %}

## Checklist sebelum study case

- Pahami state awal object.
- Cari attribute private yang harus diakses melalui property.
- Bedakan validasi assignment dan validasi operasi method.
- Pastikan operasi invalid tidak mengubah counter atau state.
- Jangan mengubah program utama, signature, label, atau format output yang sudah disediakan.

