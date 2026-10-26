# Live Practicum 5: Polymorphism and Class Relationships

**Tingkat:** Easy to Medium

Ketiga kelas mengerjakan domain yang berbeda dengan cakupan konsep yang setara: proses kumpulan object melalui `hitung()`, simpan referensi object yang diberikan, lalu buat catatan hasil baru. Kerangka abstract class dan data class sudah disediakan agar fokus pengerjaan berada pada polymorphism dan hubungan object.

## Tujuan pembelajaran

- Mengimplementasikan overriding dengan signature dan jenis hasil yang sesuai kontrak.
- Menerima object yang menyediakan `hitung()` tanpa mewajibkan inheritance dari parent buatan yang sama.
- Mengagregasi object yang sudah ada dengan menyalin container, bukan menduplikasi object di dalamnya.
- Mendelegasikan perhitungan kepada setiap object.
- Membuat catatan hasil sebagai snapshot dan menggantinya pada pemrosesan ulang.
- Menggunakan `__len__()` serta memastikan data dua pengelola tidak tercampur.

## Cara mengerjakan

1. Pilih kelas 2025A, 2025B, atau 2025C sesuai kelasmu.
2. Baca spesifikasi, format input, dan program utama sampai selesai.
3. Lengkapi bagian `TODO` pada method yang disediakan. Jangan mengubah program utama.
4. Gunakan **Run Tests** untuk memasok input resmi secara otomatis. Tombol **Run** menjalankan kode apa adanya dan tidak menyediakan input untuk `input()`.
5. Setelah seluruh test lulus, unduh file melalui **Save File** dan ikuti instruksi pengumpulan/presensi dari pengajar.

## Aturan desain

- Jangan mengganti pemanggilan polymorphic dengan percabangan `isinstance()`, `type()`, atau nama class untuk memilih rumus.
- Factory pada program utama sudah disediakan untuk membaca jenis object dari input. Bagian itu bukan tempat menuliskan rumus.
- Gunakan `list(daftar)` untuk container milik pengelola, tetapi pertahankan identitas elemen yang diterima.
- Buat object catatan baru pada setiap proses. Snapshot lama harus tetap menyimpan nilai sebelumnya.
- Pengulangan proses menggantikan catatan aktif; jangan menumpuk hasil dari proses lama.
- Gunakan Python standard library saja. Data class, abstract class, serta class mitra yang disediakan tidak perlu diubah.

## Checklist sebelum mengumpulkan

- Apakah object mitra yang tidak mewarisi parent tetap dapat diproses?
- Apakah perubahan list asal tidak menghilangkan object milik pengelola?
- Apakah perubahan unit pada object asal terlihat setelah proses berikutnya?
- Apakah snapshot lama tetap benar setelah pemrosesan ulang?
- Apakah daftar kosong menghasilkan total dan panjang nol?
- Apakah output tepat sesuai urutan dan label yang diberikan?

Test otomatis memeriksa perilaku. Pengajar tetap meninjau penerapan polymorphism, pemilihan hubungan object, dan penempatan tanggung jawab pada kode.
