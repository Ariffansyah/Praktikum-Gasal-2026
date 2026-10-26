# Homework 6: Modular programming, packages, and maintainable project structure

**Tingkat:** Medium to Hard

Bangun package yang dapat digunakan sebagai library dan aplikasi CLI. Delapan varian memiliki domain, aturan perhitungan, dan dependency berbeda. Struktur proyek, model, parser, serta helper yang disebutkan dalam spesifikasi sudah disediakan.

## Cakupan varian

| Varian | Domain | Fokus tambahan |
| :-- | :-- | :-- |
| 1 | Rekap nilai | Alias import dua kebijakan bernama sama, filter, dan pengurutan |
| 2 | Inventaris | Dependency satu arah, agregasi mutasi, dan filter setelah agregasi |
| 3 | Presensi | Konfigurasi terpisah dan deduplikasi peserta hadir |
| 4 | Checkout | Public API, pemisahan harga dan diskon, serta footer total |
| 5 | Arsip | Subpackage kebijakan, deduplikasi dokumen, dan pengurutan |
| 6 | Pengumuman | Subpackage formatter teks/CSV, template, dan filter kelas |
| 7 | Ranking bacaan | Utilitas normalisasi, agregasi, dan ranking dengan batas hasil |
| 8 | Pengiriman | Subpackage tarif, alias import, pembulatan berat, dan pilihan urutan |

## Aturan pengerjaan

- Masukkan NIM dan kelas yang benar. NIM yang sama mendapat varian yang sama selama konfigurasi assignment tetap.
- Lengkapi TODO **di dalam string isi file pada `FILES`**. Editor memakai satu bundle Python untuk membangun proyek beberapa file; dictionary tersebut berisi source file sebenarnya.
- Pertahankan nama file, nama function/class, signature, parser, model, helper yang diberikan, alur `main()`, serta harness di bawah dictionary.
- Gunakan relative import dan alias sesuai kontrak varian. Jangan memindahkan seluruh logika ke CLI, menyalin helper ke service, atau mengubah `sys.path` dalam aplikasi.
- Ekspor function service dan model asli melalui public API `__init__.py`. CLI menggunakan API tersebut. Lengkapi main guard dan entry point `__main__.py`.
- Service menerima data dan opsi, mengembalikan list baru setiap pemanggilan, tidak mengubah input, serta tidak membaca stdin atau mencetak. Formatter mengembalikan list string; hanya CLI yang mencetak.
- Ikuti aturan varian tentang deduplikasi, filter, agregasi, pembulatan, dan pengurutan. Perhatikan apakah filter diterapkan sebelum atau sesudah agregasi.
- Gunakan Python standard library saja. Import package atau CLI tidak menjalankan aplikasi.

## Arti pemeriksaan browser

Setiap kasus menjalankan package di filesystem sementara. Label output memeriksa import tanpa output, asal public API, identitas model yang diekspor, service tanpa output, kesamaan hasil dua pemanggilan, input yang tetap, serta list hasil yang baru. Hasil CLI dan entry point package harus sama dengan hasil formatter service.

Gunakan **Run Tests** untuk delapan kasus resmi. **Run** tidak otomatis mengisi stdin. Jika TODO import belum selesai, `ImportError`, `AttributeError`, atau `NameError` dapat muncul sebelum perhitungan diperiksa. Lengkapi dependency yang diperlukan terlebih dahulu.

Test perilaku tidak membuktikan seluruh desain benar. Pengajar juga memeriksa penempatan kode, arah dependency, penggunaan helper/alias, struktur package, serta public API.

## Ekspor, uji, dan kumpulkan

1. Unduh bundle melalui **Save File**. Jalankan `python jawaban.py --export proyek_homework6`, dengan nama file unduhanmu sebagai pengganti `jawaban.py`. Folder tujuan harus belum ada.
2. Masuk ke folder hasil ekspor. Baca README untuk nama package dan format input varianmu.
3. Pada PowerShell, jalankan `Get-Content contoh_input.txt | python -m nama_package`. Entry point module `python -m nama_package.cli` juga harus menghasilkan laporan yang sama.
4. Jalankan `python -m unittest discover -s tests -v`. Tiga test yang diberikan memeriksa contoh utama, data kosong, serta pengulangan dan input yang tidak berubah. Tambahkan kasus lokal bila diperlukan oleh aturan varian.
5. Ikuti arahan pengajar untuk mengumpulkan bundle Python dan/atau folder proyek. Save File dan kelulusan test tidak otomatis mengirim tugas.

Folder ekspor sudah menyertakan package, README, contoh input/output, `.gitignore`, dan unit test. Jangan ikut mengumpulkan cache `__pycache__` atau virtual environment.

## Penjelasan yang harus dapat kamu berikan

1. Module mana yang memiliki aturan domain, dan mana yang menangani input/output?
2. Apa arah dependency antarmodule, dan mengapa tidak membentuk circular import?
3. Apa yang diekspor oleh public API, dan bagaimana CLI memakainya?
4. Mengapa import biasa tidak menjalankan CLI, sedangkan `python -m nama_package` menjalankannya?
5. Apa yang menjaga hasil pemanggilan ulang tetap konsisten tanpa mengubah input?
