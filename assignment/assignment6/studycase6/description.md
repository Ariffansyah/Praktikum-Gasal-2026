# Live Practicum 6: Modular programming, packages, and maintainable project structure

**Tingkat:** Easy to Medium

Ketiga kelas membangun package dengan struktur dan beban pengerjaan setara. Domainnya adalah layanan cetak, tarif parkir, dan honor kegiatan. Model data, parser, serta alur `main()` sudah diberikan agar kamu dapat berfokus pada pembagian tanggung jawab dan import antarmodule.

## Tujuan pembelajaran

- Menghubungkan module dalam regular package menggunakan relative import.
- Memisahkan perhitungan, service, formatter, dan input/output CLI.
- Mengekspor public API melalui `__init__.py` tanpa menyalin definisi function atau class.
- Menyediakan main guard dan `__main__.py` untuk menjalankan package dengan `python -m`.
- Membuat service yang tidak mencetak, tidak mengubah input, dan aman dipanggil berulang.

## Cara mengerjakan

1. Pilih kelas yang benar dan baca kontrak file beserta format input varianmu.
2. Pada dictionary `FILES`, lengkapi TODO di dalam string isi file. Pertahankan nama file, signature, model data, parser, dan alur `main()` yang sudah diberikan.
3. Lengkapi perhitungan pada `rules.py`, import dan service pada `services.py`, formatter, public API, serta main guard CLI dan package.
4. Pertahankan harness setelah dictionary `FILES`. Harness akan membuat file asli, mengimpor package, memanggil service dua kali, dan menjalankan kedua entry point. Jangan mengganti harness dengan output yang diketik langsung.
5. Gunakan **Run Tests** untuk menjalankan delapan input resmi. Tombol **Run** tidak menyediakan stdin otomatis.
6. Setelah lulus, gunakan **Save File** dan ikuti instruksi pengumpulan/presensi pengajar.

## Aturan desain

- Model dan helper tidak mengimpor CLI. Hindari circular import dan perubahan `sys.path` di file aplikasi.
- Public API mengekspor function asli dari `services.py` dan class asli dari `models.py`.
- Service mengembalikan list baru setiap pemanggilan, mempertahankan urutan input, serta tidak mengubah data atau opsi yang diterima.
- Formatter menghasilkan list string. Hanya CLI yang mencetak laporan; import biasa tidak membaca stdin atau mencetak.
- Gunakan Python standard library saja. File pada `FILES` tetap berupa source Python yang dapat diekspor menjadi proyek mandiri.

## Jalankan sebagai proyek lokal

Simpan unduhan sebagai `jawaban.py`, atau sesuaikan perintah dengan namanya:

```text
python jawaban.py --export proyek_live6
cd proyek_live6
```

Folder tujuan ekspor harus belum ada. Di dalamnya tersedia README dengan nama package dan perintah yang sesuai varian. Pada PowerShell, jalankan `Get-Content contoh_input.txt | python -m nama_package`, lalu `python -m unittest discover -s tests -v`.

Tiga unit test memeriksa contoh utama, data kosong, serta pemanggilan ulang dan input yang tidak berubah. File hasil ekspor tetap perlu ditinjau: pengajar memeriksa penempatan tanggung jawab, penggunaan import, public API, dan main guard selain hasil test.
