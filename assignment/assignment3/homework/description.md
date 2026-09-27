# Assignment 3: Inheritance

**Tingkat:** Medium to Hard

## Yang Harus Diterapkan

Setiap variant meminta kamu untuk:

- menyusun hierarki class yang terdiri dari parent class dan turunannya;
- memanggil constructor parent, baik melalui `super().__init__(...)` maupun melalui nama class ketika soal memintanya;
- melakukan method overriding, termasuk override tambahan yang memakai `super()` dan override penuh yang mengganti seluruh perilaku parent;
- menerapkan multilevel inheritance, hierarchical inheritance, atau multiple inheritance sesuai variant;
- membuat object melalui `@classmethod` factory method yang memakai `cls(...)`;
- membuat validasi mandiri melalui `@staticmethod`;
- memakai class attribute untuk counter, batas, atau konfigurasi bersama;
- menjaga state ketika operasi ditolak dan mengembalikan nilai sesuai kontrak.

## Aturan Pengerjaan

- Masukkan NIM untuk memuat variant. Variant yang sama akan muncul lagi jika NIM yang sama digunakan.
- Lengkapi bagian `TODO` pada starter code. Program utama, signature, label output, dan test case tidak perlu diubah.
- Jangan menulis ulang atribut parent di dalam child. Gunakan constructor parent.
- Method yang dioverride dan diminta memakai `super()` tidak boleh menuliskan hasil akhirnya secara langsung. Misalnya, jika parent mengembalikan `1000` dan child harus menambah `1500`, tulis `super().nama_method() + 1500`, bukan `2500`.
- `@classmethod` harus membuat object melalui `cls(...)` agar tetap benar ketika dipanggil dari class turunan.
- `@staticmethod` tidak boleh bergantung pada `self` maupun `cls`.
- Jika operasi tidak valid, kembalikan `False` dan pertahankan state yang harus dipertahankan.
- Output dibandingkan secara tepat. Jangan menambahkan `print` lain.

## Saran Pengerjaan

1. Baca format input dan urutan operasi pada bagian paling bawah starter code.
2. Gambar dulu hierarki class-nya, lalu tentukan atribut mana milik parent dan mana milik child.
3. Kerjakan parent class sampai selesai sebelum berpindah ke child.
4. Kerjakan factory method dan static method setelah constructor parent benar.
5. Periksa method parent yang memanggil method lain melalui `self`. Method tersebut harus ikut berubah hasilnya setelah dioverride, tanpa kamu ubah isinya.
6. Jalankan **Run Tests**. Gunakan detail test yang gagal untuk membandingkan state dan output.

## Catatan tentang `super()` dan MRO

`super()` tidak selalu berarti parent langsung. `super()` mengacu pada class berikutnya dalam urutan MRO milik object yang sedang berjalan.

Pada variant yang memakai multiple inheritance, hal ini berpengaruh nyata. Jika dua parent sama-sama merupakan turunan dari satu base class, pemanggilan `super().__init__(...)` di dalam salah satu parent dapat menuju parent yang lain, bukan ke base class. Karena itu, beberapa variant secara sengaja meminta pemanggilan langsung melalui nama class, misalnya `Parent.__init__(self, ...)`.

Perhatikan baik-baik instruksi pada soal, karena pemilihan antara `super()` dan pemanggilan langsung bukan sekadar gaya penulisan.

## Penilaian Mandiri

Sebelum mengumpulkan, pastikan kamu dapat menjelaskan:

- mengapa child class yang menuliskan `__init__()` sendiri wajib memanggil constructor parent;
- perbedaan hasil antara override penuh dan override yang memakai `super()`;
- mengapa `self` tidak dituliskan pada `super().__init__(...)`, tetapi dituliskan pada `Parent.__init__(self, ...)`;
- mengapa factory memakai `cls`, bukan nama class yang ditulis langsung;
- bagaimana urutan MRO menentukan method mana yang dijalankan;
- bagian mana yang menjamin operasi gagal tidak merusak state object.
