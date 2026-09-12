---
title: Chapter 3
layout: default
parent: Readings
printtitle: Modul 3 - Visibility Property, Encapsulation dan Validasi Data
nav_order: 3
---

# MODUL 3

## VISIBILITY PROPERTY, ENCAPSULATION, DAN VALIDASI DATA

Modul ini membahas cara mengendalikan akses terhadap attribute dan method pada class Python. Pembahasan meliputi public, protected, dan private property secara konseptual, name mangling, encapsulation, getter dan setter, decorator `@property`, serta validasi data melalui property.

---

## A. CAPAIAN PEMBELAJARAN

Setelah mempelajari modul ini, mahasiswa diharapkan mampu:

1. Menjelaskan konsep visibility pada property dan method Python.
2. Membedakan public, protected, dan private property secara konseptual.
3. Menjelaskan mekanisme name mangling pada attribute dengan dua underscore.
4. Menerapkan encapsulation untuk melindungi state internal object.
5. Membuat property dengan getter dan setter menggunakan decorator `@property`.
6. Melakukan validasi data ketika attribute dibaca atau diubah.

---

## B. PENDAHULUAN

Pada modul sebelumnya, class digunakan untuk menggabungkan data dan perilaku ke dalam object. Namun, tidak semua data seharusnya dapat dibaca atau diubah secara bebas dari luar class.

Sebagai contoh, saldo rekening tidak boleh diubah langsung menjadi nilai negatif. Nilai IPK juga harus berada pada rentang tertentu. Jika semua attribute dibuat terbuka, setiap bagian program dapat mengubah state object tanpa melalui aturan yang telah ditentukan.

Encapsulation digunakan untuk membungkus data dan method yang berkaitan, kemudian menyediakan interface yang terkontrol. Dengan demikian, object dapat menjaga konsistensi datanya sendiri.

Dalam Python, pengendalian akses tidak menggunakan keyword `public`, `protected`, dan `private` yang benar-benar memblokir akses seperti pada beberapa bahasa lain. Python menggunakan konvensi penamaan, name mangling, serta property untuk menyampaikan dan menerapkan aturan akses.

---

## C. VISIBILITY PROPERTY DAN METHOD

### 1. Public property

Public property ditulis tanpa underscore pada awal nama. Property atau method tersebut dianggap sebagai bagian dari interface resmi class dan boleh digunakan oleh kode di luar class.

```python
class Mahasiswa:
    def __init__(self, nama, angkatan):
        self.nama = nama
        self.angkatan = angkatan

    def tampilkan_identitas(self):
        return f"{self.nama} - {self.angkatan}"

mhs = Mahasiswa("Andi", 2025)
print(mhs.nama)
print(mhs.tampilkan_identitas())
```

{% include pyodide-exercise.html id="m3-public-property" title="Public property dan method" prompt="Buat class dengan public property dan public method, lalu gunakan object tersebut dari luar class." %}

Pada contoh tersebut, `nama`, `angkatan`, dan `tampilkan_identitas()` merupakan property dan method public. Kode di luar class dapat mengaksesnya secara langsung.

Public bukan berarti selalu tidak aman. Public berarti class memang menyediakan property atau method tersebut sebagai bagian dari cara penggunaan object.

### 2. Protected property secara konvensi

Protected property ditulis dengan satu underscore di awal nama, misalnya `_email` atau `_validasi_data`.

```python
class Mahasiswa:
    def __init__(self, nama, email):
        self.nama = nama
        self._email = email

    def _normalisasi_email(self):
        self._email = self._email.lower()
```

{% include pyodide-exercise.html id="m3-protected-definition" title="Protected property" prompt="Buat class yang memiliki property protected dan method internal untuk menormalisasi nilainya." %}

Satu underscore adalah tanda bahwa property atau method tersebut ditujukan untuk penggunaan internal class dan subclass. Python tetap mengizinkan kode luar mengakses `_email`, sehingga protected pada Python merupakan konvensi, bukan pembatas akses yang mutlak.

```python
mhs = Mahasiswa("Andi", "ANDI@EXAMPLE.COM")
print(mhs._email)
```

{% include pyodide-exercise.html id="m3-protected-access" title="Mengamati protected property" prompt="Buat object dari class yang memiliki protected property, lalu amati bahwa Python masih mengizinkan akses langsung." %}

Akses tersebut masih dapat berjalan, tetapi pengguna class sebaiknya menggunakan interface public yang disediakan oleh class. Dengan mematuhi konvensi ini, implementasi internal dapat diubah tanpa dianggap sebagai perubahan interface public.

### 3. Private property secara konvensi Python

Private property biasanya ditulis dengan dua underscore di awal nama, misalnya `__saldo` atau `__token`.

```python
class RekeningBank:
    def __init__(self, saldo):
        self.__saldo = saldo

    def cek_saldo(self):
        return self.__saldo

rekening = RekeningBank(1000000)
print(rekening.cek_saldo())
```

{% include pyodide-exercise.html id="m3-private-property" title="Private property" prompt="Buat class dengan private property dan method public untuk membaca nilainya tanpa mengakses private property secara langsung." %}

Kode di luar class tidak dapat mengakses attribute menggunakan nama awalnya.

```python
# Tidak digunakan sebagai akses normal dari luar class.
# print(rekening.__saldo)
```

{% include pyodide-exercise.html id="m3-private-access" title="Menguji akses private" prompt="Buat private property, lalu uji perbedaan akses melalui method public dan akses langsung dari luar class." %}

Pemanggilan langsung tersebut menghasilkan `AttributeError` karena Python melakukan name mangling terhadap nama `__saldo`.

### 4. Ringkasan visibility

| Jenis | Bentuk nama | Makna penggunaan |
|:--|:--|:--|
| Public | `nama` | Bagian dari interface yang dapat digunakan dari luar class |
| Protected | `_nama` | Internal class atau subclass berdasarkan konvensi |
| Private | `__nama` | Internal class dengan name mangling |

Perlu diperhatikan bahwa private pada Python bukan mekanisme keamanan atau enkripsi. Tujuan utamanya adalah mencegah akses tidak sengaja dan mengurangi benturan nama dalam class hierarchy.

---

## D. NAME MANGLING

### 1. Pengertian name mangling

Ketika Python menemukan nama yang diawali dua underscore dan tidak diakhiri dua underscore dalam definisi class, Python mengubah nama tersebut menjadi bentuk:

```text
_NamaClass__nama_attribute
```

Contohnya, `__saldo` di dalam class `RekeningBank` secara internal disimpan sebagai `_RekeningBank__saldo`.

```python
class RekeningBank:
    def __init__(self, saldo):
        self.__saldo = saldo

rekening = RekeningBank(500000)
print(rekening.__dict__)
```

{% include pyodide-exercise.html id="m3-name-mangling" title="Name mangling" prompt="Buat private property dan periksa __dict__ object untuk menemukan nama hasil name mangling." %}

Secara konseptual, hasilnya memiliki key yang menyerupai berikut:

```python
{'_RekeningBank__saldo': 500000}
```

Name mangling membantu mencegah subclass secara tidak sengaja menggunakan nama attribute internal yang sama. Name mangling bukan pengamanan mutlak karena nama hasil mangling masih dapat ditemukan jika seseorang sengaja memeriksa struktur object.

### 2. Name mangling pada inheritance

Name mangling berguna ketika parent class dan child class memiliki attribute internal dengan nama yang sama.

```python
class Akun:
    def __init__(self):
        self.__kode = "kode-akun"

    def tampilkan_kode(self):
        return self.__kode


class AkunKhusus(Akun):
    def __init__(self):
        super().__init__()
        self.__kode = "kode-khusus"

    def tampilkan_kode_khusus(self):
        return self.__kode

akun = AkunKhusus()
print(akun.tampilkan_kode())
print(akun.tampilkan_kode_khusus())
```

{% include pyodide-exercise.html id="m3-mangling-inheritance" title="Name mangling pada inheritance" prompt="Buat parent class dan child class dengan private property bernama sama, lalu amati bahwa keduanya disimpan terpisah." %}

`__kode` pada `Akun` dan `__kode` pada `AkunKhusus` tidak menjadi attribute yang sama. Python menyimpannya dengan nama mangling berdasarkan class yang mendefinisikannya.

### 3. Dunder method bukan private property

Nama seperti `__init__` dan `__str__` memiliki dua underscore di awal dan akhir. Nama tersebut disebut dunder method atau special method. Nama dengan dua underscore di awal dan dua underscore di akhir tidak diproses seperti private property biasa.

```python
class Buku:
    def __init__(self, judul):
        self.judul = judul

    def __str__(self):
        return self.judul
```

{% include pyodide-exercise.html id="m3-dunder-method" title="Dunder method" prompt="Buat class dengan __init__ dan __str__, lalu cetak object tersebut untuk mengamati protocol Python." %}

`__init__` dan `__str__` merupakan bagian dari protocol Python, bukan private method yang dibuat untuk menyembunyikan implementasi class.

---

## E. KONSEP ENCAPSULATION

Encapsulation adalah prinsip untuk menggabungkan data dan method yang bekerja pada data tersebut dalam satu class. Encapsulation juga mengatur bagaimana data dapat dibaca dan diubah dari luar object.

Tujuan encapsulation antara lain:

1. Melindungi state internal object.
2. Mencegah perubahan data yang tidak valid.
3. Menyediakan interface yang lebih mudah digunakan.
4. Menyembunyikan detail implementasi.
5. Mengurangi ketergantungan kode luar terhadap struktur internal class.

### 1. Contoh tanpa encapsulation

```python
class RekeningTanpaKontrol:
    def __init__(self, saldo):
        self.saldo = saldo

rekening = RekeningTanpaKontrol(1000000)
rekening.saldo = -500000
print(rekening.saldo)
```

{% include pyodide-exercise.html id="m3-without-encapsulation" title="Tanpa encapsulation" prompt="Buat class dengan saldo public, lalu tunjukkan bagaimana kode luar dapat memasukkan nilai yang tidak valid." %}

Kode luar dapat mengubah saldo menjadi nilai negatif tanpa validasi. State object menjadi tidak konsisten.

### 2. Contoh dengan encapsulation

```python
class RekeningBank:
    def __init__(self, saldo=0):
        self.__saldo = 0
        self.setor_dana(saldo)

    def setor_dana(self, jumlah):
        if jumlah <= 0:
            raise ValueError("Jumlah setor harus lebih besar dari nol.")
        self.__saldo += jumlah

    def tarik_dana(self, jumlah):
        if jumlah <= 0:
            raise ValueError("Jumlah tarik harus lebih besar dari nol.")
        if jumlah > self.__saldo:
            raise ValueError("Saldo tidak mencukupi.")
        self.__saldo -= jumlah

    def cek_saldo(self):
        return self.__saldo

rekening = RekeningBank(1000000)
rekening.setor_dana(250000)
rekening.tarik_dana(100000)
print(rekening.cek_saldo())
```

{% include pyodide-exercise.html id="m3-with-encapsulation" title="Dengan encapsulation" prompt="Buat class rekening dengan saldo private dan method yang menolak setor atau tarik dengan nilai tidak valid." %}

Saldo disimpan dalam `__saldo` dan hanya dapat berubah melalui method yang memeriksa aturan. Kode luar tidak perlu mengetahui cara saldo disimpan.

### 3. Keterbatasan getter dan setter eksplisit

Getter dan setter eksplisit adalah method seperti `get_saldo()` dan `set_saldo()`. Teknik ini dapat digunakan untuk mengontrol akses, tetapi interface menjadi lebih panjang dan caller harus menggunakan sintaks method.

```python
class ProdukLama:
    def __init__(self, harga):
        self._harga = harga

    def get_harga(self):
        return self._harga

    def set_harga(self, nilai):
        if nilai <= 0:
            raise ValueError("Harga harus lebih besar dari nol.")
        self._harga = nilai
```

{% include pyodide-exercise.html id="m3-explicit-getter-setter" title="Getter dan setter eksplisit" prompt="Buat getter dan setter eksplisit untuk sebuah property, lalu tambahkan validasi pada setter." %}

Python menyediakan `@property` agar akses tetap terlihat seperti akses attribute, tetapi logika getter dan setter tetap dapat dijalankan.

---

## F. PROPERTY DAN VALIDASI DATA

### 1. Property getter

Decorator `@property` mengubah method menjadi attribute yang dapat dibaca dengan notasi titik.

```python
class Suhu:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

suhu = Suhu(25)
print(suhu.celsius)
```

{% include pyodide-exercise.html id="m3-property-getter" title="Property getter" prompt="Buat class dengan @property getter sehingga nilai internal dapat dibaca menggunakan notasi titik." %}

Caller menggunakan `suhu.celsius`, tetapi Python sebenarnya menjalankan method `celsius()`.

### 2. Property setter

Decorator `@nama_property.setter` digunakan untuk menjalankan validasi ketika nilai property diubah.

```python
class Suhu:
    ABSOLUTE_ZERO = -273.15

    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, nilai):
        if nilai < self.ABSOLUTE_ZERO:
            raise ValueError("Suhu tidak boleh di bawah nol absolut.")
        self._celsius = float(nilai)

suhu = Suhu(25)
suhu.celsius = 30
print(suhu.celsius)
```

{% include pyodide-exercise.html id="m3-property-setter" title="Property setter" prompt="Buat property dengan getter dan setter, lalu validasi nilai yang diberikan melalui assignment." %}

Assignment `self.celsius = celsius` di dalam `__init__()` juga melewati setter. Dengan demikian, nilai awal dan nilai yang diberikan setelah object dibuat menggunakan aturan validasi yang sama.

### 3. Property read-only

Property yang hanya memiliki getter dapat digunakan untuk nilai turunan atau nilai yang tidak boleh diubah langsung.

```python
class PersegiPanjang:
    def __init__(self, panjang, lebar):
        self.panjang = panjang
        self.lebar = lebar

    @property
    def luas(self):
        return self.panjang * self.lebar

kotak = PersegiPanjang(10, 5)
print(kotak.luas)
```

{% include pyodide-exercise.html id="m3-read-only-property" title="Property read-only" prompt="Buat property read-only yang menghitung nilai turunan dari dua atau lebih attribute object." %}

`luas` dihitung dari `panjang` dan `lebar`. Tidak perlu menyediakan setter untuk `luas` karena nilainya harus mengikuti dua attribute tersebut.

### 4. Validasi beberapa jenis data

Property dapat digunakan untuk memeriksa tipe, rentang, format, dan aturan bisnis.

```python
class Mahasiswa:
    def __init__(self, nama, ipk):
        self.nama = nama
        self.ipk = ipk

    @property
    def ipk(self):
        return self._ipk

    @ipk.setter
    def ipk(self, nilai):
        if not isinstance(nilai, (int, float)):
            raise TypeError("IPK harus berupa angka.")
        if not 0 <= nilai <= 4:
            raise ValueError("IPK harus berada pada rentang 0 sampai 4.")
        self._ipk = float(nilai)

mhs = Mahasiswa("Andi", 3.75)
print(mhs.ipk)
```

{% include pyodide-exercise.html id="m3-type-range-validation" title="Validasi tipe dan rentang" prompt="Buat property IPK dengan validasi tipe data dan rentang nilai 0 sampai 4." %}

Validasi tersebut memastikan bahwa object tidak dapat menyimpan IPK dengan tipe atau rentang yang salah.

### 5. Property harga dengan validasi

```python
class Produk:
    def __init__(self, nama, harga, stok):
        self.nama = nama
        self.harga = harga
        self.stok = stok

    @property
    def harga(self):
        return self._harga

    @harga.setter
    def harga(self, nilai):
        if not isinstance(nilai, (int, float)):
            raise TypeError("Harga harus berupa angka.")
        if nilai <= 0:
            raise ValueError("Harga harus lebih besar dari nol.")
        self._harga = float(nilai)

    @property
    def stok(self):
        return self._stok

    @stok.setter
    def stok(self, nilai):
        if not isinstance(nilai, int) or nilai < 0:
            raise ValueError("Stok harus berupa bilangan bulat tidak negatif.")
        self._stok = nilai

    @property
    def total_nilai(self):
        return self.harga * self.stok

produk = Produk("Keyboard", 250000, 4)
print(produk.total_nilai)
```

{% include pyodide-exercise.html id="m3-product-validation" title="Validasi property produk" prompt="Buat class Produk dengan validasi harga dan stok, lalu hitung total nilai stok sebagai property read-only." %}

Pada contoh tersebut, `harga` dan `stok` memiliki setter untuk validasi. `total_nilai` merupakan property read-only yang dihitung dari dua property lain.

