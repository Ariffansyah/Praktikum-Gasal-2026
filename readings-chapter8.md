---
title: Chapter 8
layout: default
parent: Readings
printtitle: Modul 8 - Modular Programming, Packages, and Maintainable Project Structure
nav_order: 8
---

# MODUL 8

## MODULAR PROGRAMMING, PACKAGES, AND MAINTAINABLE PROJECT STRUCTURE

Pada [Chapter 7]({{ '/readings-chapter7/' | relative_url }}), sistem penilaian sudah memisahkan data mahasiswa, kebijakan perhitungan, dan proses rekap melalui class serta kontrak method. Namun, seluruh class tersebut masih dapat berada dalam satu file. Ketika program berkembang, kita perlu mengatur **di mana kode disimpan, bagaimana bagian-bagiannya dihubungkan, dan bagaimana perubahan dapat diperiksa**.

Modul ini membahas module, import, package, entry point, serta struktur proyek yang mudah dipahami dan diuji. Contoh menggunakan sistem rekap nilai praktikum yang melanjutkan konteks Chapter 7. Chapter 7 dan Chapter 8 merupakan dua materi untuk pertemuan **Week 9**.

**Cara belajar:** ikuti contoh file dan perintah terminal secara berurutan. Tiga playground dapat langsung dijalankan dengan **Run**, dan **Run Tests** memeriksa output awalnya. Playground kedua dan ketiga membuat file sementara; ketika dijalankan di website, file tersebut berada di lingkungan Python dalam browser. Untuk praktik di komputer, buat file sesuai nama yang ditunjukkan pada contoh. Gunakan Python **3.10 atau lebih baru** dengan standard library; contoh utama tidak membutuhkan instalasi library pihak ketiga.

---

## A. CAPAIAN PEMBELAJARAN

Setelah mempelajari modul ini, mahasiswa diharapkan mampu:

1. Membedakan function, class, module, import package, dan distribution package.
2. Membuat module Python dan menggunakan `import`, `from ... import ...`, serta alias `as`.
3. Menjelaskan namespace, cache import, dan perbedaan rebinding nama dengan perubahan object mutable.
4. Memisahkan kode yang dapat diimpor dari kode yang menjalankan aplikasi melalui `__name__` dan main guard.
5. Menyusun regular package dengan `__init__.py`, menggunakan absolute dan relative import, serta menjalankan package melalui `python -m`.
6. Membagi tanggung jawab antarfile dengan cohesion yang baik dan coupling yang terkendali.
7. Mengenali circular import, benturan nama module, dan kesalahan menjalankan file di dalam package.
8. Menyusun proyek kecil beserta dokumentasi, pengujian, dan lingkungan dependency yang sesuai.
9. Memindahkan program satu file menjadi beberapa module tanpa mengubah perilaku yang dijanjikan.

### Peta belajar

| Bagian | Fokus                                                                   |
| :----- | :---------------------------------------------------------------------- |
| B-C    | Dari program satu file ke module yang dapat digunakan ulang             |
| D-E    | Bentuk import, namespace, cache, dan entry point                        |
| F-G    | Package, absolute/relative import, dan arah dependency                  |
| H-I    | Proyek rekap nilai lengkap dan playground beberapa file                 |
| J-K    | Pengujian, dokumentasi, environment, dan struktur yang dapat dipelihara |
| L-M    | Kesalahan umum dan pemeriksaan pemahaman                                |

---

## B. MENGAPA PROGRAM PERLU DIBAGI MENJADI MODULE?

### 1. Masalah pada satu file yang terus bertambah

Bayangkan file `main.py` berisi data mahasiswa, rumus nilai, pencetakan laporan, pembacaan argumen, dan seluruh kode percobaan. Ketika bobot penilaian berubah, kita harus mencari rumus di antara banyak bagian yang tidak terkait. Ketika ingin memakai perhitungan dari program lain, mengimpor file itu mungkin langsung mencetak laporan atau meminta input.

Memecah file berdasarkan jumlah baris saja belum menyelesaikan masalah. Jika setiap file mengubah variabel global milik file lain, program tetap sulit dipahami meskipun ukuran filenya kecil.

**Modular programming** membagi program menjadi bagian dengan tanggung jawab dan antarmuka yang jelas. Bagian-bagian itu berkomunikasi melalui import, argumen, dan nilai kembalian yang disepakati.

| Bagian             | Pertanyaan yang dijawab                                        |
| :----------------- | :------------------------------------------------------------- |
| Data / model       | Data apa yang merepresentasikan mahasiswa dan hasil penilaian? |
| Kebijakan          | Bagaimana nilai dihitung?                                      |
| Layanan / service  | Bagaimana seluruh peserta direkap?                             |
| Antarmuka pengguna | Bagaimana data contoh disiapkan dan hasil ditampilkan?         |
| Pengujian          | Bagaimana kita mengetahui perilakunya masih benar?             |

### 2. Module tidak sama dengan class

| Istilah  | Makna dalam modul ini                                                                                                  |
| :------- | :--------------------------------------------------------------------------------------------------------------------- |
| Function | Operasi yang dapat dipanggil, misalnya `rekap()`                                                                       |
| Class    | Definisi jenis object, misalnya `Mahasiswa`                                                                            |
| Module   | Unit kode yang dapat diimpor; contoh paling umum adalah file `.py`                                                     |
| Package  | Module yang dapat memiliki submodule atau subpackage; pada regular package biasanya berupa folder dengan `__init__.py` |
| Proyek   | Keseluruhan source, pengujian, dokumentasi, dan konfigurasi aplikasi                                                   |

Satu module boleh berisi beberapa class dan function yang memiliki tujuan bersama. Tidak ada kewajiban satu class harus berada pada satu file. Untuk proyek kecil, memisahkan `Mahasiswa` dan `HasilPenilaian` ke dua file belum tentu memberi manfaat.

---

## C. MEMBUAT DAN MEMAKAI MODULE SENDIRI

### 1. Dua file dalam satu folder

Buat folder `contoh_nilai` dengan struktur berikut.

```text
contoh_nilai/
    penilaian.py
    main.py
```

Isi **`penilaian.py`**:

```python
BOBOT_TUGAS = 40
BOBOT_UJIAN = 60


def hitung_nilai(tugas, ujian):
    """Hitung nilai integer 0..100 dari dua skor yang sudah valid."""
    return (BOBOT_TUGAS * tugas + BOBOT_UJIAN * ujian) // 100
```

Isi **`main.py`**:

```python
import penilaian


print(penilaian.hitung_nilai(80, 90))
print(penilaian.BOBOT_TUGAS)
```

Dari terminal di dalam folder `contoh_nilai`, jalankan:

```text
python main.py
```

Output:

```text
86
40
```

Nama module pada statement import tidak memakai akhiran `.py`. Penulisan `penilaian.hitung_nilai()` berarti mengambil attribute `hitung_nilai` dari object module `penilaian`. Attribute module dapat berupa function, class, atau data.

### 2. Namespace mencegah nama tercampur

Misalkan dua module menyediakan function `hitung()`, satu untuk nilai dan satu untuk biaya. Bentuk `nilai.hitung()` dan `biaya.hitung()` tetap memperjelas asal setiap operasi.

Hindari nama file yang membingungkan seperti `data_baru_final2.py`. Pilih nama yang menunjukkan tanggung jawab, misalnya `penilaian.py` atau `laporan.py`. Gunakan identifier yang valid seperti huruf kecil dan underscore; untuk statement import biasa, jangan memakai tanda hubung atau spasi pada nama module.

---

## D. IMPORT, ALIAS, DAN STATE MODULE

### 1. Bentuk import yang sering dipakai

Contoh berikut menggunakan module `penilaian.py` dari bagian C. Jalankan setiap variasi setelah file tersebut tersedia.

| Bentuk                                         | Cara memakai                     |
| :--------------------------------------------- | :------------------------------- |
| `import penilaian`                             | `penilaian.hitung_nilai(80, 90)` |
| `import penilaian as nilai`                    | `nilai.hitung_nilai(80, 90)`     |
| `from penilaian import hitung_nilai`           | `hitung_nilai(80, 90)`           |
| `from penilaian import hitung_nilai as hitung` | `hitung(80, 90)`                 |

Alias mengganti nama yang dipakai di scope pengimpor; alias tidak membuat salinan module. Pilih bentuk yang membuat asal nama mudah dibaca. Hindari `from penilaian import *` pada kode aplikasi karena nama yang masuk tidak terlihat jelas dan mudah berbenturan.

### 2. Playground: import dari standard library

Standard library adalah kumpulan module yang disediakan bersama Python. Contoh berikut menggunakan `math` dan `statistics`, sehingga tidak memerlukan file buatan sendiri.

{% capture m8_import %}import math
import math as matematika
from math import sqrt as akar
from statistics import mean

nilai = [70, 80, 90]
print("Akar 81:", akar(81))
print("Rata-rata:", mean(nilai))
print("Module sama:", math is matematika)
print("Pembulatan:", matematika.floor(8.9))
{% endcapture %}
{% capture m8_import_tests %}
@@OUTPUT@@
Akar 81: 9.0
Rata-rata: 80
Module sama: True
Pembulatan: 8
{% endcapture %}
{% include pyodide-exercise.html id="m8-import" title="Playground 1: import dan namespace" prompt="Jalankan kode, lalu ubah alias akar atau matematika dan sesuaikan pemanggilannya. Amati bahwa dua nama module tetap menunjuk object yang sama." starter=m8_import tests=m8_import_tests %}

### 3. Import pertama menjalankan kode top-level

Saat pertama diimpor secara normal, statement top-level module dijalankan. `def` dan `class` membentuk object function dan class; isi function belum dijalankan sampai function dipanggil. Sebaliknya, `print()` atau `input()` yang langsung ditulis pada level module segera berjalan.

Import berikutnya dengan **nama module yang sama** biasanya mengambil object dari cache `sys.modules` dalam proses Python tersebut. Import bukan perintah untuk selalu memulai ulang file dari awal. Memulai proses Python baru memberikan sesi module yang baru.

Jangan mengandalkan import berulang untuk memuat perubahan file saat eksperimen. Untuk proyek awal, jalankan ulang program atau restart sesi. Penggunaan `reload()` memiliki konsekuensi terhadap referensi lama dan berada di luar fokus modul ini.

### 4. `from` membuat binding nama, bukan koneksi otomatis untuk rebinding

Misalkan `aturan.py` berisi `BATAS_SKS = 24`. Setelah `from aturan import BATAS_SKS`, nama lokal mula-mula menunjuk object yang sama dengan attribute module. Jika kemudian `aturan.BATAS_SKS` diubah menjadi `20`, binding lokal tidak otomatis berganti ke object baru.

Untuk object mutable, dua nama dapat tetap menunjuk list yang sama. Mengubah isi list berbeda dari mengikat nama ke list baru. Ini menerapkan kembali konsep referensi dan aliasing dari Chapter 6.

Jadikan konstanta sebagai konfigurasi yang jelas. Hindari menjadikan perubahan global lintas module sebagai cara utama mengirim hasil; argumen dan nilai kembalian membuat aliran data lebih mudah ditelusuri.

---

## E. MEMISAHKAN IMPORT DARI MENJALANKAN APLIKASI

### 1. `__name__` dan main guard

Isi **`demo.py`**:

```python
def main():
    print("Aplikasi rekap dimulai")


if __name__ == "__main__":
    main()
```

| Cara memakai                        | Nilai `__name__` di file | Apakah `main()` otomatis dipanggil oleh guard? |
| :---------------------------------- | :----------------------- | :--------------------------------------------- |
| `python demo.py`                    | `"__main__"`             | Ya                                             |
| `python -m demo` dari folder contoh | `"__main__"`             | Ya                                             |
| `import demo`                       | `"demo"`                 | Tidak                                          |

Guard hanya mengendalikan blok di bawahnya. Statement top-level lain di luar guard tetap berjalan saat import. Nama function `main` juga bukan kata kunci khusus; ia dipakai sebagai konvensi entry point yang mudah dikenali.

### 2. Playground: cache import, referensi, dan entry point

Editor membuat dua file sementara. `print("Memuat aturan")` pada file aturan sengaja diletakkan di top-level agar efek import terlihat. Pada library yang sebenarnya, hindari output semacam itu kecuali memang merupakan bagian dari kebutuhan.

{% capture m8_entry %}from pathlib import Path
from tempfile import TemporaryDirectory
import importlib
import runpy
import sys

files = {
"m8_aturan.py": '''print("Memuat aturan")
BATAS_SKS = 24
riwayat = []
''',
"m8_demo.py": '''import m8_aturan

def main():
print("Main membaca batas:", m8_aturan.BATAS_SKS)

if **name** == "**main**":
main()
''',
}

# Infrastruktur editor: folder sementara hanya untuk contoh ini.

names = ("m8_demo", "m8_aturan")
for name in names:
sys.modules.pop(name, None)

with TemporaryDirectory() as folder:
root = Path(folder)
for name, source in files.items():
(root / name).write_text(source, encoding="utf-8")
sys.path.insert(0, folder)
importlib.invalidate_caches()
try:
import m8_aturan as aturan
import m8_aturan as aturan_lagi
from m8_aturan import BATAS_SKS, riwayat

        print("Cache sama:", aturan is aturan_lagi)
        aturan.BATAS_SKS = 20
        aturan.riwayat.append("PBO")
        print("Binding lokal:", BATAS_SKS)
        print("Attribute module:", aturan.BATAS_SKS)
        print("List bersama:", riwayat)

        import m8_demo
        print("Import demo selesai; main belum dipanggil")
        runpy.run_path(str(root / "m8_demo.py"), run_name="__main__")
    finally:
        sys.path.remove(folder)
        for name in names:
            sys.modules.pop(name, None)
        importlib.invalidate_caches()

{% endcapture %}
{% capture m8_entry_tests %}
@@OUTPUT@@
Memuat aturan
Cache sama: True
Binding lokal: 24
Attribute module: 20
List bersama: ['PBO']
Import demo selesai; main belum dipanggil
Main membaca batas: 20
{% endcapture %}
{% include pyodide-exercise.html id="m8-entry" title="Playground 2: import tidak sama dengan menjalankan main" prompt="Amati bahwa Memuat aturan hanya muncul sekali. Coba hilangkan main guard dalam string m8_demo.py atau ganti append dengan penugasan list baru, lalu jelaskan perubahan output." starter=m8_entry tests=m8_entry_tests %}

`TemporaryDirectory`, `runpy`, dan perubahan `sys.path` pada editor dipakai untuk menyediakan eksperimen beberapa file dalam satu textarea. Pada proyek lokal di bagian H, jalankan perintah dari root proyek; tidak perlu menyalin mekanisme editor ini ke aplikasi. Pembersihan cache membuat contoh dapat dijalankan berulang dari kondisi awal.

---

## F. PACKAGE DAN IMPORT ANTARMODULE

### 1. Regular package

Ketika beberapa module memiliki konteks yang sama, tempatkan dalam package.

```text
rekap_praktikum/
    kampusnilai/
        __init__.py
        models.py
        policies.py
        services.py
        cli.py
        __main__.py
```

`rekap_praktikum` adalah root proyek. `kampusnilai` adalah import package. Contoh pada modul ini memakai **regular package**, ditandai dengan `__init__.py`. Python juga mendukung **namespace package** tanpa file tersebut untuk kebutuhan tertentu, sehingga pernyataan "semua folder package harus memiliki `__init__.py`" tidak berlaku untuk seluruh jenis package.

Perbedaan nama yang sering tertukar:

| Nama          | Peran                                                                  |
| :------------ | :--------------------------------------------------------------------- |
| `__init__.py` | File inisialisasi namespace package; boleh kosong                      |
| `__init__()`  | Method inisialisasi instance class                                     |
| `__main__.py` | Entry point ketika package dijalankan dengan `python -m nama_package`  |
| `__name__`    | Nama namespace module, atau `"__main__"` ketika menjadi kode top-level |

### 2. Absolute import

Dari luar package, ambil class dengan jalur module yang jelas:

```python
from kampusnilai.models import Mahasiswa
from kampusnilai.policies import PenilaiReguler
from kampusnilai.services import rekap
```

Dalam konteks import Python, "absolute" berarti jalur nama module yang diawali nama package teratas, bukan path lengkap disk seperti `D:\...`. Import tidak memakai tanda `/` dan tidak menuliskan `.py`.

### 3. Relative import

Di dalam `kampusnilai/services.py`, gunakan:

```python
from .models import HasilPenilaian, Mahasiswa
```

Titik `.` mengacu pada package tempat module berada. Dua titik `..` mengacu ke parent package jika parent tersebut memang ada. Relative import memerlukan konteks package; ia bukan instruksi untuk mencari file berdasarkan current working directory.

Module dalam package juga dapat memakai absolute import. Pilih gaya yang konsisten dan mudah dipahami. Contoh ini memakai relative import untuk hubungan internal dan absolute import untuk pemakai dari luar.

### 4. Menjalankan package dengan `-m`

Dari folder `rekap_praktikum`, jalankan:

```text
python -m kampusnilai
```

Python mencari package pada jalur import, menginisialisasinya, lalu menjalankan `kampusnilai/__main__.py` sebagai kode top-level. Jangan mengganti perintah tersebut menjadi `python kampusnilai/cli.py` jika `cli.py` menggunakan relative import. Eksekusi langsung file tersebut tidak menyediakan konteks package yang sama.

### 5. Bagaimana Python menemukan module?

Pencarian module melibatkan cache import, mekanisme import, dan lokasi pada `sys.path`. Untuk contoh file `.py` biasa:

- Saat menjalankan script berdasarkan path, folder script menjadi lokasi awal yang relevan untuk mencari module.
- Saat memakai `python -m` pada konfigurasi normal, current working directory tersedia untuk pencarian package.
- Standard library dan lokasi package yang terpasang pada interpreter juga ikut diperhitungkan.

Ini menjelaskan mengapa menjalankan perintah dari root proyek penting pada contoh flat layout ini. Jika gagal, periksa interpreter, folder kerja, dan nama package sebelum menambahkan path secara manual.

---

## G. MENYUSUN TANGGUNG JAWAB DAN ARAH DEPENDENCY

### 1. Cohesion dan coupling

**Cohesion** menggambarkan keterkaitan tujuan isi satu module. `policies.py` berisi kebijakan penilaian yang saling berhubungan. Jika file yang sama juga mengatur menu, koneksi database, dan format laporan, tujuannya menjadi bercampur.

**Coupling** menggambarkan ketergantungan antarbagian. Dependency tetap diperlukan, tetapi dibuat jelas dan dibatasi. Function `rekap(peserta, penilai)` lebih mudah diuji daripada function yang membaca peserta dari global module lain, mengganti bobot global, lalu langsung mencetak hasil.

| File                     | Isi yang sesuai                                 | Yang tidak menjadi tanggung jawabnya |
| :----------------------- | :---------------------------------------------- | :----------------------------------- |
| `models.py`              | Data mahasiswa dan hasil penilaian              | Menjalankan menu aplikasi            |
| `policies.py`            | Rumus perhitungan nilai                         | Menyiapkan seluruh peserta kelas     |
| `services.py`            | Merekap peserta menggunakan penilai             | Mencetak tampilan terminal           |
| `cli.py`                 | Menyiapkan alur antarmuka dan menampilkan hasil | Menulis ulang rumus penilaian        |
| `tests/test_services.py` | Memeriksa kontrak rekap                         | Menjadi tempat kode produksi         |

Nama `service` di sini berarti bagian yang mengatur operasi aplikasi, bukan server jaringan yang harus dijalankan.

### 2. Arah dependency yang dapat ditelusuri

```text
__main__.py -> cli.py -> services.py -> models.py
                    -> policies.py
                    -> models.py

tests/test_services.py -> models.py, policies.py, services.py
```

Panah berarti "mengimpor atau menggunakan". Module model tidak perlu mengimpor CLI. Kebijakan juga tidak perlu mengetahui siapa yang mencetak hasil. Pengujian mengakses kode produksi, bukan sebaliknya.

### 3. Circular import

Contoh masalah: `models.py` mengimpor `services.py`, sementara `services.py` mengimpor nama dari `models.py`. Salah satu module mungkin baru terinisialisasi sebagian ketika nama yang dibutuhkan diakses. Akibatnya dapat muncul error terkait partially initialized module.

Cara memperbaiki desain:

1. Tentukan ulang tanggung jawab agar dependency dapat berjalan satu arah.
2. Pindahkan kontrak atau data bersama ke module tingkat bawah yang tidak bergantung pada keduanya.
3. Berikan kolaborator melalui argumen atau constructor jika operasi tidak perlu mengetahui module konkret pemanggil.

Import di dalam function kadang berguna untuk pemuatan tertunda, tetapi memindahkan semua import ke dalam function tidak otomatis memperbaiki desain yang saling bergantung.

### 4. Public API package

`__init__.py` dapat menyediakan nama yang memang ditujukan untuk pemakai package. Sebagai contoh, package dapat mengekspor `rekap` sehingga pemakai menulis `from kampusnilai import rekap`.

Pertahankan isi `__init__.py` ringan. Mengekspor ulang nama berarti module terkait dapat ikut diimpor; jangan menaruh pembacaan input, pencetakan laporan, atau proses utama di file ini. `__all__` mengatur nama yang disediakan untuk wildcard import, bukan melarang akses ke attribute lain atau menjamin keamanan.

---

## H. CONTOH PROYEK: PACKAGE REKAP NILAI PRAKTIKUM

### 1. Struktur lengkap

Buat file-file berikut di komputer lokal. Contoh tidak bergantung pada file dari Chapter 7; seluruh kode yang diperlukan tersedia di bagian ini.

```text
rekap_praktikum/
    README.md
    .gitignore
    kampusnilai/
        __init__.py
        __main__.py
        models.py
        policies.py
        services.py
        cli.py
    tests/
        test_services.py
```

Kontrak yang tetap dipertahankan: nilai tugas dan ujian sudah berupa integer `0..100`, hasil berupa integer, rumus reguler menggunakan bobot 40:60, dan rumus proyek menggunakan bobot 70:30. Pembagian `// 100` merupakan kebijakan pembulatan contoh ini. Rekap tidak mengubah data peserta dan mengembalikan list baru pada setiap pemanggilan.

### 2. `kampusnilai/models.py`

{% capture m8_models %}from dataclasses import dataclass

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
{% endcapture %}

```python
{{ m8_models }}
```

Model cukup mendefinisikan data. Import module ini tidak mencetak laporan dan tidak meminta input. `HasilPenilaian` menyimpan hasil pada saat perhitungan dilakukan.

### 3. `kampusnilai/policies.py`

{% capture m8_policies %}class PenilaiReguler:
def hitung(self, tugas: int, ujian: int) -> int:
return (40 _ tugas + 60 _ ujian) // 100

class PenilaiProyek:
def hitung(self, tugas: int, ujian: int) -> int:
return (70 _ tugas + 30 _ ujian) // 100
{% endcapture %}

```python
{{ m8_policies }}
```

Kedua class memenuhi kontrak `hitung(tugas, ujian) -> int` melalui duck typing. Kita dapat menambahkan `Protocol` atau abstract class bila dibutuhkan oleh desain; pemisahan file sendiri tidak mewajibkannya. Validasi input di luar rentang kontrak belum ditambahkan pada contoh ini.

### 4. `kampusnilai/services.py`

{% capture m8_services %}from .models import HasilPenilaian, Mahasiswa

def rekap(peserta: list[Mahasiswa], penilai) -> list[HasilPenilaian]:
"""Buat snapshot nilai tanpa mengubah data peserta."""
return [
HasilPenilaian(m.nim, penilai.hitung(m.tugas, m.ujian))
for m in peserta
]
{% endcapture %}

```python
{{ m8_services }}
```

Service menerima kolaborator dari pemanggil. Ia tidak mengimpor class penilai tertentu, tidak meminta input, dan tidak menentukan bentuk tampilan. Jika penilai diganti, algoritma rekap tetap sama.

### 5. `kampusnilai/cli.py`

{% capture m8_cli %}from .models import Mahasiswa
from .policies import PenilaiReguler
from .services import rekap

def main():
peserta = [
Mahasiswa("25051204001", "Andi", 80, 90),
Mahasiswa("25051204002", "Sari", 100, 80),
]
for hasil in rekap(peserta, PenilaiReguler()):
print(f"{hasil.nim}: {hasil.nilai}")

if **name** == "**main**":
main()
{% endcapture %}

```python
{{ m8_cli }}
```

CLI berarti command-line interface. Contoh ini menampilkan data tetap agar aliran module mudah diamati. Pengolahan argumen terminal dapat ditambahkan kemudian tanpa memindahkan rumus dari `policies.py`.

### 6. `kampusnilai/__init__.py`

{% capture m8_init %}from .services import rekap

**all** = ["rekap"]
{% endcapture %}

```python
{{ m8_init }}
```

Pemakai dapat mengambil `rekap` dari namespace package. `services.py` tetap mengimpor model secara langsung dari `.models`, bukan kembali dari public API package, sehingga arah dependency lebih jelas.

### 7. `kampusnilai/__main__.py`

{% capture m8_main %}from .cli import main

if **name** == "**main**":
main()
{% endcapture %}

```python
{{ m8_main }}
```

Jalankan dari folder `rekap_praktikum`:

```text
python -m kampusnilai
```

Output:

```text
25051204001: 86
25051204002: 88
```

`python -m kampusnilai.cli` juga dapat menjalankan guard pada module CLI. Sebaliknya, `import kampusnilai` atau `import kampusnilai.cli` hanya menyiapkan definisi dan public API; keduanya tidak otomatis menjalankan `main()`.

---

## I. PLAYGROUND PACKAGE DALAM BROWSER

Playground berikut menyusun isi file dari bagian H ke folder sementara, mengimpor public API, lalu menjalankan entry point package. Kode sumber pada dictionary `files` adalah isi module yang sebenarnya. `runpy.run_module(..., run_name="__main__")` dipakai sebagai demonstrasi eksekusi entry point dalam sesi editor; perintah terminal untuk pengguna tetap `python -m kampusnilai`.

{% capture m8_package %}from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
from tempfile import TemporaryDirectory
import importlib
import runpy
import sys

files = {
"kampusnilai/models.py": r'''{{ m8_models }}''',
"kampusnilai/policies.py": r'''{{ m8_policies }}''',
"kampusnilai/services.py": r'''{{ m8_services }}''',
"kampusnilai/cli.py": r'''{{ m8_cli }}''',
"kampusnilai/**init**.py": r'''{{ m8_init }}''',
"kampusnilai/**main**.py": r'''{{ m8_main }}''',
}

def bersihkan_module_contoh():
for name in list(sys.modules):
if name == "kampusnilai" or name.startswith("kampusnilai."):
sys.modules.pop(name, None)

# Infrastruktur editor untuk menyediakan beberapa file sementara.

bersihkan_module_contoh()
with TemporaryDirectory() as folder:
root = Path(folder)
for name, source in files.items():
path = root / name
path.parent.mkdir(parents=True, exist_ok=True)
path.write_text(source, encoding="utf-8")

    sys.path.insert(0, folder)
    importlib.invalidate_caches()
    try:
        buffer = StringIO()
        with redirect_stdout(buffer):
            import kampusnilai
        print("Import tanpa output:", buffer.getvalue() == "")

        from kampusnilai import rekap
        from kampusnilai.models import Mahasiswa
        from kampusnilai.policies import PenilaiProyek

        peserta = [Mahasiswa("25051204001", "Andi", 80, 90)]
        print("Module class:", Mahasiswa.__module__)
        print("Nilai proyek:", rekap(peserta, PenilaiProyek())[0].nilai)
        print("Peserta kosong:", rekap([], PenilaiProyek()))
        print("Entry point:")
        runpy.run_module("kampusnilai", run_name="__main__")
    finally:
        sys.path.remove(folder)
        bersihkan_module_contoh()
        importlib.invalidate_caches()

{% endcapture %}
{% capture m8_package_tests %}
@@OUTPUT@@
Import tanpa output: True
Module class: kampusnilai.models
Nilai proyek: 83
Peserta kosong: []
Entry point:
25051204001: 86
25051204002: 88
{% endcapture %}
{% include pyodide-exercise.html id="m8-package" title="Playground 3: package rekap nilai" prompt="Jalankan package, lalu coba ganti penilai di isi cli.py atau tambahkan print top-level pada __init__.py. Amati perbedaan hasil import dan entry point. Reset mengembalikan contoh awal." starter=m8_package tests=m8_package_tests %}

### Eksperimen yang dapat dilakukan

1. Ganti `PenilaiReguler` menjadi `PenilaiProyek` pada import dan pemanggilan di string `cli.py`. Apakah `services.py` perlu diubah?
2. Tambahkan `print("Menyiapkan package")` pada `__init__.py`. Mengapa pemeriksaan import tanpa output berubah?
3. Ganti relative import pada `services.py` menjadi absolute import `from kampusnilai.models import ...`. Apakah pemanggilan dari root proyek masih bekerja?
4. Jalankan ulang playground tanpa mengubah kode. Mengapa output tidak menumpuk dari run sebelumnya?

Bagian infrastruktur sengaja dibatasi pada nama package contoh. Jangan menggunakan pola pembersihan `sys.modules` sebagai bagian rutin aplikasi; pada terminal biasa, proses Python yang baru sudah memulai sesi import baru.

---

## J. PENGUJIAN DAN REFACTORING

### 1. Pastikan perilaku tetap benar setelah pemisahan file

Memindahkan class dari `main.py` ke `models.py` merupakan refactoring bila perilaku yang dijanjikan tetap sama. Setelah pemindahan, periksa bahwa import berhasil, perhitungan tetap sesuai, serta hasil dan state tidak berubah tanpa kebutuhan.

Untuk proyek contoh, buat **`tests/test_services.py`** berikut. `unittest` tersedia dalam standard library.

```python
import unittest

from kampusnilai.models import Mahasiswa
from kampusnilai.policies import PenilaiProyek, PenilaiReguler
from kampusnilai.services import rekap


class TestRekap(unittest.TestCase):
    def test_kebijakan_dapat_diganti(self):
        peserta = [Mahasiswa("25051204001", "Andi", 80, 90)]
        self.assertEqual(rekap(peserta, PenilaiReguler())[0].nilai, 86)
        self.assertEqual(rekap(peserta, PenilaiProyek())[0].nilai, 83)

    def test_peserta_kosong(self):
        self.assertEqual(rekap([], PenilaiReguler()), [])

    def test_rekap_tidak_mengubah_peserta(self):
        andi = Mahasiswa("25051204001", "Andi", 80, 90)
        pertama = rekap([andi], PenilaiReguler())
        kedua = rekap([andi], PenilaiReguler())
        self.assertEqual((andi.tugas, andi.ujian), (80, 90))
        self.assertEqual(pertama, kedua)
        self.assertIsNot(pertama, kedua)


if __name__ == "__main__":
    unittest.main()
```

Dari root `rekap_praktikum`, jalankan:

```text
python -m unittest discover -s tests -v
```

Runner seharusnya menemukan **3 test** dan melaporkan **OK**. Waktu eksekusi dan detail tampilan dapat berbeda. File test tidak perlu mengimpor CLI karena yang diperiksa adalah kontrak service, bukan cara mencetak data contoh.

### 2. Urutan refactoring yang aman untuk proyek kecil

1. Catat output dan kontrak program sebelum dipindahkan.
2. Pisahkan data/model, lalu perbaiki import dan jalankan pengujian.
3. Pisahkan rumus menjadi kebijakan yang menerima input dan mengembalikan hasil.
4. Pisahkan pemroses dari tampilan terminal.
5. Tambahkan entry point package yang tipis.
6. Jalankan aplikasi dan pengujian dari root proyek, bukan hanya melalui tombol Run pada satu file di editor.

Jika satu perubahan membuat banyak module harus mengenali detail internal baru, tinjau kembali antarmuka dan arah dependency-nya.

---

## K. STRUKTUR YANG DAPAT DIPELIHARA

### 1. README menjelaskan cara memakai proyek

Pada `README.md`, tulis tujuan proyek, versi Python, cara menjalankan aplikasi, dan cara menguji. Contoh isi ringkas:

```text
# Rekap Praktikum

Contoh pemisahan model, kebijakan penilaian, service, dan CLI.
Memerlukan Python 3.10 atau lebih baru; hanya memakai standard library.

Jalankan dari root proyek:
    python -m kampusnilai

Jalankan pengujian:
    python -m unittest discover -s tests -v
```

Dokumentasi nama file saja belum cukup; pembaca perlu mengetahui folder tempat perintah dijalankan. Docstring pada function menjelaskan kontrak yang perlu diketahui pemanggil, bukan mengulang setiap statement Python.

### 2. File yang perlu dan tidak perlu disimpan ke Git

Contoh isi `.gitignore` untuk proyek Python ini:

```text
__pycache__/
*.py[cod]
.venv/
.pytest_cache/
```

Simpan source, test, dokumentasi, serta konfigurasi dependency yang memang digunakan. Folder environment dan cache dapat dibuat ulang. Menambahkan pola ignore tidak otomatis menghapus file yang sudah dilacak Git.

### 3. Import package dan distribution package

`kampusnilai` pada contoh adalah **import package**, yaitu namespace yang digunakan pada `import kampusnilai`. **Distribution package** adalah unit software yang dapat dipasang oleh alat seperti `pip`. Nama distribusi dan nama import tidak harus sama. Penjelasan terminologinya tersedia dalam [Python Packaging User Guide](https://packaging.python.org/en/latest/discussions/distribution-package-vs-import-package/).

Contoh lokal ini dapat dijalankan dari root tanpa mempublikasikan package ke PyPI. `pip` juga bukan alat untuk mengimpor file `.py` milik sendiri; import dilakukan oleh interpreter sesuai jalur pencariannya.

### 4. Virtual environment dan dependency

Virtual environment memisahkan lingkungan instalasi proyek. Jika ingin memakai environment pada Windows, jalankan dari root proyek:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m kampusnilai
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

Perintah tersebut memakai interpreter environment secara langsung sehingga tidak memerlukan aktivasi PowerShell. Pada macOS/Linux, interpreter environment biasanya berada di `.venv/bin/python`.

Contoh rekap tidak memiliki dependency eksternal, jadi tidak ada library tambahan yang perlu dipasang. Jika proyek berikutnya membutuhkannya, gunakan `python -m pip` dari interpreter environment yang dipilih dan dokumentasikan dependency-nya. `pyproject.toml` dapat menyimpan metadata, kebutuhan proyek, dan konfigurasi alat; file tersebut tidak diperlukan hanya untuk mencoba import package flat layout ini. Reproducibility juga memerlukan pencatatan versi dan lingkungan sesuai alat yang digunakan, bukan sekadar keberadaan folder `.venv`.

### 5. Flat layout dan pengenalan src layout

Contoh H memakai **flat layout**: folder package sejajar dengan README dan tests. Ini memudahkan praktik dari root proyek. Pada **src layout**, package ditempatkan di `src/kampusnilai/` dan biasanya disiapkan melalui instalasi proyek, misalnya editable installation, setelah konfigurasi packaging tersedia. Memindahkan folder ke `src` saja tidak otomatis membuat import bekerja. Lihat [perbandingan layout dari PyPA](https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/).

Pilih struktur berdasarkan kebutuhan. Untuk proyek awal, beberapa module yang jelas lebih berguna daripada banyak lapisan kosong atau file `utils.py` yang menampung semua hal tanpa tujuan bersama.

---

## L. KESALAHAN YANG SERING MUNCUL

| Gejala                                                          | Hal yang perlu diperiksa                                                                             |
| :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `ModuleNotFoundError` pada package sendiri                      | Folder kerja, struktur, ejaan, interpreter, dan cara menjalankan                                     |
| Error relative import tanpa parent package                      | Gunakan `python -m kampusnilai` dari root sesuai contoh                                              |
| `cannot import name` atau partially initialized module          | Nama yang diimpor dan kemungkinan circular import                                                    |
| File sendiri terbaca saat mengimpor library                     | Hindari nama lokal seperti `json.py`, `typing.py`, `statistics.py`, atau nama library yang digunakan |
| Import langsung mencetak atau meminta input                     | Pindahkan alur aplikasi ke function dan main guard                                                   |
| Perubahan konstanta module tidak terlihat pada nama lokal       | Bedakan `from` binding, rebinding attribute, dan mutable alias                                       |
| Perubahan file tidak terlihat setelah import ulang              | Perhatikan cache module; mulai ulang proses atau sesi                                                |
| Service sulit diuji karena langsung mencetak atau membaca input | Pisahkan perhitungan dan rekap dari lapisan antarmuka                                                |
| Semua file mengimpor semua file lain                            | Tinjau tanggung jawab dan buat arah dependency yang jelas                                            |
| Berhasil di editor tetapi gagal dari terminal                   | Samakan interpreter, root kerja, dan perintah eksekusi yang didokumentasikan                         |

Jika mencurigai benturan nama, `print(module.__file__)` membantu melihat asal module berbasis file. Tidak semua module memiliki `__file__`, misalnya sebagian module bawaan; gunakan pemeriksaan ini sesuai jenis module yang sedang diamati.

---

## M. RINGKASAN DAN PEMERIKSAAN PEMAHAMAN

| Konsep            | Inti yang perlu diingat                                                   |
| :---------------- | :------------------------------------------------------------------------ |
| Module            | Unit kode dengan namespace yang dapat diimpor                             |
| `import` / `from` | Membuat binding nama ke object module atau attribute-nya                  |
| Cache import      | Import normal dapat menggunakan object yang sudah berada di `sys.modules` |
| Main guard        | Memisahkan kode pemanggilan aplikasi dari pemakaian sebagai module        |
| Regular package   | Package dengan `__init__.py`, berisi module atau subpackage               |
| Relative import   | Mengacu pada konteks package melalui titik                                |
| `python -m`       | Menjalankan module/package melalui mekanisme pencarian module             |
| Cohesion          | Tujuan isi satu module saling berkaitan                                   |
| Coupling          | Ketergantungan antarbagian yang perlu dibuat jelas dan terkendali         |
| Refactoring       | Mengubah struktur sambil mempertahankan perilaku yang dijanjikan          |
