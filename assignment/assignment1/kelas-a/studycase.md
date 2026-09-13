---
title: Study Case Kelas A
layout: default
parent: Assignment 1
grand_parent: Assignment
printtitle: Study Case Kelas A (Assignment 1) - Peminjaman Buku Perpustakaan
nav_order: 1
tampil: true
isdebug: false
assignment_id: assignment1-kelas-a
variant_version: 1
variants:
  - id: v1
    title: Variant 1 - Peminjaman dan Validasi ISBN
    brief: >-
      Input: judul, penulis, tahun terbit, stok, dan ISBN. Output: data buku,
      stok setelah satu kali peminjaman, status peminjaman, validitas ISBN,
      dan total_buku.
    prompt: |
      Tujuan tugas
      Buat class Buku untuk mengelola peminjaman buku perpustakaan. Program harus dapat menyimpan informasi buku, mengurangi stok ketika buku dipinjam, dan memvalidasi ISBN tanpa mengubah format output yang sudah disediakan.

      1. Attribute class
      - Buat total_buku = 0 sebagai attribute class.
      - Tambahkan total_buku sebanyak 1 setiap kali object Buku berhasil dibuat.
      - Gunakan Buku.total_buku agar penghitung bersifat milik class, bukan penghitung terpisah untuk setiap object.

      2. Attribute object
      - Simpan judul, penulis, dan tahun_terbit sebagai attribute public.
      - Buat _status_pinjam sebagai attribute protected dengan nilai awal False.
      - Simpan stok pada attribute private __stok. Jangan mengganti nama __stok dan jangan mengaksesnya langsung dari program utama.

      3. Constructor __init__(self, judul, penulis, tahun_terbit, stok=1)
      - Pertahankan nama, urutan, dan default parameter constructor.
      - Isi attribute public dan _status_pinjam sesuai starter code.
      - Tambahkan Buku.total_buku sebanyak 1.
      - Isi nilai stok melalui self.stok, bukan langsung melalui self.__stok, supaya setter melakukan validasi sejak object dibuat.

      4. Property stok
      - Buat getter @property stok yang mengembalikan nilai private __stok.
      - Buat setter @stok.setter stok(self, nilai).
      - Jika nilai kurang dari 0, raise ValueError("Stok tidak boleh negatif.").
      - Jika nilai valid, simpan nilai tersebut ke __stok.
      - Method pinjam() harus mengubah stok melalui property, bukan mengubah __stok secara langsung.

      5. Method pinjam()
      - Jika stok masih lebih besar dari 0, kurangi stok tepat 1 melalui property stok.
      - Saat peminjaman berhasil, ubah _status_pinjam menjadi True dan kembalikan True.
      - Jika stok sudah 0, jangan mengubah stok atau status, lalu kembalikan False.

      6. Static method validasi_isbn(isbn)
      - Tambahkan decorator @staticmethod.
      - Kembalikan True jika panjang string ISBN tepat 10 atau 13 karakter.
      - Kembalikan False untuk panjang selain 10 atau 13.
      - Method ini tidak membutuhkan self karena hanya memeriksa nilai input.

      7. Program utama dan output
      - Program utama sudah tersedia. Jangan menghapus, memindahkan, atau mengganti bagian input dan print.
      - Satu baris input berisi judul, penulis, tahun_terbit, stok, dan isbn.
      - Starter code sudah mengubah underscore pada judul dan penulis menjadi spasi.
      - Method pinjam() dipanggil tepat satu kali dan validasi ISBN dilakukan melalui Buku.validasi_isbn(isbn).
      - Jangan menambahkan print tambahan. Output harus tetap tujuh baris dengan label dan posisi titik dua seperti starter code.

      Checklist sebelum Run Tests
      - total_buku bertambah satu untuk setiap object.
      - stok divalidasi oleh setter dan tidak boleh negatif.
      - pinjam() hanya mengurangi stok jika stok tersedia.
      - validasi_isbn() hanya menerima panjang 10 atau 13.
      - Nama method, nama attribute, dan format output tetap sama.
    starter: |
      class Buku:
          total_buku = 0

          def __init__(self, judul, penulis, tahun_terbit, stok=1):
              self.judul = judul
              self.penulis = penulis
              self.tahun_terbit = tahun_terbit
              self._status_pinjam = False
              # TODO: tambah Buku.total_buku sebanyak 1
              # TODO: isi stok lewat property (bukan langsung ke __stok)

          @property
          def stok(self):
              # TODO: kembalikan __stok
              pass

          @stok.setter
          def stok(self, nilai):
              # TODO: validasi nilai >= 0, lalu simpan ke __stok
              pass

          def pinjam(self):
              # TODO: kurangi stok jika tersedia, set status, return True/False
              pass

          @staticmethod
          def validasi_isbn(isbn):
              # TODO: True jika panjang isbn 10 atau 13
              pass


      judul, penulis, tahun_terbit, stok, isbn = input().split()
      buku = Buku(judul.replace("_", " "), penulis.replace("_", " "), int(tahun_terbit), int(stok))
      hasil_pinjam = buku.pinjam()
      isbn_valid = Buku.validasi_isbn(isbn)

      print(f"{'Judul':<13}: {buku.judul}")
      print(f"{'Penulis':<13}: {buku.penulis}")
      print(f"{'Tahun Terbit':<13}: {buku.tahun_terbit}")
      print(f"{'Stok Tersisa':<13}: {buku.stok}")
      print(f"{'Status Pinjam':<13}: {'Dipinjam' if hasil_pinjam else 'Tidak Dipinjam'}")
      print(f"{'ISBN Valid':<13}: {isbn_valid}")
      print(f"{'Total Buku':<13}: {Buku.total_buku}")
    tests: |
      Laskar_Pelangi Andrea_Hirata 2005 3 9786020000001
      @@OUTPUT@@
      Judul        : Laskar Pelangi
      Penulis      : Andrea Hirata
      Tahun Terbit : 2005
      Stok Tersisa : 2
      Status Pinjam: Dipinjam
      ISBN Valid   : True
      Total Buku   : 1
      @@CASE@@
      Bumi_Manusia Pramoedya_Ananta_Toer 1980 0 12345
      @@OUTPUT@@
      Judul        : Bumi Manusia
      Penulis      : Pramoedya Ananta Toer
      Tahun Terbit : 1980
      Stok Tersisa : 0
      Status Pinjam: Tidak Dipinjam
      ISBN Valid   : False
      Total Buku   : 1
      @@CASE@@
      Negeri_5_Menara Ahmad_Fuadi 2009 1 9786020000
      @@OUTPUT@@
      Judul        : Negeri 5 Menara
      Penulis      : Ahmad Fuadi
      Tahun Terbit : 2009
      Stok Tersisa : 0
      Status Pinjam: Dipinjam
      ISBN Valid   : True
      Total Buku   : 1
      @@CASE@@
      Laut_Bercerita Leila_S_Chudori 2017 5 9786024246940
      @@OUTPUT@@
      Judul        : Laut Bercerita
      Penulis      : Leila S Chudori
      Tahun Terbit : 2017
      Stok Tersisa : 4
      Status Pinjam: Dipinjam
      ISBN Valid   : True
      Total Buku   : 1
      @@CASE@@
      Ronggeng_Dukuh_Paruk Ahmad_Tohari 1982 1 1234567890
      @@OUTPUT@@
      Judul        : Ronggeng Dukuh Paruk
      Penulis      : Ahmad Tohari
      Tahun Terbit : 1982
      Stok Tersisa : 0
      Status Pinjam: Dipinjam
      ISBN Valid   : True
      Total Buku   : 1
      @@CASE@@
      Cantik_Itu_Luka Eka_Kurniawan 2002 0 123456789012
      @@OUTPUT@@
      Judul        : Cantik Itu Luka
      Penulis      : Eka Kurniawan
      Tahun Terbit : 2002
      Stok Tersisa : 0
      Status Pinjam: Tidak Dipinjam
      ISBN Valid   : False
      Total Buku   : 1
      @@CASE@@
      Perahu_Kertas Dee_Lestari 2009 2 9786022916629
      @@OUTPUT@@
      Judul        : Perahu Kertas
      Penulis      : Dee Lestari
      Tahun Terbit : 2009
      Stok Tersisa : 1
      Status Pinjam: Dipinjam
      ISBN Valid   : True
      Total Buku   : 1

  - id: v2
    title: Variant 2 - Katalog Buku dan Validasi Rak
    brief: >-
      Input: judul, kategori, halaman, rak, tambahan halaman, dan kode rak.
      Output: data katalog, jumlah halaman setelah penambahan, validitas kode
      rak, dan total_koleksi.
    prompt: |
      Tujuan tugas
      Buat class Buku untuk mengelola data katalog perpustakaan. Object harus menyimpan kategori dan lokasi rak, dapat menambahkan jumlah halaman melalui property, serta dapat memeriksa apakah kode rak mengikuti pola yang ditentukan.

      1. Attribute class
      - Buat total_koleksi = 0 sebagai attribute class.
      - Tambahkan Buku.total_koleksi sebanyak 1 setiap kali object Buku dibuat.
      - Jangan membuat total_koleksi sebagai attribute instance karena nilainya harus dihitung bersama oleh class.

      2. Attribute object
      - Simpan judul, kategori, dan rak sebagai attribute public.
      - Simpan jumlah halaman pada attribute private __halaman.
      - Jangan mengubah nama __halaman dan jangan membaca attribute private tersebut secara langsung di luar property.

      3. Constructor __init__(self, judul, kategori, halaman, rak="Umum")
      - Pertahankan signature constructor dan default rak "Umum".
      - Isi judul, kategori, dan rak.
      - Tambahkan total_koleksi sebanyak 1.
      - Isi jumlah halaman melalui self.halaman agar setter melakukan validasi.

      4. Property halaman
      - Buat getter @property halaman yang mengembalikan __halaman.
      - Buat setter @halaman.setter halaman(self, nilai).
      - Jumlah halaman harus minimal 1. Jika nilai kurang dari 1, raise ValueError.
      - Jika nilai valid, simpan ke __halaman.
      - Semua perubahan jumlah halaman harus melewati property ini.

      5. Method tambah_halaman(jumlah)
      - Tambahkan jumlah ke halaman yang sedang tersimpan.
      - Gunakan self.halaman saat membaca dan menulis nilai, sehingga setter tetap digunakan.
      - Nilai tambahan 0 tetap dianggap valid selama jumlah halaman akhir masih memenuhi aturan.
      - Tidak perlu membuat output tambahan dari method ini karena program utama sudah mencetak hasilnya.

      6. Static method kode_rak_valid(kode)
      - Tambahkan decorator @staticmethod.
      - Kembalikan True hanya jika kode memiliki format RA diikuti tepat dua digit angka, misalnya RA01 atau RA99.
      - Kembalikan False jika awalan bukan RA, jumlah digit tidak tepat dua, atau terdapat karakter lain.
      - Method ini tidak membutuhkan self.

      7. Program utama dan output
      - Jangan menghapus atau mengubah bagian input dan print yang tersedia di starter code.
      - Satu baris input berisi judul, kategori, halaman, rak, tambahan halaman, dan kode rak.
      - Starter code sudah mengubah underscore pada judul menjadi spasi.
      - Buat object Buku, panggil tambah_halaman() satu kali, lalu cetak enam baris output sesuai label yang tersedia.
      - Jangan menambahkan print atau mengubah kapitalisasi label karena output dibandingkan secara persis.

      Checklist sebelum Run Tests
      - total_koleksi bertambah satu setiap object dibuat.
      - halaman disimpan di __halaman melalui getter dan setter.
      - Nilai halaman kurang dari 1 ditolak.
      - tambah_halaman() memakai property halaman.
      - kode_rak_valid() hanya menerima pola RA dan dua digit.
      - Format output tetap enam baris seperti starter code.
    starter: |
      class Buku:
          total_koleksi = 0

          def __init__(self, judul, kategori, halaman, rak="Umum"):
              self.judul = judul
              self.kategori = kategori
              self.rak = rak
              Buku.total_koleksi += 1
              self.halaman = halaman

          @property
          def halaman(self):
              # TODO: kembalikan __halaman
              pass

          @halaman.setter
          def halaman(self, nilai):
              # TODO: raise ValueError jika nilai < 1, lalu simpan
              pass

          def tambah_halaman(self, jumlah):
              # TODO: tambahkan jumlah ke halaman melalui property
              pass

          @staticmethod
          def kode_rak_valid(kode):
              # TODO: True jika kode diawali RA dan diikuti dua angka
              pass


      judul, kategori, halaman, rak, tambahan, kode = input().split()
      buku = Buku(judul.replace("_", " "), kategori, int(halaman), rak)
      buku.tambah_halaman(int(tambahan))

      print(f"Judul: {buku.judul}")
      print(f"Kategori: {buku.kategori}")
      print(f"Rak: {buku.rak}")
      print(f"Jumlah Halaman: {buku.halaman}")
      print(f"Rak Valid: {Buku.kode_rak_valid(kode)}")
      print(f"Total Koleksi: {Buku.total_koleksi}")
    tests: |
      Laut_Senja Novel 120 RA01 15 RA01
      @@OUTPUT@@
      Judul: Laut Senja
      Kategori: Novel
      Rak: RA01
      Jumlah Halaman: 135
      Rak Valid: True
      Total Koleksi: 1
      @@CASE@@
      Jejak_Hujan Puisi 88 RA12 0 RA12
      @@OUTPUT@@
      Judul: Jejak Hujan
      Kategori: Puisi
      Rak: RA12
      Jumlah Halaman: 88
      Rak Valid: True
      Total Koleksi: 1
      @@CASE@@
      Kota_Lama Sejarah 200 RB03 25 BX03
      @@OUTPUT@@
      Judul: Kota Lama
      Kategori: Sejarah
      Rak: RB03
      Jumlah Halaman: 225
      Rak Valid: False
      Total Koleksi: 1
      @@CASE@@
      Ruang_Biru Fiksi 1 RA99 4 RA99
      @@OUTPUT@@
      Judul: Ruang Biru
      Kategori: Fiksi
      Rak: RA99
      Jumlah Halaman: 5
      Rak Valid: True
      Total Koleksi: 1
      @@CASE@@
      Peta_Waktu Referensi 350 RA10 50 RA10
      @@OUTPUT@@
      Judul: Peta Waktu
      Kategori: Referensi
      Rak: RA10
      Jumlah Halaman: 400
      Rak Valid: True
      Total Koleksi: 1
      @@CASE@@
      Taman_Rahasia Novel 75 RA07 10 RA7
      @@OUTPUT@@
      Judul: Taman Rahasia
      Kategori: Novel
      Rak: RA07
      Jumlah Halaman: 85
      Rak Valid: False
      Total Koleksi: 1
      @@CASE@@
      Nada_Malam Puisi 42 RA02 8 ZZ02
      @@OUTPUT@@
      Judul: Nada Malam
      Kategori: Puisi
      Rak: RA02
      Jumlah Halaman: 50
      Rak Valid: False
      Total Koleksi: 1

  - id: v3
    title: Variant 3 - Pengembalian Buku dan Denda
    brief: >-
      Input: judul, tahun terbit, dan jumlah hari terlambat. Output: data
      pengembalian, jumlah hari terlambat, denda, validitas tahun, dan
      total_pengembalian.
    prompt: |
      Tujuan tugas
      Buat class Buku untuk mensimulasikan proses pengembalian buku di perpustakaan dan menghitung denda berdasarkan jumlah hari keterlambatan.

      1. Attribute class
      - Buat denda_harian = 2000. Nilai ini berlaku untuk semua object Buku dan menjadi tarif denda untuk setiap hari keterlambatan.
      - Buat total_pengembalian = 0. Nilai ini menghitung jumlah object yang berhasil dicatat pengembaliannya.

      2. Attribute object
      - judul dan tahun_terbit harus menjadi attribute public.
      - hari keterlambatan harus disimpan dalam attribute private __hari_terlambat.
      - Pada __init__, mulai __hari_terlambat dari 0. Jangan mengubah nama attribute private tersebut.

      3. Property hari_terlambat
      - Buat getter @property hari_terlambat yang mengembalikan nilai __hari_terlambat.
      - Buat setter @hari_terlambat.setter untuk mengubah nilai melalui property.
      - Nilai hari keterlambatan tidak boleh negatif. Jika nilai negatif diberikan, raise ValueError. Jika valid, simpan nilai tersebut ke __hari_terlambat.

      4. Method hitung_denda()
      - Kembalikan hasil perkalian hari_terlambat dengan denda_harian.
      - Gunakan property hari_terlambat dan attribute class denda_harian, bukan membaca __hari_terlambat secara langsung.
      - Contoh: jika terlambat 3 hari, denda yang dikembalikan adalah 3 * 2000 = 6000.

      5. Method catat_pengembalian(hari)
      - Terima jumlah hari keterlambatan melalui parameter hari.
      - Isi nilai tersebut melalui property self.hari_terlambat agar setter dan validasinya digunakan.
      - Tambahkan total_pengembalian sebanyak 1 setelah pengembalian berhasil dicatat.
      - Kembalikan nilai denda dari method hitung_denda().
      - Method ini dipanggil satu kali oleh program utama untuk setiap object Buku.

      6. Static method validasi_tahun(tahun)
      - Buat @staticmethod dengan nama validasi_tahun(tahun).
      - Kembalikan True jika tahun berada pada rentang 1900 sampai 2026, termasuk 1900 dan 2026.
      - Kembalikan False jika tahun kurang dari 1900 atau lebih dari 2026.
      - Method ini tidak membutuhkan self atau object Buku.

      7. Program utama
      - Bagian program utama dan print sudah disediakan di starter code. Jangan menghapus atau mengubah format print.
      - Program membaca satu baris dengan format: judul tahun hari.
      - Judul yang memakai underscore sudah diubah menjadi spasi oleh starter code.
      - Buat object Buku, panggil catat_pengembalian() satu kali, lalu gunakan hasilnya untuk output.
      - Jangan menambahkan print atau teks lain karena output akan dibandingkan persis dengan expected output.

      Checklist sebelum Run Tests
      - Getter dan setter hari_terlambat sudah dibuat.
      - __hari_terlambat tidak diakses langsung di luar property.
      - catat_pengembalian() mengubah property, menambah total_pengembalian, dan mengembalikan denda.
      - hitung_denda() memakai tarif denda_harian.
      - validasi_tahun() mengembalikan boolean sesuai rentang tahun.
      - Output tetap memiliki enam baris dengan label yang sudah tersedia di starter code.
    starter: |
      class Buku:
          denda_harian = 2000
          total_pengembalian = 0

          def __init__(self, judul, tahun_terbit):
              self.judul = judul
              self.tahun_terbit = tahun_terbit
              self.__hari_terlambat = 0

          @property
          def hari_terlambat(self):
              # TODO: kembalikan __hari_terlambat
              pass

          @hari_terlambat.setter
          def hari_terlambat(self, nilai):
              # TODO: nilai tidak boleh negatif
              pass

          def hitung_denda(self):
              # TODO: kembalikan hari_terlambat * denda_harian
              pass

          def catat_pengembalian(self, hari):
              # TODO: isi property, tambah total_pengembalian, return denda
              pass

          @staticmethod
          def validasi_tahun(tahun):
              # TODO: True jika tahun berada pada rentang 1900 sampai 2026
              pass


      judul, tahun, hari = input().split()
      buku = Buku(judul.replace("_", " "), int(tahun))
      denda = buku.catat_pengembalian(int(hari))

      print(f"Judul: {buku.judul}")
      print(f"Tahun Terbit: {buku.tahun_terbit}")
      print(f"Hari Terlambat: {buku.hari_terlambat}")
      print(f"Denda: {denda}")
      print(f"Tahun Valid: {Buku.validasi_tahun(buku.tahun_terbit)}")
      print(f"Total Pengembalian: {Buku.total_pengembalian}")
    tests: |
      Novel_A 2020 3
      @@OUTPUT@@
      Judul: Novel A
      Tahun Terbit: 2020
      Hari Terlambat: 3
      Denda: 6000
      Tahun Valid: True
      Total Pengembalian: 1
      @@CASE@@
      Buku_Lama 1899 0
      @@OUTPUT@@
      Judul: Buku Lama
      Tahun Terbit: 1899
      Hari Terlambat: 0
      Denda: 0
      Tahun Valid: False
      Total Pengembalian: 1
      @@CASE@@
      Cerita_Kota 2005 7
      @@OUTPUT@@
      Judul: Cerita Kota
      Tahun Terbit: 2005
      Hari Terlambat: 7
      Denda: 14000
      Tahun Valid: True
      Total Pengembalian: 1
      @@CASE@@
      Dasar_Python 2026 1
      @@OUTPUT@@
      Judul: Dasar Python
      Tahun Terbit: 2026
      Hari Terlambat: 1
      Denda: 2000
      Tahun Valid: True
      Total Pengembalian: 1
      @@CASE@@
      Arsip_Nusantara 1890 12
      @@OUTPUT@@
      Judul: Arsip Nusantara
      Tahun Terbit: 1890
      Hari Terlambat: 12
      Denda: 24000
      Tahun Valid: False
      Total Pengembalian: 1
      @@CASE@@
      Langit_Sore 1999 0
      @@OUTPUT@@
      Judul: Langit Sore
      Tahun Terbit: 1999
      Hari Terlambat: 0
      Denda: 0
      Tahun Valid: True
      Total Pengembalian: 1
      @@CASE@@
      Jejak_Waktu 2027 20
      @@OUTPUT@@
      Judul: Jejak Waktu
      Tahun Terbit: 2027
      Hari Terlambat: 20
      Denda: 40000
      Tahun Valid: False
      Total Pengembalian: 1

  - id: v4
    title: Variant 4 - Reservasi Buku
    brief: >-
      Input: judul, kode peminjam, reservasi awal, tambahan reservasi, dan
      kode validasi. Output: jumlah reservasi, keberhasilan pengajuan,
      validitas kode peminjam, dan total_reservasi.
    prompt: |
      Tujuan tugas
      Buat class Buku untuk mengelola jumlah reservasi buku perpustakaan. Program harus dapat menyimpan data peminjam, memeriksa kapasitas reservasi, mengubah jumlah reservasi secara aman melalui property, dan memvalidasi kode peminjam.

      1. Attribute class
      - Buat maksimal_reservasi = 5 sebagai batas reservasi satu object.
      - Buat total_reservasi = 0 sebagai penghitung pada tingkat class.
      - Gunakan Buku.total_reservasi agar penghitung tidak menjadi milik satu object saja.

      2. Attribute object
      - Simpan judul dan peminjam sebagai attribute public.
      - Buat _status sebagai attribute protected dengan nilai awal "tersedia".
      - Simpan jumlah reservasi pada attribute private __reservasi.
      - Jangan mengganti nama attribute dan jangan mengakses __reservasi langsung dari program utama.

      3. Constructor __init__(self, judul, peminjam, reservasi_awal=0)
      - Pertahankan signature constructor dan default reservasi_awal = 0.
      - Isi judul, peminjam, serta _status sesuai starter code.
      - Masukkan reservasi awal melalui self.reservasi agar setter memvalidasi nilai tersebut.

      4. Property reservasi
      - Buat getter @property reservasi yang mengembalikan __reservasi.
      - Buat setter @reservasi.setter reservasi(self, nilai).
      - Nilai reservasi harus berada pada rentang 0 sampai maksimal_reservasi, termasuk batas 0 dan 5.
      - Jika nilai berada di luar rentang, raise ValueError.
      - Perubahan jumlah reservasi harus melewati property reservasi.

      5. Method ajukan_reservasi(jumlah)
      - Terima jumlah tambahan melalui parameter jumlah.
      - Jika jumlah negatif atau reservasi + jumlah lebih besar dari maksimal_reservasi, kembalikan False.
      - Pada kondisi gagal, jangan mengubah nilai reservasi.
      - Jika kapasitas masih cukup, tambahkan jumlah ke self.reservasi dan kembalikan True.
      - Setiap pemanggilan ajukan_reservasi() harus menambah Buku.total_reservasi tepat satu kali, baik berhasil maupun gagal.

      6. Static method kode_peminjam_valid(kode)
      - Gunakan decorator @staticmethod.
      - Kembalikan True hanya jika kode diawali huruf M dan diikuti tepat enam digit angka, misalnya M123456.
      - Kembalikan False jika awalan, jumlah digit, atau karakter kode tidak sesuai.
      - Method ini tidak membutuhkan self.

      7. Program utama dan output
      - Program utama dan enam perintah print sudah disediakan. Jangan menghapus atau mengubahnya.
      - Input satu baris berisi judul, peminjam, reservasi_awal, jumlah tambahan, dan kode.
      - Starter code sudah mengubah underscore pada judul menjadi spasi.
      - Buat object Buku, panggil ajukan_reservasi() satu kali, lalu pertahankan output enam baris.
      - Jangan menambahkan print atau teks debug karena hasil dibandingkan persis dengan expected output.

      Checklist sebelum Run Tests
      - maksimal_reservasi dan total_reservasi adalah attribute class.
      - __reservasi hanya diakses melalui getter dan setter.
      - Setter menolak nilai di luar 0 sampai 5.
      - Pengajuan yang melebihi kapasitas tidak mengubah reservasi.
      - total_reservasi bertambah pada setiap pemanggilan method.
      - kode_peminjam_valid() memeriksa pola M dan enam digit.
      - Nama method dan format output tetap sama.
    starter: |
      class Buku:
          maksimal_reservasi = 5
          total_reservasi = 0

          def __init__(self, judul, peminjam, reservasi_awal=0):
              self.judul = judul
              self.peminjam = peminjam
              self._status = "tersedia"
              self.reservasi = reservasi_awal

          @property
          def reservasi(self):
              # TODO: kembalikan __reservasi
              pass

          @reservasi.setter
          def reservasi(self, nilai):
              # TODO: validasi 0 <= nilai <= maksimal_reservasi
              pass

          def ajukan_reservasi(self, jumlah):
              # TODO: tambah reservasi jika masih cukup, return True/False
              pass

          @staticmethod
          def kode_peminjam_valid(kode):
              # TODO: True jika diawali M dan diikuti enam angka
              pass


      judul, peminjam, awal, tambahan, kode = input().split()
      buku = Buku(judul.replace("_", " "), peminjam, int(awal))
      berhasil = buku.ajukan_reservasi(int(tambahan))

      print(f"Judul: {buku.judul}")
      print(f"Peminjam: {buku.peminjam}")
      print(f"Reservasi: {buku.reservasi}")
      print(f"Berhasil: {berhasil}")
      print(f"Kode Valid: {Buku.kode_peminjam_valid(kode)}")
      print(f"Total Reservasi: {Buku.total_reservasi}")
    tests: |
      Buku_Awal MhsA 1 2 M123456
      @@OUTPUT@@
      Judul: Buku Awal
      Peminjam: MhsA
      Reservasi: 3
      Berhasil: True
      Kode Valid: True
      Total Reservasi: 1
      @@CASE@@
      Buku_Baru MhsB 4 2 M234567
      @@OUTPUT@@
      Judul: Buku Baru
      Peminjam: MhsB
      Reservasi: 4
      Berhasil: False
      Kode Valid: True
      Total Reservasi: 1
      @@CASE@@
      Cerita_Lama MhsC 0 5 M345678
      @@OUTPUT@@
      Judul: Cerita Lama
      Peminjam: MhsC
      Reservasi: 5
      Berhasil: True
      Kode Valid: True
      Total Reservasi: 1
      @@CASE@@
      Peta_Kota MhsD 2 0 X456789
      @@OUTPUT@@
      Judul: Peta Kota
      Peminjam: MhsD
      Reservasi: 2
      Berhasil: True
      Kode Valid: False
      Total Reservasi: 1
      @@CASE@@
      Arsip_Baru MhsE 5 1 M567890
      @@OUTPUT@@
      Judul: Arsip Baru
      Peminjam: MhsE
      Reservasi: 5
      Berhasil: False
      Kode Valid: True
      Total Reservasi: 1
      @@CASE@@
      Novel_Pagi MhsF 3 1 M678901
      @@OUTPUT@@
      Judul: Novel Pagi
      Peminjam: MhsF
      Reservasi: 4
      Berhasil: True
      Kode Valid: True
      Total Reservasi: 1
      @@CASE@@
      Buku_Senja MhsG 0 0 M12345
      @@OUTPUT@@
      Judul: Buku Senja
      Peminjam: MhsG
      Reservasi: 0
      Berhasil: True
      Kode Valid: False
      Total Reservasi: 1

  - id: v5
    title: Variant 5 - Ulasan dan Rating Buku
    brief: >-
      Input: judul, penulis, rating awal, rating baru, dan rating untuk
      validasi. Output: rating akhir, keberhasilan perubahan, validitas
      rating, dan total_ulasan.
    prompt: |
      Tujuan tugas
      Buat class Buku untuk mengelola rating buku dari pembaca. Program harus menyimpan informasi buku, memvalidasi rating melalui property, mengatur perubahan rating, dan menghitung jumlah ulasan yang diproses.

      1. Attribute class
      - Buat total_ulasan = 0 sebagai attribute class.
      - Nilai total_ulasan menunjukkan jumlah pemanggilan beri_rating(), bukan rating sebuah object.
      - Gunakan Buku.total_ulasan agar penghitung dapat digunakan bersama.

      2. Attribute object
      - Simpan judul dan penulis sebagai attribute public.
      - Simpan rating pada attribute private __rating.
      - Jangan mengganti nama __rating dan jangan mengaksesnya langsung dari program utama.

      3. Constructor __init__(self, judul, penulis, rating_awal=0)
      - Pertahankan signature constructor dan default rating_awal = 0.
      - Isi judul dan penulis.
      - Masukkan rating awal melalui self.rating supaya setter digunakan.

      4. Property rating
      - Buat getter @property rating yang mengembalikan __rating.
      - Buat setter @rating.setter rating(self, nilai).
      - Rating valid berada pada rentang 0 sampai 5, termasuk kedua batas.
      - Jika nilai di luar rentang, raise ValueError.
      - Semua perubahan rating harus dilakukan melalui property rating.

      5. Method beri_rating(nilai)
      - Terima rating baru melalui parameter nilai.
      - Tambahkan Buku.total_ulasan tepat satu kali pada setiap pemanggilan method.
      - Jika nilai valid, ubah self.rating melalui property dan kembalikan True.
      - Jika nilai invalid, pertahankan rating lama dan kembalikan False.
      - Tangani keputusan valid atau invalid di dalam method agar program utama dapat menyelesaikan test case.

      6. Static method rating_valid(nilai)
      - Gunakan decorator @staticmethod.
      - Kembalikan True jika nilai berada pada rentang 0 sampai 5.
      - Kembalikan False jika nilai kurang dari 0 atau lebih dari 5.
      - Method ini tidak membutuhkan self.

      7. Program utama dan output
      - Jangan menghapus atau mengubah bagian input dan print pada starter code.
      - Input satu baris berisi judul, penulis, rating awal, rating baru, dan nilai kode rating.
      - Starter code sudah mengubah underscore pada judul menjadi spasi.
      - Buat object Buku, panggil beri_rating() satu kali, lalu cetak enam baris output.
      - Jangan menambahkan print, mengubah label, atau mengubah format angka.

      Checklist sebelum Run Tests
      - total_ulasan dibuat sebagai attribute class.
      - Rating awal dan rating baru menggunakan property rating.
      - Rating invalid tidak mengubah rating sebelumnya.
      - total_ulasan bertambah pada setiap pemanggilan beri_rating().
      - rating_valid() mengembalikan boolean sesuai rentang 0 sampai 5.
      - Format output tetap enam baris seperti starter code.
    starter: |
      class Buku:
          total_ulasan = 0

          def __init__(self, judul, penulis, rating_awal=0):
              self.judul = judul
              self.penulis = penulis
              self.rating = rating_awal

          @property
          def rating(self):
              # TODO: kembalikan __rating
              pass

          @rating.setter
          def rating(self, nilai):
              # TODO: validasi 0 <= nilai <= 5
              pass

          def beri_rating(self, nilai):
              # TODO: isi rating melalui property, tambah total_ulasan
              pass

          @staticmethod
          def rating_valid(nilai):
              # TODO: True jika nilai berada pada rentang 0 sampai 5
              pass


      judul, penulis, awal, baru, kode = input().split()
      buku = Buku(judul.replace("_", " "), penulis.replace("_", " "), float(awal))
      berhasil = buku.beri_rating(float(baru))

      print(f"Judul: {buku.judul}")
      print(f"Penulis: {buku.penulis}")
      print(f"Rating: {buku.rating}")
      print(f"Berhasil: {berhasil}")
      print(f"Rating Kode Valid: {Buku.rating_valid(float(kode))}")
      print(f"Total Ulasan: {Buku.total_ulasan}")
    tests: |
      Senja_Terakhir Rani 3.5 4.5 4.5
      @@OUTPUT@@
      Judul: Senja Terakhir
      Penulis: Rani
      Rating: 4.5
      Berhasil: True
      Rating Kode Valid: True
      Total Ulasan: 1
      @@CASE@@
      Kota_Dalam Bima 2 5 5
      @@OUTPUT@@
      Judul: Kota Dalam
      Penulis: Bima
      Rating: 5.0
      Berhasil: True
      Rating Kode Valid: True
      Total Ulasan: 1
      @@CASE@@
      Hujan_Pagi Sinta 4 0 0
      @@OUTPUT@@
      Judul: Hujan Pagi
      Penulis: Sinta
      Rating: 0.0
      Berhasil: True
      Rating Kode Valid: True
      Total Ulasan: 1
      @@CASE@@
      Peta_Baru Dodi 1 5.5 5.5
      @@OUTPUT@@
      Judul: Peta Baru
      Penulis: Dodi
      Rating: 1.0
      Berhasil: False
      Rating Kode Valid: False
      Total Ulasan: 1
      @@CASE@@
      Buku_Kecil Nia 0 2.5 2.5
      @@OUTPUT@@
      Judul: Buku Kecil
      Penulis: Nia
      Rating: 2.5
      Berhasil: True
      Rating Kode Valid: True
      Total Ulasan: 1
      @@CASE@@
      Laut_Jauh Ari 5 -1 2
      @@OUTPUT@@
      Judul: Laut Jauh
      Penulis: Ari
      Rating: 5.0
      Berhasil: False
      Rating Kode Valid: True
      Total Ulasan: 1
      @@CASE@@
      Arsip_Hari Tono 2.5 3 6
      @@OUTPUT@@
      Judul: Arsip Hari
      Penulis: Tono
      Rating: 3.0
      Berhasil: True
      Rating Kode Valid: False
      Total Ulasan: 1

  - id: v6
    title: Variant 6 - Genre dan Usia Buku
    brief: >-
      Input: judul, genre, tahun terbit, dan tahun sekarang. Output: data
      genre, usia buku, validitas genre, dan genre_populer.
    prompt: |
      Tujuan tugas
      Buat class Buku untuk mengelompokkan genre dan menghitung usia buku berdasarkan tahun terbit. Program harus menyimpan tahun terbit melalui property, menghitung usia dari tahun yang diberikan, dan memvalidasi genre tanpa mengubah format output.

      1. Attribute class
      - Buat genre_populer = "Fiksi" sebagai attribute class.
      - Nilai genre_populer harus dapat dibaca melalui Buku.genre_populer.
      - Jangan membuat genre_populer sebagai attribute instance karena nilainya berlaku sebagai informasi bersama pada class.

      2. Attribute object
      - Simpan judul dan genre sebagai attribute public.
      - Simpan tahun terbit pada attribute private __tahun_terbit.
      - Jangan mengganti nama __tahun_terbit dan jangan mengakses attribute private tersebut secara langsung dari program utama.

      3. Constructor __init__(self, judul, genre, tahun_terbit)
      - Pertahankan signature constructor.
      - Isi judul dan genre.
      - Masukkan tahun terbit melalui self.tahun_terbit agar setter dipakai.

      4. Property tahun_terbit
      - Buat getter @property tahun_terbit yang mengembalikan __tahun_terbit.
      - Buat setter @tahun_terbit.setter tahun_terbit(self, nilai).
      - Tahun terbit tidak boleh lebih besar dari 2026. Jika melanggar, raise ValueError.
      - Tahun yang lebih kecil atau sama dengan 2026 disimpan melalui property.
      - Perhatikan bahwa test case dapat memakai tahun di masa depan untuk menguji perilaku validasi yang diminta pada starter code.

      5. Method hitung_usia(tahun_sekarang)
      - Kembalikan hasil tahun_sekarang - tahun_terbit.
      - Gunakan property self.tahun_terbit, bukan __tahun_terbit secara langsung.
      - Jangan menambahkan pembulatan, batas minimum, atau aturan lain yang tidak diminta.

      6. Static method genre_valid(genre)
      - Gunakan decorator @staticmethod.
      - Kembalikan True hanya untuk genre Fiksi, Nonfiksi, Puisi, atau Sejarah.
      - Kembalikan False untuk genre lain, misalnya Biografi atau Drama.
      - Perbandingan mengikuti teks input dan bersifat case-sensitive.
      - Method ini tidak membutuhkan self.

      7. Program utama dan output
      - Jangan menghapus atau mengubah bagian input dan print pada starter code.
      - Input satu baris berisi judul, genre, tahun terbit, dan tahun sekarang.
      - Starter code sudah mengubah underscore pada judul menjadi spasi.
      - Buat object Buku, tampilkan tahun terbit melalui property, panggil hitung_usia(), lalu tampilkan hasil genre_valid().
      - Jangan menambahkan print atau mengubah urutan enam baris output.

      Checklist sebelum Run Tests
      - genre_populer dibuat sebagai attribute class dengan nilai "Fiksi".
      - __tahun_terbit diakses melalui getter dan setter.
      - Setter menolak tahun lebih besar dari 2026.
      - hitung_usia() menggunakan selisih tahun_sekarang dan property tahun_terbit.
      - genre_valid() hanya menerima empat genre yang ditentukan.
      - Format output tetap enam baris seperti starter code.
    starter: |
      class Buku:
          genre_populer = "Fiksi"

          def __init__(self, judul, genre, tahun_terbit):
              self.judul = judul
              self.genre = genre
              self.tahun_terbit = tahun_terbit

          @property
          def tahun_terbit(self):
              # TODO: kembalikan __tahun_terbit
              pass

          @tahun_terbit.setter
          def tahun_terbit(self, nilai):
              # TODO: validasi tahun tidak boleh lebih besar dari 2026
              pass

          def hitung_usia(self, tahun_sekarang):
              # TODO: kembalikan tahun_sekarang - tahun_terbit
              pass

          @staticmethod
          def genre_valid(genre):
              # TODO: True untuk Fiksi, Nonfiksi, Puisi, atau Sejarah
              pass


      judul, genre, tahun, sekarang = input().split()
      buku = Buku(judul.replace("_", " "), genre, int(tahun))

      print(f"Judul: {buku.judul}")
      print(f"Genre: {buku.genre}")
      print(f"Tahun Terbit: {buku.tahun_terbit}")
      print(f"Usia Buku: {buku.hitung_usia(int(sekarang))}")
      print(f"Genre Valid: {Buku.genre_valid(buku.genre)}")
      print(f"Genre Populer: {Buku.genre_populer}")
    tests: |
      Jalan_Pulang Fiksi 2010 2026
      @@OUTPUT@@
      Judul: Jalan Pulang
      Genre: Fiksi
      Tahun Terbit: 2010
      Usia Buku: 16
      Genre Valid: True
      Genre Populer: Fiksi
      @@CASE@@
      Catatan_Hari Nonfiksi 2020 2026
      @@OUTPUT@@
      Judul: Catatan Hari
      Genre: Nonfiksi
      Tahun Terbit: 2020
      Usia Buku: 6
      Genre Valid: True
      Genre Populer: Fiksi
      @@CASE@@
      Suara_Malam Puisi 1999 2025
      @@OUTPUT@@
      Judul: Suara Malam
      Genre: Puisi
      Tahun Terbit: 1999
      Usia Buku: 26
      Genre Valid: True
      Genre Populer: Fiksi
      @@CASE@@
      Jejak_Lama Sejarah 1890 2020
      @@OUTPUT@@
      Judul: Jejak Lama
      Genre: Sejarah
      Tahun Terbit: 1890
      Usia Buku: 130
      Genre Valid: True
      Genre Populer: Fiksi
      @@CASE@@
      Ruang_Baru Biografi 2018 2026
      @@OUTPUT@@
      Judul: Ruang Baru
      Genre: Biografi
      Tahun Terbit: 2018
      Usia Buku: 8
      Genre Valid: False
      Genre Populer: Fiksi
      @@CASE@@
      Masa_Depan Fiksi 2026 2028
      @@OUTPUT@@
      Judul: Masa Depan
      Genre: Fiksi
      Tahun Terbit: 2026
      Usia Buku: 2
      Genre Valid: True
      Genre Populer: Fiksi
      @@CASE@@
      Rumah_Kata Drama 2005 2026
      @@OUTPUT@@
      Judul: Rumah Kata
      Genre: Drama
      Tahun Terbit: 2005
      Usia Buku: 21
      Genre Valid: False
      Genre Populer: Fiksi

  - id: v7
    title: Variant 7 - Lokasi dan Kode Buku
    brief: >-
      Input: judul, lantai, rak awal, rak baru, dan kode buku. Output: lokasi
      baru, kode tersimpan dalam huruf besar, validitas kode, dan
      total_lokasi.
    prompt: |
      Tujuan tugas
      Buat class Buku untuk mengelola lokasi fisik buku di perpustakaan. Program harus menyimpan kode buku melalui property, memindahkan buku ke rak baru, mengubah kode menjadi huruf besar, dan memvalidasi format kode.

      1. Attribute class
      - Buat total_lokasi = 0 sebagai attribute class.
      - Tambahkan Buku.total_lokasi sebanyak 1 ketika object Buku dibuat.
      - Jangan membuat penghitung tersebut sebagai attribute instance.

      2. Attribute object
      - Simpan judul, lantai, dan rak sebagai attribute public.
      - Simpan kode pada attribute private __kode.
      - Jangan mengganti nama __kode dan jangan mengaksesnya secara langsung dari program utama.

      3. Constructor __init__(self, judul, lantai, rak, kode)
      - Pertahankan signature constructor.
      - Isi judul, lantai, dan rak.
      - Masukkan kode melalui self.kode agar setter dapat menormalisasi nilainya.
      - Tambahkan total_lokasi satu kali pada saat object dibuat.

      4. Property kode
      - Buat getter @property kode yang mengembalikan __kode.
      - Buat setter @kode.setter kode(self, nilai).
      - Setter harus menyimpan kode dalam huruf besar menggunakan nilai.upper().
      - Jangan mengubah kode di program utama setelah object dibuat; normalisasi menjadi tanggung jawab setter.

      5. Method pindah_rak(rak_baru)
      - Ubah attribute public rak menjadi rak_baru.
      - Kembalikan nama rak baru setelah perubahan.
      - Jangan membuat object baru dan jangan mengubah lantai atau kode.

      6. Static method kode_buku_valid(kode)
      - Gunakan decorator @staticmethod.
      - Kembalikan True jika kode memiliki tepat lima karakter dan seluruhnya alfanumerik.
      - Kembalikan False jika panjangnya bukan lima atau terdapat karakter non-alfanumerik seperti tanda hubung.
      - Validasi dilakukan terhadap kode yang diberikan ke method. Program utama memberikan buku.kode yang sudah dinormalisasi menjadi huruf besar.
      - Method ini tidak membutuhkan self.

      7. Program utama dan output
      - Jangan menghapus atau mengubah bagian input dan print pada starter code.
      - Input satu baris berisi judul, lantai, rak awal, rak baru, dan kode.
      - Starter code sudah mengubah underscore pada judul menjadi spasi.
      - Buat object Buku, panggil pindah_rak() satu kali, lalu cetak enam baris output.
      - Jangan menambahkan print karena output dibandingkan persis dengan expected output.

      Checklist sebelum Run Tests
      - total_lokasi bertambah satu saat object dibuat.
      - __kode diakses melalui property kode.
      - Setter kode selalu menyimpan huruf besar.
      - pindah_rak() mengubah rak dan mengembalikan rak baru.
      - kode_buku_valid() memeriksa tepat lima karakter alfanumerik.
      - Format output tetap enam baris seperti starter code.
    starter: |
      class Buku:
          total_lokasi = 0

          def __init__(self, judul, lantai, rak, kode):
              self.judul = judul
              self.lantai = lantai
              self.rak = rak
              self.kode = kode
              Buku.total_lokasi += 1

          @property
          def kode(self):
              # TODO: kembalikan __kode
              pass

          @kode.setter
          def kode(self, nilai):
              # TODO: simpan kode dalam huruf besar
              pass

          def pindah_rak(self, rak_baru):
              # TODO: ubah rak dan kembalikan nama rak baru
              pass

          @staticmethod
          def kode_buku_valid(kode):
              # TODO: True jika panjang 5 dan semua karakter alfanumerik
              pass


      judul, lantai, rak, rak_baru, kode = input().split()
      buku = Buku(judul.replace("_", " "), int(lantai), rak, kode)
      lokasi_baru = buku.pindah_rak(rak_baru)

      print(f"Judul: {buku.judul}")
      print(f"Lantai: {buku.lantai}")
      print(f"Rak: {lokasi_baru}")
      print(f"Kode: {buku.kode}")
      print(f"Kode Valid: {Buku.kode_buku_valid(buku.kode)}")
      print(f"Total Lokasi: {Buku.total_lokasi}")
    tests: |
      Buku_Pagi 1 A01 B02 bk001
      @@OUTPUT@@
      Judul: Buku Pagi
      Lantai: 1
      Rak: B02
      Kode: BK001
      Kode Valid: True
      Total Lokasi: 1
      @@CASE@@
      Buku_Siang 2 C03 D04 ab123
      @@OUTPUT@@
      Judul: Buku Siang
      Lantai: 2
      Rak: D04
      Kode: AB123
      Kode Valid: True
      Total Lokasi: 1
      @@CASE@@
      Buku_Malam 3 E05 F06 kode1
      @@OUTPUT@@
      Judul: Buku Malam
      Lantai: 3
      Rak: F06
      Kode: KODE1
      Kode Valid: True
      Total Lokasi: 1
      @@CASE@@
      Arsip_Lama 1 G07 H08 abc
      @@OUTPUT@@
      Judul: Arsip Lama
      Lantai: 1
      Rak: H08
      Kode: ABC
      Kode Valid: False
      Total Lokasi: 1
      @@CASE@@
      Peta_Kota 2 I09 J10 peta-1
      @@OUTPUT@@
      Judul: Peta Kota
      Lantai: 2
      Rak: J10
      Kode: PETA-1
      Kode Valid: False
      Total Lokasi: 1
      @@CASE@@
      Novel_Baru 4 K11 L12 nV789
      @@OUTPUT@@
      Judul: Novel Baru
      Lantai: 4
      Rak: L12
      Kode: NV789
      Kode Valid: True
      Total Lokasi: 1
      @@CASE@@
      Cerita_Pendek 5 M13 N14 a1b2c3
      @@OUTPUT@@
      Judul: Cerita Pendek
      Lantai: 5
      Rak: N14
      Kode: A1B2C3
      Kode Valid: False
      Total Lokasi: 1

  - id: v8
    title: Variant 8 - Buku Digital dan Unduhan
    brief: >-
      Input: judul, format file, ukuran file, dan jumlah unduhan. Output: data
      buku digital, total unduhan object, validitas format, dan total unduhan
      class.
    prompt: |
      Tujuan tugas
      Buat class Buku untuk mengelola buku digital di perpustakaan. Program harus menyimpan ukuran file melalui property, mencatat jumlah unduhan pada tingkat class dan object, serta memvalidasi format file.

      1. Attribute class
      - Buat total_unduhan = 0 sebagai attribute class.
      - Attribute ini menyimpan total seluruh unduhan yang dicatat oleh method unduh().
      - Gunakan Buku.total_unduhan ketika memperbarui dan membaca penghitung class.

      2. Attribute object
      - Simpan judul dan format_file sebagai attribute public.
      - Simpan ukuran file pada attribute private __ukuran_mb.
      - Jangan mengganti nama __ukuran_mb dan jangan mengaksesnya langsung dari program utama.

      3. Constructor __init__(self, judul, format_file, ukuran_mb)
      - Pertahankan signature constructor.
      - Isi judul dan format_file.
      - Masukkan ukuran melalui self.ukuran_mb agar setter melakukan validasi.

      4. Property ukuran_mb
      - Buat getter @property ukuran_mb yang mengembalikan __ukuran_mb.
      - Buat setter @ukuran_mb.setter ukuran_mb(self, nilai).
      - Ukuran file harus lebih besar dari 0. Jika nilai kurang atau sama dengan 0, raise ValueError.
      - Jika valid, simpan nilai ke __ukuran_mb tanpa mengubah tipe angka yang diterima.

      5. Method unduh(jumlah)
      - Terima jumlah unduhan melalui parameter jumlah.
      - Tambahkan Buku.total_unduhan sebanyak jumlah.
      - Kembalikan total unduhan yang dicatat oleh pemanggilan method tersebut.
      - Pada setiap test case, object baru dibuat dalam lingkungan bersih sehingga nilai class dimulai dari 0.
      - Jangan mengubah ukuran file atau format file di method ini.

      6. Static method ekstensi_valid(format_file)
      - Gunakan decorator @staticmethod.
      - Kembalikan True hanya untuk format teks kecil pdf atau epub.
      - Kembalikan False untuk format lain atau huruf besar seperti PDF jika starter code membandingkan teks secara case-sensitive.
      - Method ini tidak membutuhkan self.

      7. Program utama dan output
      - Jangan menghapus atau mengubah bagian input dan print pada starter code.
      - Input satu baris berisi judul, format_file, ukuran_mb, dan jumlah unduhan.
      - Starter code sudah mengubah underscore pada judul menjadi spasi dan mengubah ukuran menjadi float.
      - Buat object Buku, panggil unduh() satu kali, lalu cetak enam baris output.
      - Jangan menambahkan print atau mengubah jumlah angka desimal pada ukuran.

      Checklist sebelum Run Tests
      - total_unduhan dibuat dan diperbarui sebagai attribute class.
      - __ukuran_mb diakses melalui getter dan setter.
      - Setter menolak ukuran kurang atau sama dengan 0.
      - unduh() menambahkan jumlah yang diterima dan mengembalikan totalnya.
      - ekstensi_valid() hanya menerima pdf dan epub dalam huruf kecil.
      - Format output tetap enam baris seperti starter code.
    starter: |
      class Buku:
          total_unduhan = 0

          def __init__(self, judul, format_file, ukuran_mb):
              self.judul = judul
              self.format_file = format_file
              self.ukuran_mb = ukuran_mb

          @property
          def ukuran_mb(self):
              # TODO: kembalikan __ukuran_mb
              pass

          @ukuran_mb.setter
          def ukuran_mb(self, nilai):
              # TODO: validasi ukuran > 0
              pass

          def unduh(self, jumlah):
              # TODO: tambah total_unduhan sebanyak jumlah, return total
              pass

          @staticmethod
          def ekstensi_valid(format_file):
              # TODO: True untuk pdf atau epub
              pass


      judul, format_file, ukuran, jumlah = input().split()
      buku = Buku(judul.replace("_", " "), format_file, float(ukuran))
      total = buku.unduh(int(jumlah))

      print(f"Judul: {buku.judul}")
      print(f"Format: {buku.format_file}")
      print(f"Ukuran MB: {buku.ukuran_mb}")
      print(f"Total Unduhan: {total}")
      print(f"Format Valid: {Buku.ekstensi_valid(buku.format_file)}")
      print(f"Unduhan Class: {Buku.total_unduhan}")
    tests: |
      Python_Dasar pdf 2.5 3
      @@OUTPUT@@
      Judul: Python Dasar
      Format: pdf
      Ukuran MB: 2.5
      Total Unduhan: 3
      Format Valid: True
      Unduhan Class: 3
      @@CASE@@
      OOP_Lanjut epub 4 2
      @@OUTPUT@@
      Judul: OOP Lanjut
      Format: epub
      Ukuran MB: 4.0
      Total Unduhan: 2
      Format Valid: True
      Unduhan Class: 2
      @@CASE@@
      Cerita_Digital mobi 3.2 1
      @@OUTPUT@@
      Judul: Cerita Digital
      Format: mobi
      Ukuran MB: 3.2
      Total Unduhan: 1
      Format Valid: False
      Unduhan Class: 1
      @@CASE@@
      Panduan_Kelas PDF 10 5
      @@OUTPUT@@
      Judul: Panduan Kelas
      Format: PDF
      Ukuran MB: 10.0
      Total Unduhan: 5
      Format Valid: False
      Unduhan Class: 5
      @@CASE@@
      Arsip_Malam epub 0.5 0
      @@OUTPUT@@
      Judul: Arsip Malam
      Format: epub
      Ukuran MB: 0.5
      Total Unduhan: 0
      Format Valid: True
      Unduhan Class: 0
      @@CASE@@
      Buku_Kecil txt 1.0 4
      @@OUTPUT@@
      Judul: Buku Kecil
      Format: txt
      Ukuran MB: 1.0
      Total Unduhan: 4
      Format Valid: False
      Unduhan Class: 4
      @@CASE@@
      Modul_Akhir pdf 12.75 6
      @@OUTPUT@@
      Judul: Modul Akhir
      Format: pdf
      Ukuran MB: 12.75
      Total Unduhan: 6
      Format Valid: True
      Unduhan Class: 6
---

# Study Case Kelas A (Assignment 1): Peminjaman Buku Perpustakaan

**Tingkat:** Easy

Soal ini tetap menggunakan satu topik besar, yaitu pengelolaan buku perpustakaan. Untuk mengurangi praktik copy-paste, setiap mahasiswa mendapatkan satu sub study case. Semua sub study case memiliki tingkat kesulitan dan cakupan materi yang setara, tetapi attribute, property, method, static method, dan format input-output dibuat berbeda.

## Aturan Sub Study Case

- Assignment ini memakai delapan sub study case dengan topik perpustakaan yang sama.
- Setiap sub study case memiliki tujuh test case.
- Mapping sub study case dipilih secara konsisten berdasarkan NIM, sehingga NIM yang sama akan selalu mendapatkan sub study case yang sama.
- Pada mode debug, sistem langsung memakai Variant 1 dan tidak meminta NIM.
- Pada mode normal, sistem meminta NIM melalui popup sebelum menampilkan kerangka tugas.
- Jangan menyalin solusi mahasiswa lain. Walaupun topiknya sama, setiap variant memiliki kontrak class yang berbeda.

## Coba Kerangka Kode

Setelah sub study case dipilih, detail tugas dan starter code akan muncul pada playground di bawah. Lengkapi bagian `TODO`, lalu tekan **Run Tests** untuk menjalankan tujuh test case variant kamu.

{% include pyodide-exercise.html id="assignment1-kelas-a" title="Memuat sub study case..." prompt="Masukkan NIM untuk memuat sub study case." %}
