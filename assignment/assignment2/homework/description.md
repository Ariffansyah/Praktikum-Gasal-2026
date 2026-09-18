# Assignment 2: Class Method, Static Method, dan Decorator

**Tingkat:** Medium to Hard

## Yang Harus Diterapkan

Setiap variant meminta kamu untuk:

- memakai class attribute untuk counter, kapasitas, atau konfigurasi bersama;
- membuat object melalui `@classmethod` factory method;
- membuat validasi mandiri melalui `@staticmethod`;
- menulis minimal dua custom decorator;
- melakukan chaining decorator pada method yang diberikan;
- menulis wrapper dengan `*args` dan `**kwargs`, lalu meneruskan keduanya ke function asli;
- menjaga state ketika operasi ditolak dan mengembalikan nilai sesuai kontrak.

## Aturan Pengerjaan

- Masukkan NIM untuk memuat variant. Variant yang sama akan muncul lagi jika NIM yang sama digunakan.
- Lengkapi bagian `TODO` pada starter code. Program utama, signature, label output, dan test case tidak perlu diubah.
- Jangan memakai inheritance atau library tambahan.
- Jangan menghapus decorator yang sudah ditempatkan pada starter code.
- `@classmethod` harus dipanggil melalui class dan `@staticmethod` tidak boleh bergantung pada `self` atau `cls`.
- Pada decorator, `args` dan `kwargs` harus diteruskan ke function asli. Jangan mengganti pemanggilan `func(*args, **kwargs)` dengan nilai yang diambil secara khusus dari satu test case.
- Jika operasi tidak valid, kembalikan `False` atau hasil yang diminta dan pertahankan state yang harus dipertahankan.
- Output dibandingkan secara tepat. Jangan menambahkan `print` lain.

## Saran Pengerjaan

1. Baca format input dan urutan operasi pada bagian paling bawah starter code.
2. Kerjakan factory method dan static method terlebih dahulu.
3. Kerjakan wrapper decorator satu per satu. Uji dengan pemanggilan positional dan keyword.
4. Periksa urutan decorator pada method yang dihias.
5. Jalankan **Run Tests**. Gunakan detail test yang gagal untuk membandingkan state dan output.
6. Pastikan counter class tidak menjadi counter object dan tidak menyimpan state dari test case sebelumnya.

## Penilaian Mandiri

Sebelum mengumpulkan, pastikan kamu dapat menjelaskan:

- mengapa factory memakai `cls`, bukan nama class yang ditulis langsung;
- mengapa validator tidak membutuhkan `self`;
- decorator mana yang menerima hasil dari decorator berikutnya saat chaining;
- mengapa `*args` dan `**kwargs` membuat decorator lebih fleksibel;
- bagian mana yang menjamin operasi gagal tidak merusak state object.
