---
title: Chapter 7
layout: default
parent: Readings
printtitle: Modul 7 - Polymorphism and Class Relationships
nav_order: 7
---

# MODUL 7

## POLYMORPHISM AND CLASS RELATIONSHIPS

Pada [Chapter 5]({{ '/readings-chapter5/' | relative_url }}), kita membuat hierarki class dengan inheritance dan overriding. Pada [Chapter 6]({{ '/readings-chapter6/' | relative_url }}), kita membahas abstract class, data class, referensi object, dan duck typing. Modul ini menghubungkan konsep-konsep tersebut untuk menjawab dua pertanyaan: **bagaimana satu kode dapat bekerja dengan beragam object**, dan **bagaimana object-object tersebut sebaiknya dihubungkan**?

Contoh dan latihan menggunakan sistem akademik, kelompok praktikum, penilaian, serta pengumuman kampus. Seluruh contoh dibuat khusus untuk modul ini. Tidak diperlukan library tambahan di luar standard library Python.

**Cara menggunakan latihan:** lengkapi bagian `# TODO`, lalu gunakan **Run** untuk melihat output atau **Run Tests** untuk membandingkannya dengan output yang diharapkan. Setiap latihan memiliki satu skenario uji gabungan dengan beberapa pemeriksaan. Program utama sudah disediakan dan tidak memerlukan `input()`. Kerangka awal belum diharapkan lulus sebelum TODO selesai. Baca [Panduan Editor Python]({{ '/assignment/panduan-editor/' | relative_url }}) jika baru menggunakan editor.

---

## A. CAPAIAN PEMBELAJARAN

Setelah mempelajari modul ini, mahasiswa diharapkan mampu:

1. Menjelaskan polymorphism sebagai penggunaan satu antarmuka untuk object dengan implementasi berbeda.
2. Menggunakan overriding dan dynamic dispatch untuk memproses kumpulan object tanpa percabangan berdasarkan setiap class.
3. Menerapkan duck typing tanpa mewajibkan inheritance, serta menjaga kesesuaian parameter dan nilai kembalian.
4. Membedakan overriding, penulisan method bernama sama berulang, dan operator overloading sederhana.
5. Membedakan inheritance, association, dependency, aggregation, dan composition berdasarkan peran serta kepemilikan object.
6. Menjelaskan perbedaan kepemilikan dalam desain dengan masa hidup object pada Python.
7. Menerapkan delegation agar perilaku dapat diganti melalui object kolaborator.
8. Memilih inheritance atau composition dengan mempertimbangkan kontrak perilaku dan kemudahan perubahan.
9. Menjelaskan gagasan dasar Liskov Substitution Principle dan menguji implementasi terhadap kontrak yang sama.

### Peta belajar

| Bagian | Pertanyaan utama                                                              |
| :----- | :---------------------------------------------------------------------------- |
| B-C    | Mengapa pemanggilan yang sama dapat menjalankan implementasi berbeda?         |
| D-E    | Bagaimana polymorphism bekerja tanpa parent class dan melalui operasi bawaan? |
| F      | Apa kontrak yang harus dipertahankan oleh implementasi pengganti?             |
| G-J    | Apa perbedaan hubungan antarkelas dan kepemilikan bagian?                     |
| K-L    | Bagaimana mengganti perilaku dan memilih desain yang tepat?                   |
| M      | Bagaimana konsep-konsep tersebut bekerja bersama dalam satu sistem?           |

---

## B. PENDAHULUAN: SATU PEMANGGILAN, BANYAK IMPLEMENTASI

Bagian administrasi kampus mencetak menu untuk setiap pengguna. Menu dosen berbeda dari menu mahasiswa. Implementasi awal mungkin berupa percabangan berikut.

```python
def buat_menu_lama(jenis):
    if jenis == "dosen":
        return "Input nilai"
    if jenis == "mahasiswa":
        return "Lihat KHS"
    return "Jenis pengguna belum didukung"


print(buat_menu_lama("dosen"))
print(buat_menu_lama("mahasiswa"))
```

Output:

```text
Input nilai
Lihat KHS
```

Ketika jenis pengguna bertambah, function tersebut harus mengenali setiap jenis baru. Pengetahuan tentang perilaku semua pengguna terkumpul di satu tempat.

Dengan polymorphism, setiap object menyediakan perilakunya melalui method yang sama.

```python
class Dosen:
    def menu(self):
        return "Input nilai"


class Mahasiswa:
    def menu(self):
        return "Lihat KHS"


def tampilkan_menu(pengguna):
    print(pengguna.menu())


for pengguna in [Dosen(), Mahasiswa()]:
    tampilkan_menu(pengguna)
```

Output tetap sama. Function `tampilkan_menu()` cukup mengetahui bahwa object menyediakan `menu()` yang mengembalikan teks. Ia tidak perlu mengetahui seluruh jenis pengguna.

Polymorphism bukan sekadar dua method kebetulan mempunyai nama sama. Object-object itu harus dapat dipakai melalui **kontrak pemanggilan yang sesuai**: method tersedia, parameter yang dibutuhkan dapat diterima, dan hasilnya dapat digunakan oleh pemanggil.

---

## C. POLYMORPHISM MELALUI INHERITANCE

### 1. Overriding dan dynamic dispatch

**Overriding** adalah penulisan implementasi method di child class untuk menggantikan implementasi yang diwarisi. **Dynamic dispatch** berarti pemilihan implementasi terjadi saat program berjalan berdasarkan object yang menerima pemanggilan.

```python
from abc import ABC, abstractmethod


class Pengguna(ABC):
    def __init__(self, nama):
        self.nama = nama

    @abstractmethod
    def menu(self):
        pass

    def kartu(self):
        return f"{self.nama}: {self.menu()}"


class Dosen(Pengguna):
    def menu(self):
        return "Input nilai"


class Mahasiswa(Pengguna):
    def menu(self):
        return "Lihat KHS"


pengguna_kampus = [Dosen("Rina"), Mahasiswa("Andi")]
for pengguna in pengguna_kampus:
    print(pengguna.kartu())
```

Output:

```text
Rina: Input nilai
Andi: Lihat KHS
```

Urutan pemanggilan untuk object mahasiswa:

```text
pengguna.kartu()
    -> Pengguna.kartu(self)
        -> self.menu()
            -> Mahasiswa.menu(self)
```

Walaupun `kartu()` ditulis di parent class, `self` tetap menunjuk pada object mahasiswa. Karena itu `self.menu()` menggunakan implementasi `Mahasiswa.menu()`.

Dalam hierarki yang dibahas di sini, pencarian method mengikuti class object dan parent class berdasarkan MRO yang telah dipelajari pada Chapter 5. Tidak diperlukan kata kunci `virtual` untuk mengaktifkan perilaku ini di Python.

### 2. Memproses koleksi object

Function pemroses dapat menggunakan antarmuka parent class.

```python
def cetak_kartu(daftar_pengguna: list[Pengguna]) -> None:
    for pengguna in daftar_pengguna:
        print(pengguna.kartu())


class Tendik(Pengguna):
    def menu(self):
        return "Kelola surat"


cetak_kartu([Dosen("Rina"), Mahasiswa("Andi"), Tendik("Budi")])
```

Output:

```text
Rina: Input nilai
Andi: Lihat KHS
Budi: Kelola surat
```

Penambahan `Tendik` tidak memerlukan perubahan pada `cetak_kartu()`. Prinsip ini mendukung **open/closed principle**: bagian pemroses dapat menerima implementasi baru melalui kontrak yang sudah disepakati. Ini bukan berarti kode tidak boleh pernah diubah; bila kebutuhan atau kontraknya berubah, desainnya tetap perlu ditinjau.

### 3. Latihan: rekap honor

`Pegawai` menyediakan kontrak `hitung_honor()` yang mengembalikan bilangan bulat rupiah. Lengkapi dua child class dan function rekap. Pemroses harus memanggil method yang sama, tanpa percabangan berdasarkan nama atau jenis class.

| Class              | Aturan                                                      |
| :----------------- | :---------------------------------------------------------- |
| `AsistenPraktikum` | `jumlah_pertemuan * 75000`                                  |
| `Tutor`            | `jumlah_jam * 50000`                                        |
| `total_honor()`    | Jumlah honor seluruh object; daftar kosong menghasilkan `0` |

Jumlah pertemuan dan jam diasumsikan integer tidak negatif. Validasi input di luar rentang tersebut berada di luar cakupan latihan ini.

{% capture m7_honor %}from abc import ABC, abstractmethod

class Pegawai(ABC):
@abstractmethod
def hitung_honor(self):
pass

class AsistenPraktikum(Pegawai):
def **init**(self, jumlah_pertemuan):
self.jumlah_pertemuan = jumlah_pertemuan

    def hitung_honor(self):
        # TODO: kembalikan jumlah_pertemuan dikali 75000
        pass

class Tutor(Pegawai):
def **init**(self, jumlah_jam):
self.jumlah_jam = jumlah_jam

    def hitung_honor(self):
        # TODO: kembalikan jumlah_jam dikali 50000
        pass

def total_honor(daftar_pegawai): # TODO: jumlahkan hitung_honor() dari setiap pegawai
pass

# Program utama: jangan diubah

pegawai = [AsistenPraktikum(4), Tutor(3), AsistenPraktikum(0)]
for orang in pegawai:
print(orang.hitung_honor())
print("Total:", total_honor(pegawai))
print("Kosong:", total_honor([]))
{% endcapture %}
{% capture m7_honor_tests %}
@@OUTPUT@@
300000
150000
0
Total: 450000
Kosong: 0
{% endcapture %}
{% include pyodide-exercise.html id="m7-honor" title="Latihan 1: rekap honor polymorphic" prompt="Lengkapi hitung_honor() dan total_honor(). Gunakan satu kontrak pemanggilan untuk kedua jenis pegawai." starter=m7_honor tests=m7_honor_tests %}

---

## D. DUCK TYPING: POLYMORPHISM TANPA PARENT BERSAMA

### 1. Bergantung pada perilaku yang dibutuhkan

Contoh pada bagian B bekerja meskipun `Dosen` dan `Mahasiswa` tidak mewarisi parent buatan yang sama. Python dapat langsung memanggil method yang disediakan object. Pendekatan ini disebut **duck typing**.

Misalnya, sistem pengumuman membutuhkan object dengan method `kirim(pesan)` yang mengembalikan teks hasil pengiriman. Satu implementasi memformat pesan sebagai email, implementasi lain sebagai tampilan layar. Pada contoh ini pengiriman hanya disimulasikan; tidak ada koneksi email atau jaringan.

### 2. Nama yang sama belum menjamin kompatibel

Pertimbangkan kontrak `kirim(pesan) -> str` berikut.

| Implementasi                                   | Sesuai kontrak?         | Alasan                                             |
| :--------------------------------------------- | :---------------------- | :------------------------------------------------- |
| `kirim(self, pesan)` mengembalikan teks        | Ya                      | Parameter dan hasil sesuai kebutuhan               |
| `kirim(self, pesan, penerima)` tanpa default   | Tidak                   | Pemanggil tidak menyediakan `penerima`             |
| `kirim(self, pesan)` hanya melakukan `print()` | Tidak untuk kontrak ini | Hasilnya `None`, padahal pemanggil memerlukan teks |
| Object tidak memiliki `kirim()`                | Tidak                   | Pemanggilan menghasilkan `AttributeError`          |

Method dengan parameter tambahan **opsional** masih dapat menerima pemanggilan lama. Yang diperiksa adalah kompatibilitas dengan kebutuhan pemanggil, bukan kewajiban menulis signature yang selalu identik.

Jika implementasi yang dikembangkan sendiri tidak memenuhi kontrak, perbaiki implementasi tersebut. Jangan menangkap semua exception lalu mengabaikannya karena hal itu dapat menyembunyikan bug di dalam method.

### 3. Hubungan dengan `Protocol`

Chapter 6 mengenalkan `typing.Protocol`. Protocol dapat mendokumentasikan kontrak duck typing agar alat pemeriksa tipe dapat menilai kesesuaiannya.

```python
from typing import Protocol


class KanalPesan(Protocol):
    def kirim(self, pesan: str) -> str:
        ...


class KanalLayar:
    def kirim(self, pesan: str) -> str:
        return f"Layar: {pesan}"


def buat_pengumuman(kanal: KanalPesan, pesan: str) -> str:
    return kanal.kirim(pesan)


print(buat_pengumuman(KanalLayar(), "Praktikum dimulai"))
```

Output:

```text
Layar: Praktikum dimulai
```

`KanalLayar` tidak perlu mewarisi `KanalPesan`. Type hints tidak memvalidasi tipe secara otomatis saat runtime. Bahkan pemeriksaan `isinstance()` terhadap protocol yang diberi `@runtime_checkable` tidak membuktikan kesesuaian signature, tipe hasil, atau aturan perilakunya. Kontrak tetap perlu diuji.

### 4. Latihan: dua kanal pengumuman

Lengkapi dua implementasi dan function pemroses tanpa menambahkan parent class bersama. `siarkan()` mengembalikan list hasil sesuai urutan kanal, termasuk ketika pesannya kosong.

{% capture m7_duck %}class KanalEmail:
def kirim(self, pesan): # TODO: kembalikan "Email: <pesan>"
pass

class KanalLayar:
def kirim(self, pesan): # TODO: kembalikan "Layar: <pesan>"
pass

def siarkan(daftar_kanal, pesan): # TODO: kembalikan list hasil kirim(pesan) untuk seluruh kanal
pass

# Program utama: jangan diubah

kanal = [KanalEmail(), KanalLayar()]
for hasil in siarkan(kanal, "Kumpulkan latihan"):
print(hasil)
print(siarkan([], "Tes"))
print(KanalLayar().kirim(""))
{% endcapture %}
{% capture m7_duck_tests %}
@@OUTPUT@@
Email: Kumpulkan latihan
Layar: Kumpulkan latihan
[]
Layar:
{% endcapture %}
{% include pyodide-exercise.html id="m7-duck" title="Latihan 2: pengumuman tanpa inheritance" prompt="Terapkan duck typing. siarkan() cukup memanggil kirim(pesan), lalu mengumpulkan nilai kembaliannya." starter=m7_duck tests=m7_duck_tests %}

---

## E. OVERRIDING, OVERLOADING, DAN OPERASI BAWAAN

### 1. Menulis dua method bernama sama

Python tidak memilih method biasa berdasarkan jumlah parameter hanya karena kita menulis beberapa `def` dengan nama yang sama.

```python
class Pencetak:
    def cetak(self, teks):
        return teks

    def cetak(self, teks, jumlah):
        return teks * jumlah


pencetak = Pencetak()
print(pencetak.cetak("A", 3))
try:
    pencetak.cetak("A")
except TypeError:
    print("Definisi pertama sudah digantikan")
```

Output:

```text
AAA
Definisi pertama sudah digantikan
```

Definisi terakhir menggantikan nama sebelumnya di class tersebut. Untuk jumlah argumen yang fleksibel, gunakan default parameter atau rancangan method yang sesuai. Contoh `def cetak(self, teks, jumlah=1)` dapat menerima satu atau dua argumen. Ini berbeda dari overriding, yang melibatkan method pada parent dan child class.

### 2. Operator overloading melalui dunder method

Operasi bawaan juga dapat bekerja dengan object buatan. Contohnya, `len(object)` menggunakan kontrak `__len__()`, sedangkan `str(object)` menggunakan `__str__()`.

| Operasi                   | Method terkait                           | Kontrak sederhana                              |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| `len(obj)`                | `__len__()`                              | Mengembalikan integer tidak negatif            |
| `str(obj)` / `print(obj)` | `__str__()`                              | Mengembalikan string                           |
| `a + b`                   | `__add__()` dan kemungkinan `__radd__()` | Makna penjumlahan disepakati oleh tipe operand |

Contoh penjumlahan durasi reservasi:

```python
class Durasi:
    def __init__(self, menit):
        self.menit = menit

    def __add__(self, other):
        if not isinstance(other, Durasi):
            return NotImplemented
        return Durasi(self.menit + other.menit)

    def __str__(self):
        return f"{self.menit} menit"


a = Durasi(30)
b = Durasi(45)
print(a + b)
print(a)
```

Output:

```text
75 menit
30 menit
```

Operasi tersebut membuat object baru. `NotImplemented` adalah nilai khusus yang memberi kesempatan pada mekanisme operator Python untuk mencoba implementasi lain; ini berbeda dari exception `NotImplementedError`. Jika kedua operand tidak mendukung operasi itu, Python menghasilkan `TypeError`.

Pemeriksaan `isinstance()` di sini digunakan untuk kompatibilitas operand. Pemeriksaan tipe tetap berguna untuk validasi; yang perlu dihindari adalah memindahkan seluruh perilaku setiap jenis object ke percabangan pemroses.

### 3. Latihan: daftar peserta sebagai object

Lengkapi `__len__()` dan `__str__()` agar object daftar peserta dapat dipakai melalui operasi bawaan Python. `__str__()` harus menghasilkan `<nama kelas>: <jumlah> peserta`.

{% capture m7_dunder %}class DaftarPeserta:
def **init**(self, kelas, nama_peserta):
self.kelas = kelas
self.nama_peserta = list(nama_peserta)

    def __len__(self):
        # TODO: kembalikan jumlah nama peserta
        pass

    def __str__(self):
        # TODO: kembalikan teks dengan format yang ditentukan; gunakan len(self)
        pass

# Program utama: jangan diubah

kelas_a = DaftarPeserta("2025A", ["Andi", "Sari"])
kelas_b = DaftarPeserta("2025B", [])
for daftar in [kelas_a, kelas_b]:
print(len(daftar))
print(daftar)
print(len("OOP"))
print(len([kelas_a, kelas_b]))
{% endcapture %}
{% capture m7_dunder_tests %}
@@OUTPUT@@
2
2025A: 2 peserta
0
2025B: 0 peserta
3
2
{% endcapture %}
{% include pyodide-exercise.html id="m7-dunder" title="Latihan 3: len() dan str() pada object buatan" prompt="Lengkapi dua dunder method agar object memenuhi kontrak len() dan str(). Perhatikan daftar peserta kosong." starter=m7_dunder tests=m7_dunder_tests %}

---

## F. KONTRAK PERILAKU DAN SUBSTITUSI

### 1. Lebih dari kesamaan nama method

Misalkan `hitung_honor()` dijanjikan mengembalikan integer rupiah tidak negatif dan tidak mengubah jumlah jam kerja. Implementasi pengganti harus menjaga janji tersebut.

| Perubahan implementasi                                             | Dampak pada pemanggil                           |
| :----------------------------------------------------------------- | :---------------------------------------------- |
| Menggunakan rumus honor berbeda, tetap menghasilkan integer rupiah | Sesuai kontrak                                  |
| Mengembalikan teks `"Rp150000"`                                    | Penjumlahan honor dapat gagal                   |
| Menambah parameter wajib `bulan`                                   | Pemanggilan tanpa parameter tidak lagi berlaku  |
| Mengurangi jam kerja setiap kali dipanggil                         | Rekap berulang dapat menghasilkan nilai berbeda |
| Menolak nilai `0` yang sebelumnya diperbolehkan                    | Input valid pada kontrak lama menjadi ditolak   |

Gagasan **Liskov Substitution Principle (LSP)** adalah object turunan harus dapat menggantikan object induk dalam konteks kontrak yang dijanjikan tanpa merusak kebenaran program. Child class boleh menambahkan kemampuan, tetapi tidak boleh merusak asumsi yang sah dari pemanggil parent.

Karena itu, pertanyaan desain tidak berhenti pada "apakah kalimat is-a terdengar masuk akal?". Kita juga perlu bertanya "apakah object ini dapat menjalankan seluruh operasi yang dijanjikan parent?". Class `DokumenBacaSaja` yang menolak `simpan()` bermasalah bila parent `Dokumen` menjanjikan semua dokumen dapat disimpan. Kontrak baca dan tulis dapat dipisahkan agar pengguna masing-masing kemampuan memperoleh jaminan yang tepat.

### 2. Kontrak dapat diperiksa dengan pengujian bersama

```python
def periksa_kontrak_honor(pegawai):
    pertama = pegawai.hitung_honor()
    kedua = pegawai.hitung_honor()
    assert type(pertama) is int
    assert pertama >= 0
    assert pertama == kedua
```

Kode ini adalah pemeriksaan dasar, bukan pembuktian lengkap LSP. Kita masih perlu menguji rumus, input batas, dan state yang boleh berubah. Pemilihan `type(...) is int` di contoh ini sengaja menuntut integer persis sesuai kontrak, termasuk tidak menerima `bool` sebagai nilai honor.

`ABC` dapat mencegah pembuatan object yang abstract method-nya belum diimplementasikan. Namun `ABC` tidak otomatis memeriksa kebenaran rumus, kompatibilitas signature override, atau seluruh aturan perilaku. Pengujian dan review tetap diperlukan.

---

## G. PETA HUBUNGAN ANTARKELAS

Polymorphism menjelaskan bagaimana object dipakai melalui antarmuka yang sama. Class relationships menjelaskan bagaimana object dihubungkan dalam suatu desain. Keduanya dapat digunakan bersama.

| Hubungan                     | Pertanyaan                                                                 | Contoh dalam kampus                        |
| :--------------------------- | :------------------------------------------------------------------------- | :----------------------------------------- |
| Inheritance / generalization | Apakah A merupakan jenis B dan memenuhi kontraknya?                        | `Dosen` merupakan `Pengguna`               |
| Association                  | Apakah object A berhubungan dengan object B?                               | Dosen membimbing mahasiswa                 |
| Dependency / uses-a          | Apakah operasi A membutuhkan layanan B?                                    | Function pembuat laporan memakai formatter |
| Aggregation                  | Apakah A mengelompokkan bagian yang tetap memiliki identitas mandiri?      | Kelompok praktikum berisi mahasiswa        |
| Composition                  | Apakah A memiliki bagian yang dikelola sebagai bagian khusus dari dirinya? | Laporan memiliki baris laporan miliknya    |

Association adalah hubungan umum. Aggregation dan composition merupakan pemodelan hubungan whole-part yang lebih khusus. Dependency dapat muncul melalui pemakaian sementara, misalnya parameter method; menyimpan parameter sebagai attribute menunjukkan hubungan yang lebih menetap. Satu sistem bisa memuat beberapa hubungan sekaligus.

### Membaca diagram sederhana

Berikut penanda UML yang digunakan pada modul ini. Teks di dalam kurung menjelaskan ujung pemilik, bukan sintaks Python.

```text
Dosen ------------|> Pengguna          inheritance; segitiga ke parent
Dosen ------------- Mahasiswa          association
Pelapor - - - - - > Formatter          dependency
Kelompok o--------- Mahasiswa          aggregation; diamond kosong di whole
Laporan  *--------- BarisLaporan        composition; diamond penuh di whole
```

Multiplicity menjelaskan jumlah object pada suatu hubungan, misalnya satu kelompok memiliki `0..*` anggota. Multiplicity adalah aturan domain yang harus dipenuhi oleh implementasi. Diagram saja tidak membatasi panjang list di Python.

---

## H. ASSOCIATION DAN DEPENDENCY

### 1. Object saling berinteraksi

Dosen dan mahasiswa dapat dibuat secara terpisah. Dosen memberi umpan balik kepada mahasiswa, tetapi bukan berarti mahasiswa merupakan bagian yang dimiliki dan dihancurkan oleh dosen.

```python
class Mahasiswa:
    def __init__(self, nama):
        self.nama = nama


class Dosen:
    def __init__(self, nama):
        self.nama = nama

    def beri_umpan_balik(self, mahasiswa, pesan):
        return f"{self.nama} -> {mahasiswa.nama}: {pesan}"


dosen = Dosen("Rina")
mahasiswa = Mahasiswa("Andi")
print(dosen.beri_umpan_balik(mahasiswa, "Perjelas kontrak method"))
```

Output:

```text
Rina -> Andi: Perjelas kontrak method
```

Di model domain, dosen dan mahasiswa berasosiasi melalui kegiatan pemberian umpan balik. Pada implementasi ini, method dosen hanya memakai mahasiswa sebagai parameter; tidak ada daftar mahasiswa yang disimpan. Ini juga menunjukkan dependency sementara.

Jika sistem harus mencatat mahasiswa bimbingan, dosen dapat menyimpan referensi mahasiswa pada attribute. Pilihan menyimpan referensi ditentukan oleh kebutuhan pencatatan, bukan semata-mata karena dua class pernah berinteraksi.

### 2. Latihan: layanan konsultasi

Lengkapi `konsultasi()` tanpa menyimpan mahasiswa sebagai bagian milik dosen atau mengubah nama mahasiswa. Satu mahasiswa dapat berkonsultasi kepada dua dosen.

{% capture m7_association %}class Mahasiswa:
def **init**(self, nama):
self.nama = nama

class Dosen:
def **init**(self, nama):
self.nama = nama

    def konsultasi(self, mahasiswa, topik):
        # TODO: kembalikan "<mahasiswa> berkonsultasi <topik> kepada <dosen>"
        pass

# Program utama: jangan diubah

andi = Mahasiswa("Andi")
rina = Dosen("Rina")
budi = Dosen("Budi")
print(rina.konsultasi(andi, "polymorphism"))
print(budi.konsultasi(andi, "composition"))
print("Nama tetap:", andi.nama)
{% endcapture %}
{% capture m7_association_tests %}
@@OUTPUT@@
Andi berkonsultasi polymorphism kepada Rina
Andi berkonsultasi composition kepada Budi
Nama tetap: Andi
{% endcapture %}
{% include pyodide-exercise.html id="m7-association" title="Latihan 4: association melalui konsultasi" prompt="Gunakan object mahasiswa sebagai kolaborator pada method dosen. Pertahankan identitas dan data mahasiswa." starter=m7_association tests=m7_association_tests %}

---

## I. AGGREGATION: MENGELOMPOKKAN OBJECT MANDIRI

### 1. Kelompok berisi referensi mahasiswa

Dalam model praktikum ini, mahasiswa sudah terdaftar sebelum kelompok dibentuk. Kelompok menyimpan referensi mereka. Mengeluarkan mahasiswa dari kelompok tidak menghapus mahasiswa dari sistem akademik.

```python
class Mahasiswa:
    def __init__(self, nim, nama):
        self.nim = nim
        self.nama = nama


class Kelompok:
    def __init__(self, nama, anggota):
        self.nama = nama
        self.anggota = list(anggota)


andi = Mahasiswa("25051204001", "Andi")
daftar_awal = [andi]
kelompok = Kelompok("Tim 1", daftar_awal)
daftar_awal.clear()
print(len(kelompok.anggota))
print(kelompok.anggota[0] is andi)
andi.nama = "Andi Putra"
print(kelompok.anggota[0].nama)
```

Output:

```text
1
True
Andi Putra
```

`list(anggota)` menyalin container list agar perubahan keanggotaan pada list asal tidak langsung mengubah kelompok. Object mahasiswa di dalamnya tetap sama. Ini adalah **shallow copy**, menghubungkan kembali pembahasan aliasing pada Chapter 6.

Aggregation menyatakan bahwa bagian memiliki identitas mandiri di dalam model. Apakah seorang mahasiswa boleh menjadi anggota beberapa kelompok pada saat yang sama merupakan aturan tambahan. Untuk tugas yang mensyaratkan satu kelompok per mahasiswa, sistem harus memvalidasi aturan itu secara terpisah.

### 2. Latihan: menambah dan melepas anggota

Lengkapi `tambah()` dan `keluarkan()` dengan ketentuan:

1. `tambah(mahasiswa)` menerima object yang sudah ada; mengembalikan `True` jika berhasil.
2. Jika NIM yang sama sudah ada, tolak penambahan dan kembalikan `False`.
3. `keluarkan(nim)` menghapus keanggotaan dengan NIM tersebut dan mengembalikan `True`; jika tidak ditemukan, kembalikan `False`.
4. Mahasiswa yang dilepas tetap dapat digunakan melalui referensi asalnya.

{% capture m7_aggregation %}class Mahasiswa:
def **init**(self, nim, nama):
self.nim = nim
self.nama = nama

class Kelompok:
def **init**(self, nama):
self.nama = nama
self.anggota = []

    def tambah(self, mahasiswa):
        # TODO: tolak NIM duplikat; jika diterima, simpan object yang diberikan
        pass

    def keluarkan(self, nim):
        # TODO: hapus keanggotaan yang cocok; kembalikan status keberhasilan
        pass

# Program utama: jangan diubah

andi = Mahasiswa("25051204001", "Andi")
sari = Mahasiswa("25051204002", "Sari")
duplikat_andi = Mahasiswa("25051204001", "Nama lain")
kelompok = Kelompok("Tim 1")
print(kelompok.tambah(andi))
print(kelompok.tambah(sari))
print(kelompok.tambah(duplikat_andi))
print(kelompok.anggota[0] is andi)
print(kelompok.keluarkan(andi.nim))
print(kelompok.keluarkan(andi.nim))
print([m.nama for m in kelompok.anggota])
print("Tetap ada:", andi.nama)
{% endcapture %}
{% capture m7_aggregation_tests %}
@@OUTPUT@@
True
True
False
True
True
False
['Sari']
Tetap ada: Andi
{% endcapture %}
{% include pyodide-exercise.html id="m7-aggregation" title="Latihan 5: keanggotaan kelompok" prompt="Kelompok menyimpan referensi mahasiswa yang sudah ada. Kelola keanggotaan berdasarkan NIM dan jangan membuat salinan mahasiswa." starter=m7_aggregation tests=m7_aggregation_tests %}

---

## J. COMPOSITION: BAGIAN YANG DIKELOLA OLEH PEMILIK

### 1. Laporan membuat baris laporannya

Dalam model berikut, `Laporan` membuat dan mengelola object `BarisLaporan`. Sebuah baris mewakili entri khusus pada laporan tersebut, bukan mahasiswa terdaftar yang hidup mandiri di sistem akademik.

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class BarisLaporan:
    label: str
    nilai: int


class Laporan:
    def __init__(self, judul):
        self.judul = judul
        self._baris = []

    def tambah(self, label, nilai):
        self._baris.append(BarisLaporan(label, nilai))

    def total(self):
        return sum(baris.nilai for baris in self._baris)


laporan = Laporan("Nilai latihan")
laporan.tambah("Encapsulation", 80)
laporan.tambah("Polymorphism", 90)
print(laporan.total())
```

Output:

```text
170
```

`tambah()` menerima data dan membuat bagian baru. API ini mendukung maksud kepemilikan: laporan bertanggung jawab membentuk barisnya. Membuat object di constructor atau method adalah petunjuk implementasi, tetapi **bukan definisi tunggal composition**. Yang menentukan adalah keputusan desain tentang kepemilikan, penggunaan bersama, dan tanggung jawab pengelolaan bagian.

### 2. Masa hidup konseptual dan referensi Python

Istilah "bagian mengikuti masa hidup pemilik" menjelaskan model kepemilikan. Python tidak memiliki kata kunci khusus yang memaksakan association, aggregation, atau composition.

```python
class Bagian:
    def __init__(self, nama):
        self.nama = nama


class Pemilik:
    def __init__(self):
        self.bagian = Bagian("Catatan internal")


pemilik = Pemilik()
referensi_lain = pemilik.bagian
del pemilik
print(referensi_lain.nama)
```

Output:

```text
Catatan internal
```

`del pemilik` melepaskan binding nama `pemilik`; perintah itu tidak otomatis memusnahkan semua object yang pernah dirujuknya. Pada contoh ini object bagian masih dapat dijangkau melalui `referensi_lain`. Jangan memakai waktu pemanggilan destructor atau garbage collector sebagai dasar untuk membedakan aggregation dan composition.

Jika bagian harus dikelola secara eksklusif dalam model, rancang API yang membatasi pembagian referensi dan menjelaskan operasinya. Awalan `_` merupakan konvensi internal, bukan larangan akses. Untuk resource seperti file, gunakan pengelolaan eksplisit seperti `close()` atau `with` sesuai kebutuhan resource, bukan mengandalkan `del`.

### 3. Latihan: catatan milik setiap laporan

Lengkapi `tambah()` dan `ringkasan()`. Setiap pemanggilan `tambah(label, nilai)` harus membuat `BarisLaporan` baru. `ringkasan()` menghasilkan list teks `<label>=<nilai>` sesuai urutan penambahan. Dua laporan harus memiliki list bagian yang terpisah.

{% capture m7_composition %}from dataclasses import dataclass

@dataclass(frozen=True)
class BarisLaporan:
label: str
nilai: int

class Laporan:
def **init**(self, judul):
self.judul = judul
self.\_baris = []

    def tambah(self, label, nilai):
        # TODO: buat BarisLaporan baru dan tambahkan ke _baris
        pass

    def ringkasan(self):
        # TODO: kembalikan list teks "<label>=<nilai>"
        pass

# Program utama: jangan diubah

laporan_a = Laporan("2025A")
laporan_b = Laporan("2025B")
laporan_a.tambah("Latihan 1", 80)
laporan_a.tambah("Latihan 2", 90)
print(laporan_a.ringkasan())
print(laporan_b.ringkasan())
laporan_b.tambah("Latihan 1", 70)
print(laporan_b.ringkasan())
print(laporan_a.ringkasan())
print(laporan_a.\_baris is laporan_b.\_baris)
print(laporan_a.\_baris[0].nilai)
{% endcapture %}
{% capture m7_composition_tests %}
@@OUTPUT@@
['Latihan 1=80', 'Latihan 2=90']
[]
['Latihan 1=70']
['Latihan 1=80', 'Latihan 2=90']
False
80
{% endcapture %}
{% include pyodide-exercise.html id="m7-composition" title="Latihan 6: baris milik laporan" prompt="Laporan membuat bagian-bagiannya dari data yang diberikan. Pastikan penambahan pada satu laporan tidak memengaruhi laporan lain." starter=m7_composition tests=m7_composition_tests %}

Program utama mengakses `_baris` untuk mengamati hasil latihan. Pada aplikasi yang lebih besar, gunakan method publik yang sesuai agar kode pemakai tidak bergantung pada detail penyimpanan internal.

---

## K. DELEGATION DAN PENGGANTIAN PERILAKU

### 1. Menyerahkan pekerjaan kepada kolaborator

**Delegation** terjadi ketika satu object meneruskan pekerjaan kepada object lain. Misalnya `PusatPengumuman` menangani konteks kelas, sedangkan pemformatan pesan diserahkan kepada kanal pesan.

```python
class KanalEmail:
    def kirim(self, pesan):
        return f"Email: {pesan}"


class PusatPengumuman:
    def __init__(self, kanal):
        self.kanal = kanal

    def umumkan(self, kelas, pesan):
        isi = f"[{kelas}] {pesan}"
        return self.kanal.kirim(isi)


pusat = PusatPengumuman(KanalEmail())
print(pusat.umumkan("2025A", "Latihan dimulai"))
```

Output:

```text
Email: [2025A] Latihan dimulai
```

`PusatPengumuman` **bukan** jenis `KanalEmail`. Ia menggunakan kanal untuk menyelesaikan pekerjaannya. Menyediakan kolaborator dari luar melalui constructor sering disebut **dependency injection**. Istilah ini merujuk pada cara pemberian dependency, bukan framework yang harus dipasang.

Delegation menjelaskan **siapa mengerjakan operasi**, sedangkan composition atau aggregation menjelaskan **bagaimana object dihubungkan dan dimiliki**. Keduanya bukan kategori yang saling meniadakan. Kolaborator yang disediakan dari luar juga tidak otomatis membuktikan aggregation; hubungan domain dan aturan kepemilikannya tetap perlu dijelaskan.

### 2. Latihan: kanal dapat diganti

Lengkapi `umumkan()` dan `ganti_kanal()`. Kanal harus menyediakan `kirim(pesan) -> str`. Jangan memeriksa class konkret kanal. `KanalCatatan` dalam program utama menyimpan pesan agar kita dapat memeriksa bahwa delegation berjalan; ia tidak mengirim pesan ke layanan luar.

{% capture m7_delegation %}class KanalEmail:
def kirim(self, pesan):
return f"Email: {pesan}"

class KanalLayar:
def kirim(self, pesan):
return f"Layar: {pesan}"

class PusatPengumuman:
def **init**(self, kanal):
self.kanal = kanal

    def umumkan(self, kelas, pesan):
        # TODO: bentuk "[<kelas>] <pesan>" lalu delegasikan ke kanal.kirim()
        pass

    def ganti_kanal(self, kanal):
        # TODO: simpan kolaborator pengganti
        pass

class KanalCatatan:
def **init**(self):
self.pesan = []

    def kirim(self, pesan):
        self.pesan.append(pesan)
        return f"Tercatat: {len(self.pesan)}"

# Program utama: jangan diubah

pusat = PusatPengumuman(KanalEmail())
print(pusat.umumkan("2025A", "Mulai"))
pusat.ganti_kanal(KanalLayar())
print(pusat.umumkan("2025B", "Selesai"))
catatan = KanalCatatan()
pusat.ganti_kanal(catatan)
print(pusat.umumkan("2025C", "Review"))
print(catatan.pesan)
{% endcapture %}
{% capture m7_delegation_tests %}
@@OUTPUT@@
Email: [2025A] Mulai
Layar: [2025B] Selesai
Tercatat: 1
['[2025C] Review']
{% endcapture %}
{% include pyodide-exercise.html id="m7-delegation" title="Latihan 7: ganti kanal tanpa mengganti pemroses" prompt="Delegasikan pengiriman ke object kanal. Ketiga implementasi harus bekerja tanpa perubahan pada umumkan()." starter=m7_delegation tests=m7_delegation_tests %}

---

## L. MEMILIH INHERITANCE ATAU COMPOSITION

### 1. Pilih berdasarkan kebutuhan

| Pertanyaan desain                                                     | Arah yang dapat dipertimbangkan                        |
| :-------------------------------------------------------------------- | :----------------------------------------------------- |
| Apakah object merupakan jenis parent dan memenuhi seluruh kontraknya? | Inheritance                                            |
| Apakah object menggunakan layanan object lain?                        | Kolaborasi melalui attribute atau parameter            |
| Apakah perilaku harus dapat diganti saat runtime?                     | Delegation ke kolaborator yang dapat diganti           |
| Apakah bagian dibuat dan dikelola khusus oleh pemilik?                | Composition                                            |
| Apakah bagian sudah ada dan tetap mandiri setelah dikeluarkan?        | Aggregation                                            |
| Apakah implementasi yang tidak berkerabat memiliki kemampuan sama?    | Duck typing; dokumentasikan dengan Protocol bila perlu |

Contoh penggunaan inheritance yang keliru adalah `Kelompok(Mahasiswa)` hanya agar kelompok memperoleh attribute `nama`. Kelompok bukan satu mahasiswa dan tidak dapat menggantikan mahasiswa dalam operasi akademik. Hubungan yang sesuai adalah kelompok **berisi** mahasiswa.

Hal serupa berlaku pada `PusatPengumuman(KanalEmail)`: kebutuhan untuk mengirim melalui email tidak otomatis menjadikan pusat pengumuman suatu jenis kanal email. Menyimpan kanal sebagai kolaborator memungkinkan email diganti layar tanpa mengganti class pusat pengumuman.

Anjuran "favor composition over inheritance" berarti mempertimbangkan kolaborasi ketika inheritance hanya digunakan untuk meminjam kode atau menghasilkan hierarki yang sulit diubah. Anjuran ini bukan larangan inheritance. Sistem sering membutuhkan keduanya: hierarki penilai untuk variasi rumus dan object kelas praktikum yang menyimpan penilai tersebut.

### 2. Kesalahan yang sering muncul

| Kesalahan                                                  | Perbaikan                                               |
| :--------------------------------------------------------- | :------------------------------------------------------ |
| Function memeriksa setiap jenis object untuk memilih rumus | Letakkan rumus pada implementasi kontrak yang sesuai    |
| Semua object bermethod sama dianggap pasti kompatibel      | Periksa argumen, hasil, efek samping, dan aturan domain |
| Semua hubungan has-a disebut composition eksklusif         | Jelaskan kepemilikan dan penggunaan bersama             |
| List anggota disimpan sebagai class attribute              | Buat list baru pada setiap instance                     |
| Shallow copy dianggap menyalin mahasiswa di dalam list     | Bedakan container dan object yang dirujuknya            |
| `del` dianggap menghapus seluruh bagian secara berantai    | Tinjau referensi yang masih dapat menjangkau object     |
| `@abstractmethod` dianggap memastikan rumus benar          | Gunakan pengujian kontrak dan kasus batas               |
| Type hints dianggap menolak input salah saat runtime       | Tambahkan validasi yang diperlukan oleh kontrak         |

---

## M. STUDI KASUS TERPADU: REKAP NILAI PRAKTIKUM

### 1. Kebutuhan dan hubungan object

Satu kelas praktikum memiliki peserta yang sudah terdaftar di sistem akademik. Pengajar dapat mengganti kebijakan penilaian. Setiap kali rekap dijalankan, kelas membuat catatan hasil baru yang menyimpan NIM dan nilai pada saat penilaian tersebut.

| Komponen                          | Tanggung jawab / hubungan                                                      |
| :-------------------------------- | :----------------------------------------------------------------------------- |
| `Mahasiswa`                       | Data mahasiswa yang tetap mandiri; diagregasi oleh kelas                       |
| `Penilai`                         | Abstract class yang menjanjikan `hitung(tugas, ujian) -> int`                  |
| `PenilaiReguler`, `PenilaiProyek` | Turunan yang menyediakan rumus berbeda                                         |
| `KelasPraktikum`                  | Mengelompokkan mahasiswa dan mendelegasikan perhitungan kepada penilai         |
| `HasilPenilaian`                  | Catatan nilai yang dibuat dan dikelola oleh kelas; composition dalam model ini |

```text
PenilaiReguler ----|> Penilai <|---- PenilaiProyek
                         ^
                         | dipakai melalui hitung(tugas, ujian)
                         |
Mahasiswa --------o KelasPraktikum *-------- HasilPenilaian
     0..*            (whole)                     0..*
```

Pada diagram terakhir, `o` dan `*` berada di sisi kelas praktikum sebagai whole. Garis ke `Penilai` menunjukkan pemakaian kolaborator, bukan inheritance.

### 2. Aturan penilaian

1. Nilai tugas dan ujian diasumsikan integer `0..100`; validasi input tersebut sudah ditangani sebelum contoh ini dijalankan.
2. `PenilaiReguler`: `(40 * tugas + 60 * ujian) // 100`.
3. `PenilaiProyek`: `(70 * tugas + 30 * ujian) // 100`.
4. `//` sengaja membulatkan ke bawah sesuai kebijakan latihan ini. Rumus pada aplikasi nyata harus mengikuti kebijakan pengajar.
5. `rekap()` membuat list hasil baru, menggantikan hasil rekap sebelumnya. Menjalankannya berulang tidak boleh menumpuk catatan.
6. `tampilkan()` menghasilkan list teks `<NIM>: <nilai>` dari hasil rekap terakhir.
7. Rekap tidak mengubah nilai tugas dan ujian pada object mahasiswa. Hasil yang telah dibuat menyimpan snapshot nilai, bukan perhitungan yang berubah otomatis.
8. Daftar peserta kosong menghasilkan list hasil kosong.

### 3. Latihan terpadu

Lengkapi empat bagian TODO. Jangan mengubah kontrak atau program utama. Gunakan pemanggilan polymorphic `self.penilai.hitung(...)` pada `rekap()`.

{% capture m7_terpadu %}from abc import ABC, abstractmethod
from dataclasses import dataclass

@dataclass
class Mahasiswa:
nim: str
nama: str
tugas: int
ujian: int

@dataclass(frozen=True)
class HasilPenilaian:
nim: str
nilai: int

class Penilai(ABC):
@abstractmethod
def hitung(self, tugas: int, ujian: int) -> int:
pass

class PenilaiReguler(Penilai):
def hitung(self, tugas: int, ujian: int) -> int: # TODO: gunakan bobot tugas 40 dan ujian 60; bulatkan ke bawah
pass

class PenilaiProyek(Penilai):
def hitung(self, tugas: int, ujian: int) -> int: # TODO: gunakan bobot tugas 70 dan ujian 30; bulatkan ke bawah
pass

class KelasPraktikum:
def **init**(self, nama, peserta, penilai):
self.nama = nama
self.peserta = list(peserta)
self.penilai = penilai
self.\_hasil = []

    def ganti_penilai(self, penilai):
        self.penilai = penilai

    def rekap(self):
        # TODO: ganti _hasil dengan list HasilPenilaian baru untuk setiap peserta
        #       nilai dihitung oleh self.penilai.hitung(tugas, ujian)
        pass

    def tampilkan(self):
        # TODO: kembalikan list teks "<NIM>: <nilai>" dari _hasil
        pass

# Program utama: jangan diubah

andi = Mahasiswa("25051204001", "Andi", 80, 90)
sari = Mahasiswa("25051204002", "Sari", 100, 80)
kelas = KelasPraktikum("2025A", [andi, sari], PenilaiReguler())
kelas.rekap()
print("Reguler:", kelas.tampilkan())
kelas.rekap()
print("Ulang:", kelas.tampilkan())
kelas.ganti_penilai(PenilaiProyek())
kelas.rekap()
print("Proyek:", kelas.tampilkan())
print("Data asal:", andi.tugas, andi.ujian)
andi.tugas = 0
print("Snapshot:", kelas.tampilkan())
kelas.rekap()
print("Data baru:", kelas.tampilkan())
kosong = KelasPraktikum("2025B", [], PenilaiReguler())
kosong.rekap()
print("Kosong:", kosong.tampilkan())
{% endcapture %}
{% capture m7_terpadu_tests %}
@@OUTPUT@@
Reguler: ['25051204001: 86', '25051204002: 88']
Ulang: ['25051204001: 86', '25051204002: 88']
Proyek: ['25051204001: 83', '25051204002: 94']
Data asal: 80 90
Snapshot: ['25051204001: 83', '25051204002: 94']
Data baru: ['25051204001: 27', '25051204002: 94']
Kosong: []
{% endcapture %}
{% include pyodide-exercise.html id="m7-terpadu" title="Latihan 8: rekap nilai dengan kebijakan yang dapat diganti" prompt="Gabungkan inheritance, polymorphism, aggregation, composition, dan delegation. Uji rekap berulang, snapshot nilai, pergantian penilai, dan kelas kosong." starter=m7_terpadu tests=m7_terpadu_tests %}

### 4. Menelusuri satu pemanggilan

Ketika `kelas.rekap()` dijalankan dengan penilai proyek:

```text
KelasPraktikum.rekap()
    -> ambil satu object Mahasiswa dari self.peserta
    -> self.penilai.hitung(mahasiswa.tugas, mahasiswa.ujian)
        -> PenilaiProyek.hitung(...)
    -> buat HasilPenilaian(nim, nilai)
    -> simpan catatan pada list hasil baru
```

Perhatikan pemisahan tanggung jawabnya. Mahasiswa menyediakan data. Penilai menentukan rumus. Kelas mengatur rekap. Catatan hasil menyimpan nilai yang sudah dihitung. Perubahan rumus tidak perlu menambahkan percabangan jenis penilai di dalam `rekap()`.

Latihan ini menguji perilaku yang terlihat dari output. Lulus Run Tests belum membuktikan seluruh keputusan desain benar. Periksa juga bahwa rumus tidak dipindahkan ke `KelasPraktikum`, object mahasiswa tidak diduplikasi tanpa kebutuhan, dan catatan hasil dibuat melalui tanggung jawab kelas.

---

## N. RINGKASAN DAN PEMERIKSAAN PEMAHAMAN

| Konsep                   | Inti yang perlu diingat                                                |
| :----------------------- | :--------------------------------------------------------------------- |
| Polymorphism             | Satu antarmuka pemanggilan dapat dipenuhi implementasi berbeda         |
| Overriding               | Child class mengganti implementasi method yang diwarisi                |
| Dynamic dispatch         | Implementasi yang digunakan ditentukan saat pemanggilan pada object    |
| Duck typing              | Kemampuan yang diperlukan dapat disediakan tanpa parent buatan bersama |
| Operator overloading     | Object berpartisipasi dalam operasi Python melalui special method      |
| LSP                      | Implementasi pengganti menjaga asumsi sah dalam kontrak parent         |
| Association / dependency | Object berhubungan atau memakai layanan object lain                    |
| Aggregation              | Whole mengelompokkan bagian yang memiliki identitas mandiri            |
| Composition              | Whole bertanggung jawab atas bagian khusus dalam model kepemilikannya  |
| Delegation               | Object menyerahkan operasi kepada kolaborator                          |
