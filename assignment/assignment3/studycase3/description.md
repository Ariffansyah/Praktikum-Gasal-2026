# Assignment 3: Inheritance

**Tingkat:** Easy

Pada Live Practicum 3, kamu akan menyusun satu hierarki class sederhana yang terdiri dari parent class dan dua tingkat turunannya. Setiap kelas mendapatkan study case yang berbeda, tetapi semua case menguji ide yang sama.

## Tujuan Pembelajaran

Setelah menyelesaikan tugas ini, kamu diharapkan dapat:

- membuat child class yang mewarisi atribut dan method dari parent class;
- memanggil constructor parent melalui `super().__init__(...)`;
- melakukan method overriding untuk menyesuaikan perilaku warisan;
- memakai `super().nama_method()` agar perilaku parent tetap berjalan sebelum child menambahkan perilakunya;
- menyusun multilevel inheritance dan menjelaskan urutan penelusurannya;
- menjelaskan mengapa method parent yang memanggil method lain ikut berubah hasilnya setelah method tersebut dioverride.

## Cara Mengerjakan

1. Pilih kelas sesuai jadwal praktikum.
2. Baca kontrak setiap class dan urutan pemanggilan pada starter code.
3. Lengkapi bagian `TODO` saja. Jangan mengubah program utama.
4. Jalankan **Run** untuk mencoba program, lalu gunakan **Run Tests** untuk memeriksa semua kasus.

## Istilah Penting

- **Parent class** adalah class yang diwarisi. Istilah lainnya adalah base class atau superclass.
- **Child class** adalah class yang mewarisi. Istilah lainnya adalah derived class atau subclass.
- **`super()`** mengacu pada class berikutnya dalam urutan MRO. Pada hierarki sederhana, class tersebut adalah parent langsung.
- **Method overriding** terjadi ketika child menuliskan kembali method milik parent. Override dapat bersifat penuh, yaitu mengganti seluruh perilaku, atau tambahan, yaitu memanggil `super()` lebih dahulu.
- **Multilevel inheritance** adalah pewarisan bertingkat, misalnya `A` diwarisi `B`, lalu `B` diwarisi `C`. Class `C` otomatis mewarisi `A` juga.
- Ketika method parent memanggil method lain melalui `self`, method yang dijalankan adalah versi milik class object yang sebenarnya, bukan versi milik parent.

## Aturan

- Gunakan Python standar saja; tidak perlu library tambahan.
- Jangan mengubah nama class, method, parameter, label output, atau urutan pemanggilan program utama.
- Child class yang menuliskan `__init__()` sendiri wajib memanggil constructor parent. Jangan menyalin ulang pengisian atribut milik parent.
- Method yang dioverride dan diminta memakai `super()` tidak boleh menuliskan hasil akhirnya secara langsung.
- Operasi yang ditolak harus mengembalikan `False` dan tidak boleh mengubah state object.
- Counter class harus diubah melalui nama class, misalnya `NamaClass.total_object`.

## Checklist

- Apakah setiap constructor child memanggil `super().__init__(...)`?
- Apakah method yang dioverride menghasilkan teks atau nilai yang berbeda untuk setiap tingkat?
- Apakah method yang memakai `super()` benar-benar memanggil versi parent, bukan menyalin isinya?
- Apakah operasi gagal meninggalkan state object seperti sebelumnya?
- Apakah counter class tetap bernilai `1` karena hanya satu object yang dibuat?
- Apakah output memiliki label dan urutan yang sama dengan soal?
