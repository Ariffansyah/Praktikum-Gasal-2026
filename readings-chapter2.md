---
title: Reading 2 - Property, Visibility, dan Class Method
layout: default
parent: Readings
nav_order: 2
---

# Reading 2 - Property, Visibility, dan Class Method

<a href="{{ '/ppts/[2026_OOP] Pertemuan 2 - Property Visibility & Class Method (1).pdf' | relative_url }}">Buka slide Pertemuan 2 (PDF)</a>

## Ringkasan

Reading ini membahas penguatan konsep class dan object, argument pada method, visibility property, encapsulation, class method, serta static method. Contoh utama menggunakan class `Mobil` untuk menunjukkan bagaimana data dan perilaku dapat dikelola di dalam object.

## 1. Review class dan object

Class adalah cetak biru untuk membuat object. Object merupakan instance yang memiliki attribute dan dapat menjalankan method. Sebagai contoh, class `Mahasiswa` dapat memiliki attribute `nim`, `nama`, dan `angkatan`. Dari class tersebut dapat dibuat beberapa object dengan data yang berbeda.

```python
class Mahasiswa:
    def __init__(self, nim, nama, angkatan):
        self.nim = nim
        self.nama = nama
        self.angkatan = angkatan

mhs1 = Mahasiswa("25123456787", "Wahyu Austin", 2025)
mhs2 = Mahasiswa("25123456788", "Budi Santoso", 2025)
```

## 2. Class Mobil dan instance method

Class `Mobil` dapat memiliki data seperti merek, perusahaan produksi, tahun produksi, kondisi mesin, dan kilometer. Method digunakan untuk melakukan operasi yang berkaitan dengan data tersebut.

```python
class Mobil:
    def __init__(self, nama_merek, perusahaan_produksi, tahun_produksi):
        self.nama_merek = nama_merek
        self.perusahaan_produksi = perusahaan_produksi
        self.tahun_produksi = tahun_produksi
        self.kondisi_mesin = 100
        self.kilometer = 0

    def tampilkan_info(self):
        print(f"Merek: {self.nama_merek}")
        print(f"Perusahaan: {self.perusahaan_produksi}")
        print(f"Tahun: {self.tahun_produksi}")
        print(f"Kilometer: {self.kilometer} km")
        print(f"Kondisi mesin: {self.kondisi_mesin}%")

    def tambah_kilometer(self, kilometer):
        self.kilometer += kilometer

    def cek_kondisi_mesin(self):
        if self.kondisi_mesin >= 80:
            return "Mesin dalam kondisi baik."
        if self.kondisi_mesin >= 50:
            return "Mesin perlu diperiksa."
        return "Mesin perlu segera diservis."

    def service(self):
        self.kondisi_mesin = 100
        self.kilometer = 0
```

Object kemudian dibuat dan method dipanggil dengan notasi titik.

```python
mobil1 = Mobil("Civic", "Honda", 2022)
mobil1.tambah_kilometer(12000)
print(mobil1.cek_kondisi_mesin())
mobil1.tampilkan_info()
```

## 3. Argument pada method

Aturan argument pada fungsi juga berlaku pada method. Beberapa bentuk argument yang umum digunakan adalah:

- Positional argument: nilai diberikan berdasarkan urutan parameter.
- Optional argument: parameter memiliki nilai default.
- Keyword argument: nilai diberikan menggunakan nama parameter.
- `*args`: menerima beberapa positional argument.
- `**kwargs`: menerima beberapa keyword argument.

```python
class Mobil:
    def set_details(self, year=2002, description=""):
        self.year = year
        self.description = description

mobil1 = Mobil.__new__(Mobil)
mobil1.set_details(2022, "Mobil keluarga")
mobil1.set_details(description="Mobil untuk perjalanan jauh")
```

Contoh method dengan `**kwargs` dapat digunakan ketika attribute yang ingin diubah bersifat dinamis.

```python
class Profil:
    def set_details(self, **data):
        for key, value in data.items():
            setattr(self, key, value)

profil = Profil()
profil.set_details(nama="Andi", angkatan=2025)
```

Penggunaan argument yang fleksibel perlu tetap dikendalikan agar hanya attribute yang valid yang dapat diubah.

## 4. Visibility property

Visibility atau privacy menentukan bagaimana attribute dan method boleh diakses. Python tidak menggunakan modifier akses seperti pada sebagian bahasa lain, tetapi menggunakan konvensi penamaan.

- Public: nama attribute ditulis biasa, misalnya `nama`.
- Protected secara konvensi: nama diawali satu underscore, misalnya `_data_internal`.
- Private secara konvensi Python: nama diawali dua underscore, misalnya `__tahun_produksi`.

Attribute dengan dua underscore mengalami name mangling. Python mengubah nama internalnya sehingga tidak dapat dipanggil langsung menggunakan nama awal dari luar class.

```python
class Mobil:
    def __init__(self, nama_merek, tahun_produksi):
        self.nama_merek = nama_merek
        self.__tahun_produksi = tahun_produksi

    def tampilkan_tahun(self):
        print(self.__tahun_produksi)

mobil1 = Mobil("Civic", 2022)
mobil1.tampilkan_tahun()
```

Pemanggilan `mobil1.__tahun_produksi` dari luar class tidak digunakan karena attribute tersebut dimaksudkan untuk penggunaan internal class.

## 5. Encapsulation

Encapsulation adalah prinsip untuk membungkus data dan operasi yang bekerja pada data tersebut di dalam satu class. Akses dan perubahan data dapat dikendalikan melalui method yang disediakan oleh class.

Contoh manfaat encapsulation:

- Menjaga data internal agar tidak diubah sembarangan.
- Memastikan perubahan data mengikuti aturan tertentu.
- Menyembunyikan detail implementasi dari pengguna object.
- Memudahkan perubahan implementasi tanpa mengubah cara object digunakan.

```python
class RekeningBank:
    def __init__(self, nama_nasabah, nomor_rekening, saldo=0):
        self.nama_nasabah = nama_nasabah
        self.nomor_rekening = nomor_rekening
        self.__saldo = saldo

    def setor_dana(self, jumlah):
        if jumlah > 0:
            self.__saldo += jumlah

    def tarik_dana(self, jumlah):
        if 0 < jumlah <= self.__saldo:
            self.__saldo -= jumlah
            return True
        return False

    def cek_saldo(self):
        return self.__saldo
```

Pada contoh tersebut, saldo tidak diubah langsung dari luar object. Perubahan saldo harus melalui `setor_dana()` atau `tarik_dana()`.

## 6. Class method

Class method adalah method yang berhubungan dengan class, bukan hanya dengan satu instance. Class method menggunakan parameter pertama `cls`, yang merujuk pada class. Method ini ditandai dengan decorator `@classmethod`.

```python
class Mobil:
    jumlah_mobil = 0
    semua_mobil = []

    def __init__(self, merek, model, tahun):
        self.merek = merek
        self.model = model
        self.tahun = tahun
        Mobil.jumlah_mobil += 1
        Mobil.semua_mobil.append(self)

    @classmethod
    def total_mobil(cls):
        return cls.jumlah_mobil
```

Class method cocok digunakan untuk operasi yang membutuhkan informasi bersama milik class, misalnya menghitung jumlah seluruh object atau mencari object dengan nilai tertentu.

```python
mobil1 = Mobil("Toyota", "Avanza", 2022)
mobil2 = Mobil("Honda", "Civic", 2023)
print(Mobil.total_mobil())
```

## 7. Static method

Static method adalah method yang tidak bergantung pada instance maupun class. Static method tidak menerima parameter implicit `self` atau `cls` dan ditandai dengan decorator `@staticmethod`.

```python
class Mobil:
    @staticmethod
    def validasi_nomor_polisi(nomor):
        return len(nomor) >= 5

print(Mobil.validasi_nomor_polisi("L 1234 AB"))
```

Static method biasanya digunakan untuk fungsi utilitas yang masih berkaitan dengan konsep class, tetapi tidak membutuhkan data object atau data class.

## Inti materi

- Method dapat menerima positional, optional, keyword argument, `*args`, dan `**kwargs`.
- Visibility membantu membatasi akses terhadap property.
- Prefix `_` adalah konvensi untuk property internal atau protected.
- Prefix `__` memicu name mangling dan digunakan untuk property private.
- Encapsulation menyatukan data dan perilaku serta mengendalikan akses data.
- Class method menggunakan `cls` dan `@classmethod`.
- Static method tidak menggunakan `self` atau `cls` dan memakai `@staticmethod`.
