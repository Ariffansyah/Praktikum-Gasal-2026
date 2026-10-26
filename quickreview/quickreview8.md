---
title: Quick Review 8
layout: default
parent: Quick Review
tampil: true
nav_order: 5
---

# Quick Review - Chapter 8

Recall singkat sebelum masuk ke study case. Fokusnya adalah membagi program menjadi module, menghubungkannya melalui import, dan menyusun package yang mudah dijalankan serta diuji. Penjelasan lengkap ada pada [Chapter 8 - Modular programming, packages, and maintainable project structure]({{ '/readings-chapter8/' | relative_url }}).

## Main topics

1. **Module dan namespace**
   - Module adalah unit kode yang dapat diimpor; contoh paling umum adalah file `.py`.
   - Satu module boleh berisi beberapa function dan class yang memiliki tujuan bersama.
   - `penilaian.hitung_nilai()` memperjelas bahwa function berasal dari module `penilaian`.
   - Tulis `import penilaian`, bukan `import penilaian.py`.

2. **Bentuk import**
   - `import penilaian`: panggil `penilaian.hitung_nilai()`.
   - `import penilaian as nilai`: panggil `nilai.hitung_nilai()`; alias tidak menyalin module.
   - `from penilaian import hitung_nilai`: panggil `hitung_nilai()` langsung.
   - Hindari wildcard import `*` pada kode aplikasi agar asal nama tetap jelas.

3. **Cache import dan state**
   - Import normal pertama menjalankan kode top-level. Import berikutnya dengan nama module yang sama biasanya mengambil object dari `sys.modules`.
   - `from aturan import BATAS_SKS` membuat binding lokal. Rebinding `aturan.BATAS_SKS` tidak otomatis mengganti binding lokal itu.
   - Dua nama masih dapat menunjuk object mutable yang sama; mengubah isi list berbeda dari mengganti binding nama ke list baru.
   - Kirim data melalui argumen dan nilai kembalian; jangan menjadikan perubahan global lintas module sebagai alur utama aplikasi.

4. **Main guard dan entry point**
   - Saat module dijalankan sebagai program, `__name__` bernilai `'__main__'`.
   - `if __name__ == '__main__':` membatasi kapan blok pemanggilan aplikasi dijalankan.
   - Guard tidak mencegah statement top-level lain berjalan saat import.
   - `main()` adalah nama function berdasarkan konvensi, bukan kata kunci Python.

5. **Package dan jalur import**
   - Contoh regular package memakai folder dengan `__init__.py`. Namespace package merupakan bentuk lain yang dapat tidak memiliki file tersebut.
   - Absolute import: `from kampusnilai.models import Mahasiswa`.
   - Relative import di dalam package: `from .models import Mahasiswa`; titik mengacu pada konteks package.
   - Jalankan package dari root contoh dengan `python -m kampusnilai`, bukan langsung menjalankan file internal yang memakai relative import.

6. **Struktur yang dapat dipelihara**
   - Cohesion: isi satu module memiliki tujuan yang berkaitan. Coupling: dependency antarbagian dibuat jelas dan terkendali.
   - Pisahkan data/model, kebijakan perhitungan, service, dan tampilan CLI.
   - Jika dua module saling mengimpor dan membutuhkan nama yang belum selesai dibuat, circular import dapat menghasilkan error partially initialized module.
   - Pengujian memastikan perilaku tetap benar setelah kode dipindahkan. README menjelaskan interpreter, root kerja, dan perintah yang dapat diulangi.

7. **Environment dan distribusi**
   - Import package adalah namespace pada `import`; distribution package adalah software yang dapat dipasang, misalnya melalui `pip`. Namanya tidak harus sama.
   - Virtual environment memisahkan lingkungan instalasi, tetapi tidak otomatis membenarkan jalur import proyek.
   - Contoh Chapter 8 menggunakan flat layout dan standard library; tidak memerlukan instalasi library tambahan.
   - Memindahkan package ke folder `src` memerlukan penyiapan proyek yang sesuai; memindahkan folder saja belum cukup.

### Tiga nama yang jangan tertukar

| Nama | Peran |
| :-- | :-- |
| `__init__.py` | File inisialisasi regular package; boleh kosong atau menyediakan public API |
| `__init__()` | Method inisialisasi instance class |
| `__main__.py` | Entry point package ketika dijalankan dengan `python -m nama_package` |

## Pro Tip

1. Tentukan tanggung jawab setiap file sebelum memindahkan kode. Hindari file `utils.py` yang menampung semua hal tanpa tujuan bersama.
2. Buat entry point yang tipis; rumus dan operasi utama tetap berada pada module yang dapat diimpor dan diuji.
3. Hindari nama file seperti `json.py`, `typing.py`, atau nama library yang sedang digunakan karena dapat membayangi module yang dimaksud.
4. Jika import gagal, periksa nama module, folder kerja, interpreter, dan arah dependency sebelum menambahkan `sys.path` secara manual.
5. Simpan source, test, dan dokumentasi ke Git; environment serta cache seperti `.venv/` dan `__pycache__/` dapat dibuat ulang.

## Playground: import package dan jalankan entry point

Playground ini membuat empat file sementara dalam lingkungan Python browser. Contoh hanya memakai function agar alur import mudah diamati; class juga dapat dipisahkan dengan cara yang sama. Nilai tugas dan ujian diasumsikan integer `0..100`, dengan bobot 40:60 dan pembulatan ke bawah.

```text
root_proyek/
    qr8demo/
        __init__.py       -> mengekspor hitung_nilai
        penilaian.py      -> menghitung nilai
        cli.py            -> menampilkan hasil
        __main__.py       -> memanggil entry point CLI
```

{% include pyodide-exercise.html id="quickreview-ch8-playground" title="Chapter 8 - Module, package, dan entry point" prompt="Jalankan kode terlebih dahulu. Amati bahwa import package dan CLI tidak mencetak hasil, alias menunjuk module yang sama, dan entry point baru dijalankan pada langkah terakhir. Ubah isi file pada dictionary files untuk bereksperimen, lalu gunakan Reset untuk kembali." starter="from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
from tempfile import TemporaryDirectory
import importlib
import runpy
import sys


files = {
    'qr8demo/__init__.py': '''from .penilaian import hitung_nilai
''',
    'qr8demo/penilaian.py': '''def hitung_nilai(tugas, ujian):
    return (40 * tugas + 60 * ujian) // 100
''',
    'qr8demo/cli.py': '''from .penilaian import hitung_nilai

def main():
    print('CLI:', hitung_nilai(80, 90))

if __name__ == '__main__':
    main()
''',
    'qr8demo/__main__.py': '''from .cli import main

if __name__ == '__main__':
    main()
''',
}


def bersihkan_contoh():
    for name in list(sys.modules):
        if name == 'qr8demo' or name.startswith('qr8demo.'):
            sys.modules.pop(name, None)


# Infrastruktur untuk menyediakan beberapa file dalam satu editor.
bersihkan_contoh()
with TemporaryDirectory() as folder:
    root = Path(folder)
    for name, source in files.items():
        path = root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(source, encoding='utf-8')

    sys.path.insert(0, folder)
    importlib.invalidate_caches()
    try:
        buffer = StringIO()
        with redirect_stdout(buffer):
            import qr8demo
            import qr8demo.cli

        import qr8demo.penilaian as nilai
        from qr8demo import hitung_nilai
        from qr8demo import penilaian as alias

        print('Import tanpa output:', buffer.getvalue() == '')
        print('Nama module:', nilai.__name__)
        print('Cache sama:', nilai is alias)
        print('Nilai lewat API:', hitung_nilai(80, 90))
        print('Entry point:')
        runpy.run_module('qr8demo', run_name='__main__')
    finally:
        sys.path.remove(folder)
        bersihkan_contoh()
        importlib.invalidate_caches()
" %}

### Output awal

```text
Import tanpa output: True
Nama module: qr8demo.penilaian
Cache sama: True
Nilai lewat API: 86
Entry point:
CLI: 86
```

`runpy` dan folder sementara dipakai agar eksperimen beberapa file dapat berjalan dalam satu editor. Pada proyek lokal dengan struktur di atas, jalankan **`python -m qr8demo` dari `root_proyek`**. Tidak perlu menyalin infrastruktur editor atau pembersihan cache ke aplikasi biasa.

### Coba dan jelaskan

1. Ubah bobot pada `penilaian.py` menjadi 70:30. Mengapa output API dan CLI sama-sama berubah menjadi `83`?
2. Hapus main guard pada isi `cli.py` sehingga `main()` langsung dipanggil saat import. Mengapa `Import tanpa output` berubah menjadi `False`?
3. Hapus baris ekspor pada `__init__.py`. Mengapa `from qr8demo import hitung_nilai` tidak lagi bekerja, sedangkan import dari `qr8demo.penilaian` masih dapat dipakai?
4. Jalankan playground dua kali tanpa perubahan. Mengapa hasilnya tetap sama setelah file dan cache contoh dibersihkan?

## Checklist sebelum study case

- Pastikan nama module dan package sesuai dengan struktur file, tanpa menuliskan `.py` pada statement import.
- Pisahkan definisi yang dapat digunakan ulang dari kode yang menjalankan aplikasi.
- Jalankan perintah dari root proyek dengan interpreter yang sesuai.
- Periksa relative import dan main guard jika file internal package gagal dijalankan langsung.
- Jaga arah dependency; model tidak perlu mengetahui CLI yang memakai model tersebut.
- Jalankan pengujian setelah refactoring; periksa daftar kosong, rumus, dan state yang tidak boleh berubah.
- Tulis cara menjalankan aplikasi dan pengujian di README.

Untuk proyek lengkap Chapter 8, perintah pengujiannya adalah `python -m unittest discover -s tests -v` dari root proyek contoh.
