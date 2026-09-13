---
title: Study Case Kelas A
layout: default
parent: Assignment 1
grand_parent: Assignment
printtitle: Study Case Kelas A (Assignment 1) - Peminjaman Buku Perpustakaan
nav_order: 1
tampil: true
isdebug: true
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
      Ketentuan Class

      Buat class `Buku` dengan:
      - `total_buku = 0` sebagai attribute class untuk mencatat jumlah object `Buku` yang dibuat.
      - `judul`, `penulis`, dan `tahun_terbit` sebagai attribute public.
      - `_status_pinjam` sebagai attribute protected dengan nilai awal `False`.
      - `__stok` sebagai attribute private yang diakses melalui property `stok`.
      - Constructor `__init__(self, judul, penulis, tahun_terbit, stok=1)` sesuai signature pada starter code.

      Property `stok` harus menyediakan akses untuk membaca dan mengubah stok. Nilai stok tidak boleh negatif. Nilai negatif harus menghasilkan `ValueError("Stok tidak boleh negatif.")`.

      Method `pinjam()` harus merepresentasikan satu proses peminjaman. Jika stok tersedia, proses berhasil dan kondisi buku mencerminkan bahwa satu stok telah dipinjam. Jika stok tidak tersedia, proses tidak berhasil dan kondisi buku tidak berubah. Method mengembalikan `True` atau `False` sesuai hasil proses.

      Static method `validasi_isbn(isbn)` menentukan validitas ISBN berdasarkan panjangnya. ISBN dengan panjang 10 atau 13 karakter dianggap valid, sedangkan panjang lainnya dianggap tidak valid.

      Program Utama

      Program utama membaca satu data buku, membuat object `Buku`, melakukan satu kali peminjaman, dan melakukan validasi ISBN. Bagian input dan output sudah tersedia pada starter code.

      Format Input

      Satu baris dengan format:
      `judul penulis tahun_terbit stok isbn`

      Judul dan penulis yang terdiri dari beberapa kata menggunakan underscore (`_`) sebagai pengganti spasi. Starter code menangani perubahan tersebut.

      Format Output

      Output terdiri dari tujuh baris dengan label dan format yang sudah tersedia pada starter code:
      - Judul
      - Penulis
      - Tahun Terbit
      - Stok Tersisa
      - Status Pinjam
      - ISBN Valid
      - Total Buku

      Contoh Input

      ```text
      Laskar_Pelangi Andrea_Hirata 2005 3 9786020000001
      ```

      Contoh Output

      ```text
      Judul        : Laskar Pelangi
      Penulis      : Andrea Hirata
      Tahun Terbit : 2005
      Stok Tersisa : 2
      Status Pinjam: Dipinjam
      ISBN Valid   : True
      Total Buku   : 1
      ```

      Tabel Uji

      Test case mencakup kondisi stok tersedia dan kosong, stok awal satu atau lebih, serta ISBN dengan panjang valid dan tidak valid. Hasil yang diperiksa meliputi stok akhir, status peminjaman, validitas ISBN, dan jumlah object yang tercatat.

      Coba Kerangka Kode

      Lengkapi bagian class `Buku` yang bertanda `TODO`. Bagian input dan pencetakan output sudah disediakan. Pertahankan nama attribute, signature method, dan format output karena hasil program dibandingkan dengan test case.

      *Catatan:* fokus tugas adalah penerapan class attribute, visibility attribute, property getter/setter, instance method, dan static method.

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

      Buat class `Buku` untuk mengelola data katalog perpustakaan. Object harus menyimpan informasi buku dan lokasi rak, memiliki jumlah halaman yang dapat diperbarui, serta menyediakan pemeriksaan terhadap kode rak.

      1. Attribute class

      - `total_koleksi = 0` merupakan attribute class yang mencatat jumlah object `Buku` yang dibuat.

      2. Attribute object

      - `judul`, `kategori`, dan `rak` merupakan attribute public.
      - Jumlah halaman disimpan pada attribute private `__halaman`.
      - Akses terhadap jumlah halaman dilakukan melalui property `halaman`.

      3. Constructor `__init__(self, judul, kategori, halaman, rak="Umum")`

      Constructor harus mengikuti signature dan nilai default yang tersedia pada starter code. Data buku dan nilai awal jumlah halaman harus dapat digunakan oleh bagian program utama setelah object dibuat.

      4. Property `halaman`

      Property `halaman` harus menyediakan getter dan setter.

      Jumlah halaman yang valid adalah bilangan minimal `1`. Nilai kurang dari `1` harus menghasilkan `ValueError`.

      5. Method `tambah_halaman(jumlah)`

      Method menerima sejumlah halaman dan memperbarui jumlah halaman buku sesuai nilai tersebut. Setelah method dipanggil, property `halaman` harus merepresentasikan jumlah halaman terbaru.

      6. Static method `kode_rak_valid(kode)`

      Method menentukan validitas kode rak. Kode dianggap valid apabila memiliki awalan `RA` dan diikuti tepat dua digit angka. Format lain dianggap tidak valid.

      7. Program utama dan output

      Program utama membaca judul, kategori, jumlah halaman, rak, tambahan halaman, dan kode rak. Object dibuat dan proses penambahan halaman dilakukan satu kali.

      Bagian input dan output sudah tersedia pada starter code. Jangan mengubah nama method, attribute, atau format output.

      Checklist sebelum Run Tests

      - Jumlah object tercatat pada `total_koleksi`.
      - Jumlah halaman memenuhi aturan validasi.
      - Property `halaman` dapat membaca dan mengubah nilai halaman.
      - `tambah_halaman()` menghasilkan jumlah halaman sesuai data yang diberikan.
      - `kode_rak_valid()` membedakan kode rak valid dan tidak valid.
      - Format output tetap sesuai starter code.
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

      Buat class `Buku` untuk merepresentasikan proses pengembalian buku dan perhitungan denda berdasarkan keterlambatan.

      1. Attribute class

      - `denda_harian = 2000` merupakan tarif denda yang berlaku pada class.
      - `total_pengembalian = 0` mencatat jumlah pengembalian yang berhasil dicatat.

      2. Attribute object

      - `judul` dan `tahun_terbit` merupakan attribute public.
      - Jumlah hari keterlambatan disimpan pada attribute private `__hari_terlambat`.

      3. Property `hari_terlambat`

      Sediakan getter dan setter untuk `hari_terlambat`.

      Jumlah hari keterlambatan tidak boleh negatif. Nilai negatif harus menghasilkan `ValueError`.

      4. Method `hitung_denda()`

      Method menghasilkan denda berdasarkan jumlah hari keterlambatan dan tarif denda harian yang berlaku.

      5. Method `catat_pengembalian(hari)`

      Method menerima jumlah hari keterlambatan dan mencatat proses pengembalian tersebut. Setelah proses berhasil dicatat, jumlah pengembalian pada tingkat class bertambah dan method menghasilkan nilai denda yang sesuai.

      6. Static method `validasi_tahun(tahun)`

      Tahun dianggap valid apabila berada pada rentang `1900` sampai `2026`, termasuk kedua batas. Method mengembalikan boolean.

      7. Program utama

      Program utama membaca judul, tahun terbit, dan jumlah hari keterlambatan. Object dibuat dan proses pengembalian dilakukan satu kali.

      Bagian input dan output sudah disediakan pada starter code. Jangan mengubah format output.

      Checklist sebelum Run Tests

      - Tarif denda tersedia pada tingkat class.
      - Hari keterlambatan tidak dapat bernilai negatif.
      - Denda sesuai dengan keterlambatan.
      - Pengembalian yang berhasil tercatat pada `total_pengembalian`.
      - Validasi tahun menghasilkan boolean sesuai rentang yang ditentukan.
      - Format output tetap sesuai starter code.
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

      Buat class `Buku` untuk mengelola reservasi buku. Object harus menyimpan informasi buku dan peminjam, membatasi jumlah reservasi, serta menyediakan validasi kode peminjam.

      1. Attribute class

      - `maksimal_reservasi = 5` merupakan batas jumlah reservasi.
      - `total_reservasi = 0` mencatat jumlah pengajuan reservasi yang diproses.

      2. Attribute object

      - `judul` dan `peminjam` merupakan attribute public.
      - `_status` merupakan attribute protected dengan nilai awal `"tersedia"`.
      - Jumlah reservasi disimpan pada attribute private `__reservasi`.

      3. Constructor `__init__(self, judul, peminjam, reservasi_awal=0)`

      Constructor harus mengikuti signature dan nilai default pada starter code. Object harus dapat dibuat dengan jumlah reservasi awal yang diberikan.

      4. Property `reservasi`

      Property harus menyediakan getter dan setter.

      Jumlah reservasi yang valid berada pada rentang `0` sampai `maksimal_reservasi`, termasuk kedua batas. Nilai di luar rentang tersebut harus menghasilkan `ValueError`.

      5. Method `ajukan_reservasi(jumlah)`

      Method menerima jumlah reservasi yang diajukan.

      Pengajuan hanya berhasil apabila hasil akhirnya tidak melebihi kapasitas reservasi dan jumlah yang diajukan tidak negatif. Jika pengajuan tidak dapat dilakukan, jumlah reservasi sebelumnya tetap dipertahankan.

      Method mengembalikan `True` ketika pengajuan berhasil dan `False` ketika pengajuan ditolak. Setiap pengajuan yang diproses dihitung pada `total_reservasi`.

      6. Static method `kode_peminjam_valid(kode)`

      Kode peminjam dianggap valid apabila diawali huruf `M` dan diikuti tepat enam digit angka. Method mengembalikan boolean.

      7. Program utama dan output

      Program utama membaca judul, peminjam, reservasi awal, jumlah tambahan, dan kode validasi. Object dibuat dan satu kali pengajuan reservasi dilakukan.

      Bagian input dan output sudah disediakan pada starter code. Jangan mengubah format output.

      Checklist sebelum Run Tests

      - Kapasitas reservasi mengikuti batas yang ditentukan.
      - Nilai reservasi tidak dapat berada di luar rentang yang diperbolehkan.
      - Pengajuan yang melebihi kapasitas ditolak tanpa mengubah reservasi.
      - `total_reservasi` mencatat pengajuan yang diproses.
      - Kode peminjam divalidasi sesuai pola yang ditentukan.
      - Format output tetap sesuai starter code.
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

      Buat class `Buku` untuk mengelola rating buku dari pembaca. Object harus menyimpan informasi buku dan rating, membatasi nilai rating, serta menyediakan pemeriksaan rating secara terpisah dari object.

      1. Attribute class

      - `total_ulasan = 0` merupakan attribute class yang mencatat jumlah pemanggilan proses pemberian rating.

      2. Attribute object

      - `judul` dan `penulis` merupakan attribute public.
      - Rating disimpan pada attribute private `__rating`.

      3. Constructor `__init__(self, judul, penulis, rating_awal=0)`

      Constructor harus mengikuti signature dan nilai default pada starter code. Rating awal harus mengikuti aturan validasi rating.

      4. Property `rating`

      Property `rating` harus menyediakan getter dan setter.

      Rating valid berada pada rentang `0` sampai `5`, termasuk kedua batas. Nilai di luar rentang tersebut harus menghasilkan `ValueError`.

      5. Method `beri_rating(nilai)`

      Method menerima rating baru.

      Jika nilai valid, rating buku diperbarui dan method mengembalikan `True`. Jika nilai tidak valid, rating sebelumnya tetap dipertahankan dan method mengembalikan `False`.

      Setiap pemanggilan method dihitung sebagai satu ulasan.

      6. Static method `rating_valid(nilai)`

      Method menentukan apakah nilai yang diberikan berada pada rentang `0` sampai `5`. Hasilnya berupa `True` atau `False`.

      7. Program utama dan output

      Program utama membaca judul, penulis, rating awal, rating baru, dan nilai untuk validasi rating. Object dibuat dan proses pemberian rating dilakukan satu kali.

      Bagian input dan output sudah tersedia pada starter code. Jangan mengubah format output.

      Checklist sebelum Run Tests

      - Rating mengikuti batas valid yang ditentukan.
      - Rating invalid tidak menghilangkan rating sebelumnya.
      - `beri_rating()` menghasilkan status keberhasilan yang sesuai.
      - Setiap proses pemberian rating tercatat pada `total_ulasan`.
      - `rating_valid()` menghasilkan boolean yang benar.
      - Format output tetap sesuai starter code.
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

      Buat class `Buku` untuk mengelompokkan buku berdasarkan genre dan menghitung usia buku dari tahun terbitnya.

      1. Attribute class

      - `genre_populer = "Fiksi"` merupakan attribute class yang menunjukkan genre populer.

      2. Attribute object

      - `judul` dan `genre` merupakan attribute public.
      - Tahun terbit disimpan pada attribute private `__tahun_terbit`.

      3. Constructor `__init__(self, judul, genre, tahun_terbit)`

      Constructor harus mengikuti signature pada starter code dan memastikan tahun terbit mengikuti aturan property yang tersedia.

      4. Property `tahun_terbit`

      Property harus menyediakan getter dan setter.

      Tahun terbit tidak boleh lebih besar dari `2026`. Nilai yang melebihi batas tersebut harus menghasilkan `ValueError`.

      5. Method `hitung_usia(tahun_sekarang)`

      Method menghasilkan usia buku berdasarkan tahun sekarang dan tahun terbit buku.

      6. Static method `genre_valid(genre)`

      Genre yang dianggap valid adalah `Fiksi`, `Nonfiksi`, `Puisi`, dan `Sejarah`. Genre selain daftar tersebut dianggap tidak valid.

      Perbandingan genre mengikuti penulisan pada input.

      7. Program utama dan output

      Program utama membaca judul, genre, tahun terbit, dan tahun sekarang. Object dibuat dan usia buku serta validitas genre ditampilkan.

      Bagian input dan output sudah tersedia pada starter code. Jangan mengubah format output.

      Checklist sebelum Run Tests

      - `genre_populer` tersedia sebagai attribute class.
      - Tahun terbit mengikuti aturan validasi.
      - Property tahun terbit dapat membaca dan mengubah nilai.
      - Usia buku sesuai dengan tahun yang diberikan.
      - Hanya genre yang ditentukan yang dianggap valid.
      - Format output tetap sesuai starter code.
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

      Buat class `Buku` untuk mengelola lokasi fisik buku di perpustakaan. Object harus menyimpan informasi lokasi dan kode buku, dapat berpindah rak, serta dapat menentukan validitas kode.

      1. Attribute class

      - `total_lokasi = 0` merupakan attribute class yang mencatat jumlah object `Buku` yang dibuat.

      2. Attribute object

      - `judul`, `lantai`, dan `rak` merupakan attribute public.
      - Kode buku disimpan pada attribute private `__kode`.

      3. Constructor `__init__(self, judul, lantai, rak, kode)`

      Constructor harus mengikuti signature pada starter code. Setelah object dibuat, kode buku harus tersedia melalui property dan berada dalam bentuk huruf besar.

      4. Property `kode`

      Property `kode` harus menyediakan getter dan setter.

      Nilai kode yang disimpan harus menggunakan huruf besar. Dengan demikian, kode yang diberikan dalam huruf kecil harus menghasilkan nilai property dalam bentuk huruf besar.

      5. Method `pindah_rak(rak_baru)`

      Method memindahkan buku ke rak yang diberikan dan mengembalikan lokasi rak setelah proses tersebut.

      6. Static method `kode_buku_valid(kode)`

      Kode buku dianggap valid apabila memiliki tepat lima karakter dan seluruh karakternya alfanumerik. Kode yang memiliki panjang berbeda atau karakter non-alfanumerik dianggap tidak valid.

      7. Program utama dan output

      Program utama membaca judul, lantai, rak awal, rak baru, dan kode buku. Object dibuat dan satu kali perpindahan rak dilakukan.

      Bagian input dan output sudah tersedia pada starter code. Jangan mengubah format output.

      Checklist sebelum Run Tests

      - Jumlah object tercatat pada `total_lokasi`.
      - Kode dapat dibaca dan diubah melalui property.
      - Nilai kode tersimpan dalam huruf besar.
      - `pindah_rak()` menghasilkan rak baru yang sesuai.
      - Validasi kode mengikuti panjang dan karakter yang ditentukan.
      - Format output tetap sesuai starter code.
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

      Buat class `Buku` untuk mengelola buku digital. Object harus menyimpan informasi file, menyediakan akses terhadap ukuran file melalui property, mencatat unduhan, serta memvalidasi format file.

      1. Attribute class

      - `total_unduhan = 0` merupakan attribute class yang mencatat jumlah seluruh unduhan yang diproses.

      2. Attribute object

      - `judul` dan `format_file` merupakan attribute public.
      - Ukuran file disimpan pada attribute private `__ukuran_mb`.

      3. Constructor `__init__(self, judul, format_file, ukuran_mb)`

      Constructor harus mengikuti signature pada starter code. Ukuran file yang diberikan harus mengikuti aturan validasi.

      4. Property `ukuran_mb`

      Property harus menyediakan getter dan setter.

      Ukuran file harus lebih besar dari `0`. Nilai `0` atau kurang harus menghasilkan `ValueError`.

      5. Method `unduh(jumlah)`

      Method menerima jumlah unduhan dan mencatatnya pada penghitung unduhan tingkat class. Method mengembalikan jumlah unduhan yang tercatat setelah proses tersebut.

      6. Static method `ekstensi_valid(format_file)`

      Format file dianggap valid apabila bernilai `pdf` atau `epub`. Format lainnya dianggap tidak valid.

      Perbandingan mengikuti teks input.

      7. Program utama dan output

      Program utama membaca judul, format file, ukuran file, dan jumlah unduhan. Object dibuat dan satu kali proses unduhan dilakukan.

      Bagian input dan output sudah tersedia pada starter code. Jangan mengubah format output.

      Checklist sebelum Run Tests

      - Ukuran file harus memenuhi batas valid.
      - Property ukuran file dapat membaca dan mengubah nilai.
      - Jumlah unduhan tercatat pada tingkat class.
      - `unduh()` menghasilkan total unduhan sesuai data yang diberikan.
      - Validasi hanya menerima format `pdf` dan `epub`.
      - Format output tetap sesuai starter code.

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

## Coba Kerangka Kode

Setelah sub study case dipilih, detail tugas dan starter code akan muncul pada playground di bawah. Lengkapi bagian `TODO`, lalu tekan **Run Tests** untuk menjalankan tujuh test case variant kamu.

{% include pyodide-exercise.html id="assignment1-kelas-a" title="Memuat sub study case..." prompt="Masukkan NIM untuk memuat sub study case." %}
