---
title: Study Case 1
layout: default
parent: Assignment
printtitle: Study Case 1 - Peminjaman Buku Perpustakaan
nav_order: 2
tampil: true
isdebug: false
assignment_id: assignment1-kelas-a
variant_version: 2
variants:
  - id: v1
    title: Variant 1 - Peminjaman dan Pengembalian Buku
    brief: |
      Modelkan stok buku yang dapat dipinjam dan dikembalikan. Kamu akan mengelola dua perubahan state dalam satu object.
    prompt: |
      Tugas

      Implementasikan class `Buku` untuk memodelkan proses peminjaman dan pengembalian buku. Satu input akan membuat satu object, menjalankan satu percobaan peminjaman, lalu menjalankan satu percobaan pengembalian.

      1. Tujuan Pembelajaran

      Terapkan class attribute, instance attribute, public attribute, protected attribute, private attribute dengan name mangling, property getter/setter, dan instance method.

      2. Spesifikasi Class

      Gunakan class bernama `Buku` dengan constructor `__init__(self, judul, penulis, stok=1)`.

      - `total_buku = 0` adalah class attribute. Tambahkan tepat satu setiap object `Buku` dibuat.
      - `batas_peminjaman = 3` adalah class attribute. Satu pemanggilan `pinjam` tidak boleh memproses lebih dari batas ini.
      - `judul` dan `penulis` adalah public instance attribute.
      - `_status` dan `_jumlah_dipinjam` adalah protected instance attribute.
      - `__stok` adalah private instance attribute. Jangan menyimpan stok langsung pada `self.stok` tanpa property.

      3. Property `stok`

      Buat getter dan setter `stok`.

      - Stok harus berupa bilangan bulat yang tidak negatif.
      - Setter harus menghasilkan `ValueError("Stok tidak boleh negatif.")` jika nilai kurang dari nol.
      - Method lain harus mengubah stok melalui property `stok`.
      - Di dalam class, private attribute diakses sebagai `self.__stok`. Python akan melakukan name mangling terhadap nama tersebut.

      4. Method

      Buat instance method berikut.

      - `pinjam(jumlah)` mengembalikan `True` jika `jumlah` lebih dari nol, tidak lebih besar dari stok, dan tidak lebih besar dari `batas_peminjaman`. Jika berhasil, kurangi stok dan tambah `_jumlah_dipinjam`. Jika gagal, kembalikan `False` tanpa mengubah state.
      - `kembalikan(jumlah)` mengembalikan `True` jika `jumlah` lebih dari nol dan tidak lebih besar dari `_jumlah_dipinjam`. Jika berhasil, tambah stok dan kurangi `_jumlah_dipinjam`. Jika gagal, kembalikan `False` tanpa mengubah state.
      - `status()` mengembalikan `"Dipinjam"` jika masih ada buku yang sedang dipinjam, dan `"Tersedia"` jika tidak ada.
      - `jumlah_dipinjam()` mengembalikan jumlah buku yang sedang dipinjam.

      Status harus diperbarui setelah operasi yang berhasil. Operasi pengembalian tidak boleh mengembalikan buku yang belum dipinjam.

      5. Program Utama

      Jangan mengubah bagian program utama pada starter code.

      Format Input:
      `judul penulis stok jumlah_pinjam jumlah_kembali`

      `judul` dan `penulis` menggunakan underscore sebagai pengganti spasi. Program utama sudah mengubah underscore menjadi spasi.

      Format Output harus tepat delapan baris sesuai starter code:
      `Judul`, `Penulis`, `Stok Tersisa`, `Jumlah Dipinjam`, `Pinjam Berhasil`, `Kembali Berhasil`, `Status`, dan `Total Buku`.

      6. Constraints

      - `stok`, `jumlah_pinjam`, dan `jumlah_kembali` dibaca sebagai integer.
      - Nilai jumlah operasi dapat nol atau negatif. Tangani nilai tersebut dengan mengembalikan `False`, bukan dengan mengubah state.
      - Jangan menambahkan print lain karena output dibandingkan secara tepat.
      - Jangan mengganti nama class, attribute, property, method, signature, atau format output.

      7. Checklist sebelum Run Tests

      - Class attribute `total_buku` berubah pada tingkat class, bukan hanya pada object.
      - `__stok` benar-benar private dan diakses melalui property.
      - Kegagalan peminjaman dan pengembalian tidak mengubah state.
      - Dua operasi diproses berurutan pada object yang sama.
      - Semua output memiliki label dan kapitalisasi yang sama dengan starter code.

    starter: |
      class Buku:
          total_buku = 0
          batas_peminjaman = 3

          def __init__(self, judul, penulis, stok=1):
              self.judul = judul
              self.penulis = penulis
              self._status = "Tersedia"
              self._jumlah_dipinjam = 0
              Buku.total_buku += 1
              self.stok = stok

          @property
          def stok(self):
              # TODO: kembalikan __stok
              pass

          @stok.setter
          def stok(self, nilai):
              # TODO: validasi stok tidak negatif, lalu simpan ke __stok
              pass

          def pinjam(self, jumlah):
              # TODO: ubah state jika jumlah valid dan stok mencukupi
              pass

          def kembalikan(self, jumlah):
              # TODO: kembalikan buku yang sedang dipinjam
              pass

          def status(self):
              # TODO: kembalikan status buku
              pass

          def jumlah_dipinjam(self):
              # TODO: kembalikan jumlah buku yang sedang dipinjam
              pass


      judul, penulis, stok, jumlah_pinjam, jumlah_kembali = input().split()
      buku = Buku(judul.replace("_", " "), penulis.replace("_", " "), int(stok))
      berhasil_pinjam = buku.pinjam(int(jumlah_pinjam))
      berhasil_kembali = buku.kembalikan(int(jumlah_kembali))

      print(f"Judul: {buku.judul}")
      print(f"Penulis: {buku.penulis}")
      print(f"Stok Tersisa: {buku.stok}")
      print(f"Jumlah Dipinjam: {buku.jumlah_dipinjam()}")
      print(f"Pinjam Berhasil: {berhasil_pinjam}")
      print(f"Kembali Berhasil: {berhasil_kembali}")
      print(f"Status: {buku.status()}")
      print(f"Total Buku: {Buku.total_buku}")
    tests: |
      Laskar_Pelangi Andrea_Hirata 3 2 1
      @@OUTPUT@@
      Judul: Laskar Pelangi
      Penulis: Andrea Hirata
      Stok Tersisa: 2
      Jumlah Dipinjam: 1
      Pinjam Berhasil: True
      Kembali Berhasil: True
      Status: Dipinjam
      Total Buku: 1
      @@CASE@@
      Bumi_Manusia Pramoedya 0 1 0
      @@OUTPUT@@
      Judul: Bumi Manusia
      Penulis: Pramoedya
      Stok Tersisa: 0
      Jumlah Dipinjam: 0
      Pinjam Berhasil: False
      Kembali Berhasil: False
      Status: Tersedia
      Total Buku: 1
      @@CASE@@
      Negeri_5_Menara Ahmad_Fuadi 1 1 1
      @@OUTPUT@@
      Judul: Negeri 5 Menara
      Penulis: Ahmad Fuadi
      Stok Tersisa: 1
      Jumlah Dipinjam: 0
      Pinjam Berhasil: True
      Kembali Berhasil: True
      Status: Tersedia
      Total Buku: 1
      @@CASE@@
      Laut_Bercerita Leila_S_Chudori 5 0 3
      @@OUTPUT@@
      Judul: Laut Bercerita
      Penulis: Leila S Chudori
      Stok Tersisa: 5
      Jumlah Dipinjam: 0
      Pinjam Berhasil: False
      Kembali Berhasil: False
      Status: Tersedia
      Total Buku: 1
      @@CASE@@
      Ronggeng_Dukuh_Paruk Ahmad_Tohari 2 3 0
      @@OUTPUT@@
      Judul: Ronggeng Dukuh Paruk
      Penulis: Ahmad Tohari
      Stok Tersisa: 2
      Jumlah Dipinjam: 0
      Pinjam Berhasil: False
      Kembali Berhasil: False
      Status: Tersedia
      Total Buku: 1
      @@CASE@@
      Cantik_Itu_Luka Eka_Kurniawan 4 2 5
      @@OUTPUT@@
      Judul: Cantik Itu Luka
      Penulis: Eka Kurniawan
      Stok Tersisa: 2
      Jumlah Dipinjam: 2
      Pinjam Berhasil: True
      Kembali Berhasil: False
      Status: Dipinjam
      Total Buku: 1
      @@CASE@@
      Perahu_Kertas Dee_Lestari 2 -1 1
      @@OUTPUT@@
      Judul: Perahu Kertas
      Penulis: Dee Lestari
      Stok Tersisa: 2
      Jumlah Dipinjam: 0
      Pinjam Berhasil: False
      Kembali Berhasil: False
      Status: Tersedia
      Total Buku: 1
      @@CASE@@
      Buku_Pulang Rani 6 3 1
      @@OUTPUT@@
      Judul: Buku Pulang
      Penulis: Rani
      Stok Tersisa: 4
      Jumlah Dipinjam: 2
      Pinjam Berhasil: True
      Kembali Berhasil: True
      Status: Dipinjam
      Total Buku: 1

  - id: v2
    title: Variant 2 - Progress Membaca Buku
    brief: |
      Modelkan halaman, progress membaca, dan status bacaan. Satu object menerima satu pembaruan progress melalui property yang tervalidasi.
    prompt: |
      Tugas

      Implementasikan class `Buku` untuk mengelola progress membaca sebuah buku. Program membuat satu object, mencoba menambah progress membaca, lalu menghitung sisa halaman.

      1. Tujuan Pembelajaran

      Gunakan class attribute, instance attribute, protected state, private state, property dengan validasi, dan instance method yang mengubah state secara terkontrol.

      2. Spesifikasi Class

      Gunakan class bernama `Buku` dengan constructor `__init__(self, judul, kategori, halaman, progres_awal=0)`.

      - `total_koleksi = 0` adalah class attribute. Tambahkan satu saat object dibuat.
      - `maksimal_progress = 100` adalah class attribute.
      - `judul` dan `kategori` adalah public instance attribute.
      - `_status` adalah protected instance attribute.
      - `__halaman` dan `__progres` adalah private instance attribute.

      3. Property dan Validasi

      Buat getter dan setter untuk `halaman` dan `progres`.

      - `halaman` harus berupa bilangan bulat minimal 1. Nilai kurang dari 1 menghasilkan `ValueError("Jumlah halaman minimal 1.")`.
      - `progres` harus berada pada rentang 0 sampai 100, termasuk kedua batas. Nilai di luar rentang menghasilkan `ValueError("Progress harus berada pada rentang 0 sampai 100.")`.
      - Gunakan `self.__halaman` dan `self.__progres` di dalam property. Nama private tersebut mengalami name mangling.
      - Constructor harus mengisi nilai melalui property, bukan menulis langsung ke private attribute.

      4. Method

      Buat instance method berikut.

      - `baca(persen)` menambah progress sebesar `persen`. Jika `persen` kurang dari atau sama dengan nol, atau progress baru lebih dari 100, kembalikan `False` tanpa mengubah progress. Jika valid, simpan progress baru melalui property dan kembalikan `True`.
      - Jika `baca` berhasil, set `_status` menjadi `"Selesai"` ketika progress 100, atau `"Dibaca"` ketika progress kurang dari 100.
      - `halaman_tersisa()` mengembalikan `halaman * (100 - progres) // 100`.
      - `status()` mengembalikan nilai `_status`. Progress awal 0 berarti `"Belum Dibaca"`, progress awal 100 berarti `"Selesai"`, dan progress awal di antaranya berarti `"Dibaca"`.

      5. Program Utama

      Format Input:
      `judul kategori halaman progres_awal tambahan_progress`

      Program utama sudah mengubah underscore pada judul menjadi spasi. Jangan mengubah urutan operasi atau format output.

      Format Output harus tepat tujuh baris: `Judul`, `Kategori`, `Halaman`, `Progres`, `Status`, `Halaman Tersisa`, dan `Total Koleksi`.

      6. Constraints dan Aturan

      - Semua nilai numerik pada input dibaca sebagai integer.
      - Kegagalan update harus mengembalikan `False`, bukan membuat program berhenti.
      - Jangan menambahkan print atau mengubah label output.
      - Jangan menggunakan inheritance, classmethod, staticmethod, atau library tambahan.

      7. Checklist sebelum Run Tests

      - Ada dua private attribute yang diakses melalui property.
      - Setter memvalidasi nilai sebelum menyimpannya.
      - `baca` memproses progress melalui property.
      - Progress yang gagal tidak mengubah progress sebelumnya.
      - Perhitungan halaman tersisa menggunakan pembagian bulat `//`.

    starter: |
      class Buku:
          total_koleksi = 0
          maksimal_progress = 100

          def __init__(self, judul, kategori, halaman, progres_awal=0):
              self.judul = judul
              self.kategori = kategori
              self._status = "Belum Dibaca"
              Buku.total_koleksi += 1
              self.halaman = halaman
              self.progres = progres_awal
              if self.progres == 100:
                  self._status = "Selesai"
              elif self.progres > 0:
                  self._status = "Dibaca"

          @property
          def halaman(self):
              # TODO: kembalikan __halaman
              pass

          @halaman.setter
          def halaman(self, nilai):
              # TODO: validasi halaman minimal 1
              pass

          @property
          def progres(self):
              # TODO: kembalikan __progres
              pass

          @progres.setter
          def progres(self, nilai):
              # TODO: validasi 0 sampai 100
              pass

          def baca(self, persen):
              # TODO: tambah progress melalui property dan perbarui status
              pass

          def halaman_tersisa(self):
              # TODO: hitung halaman yang belum dibaca
              pass

          def status(self):
              # TODO: kembalikan status
              pass


      judul, kategori, halaman, progres_awal, tambahan = input().split()
      buku = Buku(judul.replace("_", " "), kategori, int(halaman), int(progres_awal))
      berhasil = buku.baca(int(tambahan))

      print(f"Judul: {buku.judul}")
      print(f"Kategori: {buku.kategori}")
      print(f"Halaman: {buku.halaman}")
      print(f"Progres: {buku.progres}")
      print(f"Status: {buku.status()}")
      print(f"Halaman Tersisa: {buku.halaman_tersisa()}")
      print(f"Total Koleksi: {Buku.total_koleksi}")
    tests: |
      Laut_Senja Novel 200 0 25
      @@OUTPUT@@
      Judul: Laut Senja
      Kategori: Novel
      Halaman: 200
      Progres: 25
      Status: Dibaca
      Halaman Tersisa: 150
      Total Koleksi: 1
      @@CASE@@
      Jejak_Hujan Puisi 100 75 25
      @@OUTPUT@@
      Judul: Jejak Hujan
      Kategori: Puisi
      Halaman: 100
      Progres: 100
      Status: Selesai
      Halaman Tersisa: 0
      Total Koleksi: 1
      @@CASE@@
      Ruang_Biru Fiksi 1 99 1
      @@OUTPUT@@
      Judul: Ruang Biru
      Kategori: Fiksi
      Halaman: 1
      Progres: 100
      Status: Selesai
      Halaman Tersisa: 0
      Total Koleksi: 1
      @@CASE@@
      Peta_Waktu Referensi 80 100 10
      @@OUTPUT@@
      Judul: Peta Waktu
      Kategori: Referensi
      Halaman: 80
      Progres: 100
      Status: Selesai
      Halaman Tersisa: 0
      Total Koleksi: 1
      @@CASE@@
      Taman_Rahasia Novel 50 0 0
      @@OUTPUT@@
      Judul: Taman Rahasia
      Kategori: Novel
      Halaman: 50
      Progres: 0
      Status: Belum Dibaca
      Halaman Tersisa: 50
      Total Koleksi: 1
      @@CASE@@
      Nada_Malam Puisi 120 40 70
      @@OUTPUT@@
      Judul: Nada Malam
      Kategori: Puisi
      Halaman: 120
      Progres: 40
      Status: Dibaca
      Halaman Tersisa: 72
      Total Koleksi: 1
      @@CASE@@
      Buku_Kecil Fiksi 300 20 -5
      @@OUTPUT@@
      Judul: Buku Kecil
      Kategori: Fiksi
      Halaman: 300
      Progres: 20
      Status: Dibaca
      Halaman Tersisa: 240
      Total Koleksi: 1
      @@CASE@@
      Modul_Akhir Referensi 10 50 50
      @@OUTPUT@@
      Judul: Modul Akhir
      Kategori: Referensi
      Halaman: 10
      Progres: 100
      Status: Selesai
      Halaman Tersisa: 0
      Total Koleksi: 1

  - id: v3
    title: Variant 3 - Pengembalian dan Denda
    brief: |
      Modelkan pengembalian buku, denda keterlambatan, pembayaran sebagian, dan validasi tahun terbit pada satu object.
    prompt: |
      Tugas

      Implementasikan class `Buku` untuk mengelola pengembalian buku dan denda. Program akan mencatat satu proses pengembalian, menerima satu pembayaran, lalu menampilkan status pembayaran.

      1. Tujuan Pembelajaran

      Terapkan class attribute, public attribute, protected attribute, private attribute, read-only property, property setter, dan beberapa instance method yang bekerja pada state object yang sama.

      2. Spesifikasi Class

      Gunakan class bernama `Buku` dengan constructor `__init__(self, judul, tahun_terbit)`.

      - `tarif_denda = 2000` adalah class attribute dalam rupiah per hari.
      - `total_pengembalian = 0` mencatat jumlah pengembalian yang berhasil dicatat.
      - `judul` dan `tahun_terbit` adalah public instance attribute.
      - `_status` adalah protected instance attribute.
      - `__hari_terlambat` dan `__dibayar` adalah private instance attribute.

      3. Property dan Encapsulation

      Buat property `hari_terlambat` dengan getter dan setter.

      - Hari terlambat harus bilangan bulat tidak negatif.
      - Nilai negatif harus menghasilkan `ValueError("Hari terlambat tidak boleh negatif.")`.
      - Buat property read-only `dibayar` untuk membaca jumlah pembayaran. Tidak perlu membuat setter untuk `dibayar`.
      - Akses private attribute harus menggunakan `self.__hari_terlambat` dan `self.__dibayar` di dalam class. Nama tersebut mengalami name mangling.

      4. Method

      - `catat_pengembalian(hari)` mencoba mengisi property `hari_terlambat`. Jika valid, kosongkan pembayaran sebelumnya, tambah `Buku.total_pengembalian` satu, atur status awal, dan kembalikan `True`. Jika invalid, kembalikan `False` tanpa menambah counter.
      - `hitung_denda()` mengembalikan `hari_terlambat * Buku.tarif_denda`.
      - `bayar(jumlah)` menerima jumlah pembayaran nol atau lebih. Tolak pembayaran jika jumlah negatif atau total pembayaran baru melebihi denda. Saat ditolak, state pembayaran tidak berubah. Status menjadi `"Lunas"`, `"Sebagian"`, atau `"Belum Lunas"`.
      - `tahun_valid()` mengembalikan `True` jika tahun terbit berada pada rentang 1900 sampai 2026, termasuk batasnya.
      - `status()` mengembalikan nilai protected `_status`.

      5. Program Utama

      Format Input:
      `judul tahun_terbit hari_terlambat jumlah_bayar`

      Program utama sudah membuat object, memanggil `catat_pengembalian`, lalu memanggil `bayar`. Jangan mengubah urutan tersebut.

      Format Output harus tepat delapan baris: `Judul`, `Tahun Terbit`, `Hari Terlambat`, `Denda`, `Dibayar`, `Status`, `Tahun Valid`, dan `Total Pengembalian`.

      6. Constraints dan Aturan

      - Tahun, hari, dan pembayaran dibaca sebagai integer.
      - Pembayaran sebagian diperbolehkan selama tidak melebihi denda.
      - Jika pencatatan pengembalian gagal, hari terlambat tetap 0 dan counter tidak bertambah.
      - Jangan menambahkan print, inheritance, classmethod, staticmethod, atau library tambahan.

      7. Checklist sebelum Run Tests

      - Tarif dan counter disimpan sebagai class attribute.
      - Denda dihitung dari state object, bukan dari input secara langsung di program utama.
      - Setter property dipakai untuk validasi hari terlambat.
      - Pembayaran yang ditolak tidak mengubah `dibayar`.
      - Status pembayaran mencerminkan state terakhir.

    starter: |
      class Buku:
          tarif_denda = 2000
          total_pengembalian = 0

          def __init__(self, judul, tahun_terbit):
              self.judul = judul
              self.tahun_terbit = tahun_terbit
              self._status = "Belum Lunas"
              self.__hari_terlambat = 0
              self.__dibayar = 0

          @property
          def hari_terlambat(self):
              # TODO: kembalikan __hari_terlambat
              pass

          @hari_terlambat.setter
          def hari_terlambat(self, nilai):
              # TODO: validasi hari tidak negatif
              pass

          @property
          def dibayar(self):
              # TODO: kembalikan __dibayar
              pass

          def catat_pengembalian(self, hari):
              # TODO: isi property, reset pembayaran, dan tambah counter jika valid
              pass

          def hitung_denda(self):
              # TODO: kembalikan denda berdasarkan tarif class
              pass

          def bayar(self, jumlah):
              # TODO: tolak jumlah invalid atau melebihi denda
              pass

          def tahun_valid(self):
              # TODO: validasi tahun 1900 sampai 2026
              pass

          def status(self):
              # TODO: kembalikan status pembayaran
              pass


      judul, tahun, hari, bayar = input().split()
      buku = Buku(judul.replace("_", " "), int(tahun))
      berhasil_kembali = buku.catat_pengembalian(int(hari))
      berhasil_bayar = buku.bayar(int(bayar))

      print(f"Judul: {buku.judul}")
      print(f"Tahun Terbit: {buku.tahun_terbit}")
      print(f"Hari Terlambat: {buku.hari_terlambat}")
      print(f"Denda: {buku.hitung_denda()}")
      print(f"Dibayar: {buku.dibayar}")
      print(f"Status: {buku.status()}")
      print(f"Tahun Valid: {buku.tahun_valid()}")
      print(f"Total Pengembalian: {Buku.total_pengembalian}")
    tests: |
      Novel_A 2020 3 6000
      @@OUTPUT@@
      Judul: Novel A
      Tahun Terbit: 2020
      Hari Terlambat: 3
      Denda: 6000
      Dibayar: 6000
      Status: Lunas
      Tahun Valid: True
      Total Pengembalian: 1
      @@CASE@@
      Buku_Lama 1899 0 0
      @@OUTPUT@@
      Judul: Buku Lama
      Tahun Terbit: 1899
      Hari Terlambat: 0
      Denda: 0
      Dibayar: 0
      Status: Lunas
      Tahun Valid: False
      Total Pengembalian: 1
      @@CASE@@
      Cerita_Kota 2005 7 10000
      @@OUTPUT@@
      Judul: Cerita Kota
      Tahun Terbit: 2005
      Hari Terlambat: 7
      Denda: 14000
      Dibayar: 10000
      Status: Sebagian
      Tahun Valid: True
      Total Pengembalian: 1
      @@CASE@@
      Dasar_Python 2026 1 2500
      @@OUTPUT@@
      Judul: Dasar Python
      Tahun Terbit: 2026
      Hari Terlambat: 1
      Denda: 2000
      Dibayar: 0
      Status: Belum Lunas
      Tahun Valid: True
      Total Pengembalian: 1
      @@CASE@@
      Arsip_Nusantara 1890 12 -1
      @@OUTPUT@@
      Judul: Arsip Nusantara
      Tahun Terbit: 1890
      Hari Terlambat: 12
      Denda: 24000
      Dibayar: 0
      Status: Belum Lunas
      Tahun Valid: False
      Total Pengembalian: 1
      @@CASE@@
      Langit_Sore 1999 -2 0
      @@OUTPUT@@
      Judul: Langit Sore
      Tahun Terbit: 1999
      Hari Terlambat: 0
      Denda: 0
      Dibayar: 0
      Status: Lunas
      Tahun Valid: True
      Total Pengembalian: 0
      @@CASE@@
      Jejak_Waktu 2027 20 40000
      @@OUTPUT@@
      Judul: Jejak Waktu
      Tahun Terbit: 2027
      Hari Terlambat: 20
      Denda: 40000
      Dibayar: 40000
      Status: Lunas
      Tahun Valid: False
      Total Pengembalian: 1
      @@CASE@@
      Buku_Terlambat 2020 5 5000
      @@OUTPUT@@
      Judul: Buku Terlambat
      Tahun Terbit: 2020
      Hari Terlambat: 5
      Denda: 10000
      Dibayar: 5000
      Status: Sebagian
      Tahun Valid: True
      Total Pengembalian: 1

  - id: v4
    title: Variant 4 - Reservasi Buku
    brief: |
      Modelkan kapasitas reservasi, pembatalan reservasi, status object, dan validasi kode peminjam melalui instance method.
    prompt: |
      Tugas

      Implementasikan class `Buku` untuk mengelola reservasi buku. Satu object menerima satu pengajuan reservasi dan satu pembatalan secara berurutan.

      1. Tujuan Pembelajaran

      Terapkan class attribute, instance attribute public, protected state, private state, property validation, name mangling, dan instance method untuk mengendalikan perubahan state.

      2. Spesifikasi Class

      Gunakan class bernama `Buku` dengan constructor `__init__(self, judul, peminjam, reservasi_awal=0)`.

      - `maksimal_reservasi = 5` adalah class attribute.
      - `total_reservasi = 0` adalah class attribute. Tambahkan satu untuk setiap pemanggilan `ajukan`, termasuk pengajuan yang ditolak.
      - `judul` dan `peminjam` adalah public instance attribute.
      - `_status` adalah protected instance attribute.
      - `__reservasi` adalah private instance attribute.

      3. Property `reservasi`

      Buat getter dan setter `reservasi`.

      - Nilai harus berada pada rentang 0 sampai `maksimal_reservasi`, termasuk batas.
      - Nilai di luar rentang menghasilkan `ValueError("Reservasi harus berada pada rentang 0 sampai 5.")`.
      - Gunakan `self.__reservasi` di dalam property. Jangan mengakses name-mangled `_Buku__reservasi` dari program utama.

      4. Method

      - `ajukan(jumlah)` menaikkan reservasi jika `jumlah` lebih dari nol dan hasil akhirnya tidak melebihi kapasitas. Return `True` jika berhasil dan `False` jika ditolak. State lama harus dipertahankan ketika ditolak.
      - `batalkan(jumlah)` menurunkan reservasi jika `jumlah` lebih dari nol dan tidak melebihi reservasi saat ini. Return `True` jika berhasil dan `False` jika ditolak.
      - `kode_peminjam_valid(kode)` mengembalikan `True` jika kode diawali `M` dan diikuti tepat enam digit. Selain itu `False`.
      - `status()` mengembalikan `"Aktif"` jika reservasi lebih dari 0 dan `"Kosong"` jika reservasi 0.

      Semua perubahan reservasi harus melewati property. Program utama tidak boleh mengubah private attribute secara langsung.

      5. Program Utama

      Format Input:
      `judul peminjam reservasi_awal jumlah_ajukan jumlah_batal kode_uji`

      `judul` menggunakan underscore sebagai pengganti spasi. Peminjam hanya label public dan tidak perlu divalidasi.

      Format Output harus tepat tujuh baris: `Judul`, `Peminjam`, `Reservasi`, `Ajukan Berhasil`, `Batal Berhasil`, `Kode Valid`, dan `Total Reservasi`.

      6. Constraints dan Aturan

      - Semua nilai jumlah dibaca sebagai integer.
      - `jumlah_ajukan` dan `jumlah_batal` dapat nol atau negatif.
      - Counter `total_reservasi` bertambah tepat satu karena program utama memanggil `ajukan` tepat satu kali.
      - Jangan menambahkan print atau memakai inheritance, classmethod, staticmethod, dan library tambahan.

      7. Checklist sebelum Run Tests

      - Constructor memvalidasi `reservasi_awal` melalui property.
      - Pengajuan yang melebihi kapasitas tidak mengubah nilai reservasi.
      - Pembatalan diproses setelah pengajuan pada object yang sama.
      - Validasi kode adalah instance method, bukan static method.
      - Label output sama persis dengan starter code.

    starter: |
      class Buku:
          maksimal_reservasi = 5
          total_reservasi = 0

          def __init__(self, judul, peminjam, reservasi_awal=0):
              self.judul = judul
              self.peminjam = peminjam
              self._status = "Kosong"
              self.reservasi = reservasi_awal
              if self.reservasi > 0:
                  self._status = "Aktif"

          @property
          def reservasi(self):
              # TODO: kembalikan __reservasi
              pass

          @reservasi.setter
          def reservasi(self, nilai):
              # TODO: validasi 0 sampai maksimal_reservasi
              pass

          def ajukan(self, jumlah):
              # TODO: tambah reservasi jika masih cukup
              pass

          def batalkan(self, jumlah):
              # TODO: kurangi reservasi jika jumlah valid
              pass

          def kode_peminjam_valid(self, kode):
              # TODO: True jika kode M dan enam digit
              pass

          def status(self):
              # TODO: kembalikan status reservasi
              pass


      judul, peminjam, awal, tambahan, batal, kode = input().split()
      buku = Buku(judul.replace("_", " "), peminjam, int(awal))
      berhasil_ajukan = buku.ajukan(int(tambahan))
      berhasil_batal = buku.batalkan(int(batal))

      print(f"Judul: {buku.judul}")
      print(f"Peminjam: {buku.peminjam}")
      print(f"Reservasi: {buku.reservasi}")
      print(f"Ajukan Berhasil: {berhasil_ajukan}")
      print(f"Batal Berhasil: {berhasil_batal}")
      print(f"Kode Valid: {buku.kode_peminjam_valid(kode)}")
      print(f"Total Reservasi: {Buku.total_reservasi}")
    tests: |
      Buku_Awal MhsA 1 2 1 M123456
      @@OUTPUT@@
      Judul: Buku Awal
      Peminjam: MhsA
      Reservasi: 2
      Ajukan Berhasil: True
      Batal Berhasil: True
      Kode Valid: True
      Total Reservasi: 1
      @@CASE@@
      Buku_Baru MhsB 4 2 1 M234567
      @@OUTPUT@@
      Judul: Buku Baru
      Peminjam: MhsB
      Reservasi: 3
      Ajukan Berhasil: False
      Batal Berhasil: True
      Kode Valid: True
      Total Reservasi: 1
      @@CASE@@
      Cerita_Lama MhsC 0 5 0 M345678
      @@OUTPUT@@
      Judul: Cerita Lama
      Peminjam: MhsC
      Reservasi: 5
      Ajukan Berhasil: True
      Batal Berhasil: False
      Kode Valid: True
      Total Reservasi: 1
      @@CASE@@
      Peta_Kota MhsD 5 1 5 X456789
      @@OUTPUT@@
      Judul: Peta Kota
      Peminjam: MhsD
      Reservasi: 0
      Ajukan Berhasil: False
      Batal Berhasil: True
      Kode Valid: False
      Total Reservasi: 1
      @@CASE@@
      Arsip_Baru MhsE 2 0 1 M567890
      @@OUTPUT@@
      Judul: Arsip Baru
      Peminjam: MhsE
      Reservasi: 1
      Ajukan Berhasil: False
      Batal Berhasil: True
      Kode Valid: True
      Total Reservasi: 1
      @@CASE@@
      Novel_Pagi MhsF 0 6 1 M678901
      @@OUTPUT@@
      Judul: Novel Pagi
      Peminjam: MhsF
      Reservasi: 0
      Ajukan Berhasil: False
      Batal Berhasil: False
      Kode Valid: True
      Total Reservasi: 1
      @@CASE@@
      Buku_Senja MhsG 3 2 5 M12345
      @@OUTPUT@@
      Judul: Buku Senja
      Peminjam: MhsG
      Reservasi: 0
      Ajukan Berhasil: True
      Batal Berhasil: True
      Kode Valid: False
      Total Reservasi: 1
      @@CASE@@
      Ruang_Baca MhsH 1 -1 1 M999999
      @@OUTPUT@@
      Judul: Ruang Baca
      Peminjam: MhsH
      Reservasi: 0
      Ajukan Berhasil: False
      Batal Berhasil: True
      Kode Valid: True
      Total Reservasi: 1

  - id: v5
    title: Variant 5 - Rating dan Ulasan Buku
    brief: |
      Modelkan rating buku dengan batas 0 sampai 5, kategori rating, dan counter ulasan pada tingkat class.
    prompt: |
      Tugas

      Implementasikan class `Buku` untuk mengelola rating sebuah buku. Object memiliki rating awal, menerima satu rating baru, lalu menentukan kategori rating.

      1. Tujuan Pembelajaran

      Gunakan class attribute, public attribute, protected attribute, private attribute, property setter, property getter, dan instance method untuk validasi serta perubahan state.

      2. Spesifikasi Class

      Gunakan class bernama `Buku` dengan constructor `__init__(self, judul, penulis, rating_awal=0)`.

      - `total_ulasan = 0` adalah class attribute. Tambahkan satu pada setiap pemanggilan `beri_rating`, termasuk nilai yang ditolak.
      - `batas_rating = 5` adalah class attribute.
      - `judul` dan `penulis` adalah public instance attribute.
      - `_status` adalah protected instance attribute.
      - `__rating` adalah private instance attribute.

      3. Property `rating`

      Buat getter dan setter `rating`.

      - Rating valid berada pada rentang 0 sampai 5, termasuk batas.
      - Nilai di luar rentang menghasilkan `ValueError("Rating harus berada pada rentang 0 sampai 5.")`.
      - Nilai rating boleh berupa integer atau float.
      - Gunakan `self.__rating` melalui property. Jangan mengubah rating langsung dari program utama.

      4. Method

      - `rating_valid(nilai)` mengembalikan boolean berdasarkan rentang rating. Method ini harus berupa instance method.
      - `beri_rating(nilai)` menaikkan `Buku.total_ulasan` tepat satu, memeriksa nilai dengan `rating_valid`, lalu menyimpan nilai melalui property jika valid. Return `True` jika valid dan `False` jika invalid. Saat invalid, rating lama tetap dipertahankan.
      - `kategori_rating()` mengembalikan `"Belum Dinilai"` untuk rating 0, `"Rendah"` untuk rating lebih dari 0 sampai kurang dari 2, `"Sedang"` untuk rating 2 sampai kurang dari 4, dan `"Tinggi"` untuk rating 4 sampai 5.
      - `status()` mengembalikan `_status`. Setelah rating baru berhasil, `_status` harus sama dengan kategori rating terbaru.

      5. Program Utama

      Format Input:
      `judul penulis rating_awal rating_baru rating_uji`

      Program utama sudah mengubah underscore pada judul menjadi spasi dan mengubah tiga nilai rating menjadi float.

      Format Output harus tepat tujuh baris: `Judul`, `Penulis`, `Rating`, `Berhasil`, `Kategori`, `Rating Uji Valid`, dan `Total Ulasan`.

      6. Constraints dan Aturan

      - Nilai 0 dan 5 adalah batas valid.
      - Jangan membulatkan rating.
      - Rating invalid tidak boleh mengubah nilai lama.
      - Jangan menambahkan print atau memakai inheritance, classmethod, staticmethod, dan library tambahan.

      7. Checklist sebelum Run Tests

      - `total_ulasan` diakses melalui nama class.
      - Setter property menjadi satu-satunya jalur penyimpanan rating.
      - `beri_rating` memeriksa nilai sebelum menulis melalui property.
      - Kategori ditentukan dari rating yang benar-benar tersimpan.
      - Semua angka float dicetak dengan format Python standar.

    starter: |
      class Buku:
          total_ulasan = 0
          batas_rating = 5

          def __init__(self, judul, penulis, rating_awal=0):
              self.judul = judul
              self.penulis = penulis
              self._status = "Belum Dinilai"
              self.rating = rating_awal
              self._status = self.kategori_rating()

          @property
          def rating(self):
              # TODO: kembalikan __rating
              pass

          @rating.setter
          def rating(self, nilai):
              # TODO: validasi 0 sampai 5, lalu simpan ke __rating
              pass

          def rating_valid(self, nilai):
              # TODO: kembalikan True jika nilai berada pada rentang valid
              pass

          def beri_rating(self, nilai):
              # TODO: tambah counter, simpan jika valid, dan perbarui status
              pass

          def kategori_rating(self):
              # TODO: kembalikan kategori berdasarkan rating
              pass

          def status(self):
              # TODO: kembalikan status rating
              pass


      judul, penulis, awal, baru, uji = input().split()
      buku = Buku(judul.replace("_", " "), penulis, float(awal))
      berhasil = buku.beri_rating(float(baru))

      print(f"Judul: {buku.judul}")
      print(f"Penulis: {buku.penulis}")
      print(f"Rating: {buku.rating}")
      print(f"Berhasil: {berhasil}")
      print(f"Kategori: {buku.kategori_rating()}")
      print(f"Rating Uji Valid: {buku.rating_valid(float(uji))}")
      print(f"Total Ulasan: {Buku.total_ulasan}")
    tests: |
      Senja_Terakhir Rani 3.5 4.5 4.5
      @@OUTPUT@@
      Judul: Senja Terakhir
      Penulis: Rani
      Rating: 4.5
      Berhasil: True
      Kategori: Tinggi
      Rating Uji Valid: True
      Total Ulasan: 1
      @@CASE@@
      Kota_Dalam Bima 2 5 5
      @@OUTPUT@@
      Judul: Kota Dalam
      Penulis: Bima
      Rating: 5.0
      Berhasil: True
      Kategori: Tinggi
      Rating Uji Valid: True
      Total Ulasan: 1
      @@CASE@@
      Hujan_Pagi Sinta 4 0 0
      @@OUTPUT@@
      Judul: Hujan Pagi
      Penulis: Sinta
      Rating: 0.0
      Berhasil: True
      Kategori: Belum Dinilai
      Rating Uji Valid: True
      Total Ulasan: 1
      @@CASE@@
      Peta_Baru Dodi 1 5.5 5.5
      @@OUTPUT@@
      Judul: Peta Baru
      Penulis: Dodi
      Rating: 1.0
      Berhasil: False
      Kategori: Rendah
      Rating Uji Valid: False
      Total Ulasan: 1
      @@CASE@@
      Buku_Kecil Nia 0 -1 2
      @@OUTPUT@@
      Judul: Buku Kecil
      Penulis: Nia
      Rating: 0.0
      Berhasil: False
      Kategori: Belum Dinilai
      Rating Uji Valid: True
      Total Ulasan: 1
      @@CASE@@
      Laut_Jauh Ari 2.5 3 6
      @@OUTPUT@@
      Judul: Laut Jauh
      Penulis: Ari
      Rating: 3.0
      Berhasil: True
      Kategori: Sedang
      Rating Uji Valid: False
      Total Ulasan: 1
      @@CASE@@
      Arsip_Hari Tono 5 4.9 4.9
      @@OUTPUT@@
      Judul: Arsip Hari
      Penulis: Tono
      Rating: 4.9
      Berhasil: True
      Kategori: Tinggi
      Rating Uji Valid: True
      Total Ulasan: 1
      @@CASE@@
      Ruang_Kata Lala 1.5 1.5 1.5
      @@OUTPUT@@
      Judul: Ruang Kata
      Penulis: Lala
      Rating: 1.5
      Berhasil: True
      Kategori: Rendah
      Rating Uji Valid: True
      Total Ulasan: 1

  - id: v6
    title: Variant 6 - Genre dan Usia Buku
    brief: |
      Modelkan genre dengan property tervalidasi, usia buku, status usia, dan perubahan genre pada object yang sama.
    prompt: |
      Tugas

      Implementasikan class `Buku` untuk mengelompokkan buku berdasarkan genre dan menghitung usianya. Program mencoba mengganti genre, lalu menghitung usia buku.

      1. Tujuan Pembelajaran

      Terapkan class attribute, public attribute, protected attribute, private attribute, name mangling, property validation, dan instance method.

      2. Spesifikasi Class

      Gunakan class bernama `Buku` dengan constructor `__init__(self, judul, genre, tahun_terbit)`.

      - `genre_populer = "Fiksi"` dan `total_buku = 0` adalah class attribute.
      - `judul` adalah public instance attribute.
      - `_status_usia` adalah protected instance attribute.
      - `__genre` dan `__tahun_terbit` adalah private instance attribute.

      3. Property dan Validasi

      Buat getter dan setter untuk `genre` dan `tahun_terbit`.

      - Genre valid hanya `Fiksi`, `Nonfiksi`, `Puisi`, atau `Sejarah`. Perbandingan case-sensitive.
      - Genre invalid menghasilkan `ValueError("Genre tidak tersedia.")`.
      - Tahun terbit valid berada pada rentang 1 sampai 2026. Nilai di luar rentang menghasilkan `ValueError("Tahun terbit tidak valid.")`.
      - Setter harus menyimpan data pada private attribute masing-masing. Gunakan `self.__genre` dan `self.__tahun_terbit` agar Python menerapkan name mangling.

      4. Method

      - `genre_valid(genre)` adalah instance method yang mengembalikan boolean berdasarkan daftar genre valid.
      - `ubah_genre(genre_baru)` memeriksa `genre_valid(genre_baru)`, lalu mengubah property `genre` jika valid. Return `True` jika berhasil dan `False` jika invalid. Genre lama harus tetap tersimpan jika gagal.
      - `hitung_usia(tahun_sekarang)` mengembalikan `tahun_sekarang - tahun_terbit`. Jika tahun sekarang lebih kecil dari tahun terbit, hasilnya akan negatif dan status harus menjadi `"Tidak Valid"`.
      - Jika usia 0 sampai 5, status `"Baru"`; usia 6 sampai 20, `"Menengah"`; usia lebih dari 20, `"Lama"`.
      - `status_usia()` mengembalikan protected state `_status_usia`.

      5. Program Utama

      Format Input:
      `judul genre tahun_terbit tahun_sekarang genre_baru`

      Program utama menjalankan `ubah_genre` sebelum `hitung_usia`. Jangan mengubah urutan operasi.

      Format Output harus tepat sembilan baris: `Judul`, `Genre`, `Tahun Terbit`, `Usia Buku`, `Status Usia`, `Genre Baru Berhasil`, `Genre Baru Valid`, `Genre Populer`, dan `Total Buku`.

      6. Constraints dan Aturan

      - Tahun dibaca sebagai integer.
      - `tahun_sekarang` boleh lebih besar dari 2026 untuk menguji perhitungan usia.
      - Jangan mengubah genre secara langsung tanpa property.
      - Jangan menambahkan print atau memakai inheritance, classmethod, staticmethod, dan library tambahan.

      7. Checklist sebelum Run Tests

      - Validasi genre dipakai baik oleh setter maupun method perubahan genre.
      - Genre invalid tidak menghapus genre lama.
      - Status usia baru ditentukan setelah `hitung_usia` dipanggil.
      - Counter object bertambah pada tingkat class.
      - Property dan instance method dipakai sesuai signature starter code.

    starter: |
      class Buku:
          genre_populer = "Fiksi"
          total_buku = 0

          def __init__(self, judul, genre, tahun_terbit):
              self.judul = judul
              self._status_usia = "Belum Dihitung"
              Buku.total_buku += 1
              self.genre = genre
              self.tahun_terbit = tahun_terbit

          @property
          def genre(self):
              # TODO: kembalikan __genre
              pass

          @genre.setter
          def genre(self, nilai):
              # TODO: validasi menggunakan genre_valid, lalu simpan ke __genre
              pass

          @property
          def tahun_terbit(self):
              # TODO: kembalikan __tahun_terbit
              pass

          @tahun_terbit.setter
          def tahun_terbit(self, nilai):
              # TODO: validasi 1 sampai 2026, lalu simpan
              pass

          def genre_valid(self, genre):
              # TODO: True untuk Fiksi, Nonfiksi, Puisi, atau Sejarah
              pass

          def ubah_genre(self, genre_baru):
              # TODO: coba ubah genre melalui property
              pass

          def hitung_usia(self, tahun_sekarang):
              # TODO: hitung usia dan perbarui _status_usia
              pass

          def status_usia(self):
              # TODO: kembalikan status usia
              pass


      judul, genre, tahun, sekarang, genre_baru = input().split()
      buku = Buku(judul.replace("_", " "), genre, int(tahun))
      berhasil = buku.ubah_genre(genre_baru)
      usia = buku.hitung_usia(int(sekarang))

      print(f"Judul: {buku.judul}")
      print(f"Genre: {buku.genre}")
      print(f"Tahun Terbit: {buku.tahun_terbit}")
      print(f"Usia Buku: {usia}")
      print(f"Status Usia: {buku.status_usia()}")
      print(f"Genre Baru Berhasil: {berhasil}")
      print(f"Genre Baru Valid: {buku.genre_valid(genre_baru)}")
      print(f"Genre Populer: {Buku.genre_populer}")
      print(f"Total Buku: {Buku.total_buku}")
    tests: |
      Jalan_Pulang Fiksi 2010 2026 Nonfiksi
      @@OUTPUT@@
      Judul: Jalan Pulang
      Genre: Nonfiksi
      Tahun Terbit: 2010
      Usia Buku: 16
      Status Usia: Menengah
      Genre Baru Berhasil: True
      Genre Baru Valid: True
      Genre Populer: Fiksi
      Total Buku: 1
      @@CASE@@
      Catatan_Hari Nonfiksi 2020 2026 Biografi
      @@OUTPUT@@
      Judul: Catatan Hari
      Genre: Nonfiksi
      Tahun Terbit: 2020
      Usia Buku: 6
      Status Usia: Menengah
      Genre Baru Berhasil: False
      Genre Baru Valid: False
      Genre Populer: Fiksi
      Total Buku: 1
      @@CASE@@
      Suara_Malam Puisi 1999 2025 Sejarah
      @@OUTPUT@@
      Judul: Suara Malam
      Genre: Sejarah
      Tahun Terbit: 1999
      Usia Buku: 26
      Status Usia: Lama
      Genre Baru Berhasil: True
      Genre Baru Valid: True
      Genre Populer: Fiksi
      Total Buku: 1
      @@CASE@@
      Jejak_Lama Sejarah 2005 2005 Fiksi
      @@OUTPUT@@
      Judul: Jejak Lama
      Genre: Fiksi
      Tahun Terbit: 2005
      Usia Buku: 0
      Status Usia: Baru
      Genre Baru Berhasil: True
      Genre Baru Valid: True
      Genre Populer: Fiksi
      Total Buku: 1
      @@CASE@@
      Ruang_Baru Fiksi 2026 2025 Nonfiksi
      @@OUTPUT@@
      Judul: Ruang Baru
      Genre: Nonfiksi
      Tahun Terbit: 2026
      Usia Buku: -1
      Status Usia: Tidak Valid
      Genre Baru Berhasil: True
      Genre Baru Valid: True
      Genre Populer: Fiksi
      Total Buku: 1
      @@CASE@@
      Masa_Depan Sejarah 2018 2026 Drama
      @@OUTPUT@@
      Judul: Masa Depan
      Genre: Sejarah
      Tahun Terbit: 2018
      Usia Buku: 8
      Status Usia: Menengah
      Genre Baru Berhasil: False
      Genre Baru Valid: False
      Genre Populer: Fiksi
      Total Buku: 1
      @@CASE@@
      Rumah_Kata Puisi 2000 2028 Nonfiksi
      @@OUTPUT@@
      Judul: Rumah Kata
      Genre: Nonfiksi
      Tahun Terbit: 2000
      Usia Buku: 28
      Status Usia: Lama
      Genre Baru Berhasil: True
      Genre Baru Valid: True
      Genre Populer: Fiksi
      Total Buku: 1
      @@CASE@@
      Arsip_Tua Nonfiksi 1900 2026 Puisi
      @@OUTPUT@@
      Judul: Arsip Tua
      Genre: Puisi
      Tahun Terbit: 1900
      Usia Buku: 126
      Status Usia: Lama
      Genre Baru Berhasil: True
      Genre Baru Valid: True
      Genre Populer: Fiksi
      Total Buku: 1

  - id: v7
    title: Variant 7 - Lokasi dan Kode Buku
    brief: |
      Modelkan perpindahan lokasi buku, validasi lantai, normalisasi kode, dan penolakan kode baru yang tidak sesuai.
    prompt: |
      Tugas

      Implementasikan class `Buku` untuk mengelola lokasi fisik dan kode buku. Program mencoba memindahkan object ke lokasi baru, lalu mencoba mengganti kode bukunya.

      1. Tujuan Pembelajaran

      Terapkan class attribute, public attribute, protected attribute, private attribute, property getter/setter, validasi data, dan instance method.

      2. Spesifikasi Class

      Gunakan class bernama `Buku` dengan constructor `__init__(self, judul, lantai, rak, kode)`.

      - `total_lokasi = 0` adalah class attribute. Tambahkan satu setiap object dibuat.
      - `judul` dan `rak` adalah public instance attribute.
      - `_lokasi_sebelumnya` adalah protected instance attribute.
      - `__lantai` dan `__kode` adalah private instance attribute.

      3. Property dan Validasi

      Buat getter dan setter untuk `lantai` dan `kode`.

      - `lantai` harus integer pada rentang 1 sampai 5. Nilai lain menghasilkan `ValueError("Lantai harus berada pada rentang 1 sampai 5.")`.
      - `kode` harus terdiri dari tepat 5 karakter alfanumerik. Kode yang disimpan selalu dalam huruf besar.
      - Setter `kode` menghasilkan `ValueError("Kode harus terdiri dari 5 karakter alfanumerik.")` untuk nilai invalid.
      - Gunakan `self.__lantai` dan `self.__kode` melalui property. Bentuk `_Buku__lantai` dan `_Buku__kode` adalah hasil name mangling, bukan nama yang dipakai program utama.

      4. Method

      - `kode_valid(kode)` adalah instance method yang mengembalikan boolean: panjang tepat 5 dan semua karakter alfanumerik.
      - `pindah_lokasi(rak_baru, lantai_baru)` menyimpan lokasi lama melalui `_lokasi_sebelumnya`, lalu mengubah lantai melalui property dan rak melalui public attribute. Jika lantai invalid atau rak kosong, kembalikan `False` dan jangan mengubah lokasi.
      - `ubah_kode(kode_baru)` memeriksa `kode_valid(kode_baru)`, lalu memakai setter kode jika valid. Return `True` jika berhasil dan `False` jika invalid. Kode lama harus dipertahankan ketika gagal.
      - `lokasi()` mengembalikan string dengan format `lantai-rak`.
      - `lokasi_sebelumnya()` mengembalikan lokasi lama, atau `"Belum Ada"` jika belum pernah berpindah.

      5. Program Utama

      Format Input:
      `judul lantai rak kode rak_baru lantai_baru kode_baru`

      Program utama menjalankan `pindah_lokasi` lebih dahulu dan `ubah_kode` sesudahnya.

      Format Output harus tepat delapan baris: `Judul`, `Lokasi`, `Lokasi Sebelumnya`, `Kode`, `Pindah Berhasil`, `Kode Baru Berhasil`, `Kode Baru Valid`, dan `Total Lokasi`.

      6. Constraints dan Aturan

      - Lantai dibaca sebagai integer.
      - Kode awal pada test case selalu valid agar object dapat dibuat.
      - Kode baru dapat invalid dan harus ditolak tanpa error program.
      - Jangan menambahkan print atau memakai inheritance, classmethod, staticmethod, dan library tambahan.

      7. Checklist sebelum Run Tests

      - Kode awal dan kode baru diproses melalui property.
      - Kode valid disimpan dalam uppercase.
      - Kegagalan pindah tidak meninggalkan perubahan sebagian.
      - Lokasi lama dicatat hanya setelah perpindahan berhasil.
      - Validasi kode baru dilakukan melalui instance method.

    starter: |
      class Buku:
          total_lokasi = 0

          def __init__(self, judul, lantai, rak, kode):
              self.judul = judul
              self.rak = rak
              self._lokasi_sebelumnya = "Belum Ada"
              self.lantai = lantai
              self.kode = kode
              Buku.total_lokasi += 1

          @property
          def lantai(self):
              # TODO: kembalikan __lantai
              pass

          @lantai.setter
          def lantai(self, nilai):
              # TODO: validasi 1 sampai 5, lalu simpan
              pass

          @property
          def kode(self):
              # TODO: kembalikan __kode
              pass

          @kode.setter
          def kode(self, nilai):
              # TODO: validasi kode dan simpan dalam uppercase
              pass

          def kode_valid(self, kode):
              # TODO: True jika panjang 5 dan alfanumerik
              pass

          def pindah_lokasi(self, rak_baru, lantai_baru):
              # TODO: pindahkan lokasi secara aman
              pass

          def ubah_kode(self, kode_baru):
              # TODO: ubah kode melalui property jika valid
              pass

          def lokasi(self):
              # TODO: kembalikan format lantai-rak
              pass

          def lokasi_sebelumnya(self):
              # TODO: kembalikan lokasi lama
              pass


      judul, lantai, rak, kode, rak_baru, lantai_baru, kode_baru = input().split()
      buku = Buku(judul.replace("_", " "), int(lantai), rak, kode)
      berhasil_pindah = buku.pindah_lokasi(rak_baru, int(lantai_baru))
      berhasil_kode = buku.ubah_kode(kode_baru)

      print(f"Judul: {buku.judul}")
      print(f"Lokasi: {buku.lokasi()}")
      print(f"Lokasi Sebelumnya: {buku.lokasi_sebelumnya()}")
      print(f"Kode: {buku.kode}")
      print(f"Pindah Berhasil: {berhasil_pindah}")
      print(f"Kode Baru Berhasil: {berhasil_kode}")
      print(f"Kode Baru Valid: {buku.kode_valid(kode_baru)}")
      print(f"Total Lokasi: {Buku.total_lokasi}")
    tests: |
      Buku_Pagi 1 A01 bk001 B02 2 ab999
      @@OUTPUT@@
      Judul: Buku Pagi
      Lokasi: 2-B02
      Lokasi Sebelumnya: 1-A01
      Kode: AB999
      Pindah Berhasil: True
      Kode Baru Berhasil: True
      Kode Baru Valid: True
      Total Lokasi: 1
      @@CASE@@
      Buku_Siang 2 C03 ab123 D04 2 xyz12
      @@OUTPUT@@
      Judul: Buku Siang
      Lokasi: 2-D04
      Lokasi Sebelumnya: 2-C03
      Kode: XYZ12
      Pindah Berhasil: True
      Kode Baru Berhasil: True
      Kode Baru Valid: True
      Total Lokasi: 1
      @@CASE@@
      Buku_Malam 3 E05 KODE1 F06 5 peta-1
      @@OUTPUT@@
      Judul: Buku Malam
      Lokasi: 5-F06
      Lokasi Sebelumnya: 3-E05
      Kode: KODE1
      Pindah Berhasil: True
      Kode Baru Berhasil: False
      Kode Baru Valid: False
      Total Lokasi: 1
      @@CASE@@
      Arsip_Lama 1 G07 abc12 H08 0 kode2
      @@OUTPUT@@
      Judul: Arsip Lama
      Lokasi: 1-G07
      Lokasi Sebelumnya: Belum Ada
      Kode: KODE2
      Pindah Berhasil: False
      Kode Baru Berhasil: True
      Kode Baru Valid: True
      Total Lokasi: 1
      @@CASE@@
      Peta_Kota 5 I09 PETA1 J10 4 abc
      @@OUTPUT@@
      Judul: Peta Kota
      Lokasi: 4-J10
      Lokasi Sebelumnya: 5-I09
      Kode: PETA1
      Pindah Berhasil: True
      Kode Baru Berhasil: False
      Kode Baru Valid: False
      Total Lokasi: 1
      @@CASE@@
      Novel_Baru 2 K11 NV789 L12 6 A1B2C
      @@OUTPUT@@
      Judul: Novel Baru
      Lokasi: 2-K11
      Lokasi Sebelumnya: Belum Ada
      Kode: A1B2C
      Pindah Berhasil: False
      Kode Baru Berhasil: True
      Kode Baru Valid: True
      Total Lokasi: 1
      @@CASE@@
      Cerita_Pendek 4 M13 A1B2C N14 4 12345
      @@OUTPUT@@
      Judul: Cerita Pendek
      Lokasi: 4-N14
      Lokasi Sebelumnya: 4-M13
      Kode: 12345
      Pindah Berhasil: True
      Kode Baru Berhasil: True
      Kode Baru Valid: True
      Total Lokasi: 1
      @@CASE@@
      Ruang_Baca 1 O15 Z9A12 P16 3 aa-12
      @@OUTPUT@@
      Judul: Ruang Baca
      Lokasi: 3-P16
      Lokasi Sebelumnya: 1-O15
      Kode: Z9A12
      Pindah Berhasil: True
      Kode Baru Berhasil: False
      Kode Baru Valid: False
      Total Lokasi: 1

  - id: v8
    title: Variant 8 - Buku Digital dan Kuota Unduhan
    brief: |
      Modelkan ukuran file, kuota unduhan, dua percobaan unduh berurutan, status aktif, dan validasi format file.
    prompt: |
      Tugas

      Implementasikan class `Buku` untuk mengelola buku digital. Satu object memiliki kuota unduhan, menerima dua percobaan unduh, dan dapat dinonaktifkan setelah kedua percobaan selesai.

      1. Tujuan Pembelajaran

      Terapkan class attribute, public attribute, protected attribute, private attribute, property validation, name mangling, dan instance method yang mengendalikan akses terhadap state.

      2. Spesifikasi Class

      Gunakan class bernama `Buku` dengan constructor `__init__(self, judul, format_file, ukuran_mb, kuota=5)`.

      - `total_unduhan = 0` adalah class attribute yang mencatat jumlah file yang berhasil diunduh oleh semua object.
      - `maksimal_kuota = 10` adalah class attribute.
      - `judul` dan `format_file` adalah public instance attribute.
      - `_status` adalah protected instance attribute dengan nilai awal `"Aktif"`.
      - `__ukuran_mb`, `__kuota`, dan `__jumlah_unduhan` adalah private instance attribute.

      3. Property dan Validasi

      Buat getter dan setter untuk `ukuran_mb` dan `kuota`.

      - `ukuran_mb` harus lebih besar dari 0. Nilai 0 atau kurang menghasilkan `ValueError("Ukuran file harus lebih besar dari 0.")`.
      - `kuota` harus berada pada rentang 0 sampai `maksimal_kuota`, termasuk batas. Nilai lain menghasilkan `ValueError("Kuota harus berada pada rentang 0 sampai 10.")`.
      - Gunakan private attribute melalui `self.__ukuran_mb` dan `self.__kuota`. Python menyimpan nama tersebut dengan name mangling.
      - `jumlah_unduhan()` menjadi method read-only untuk membaca `__jumlah_unduhan`.

      4. Method

      - `unduh(jumlah)` berhasil jika status masih `"Aktif"`, jumlah lebih dari 0, dan jumlah tidak melebihi kuota. Jika berhasil, kurangi kuota melalui property, tambah `__jumlah_unduhan`, tambah `Buku.total_unduhan`, lalu return `True`. Selain itu return `False` tanpa mengubah state.
      - `nonaktifkan()` mengubah `_status` menjadi `"Nonaktif"`.
      - `status()` mengembalikan `_status`.
      - `format_valid(format_file)` mengembalikan `True` hanya untuk teks `pdf` atau `epub`. Perbandingan case-sensitive.

      5. Program Utama

      Format Input:
      `judul format_file ukuran_mb kuota unduh_pertama unduh_kedua matikan`

      Program utama memanggil `unduh` dua kali. Jika `matikan` bernilai 1, program memanggil `nonaktifkan` setelah kedua percobaan.

      Format Output harus tepat sepuluh baris: `Judul`, `Format`, `Ukuran MB`, `Sisa Kuota`, `Unduhan Buku`, `Unduh 1 Berhasil`, `Unduh 2 Berhasil`, `Status`, `Format Valid`, dan `Unduhan Class`.

      6. Constraints dan Aturan

      - Ukuran dibaca sebagai float dan jumlah lain sebagai integer.
      - Unduhan yang gagal tidak mengurangi kuota dan tidak menambah counter.
      - `matikan` bernilai 0 atau 1.
      - Jangan menambahkan print atau memakai inheritance, classmethod, staticmethod, dan library tambahan.

      7. Checklist sebelum Run Tests

      - Counter class bertambah sebanyak jumlah file yang benar-benar berhasil diunduh.
      - Dua pemanggilan `unduh` memakai object dan state yang sama.
      - Kuota disimpan melalui private attribute dan property.
      - Object nonaktif menolak unduhan berikutnya.
      - Format file divalidasi oleh instance method.

    starter: |
      class Buku:
          total_unduhan = 0
          maksimal_kuota = 10

          def __init__(self, judul, format_file, ukuran_mb, kuota=5):
              self.judul = judul
              self.format_file = format_file
              self._status = "Aktif"
              self.__jumlah_unduhan = 0
              self.ukuran_mb = ukuran_mb
              self.kuota = kuota

          @property
          def ukuran_mb(self):
              # TODO: kembalikan __ukuran_mb
              pass

          @ukuran_mb.setter
          def ukuran_mb(self, nilai):
              # TODO: validasi ukuran lebih besar dari 0
              pass

          @property
          def kuota(self):
              # TODO: kembalikan __kuota
              pass

          @kuota.setter
          def kuota(self, nilai):
              # TODO: validasi kuota 0 sampai maksimal_kuota
              pass

          def unduh(self, jumlah):
              # TODO: proses unduhan jika status dan kuota memungkinkan
              pass

          def nonaktifkan(self):
              # TODO: ubah status menjadi Nonaktif
              pass

          def status(self):
              # TODO: kembalikan status
              pass

          def jumlah_unduhan(self):
              # TODO: kembalikan __jumlah_unduhan
              pass

          def format_valid(self, format_file):
              # TODO: True hanya untuk pdf atau epub
              pass


      judul, format_file, ukuran, kuota, unduh_1, unduh_2, matikan = input().split()
      buku = Buku(judul.replace("_", " "), format_file, float(ukuran), int(kuota))
      berhasil_1 = buku.unduh(int(unduh_1))
      berhasil_2 = buku.unduh(int(unduh_2))
      if int(matikan) == 1:
          buku.nonaktifkan()

      print(f"Judul: {buku.judul}")
      print(f"Format: {buku.format_file}")
      print(f"Ukuran MB: {buku.ukuran_mb}")
      print(f"Sisa Kuota: {buku.kuota}")
      print(f"Unduhan Buku: {buku.jumlah_unduhan()}")
      print(f"Unduh 1 Berhasil: {berhasil_1}")
      print(f"Unduh 2 Berhasil: {berhasil_2}")
      print(f"Status: {buku.status()}")
      print(f"Format Valid: {buku.format_valid(buku.format_file)}")
      print(f"Unduhan Class: {Buku.total_unduhan}")
    tests: |
      Python_Dasar pdf 2.5 5 3 1 0
      @@OUTPUT@@
      Judul: Python Dasar
      Format: pdf
      Ukuran MB: 2.5
      Sisa Kuota: 1
      Unduhan Buku: 4
      Unduh 1 Berhasil: True
      Unduh 2 Berhasil: True
      Status: Aktif
      Format Valid: True
      Unduhan Class: 4
      @@CASE@@
      OOP_Lanjut epub 4 2 1 1 1
      @@OUTPUT@@
      Judul: OOP Lanjut
      Format: epub
      Ukuran MB: 4.0
      Sisa Kuota: 0
      Unduhan Buku: 2
      Unduh 1 Berhasil: True
      Unduh 2 Berhasil: True
      Status: Nonaktif
      Format Valid: True
      Unduhan Class: 2
      @@CASE@@
      Cerita_Digital mobi 3.2 3 2 2 0
      @@OUTPUT@@
      Judul: Cerita Digital
      Format: mobi
      Ukuran MB: 3.2
      Sisa Kuota: 1
      Unduhan Buku: 2
      Unduh 1 Berhasil: True
      Unduh 2 Berhasil: False
      Status: Aktif
      Format Valid: False
      Unduhan Class: 2
      @@CASE@@
      Panduan_Kelas PDF 10 5 0 1 0
      @@OUTPUT@@
      Judul: Panduan Kelas
      Format: PDF
      Ukuran MB: 10.0
      Sisa Kuota: 4
      Unduhan Buku: 1
      Unduh 1 Berhasil: False
      Unduh 2 Berhasil: True
      Status: Aktif
      Format Valid: False
      Unduhan Class: 1
      @@CASE@@
      Arsip_Malam epub 0.5 1 0 0 1
      @@OUTPUT@@
      Judul: Arsip Malam
      Format: epub
      Ukuran MB: 0.5
      Sisa Kuota: 1
      Unduhan Buku: 0
      Unduh 1 Berhasil: False
      Unduh 2 Berhasil: False
      Status: Nonaktif
      Format Valid: True
      Unduhan Class: 0
      @@CASE@@
      Buku_Kecil txt 1.0 3 4 1 0
      @@OUTPUT@@
      Judul: Buku Kecil
      Format: txt
      Ukuran MB: 1.0
      Sisa Kuota: 2
      Unduhan Buku: 1
      Unduh 1 Berhasil: False
      Unduh 2 Berhasil: True
      Status: Aktif
      Format Valid: False
      Unduhan Class: 1
      @@CASE@@
      Modul_Akhir pdf 12.75 8 4 4 1
      @@OUTPUT@@
      Judul: Modul Akhir
      Format: pdf
      Ukuran MB: 12.75
      Sisa Kuota: 0
      Unduhan Buku: 8
      Unduh 1 Berhasil: True
      Unduh 2 Berhasil: True
      Status: Nonaktif
      Format Valid: True
      Unduhan Class: 8
      @@CASE@@
      Buku_Nol epub 1 0 1 0 0
      @@OUTPUT@@
      Judul: Buku Nol
      Format: epub
      Ukuran MB: 1.0
      Sisa Kuota: 0
      Unduhan Buku: 0
      Unduh 1 Berhasil: False
      Unduh 2 Berhasil: False
      Status: Aktif
      Format Valid: True
      Unduhan Class: 0
---

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

{% include pyodide-exercise.html id="assignment1-kelas-a" title="Memuat sub study case..." prompt="Masukkan NIM untuk memuat sub study case." %}

Setelah mengerjakan tugas, semua mahasiswa diharapkan bisa mengisi survey [ini](https://forms.gle/BvBZVUGsP5BBaHxy9), cuma 3 pertanyaan kok
