# (Assignment 1): Peminjaman Buku Perpustakaan

**Tingkat:** Medium

Assignment ini menggunakan satu domain besar, yaitu pengelolaan buku perpustakaan, tetapi setiap mahasiswa mendapatkan satu sub study case. Semua variant memiliki tingkat kesulitan yang setara dan menguji pola yang sama: class, object, class attribute, instance attribute, public/protected/private attribute, name mangling, property validation, dan instance method.

Guide setiap variant sengaja ditulis dengan pola seperti soal LeetCode: ada tujuan, kontrak class, property, method, format input, format output, constraints, dan checklist. Baca kontrak sampai selesai sebelum mengubah starter code.

## Batas Scope

Assignment ini hanya menggunakan konsep berikut:

- class dan object/instance;
- constructor dan struktur class Python;
- class attribute dan instance attribute;
- public, protected, dan private secara konseptual;
- name mangling pada private attribute;
- property getter/setter untuk validasi data;
- instance method untuk membaca atau mengubah state object;
- pemodelan permasalahan perpustakaan sederhana.

Assignment ini tidak menggunakan inheritance, polymorphism, class method, static method, module tambahan, file, database, atau library eksternal.

## Aturan Sub Study Case

- Assignment ini memiliki delapan variant.
- Setiap variant memiliki delapan test case.
- Setiap test case menjalankan satu program dari kondisi awal yang baru, sehingga class counter dimulai dari nol pada setiap test case.
- Lengkapi hanya bagian `TODO` di dalam class. Jangan mengubah program utama, nama, signature, label output, atau format output.
- Kegagalan validasi harus ditangani sesuai kontrak method. Program tidak boleh berhenti karena input operasi yang invalid.

## Coba Kerangka Kode

Setelah sub study case dipilih, prompt lengkap dan starter code akan muncul pada playground di bawah. Gunakan alur berikut:

1. Baca spesifikasi attribute dan tentukan mana yang public, protected, dan private.
2. Implementasikan getter dan setter property terlebih dahulu.
3. Implementasikan instance method dengan memakai property, bukan mengubah private attribute secara sembarangan.
4. Periksa urutan operasi pada program utama.
5. Jalankan **Run Tests** dan baca detail test yang gagal.

Setelah mengerjakan tugas, semua mahasiswa diharapkan bisa mengisi survey [ini](https://forms.gle/BvBZVUGsP5BBaHxy9), cuma 3 pertanyaan kok
