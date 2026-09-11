---
title: Reading 1 - Pengantar OOP dan Class-Object
layout: default
parent: Readings
nav_order: 1
---

# Reading 1 - Pengantar OOP dan Class-Object

<a href="{{ '/ppts/[2026_OOP] Pertemuan 1 - Pengantar OOP (1).pdf' | relative_url }}">Buka slide Pertemuan 1 (PDF)</a>

## Ringkasan

Pemrograman Berorientasi Objek (OOP) adalah pendekatan pemrograman yang memodelkan program sebagai kumpulan objek yang saling berinteraksi. Setiap objek memiliki data atau state dan perilaku atau behavior. Dalam Python, perilaku objek ditulis sebagai method, sedangkan data yang dimiliki objek ditulis sebagai attribute.

## 1. Studi kasus data mahasiswa

Sebuah program akademik perlu menyimpan data mahasiswa seperti nama, NIM, angkatan, dan daftar mata kuliah. Selain menyimpan data, program juga perlu melakukan operasi berikut:

- Menambahkan mata kuliah.
- Menghapus mata kuliah.
- Memeriksa KRS.
- Menampilkan profil mahasiswa.
- Menghitung jumlah SKS.

Pada program prosedural, data dan fungsi sering dibuat terpisah. Pendekatan ini masih dapat digunakan untuk kasus sederhana, tetapi akan semakin sulit dikelola ketika jumlah mahasiswa, mata kuliah, dosen, kelas, KRS, jadwal, dan nilai bertambah besar.

## 2. Memodelkan masalah dengan objek

Dalam sistem akademik, objek yang dapat dimodelkan antara lain:

- Mahasiswa.
- Dosen.
- Kelas.
- Mata kuliah.
- Program studi.
- Fakultas.

Setiap objek perlu dianalisis melalui tiga pertanyaan:

1. Data apa yang dimiliki objek?
2. Operasi apa yang dapat dilakukan objek?
3. Bagaimana objek berinteraksi dengan objek lain?

Contoh hubungan antarobjek:

- Mahasiswa mengambil mata kuliah.
- Mahasiswa memiliki KRS dan mendapatkan nilai.
- Dosen mengajar mata kuliah.
- Mata kuliah memiliki kelas.

Dengan cara ini, data dan operasi yang berkaitan dapat ditempatkan dalam class yang sama.

## 3. Class, object, dan instance

- Class adalah cetak biru atau template untuk membuat objek.
- Object adalah hasil nyata yang dibuat dari sebuah class.
- Instance adalah object tertentu yang dibuat dari sebuah class.
- Attribute adalah data atau properti yang dimiliki object.
- Method adalah operasi atau perilaku yang dapat dilakukan object.

Sebagai contoh, `Mahasiswa` dapat menjadi class. `mhs1` dan `mhs2` adalah instance yang dibuat dari class tersebut.

## 4. Membuat class di Python

Semua class ditulis dengan kata kunci `class`. Method `__init__()` digunakan untuk menginisialisasi attribute ketika object dibuat. Parameter pertama pada instance method adalah `self`, yaitu rujukan ke object yang sedang digunakan.

```python
class Mahasiswa:
    def __init__(self, nama, nim, angkatan):
        self.nama = nama
        self.nim = nim
        self.angkatan = angkatan
        self.matkul = []

    def tambah_matkul(self, matkul):
        self.matkul.append(matkul)

    def hitung_sks(self):
        return len(self.matkul) * 3
```

Pada contoh tersebut, `nama`, `nim`, `angkatan`, dan `matkul` adalah instance attribute. Nilainya dapat berbeda untuk setiap object.

## 5. Class attribute dan instance attribute

Class attribute didefinisikan di dalam class tetapi di luar `__init__()`. Nilainya dapat digunakan bersama oleh semua instance. Instance attribute biasanya dibuat dengan `self` di dalam `__init__()` dan menyimpan keadaan masing-masing object.

```python
class Mahasiswa:
    universitas = "Universitas Negeri Surabaya"

    def __init__(self, nama, nim, angkatan):
        self.nama = nama
        self.nim = nim
        self.angkatan = angkatan
```

`universitas` merupakan class attribute, sedangkan `nama`, `nim`, dan `angkatan` merupakan instance attribute.

## 6. Membuat, mengakses, dan mengubah object

Object dibuat dengan memanggil nama class dan memberikan argument yang diperlukan.

```python
mhs1 = Mahasiswa("Andi", "25123456788", 2025)
mhs2 = Mahasiswa("Budi", "25123456789", 2025)

print(mhs1.nama)
print(mhs1.nim)
mhs1.angkatan = 2024
mhs1.tambah_matkul("Matematika Diskrit")
print(mhs1.hitung_sks())
```

Notasi titik digunakan untuk mengakses attribute dan method. Attribute dapat diubah dengan memberikan nilai baru, sedangkan method dipanggil menggunakan tanda kurung.

## 7. OOP pada pemrograman kecerdasan artifisial

OOP juga digunakan pada library dan model kecerdasan artifisial. Sebuah model dapat dimodelkan sebagai object yang memiliki parameter dan method, misalnya `train()`, `predict()`, dan `evaluate()`.

```python
class NeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size
        self.learning_rate = 0.01

    def train(self, data, target):
        pass

    def predict(self, data):
        pass

    def evaluate(self, data, target):
        pass
```

## Inti materi

- OOP menyatukan data dan perilaku yang berkaitan.
- Class digunakan sebagai cetak biru object.
- Object adalah instance nyata dari class.
- Attribute menyimpan data, sedangkan method menjalankan perilaku.
- `self` merujuk pada instance yang sedang digunakan.
- `__init__()` menyiapkan keadaan awal object.
- Class attribute digunakan untuk data bersama, sedangkan instance attribute menyimpan data setiap object.
