# Homework 5: Polymorphism and Class Relationships

**Tingkat:** Medium to Hard

Delapan varian menguji penerapan kontrak yang sama melalui implementasi berbeda. Setiap varian memadukan polymorphism dengan hubungan object dan pemeriksaan state. Bacalah aturan varianmu; nama class, operasi, serta bentuk input berbeda antarvarian.

## Cakupan varian

| Varian | Domain | Fokus tambahan |
| :-- | :-- | :-- |
| 1 | Paket layanan kampus | Composite, wrapper diskon, dan referensi komponen |
| 2 | Pengumuman multikanal | Delegation, pergantian kanal, dan riwayat snapshot |
| 3 | Rekap nilai mahasiswa | Validasi operasi, kebijakan penilai, dan snapshot |
| 4 | Penyewaan peralatan | Stok bersama, strategi tarif, dan penolakan tanpa perubahan state |
| 5 | Ekspor laporan | Formatter, wrapper, filter, dan pengurutan tanpa mengubah sumber |
| 6 | Diskon berantai | Kontrak harga, wrapper bersyarat, dan urutan delegation |
| 7 | Kapasitas kelas | Pergantian kolaborator dengan prasyarat dan pengelolaan peserta |
| 8 | Penggabungan arsip | Operator `+`, kontrak halaman, deduplikasi, dan manifest snapshot |

## Aturan pengerjaan

- Masukkan NIM dan kelas yang benar. NIM yang sama mendapat varian yang sama selama konfigurasi assignment tetap.
- Lengkapi TODO; jangan mengubah nama class, signature, program utama, input resmi, label output, atau test case.
- Gunakan kontrak method untuk memproses object. Hindari percabangan class konkret sebagai pengganti polymorphism.
- Pemeriksaan tipe yang secara khusus diminta pada operator `+` diperbolehkan sesuai kontrak varian 8.
- Constructor entity, class kolaborator eksternal, data class, dan pemilihan jenis input sudah disediakan. Tidak perlu memecah kode menjadi module/package.
- Operasi yang ditolak harus mengembalikan status yang diminta tanpa mengubah state yang dilindungi kontrak.
- Salinan container harus mempertahankan referensi elemennya jika soal meminta aggregation. Catatan snapshot harus menyimpan hasil pada saat dibuat.
- Method yang mengembalikan tampilan list tidak boleh membocorkan list internal untuk diubah oleh pemakai.
- Periksa daftar kosong, batas kapasitas/nominal, duplikasi, pergantian kolaborator, dan pemanggilan berulang sesuai varian.

## Cara menguji dan mengumpulkan

Gunakan **Run Tests** untuk menjalankan delapan kasus input-output. Tombol **Run** tidak otomatis mengisi `input()`. Jika ingin mencoba input lain, jalankan file Python di komputer dengan input sesuai format soal.

Setelah test lulus, gunakan **Save File** dan ikuti instruksi pengumpulan serta tenggat yang diberikan pengajar. Editor ini tidak otomatis mengirim jawaban.

## Penjelasan yang harus dapat kamu berikan

1. Pemanggilan mana yang polymorphic dan kontrak apa yang dipakai pemroses?
2. Object mana yang tetap mandiri, dan bagian mana yang dibuat oleh pengelola?
3. Mengapa penggantian implementasi tidak memerlukan penambahan percabangan class pada pemroses?
4. State apa yang harus tetap sama ketika operasi ditolak?
5. Apakah snapshot masih benar setelah data sumber berubah?

Lulus test bukan bukti bahwa desain sudah benar seluruhnya. Pengajar juga meninjau penempatan rumus, delegation, penggunaan referensi, serta konsistensi kontrak perilaku.
