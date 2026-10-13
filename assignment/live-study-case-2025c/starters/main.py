"""Tim 7: Integrasi Sistem dan Demonstrasi Alur Penuh (main.py).

Panduan Pengerjaan Kode Rumpang:
Struktur perakitan komponen dan alur demo telah disediakan. Tugas tim Anda
adalah melengkapi bagian rumpang yang ditandai dengan tanda elipsis (...) untuk
mengorkestrasi seluruh modul dari Tim 1 s.d. 6 menjadi alur sistem yang utuh.

Item OOP yang Dipraktikkan:
1. Komposisi Sistem: Menggabungkan objek-objek lintas modul (Pengguna, Perlengkapan, Peminjaman, Layanan).
2. Dependency Injection: Menginjeksikan DendaHarian ke LayananPengembalian.
3. Penanganan Eksepsi (try...except): Menguji alur penolakan durasi, barang tidak tersedia, dan alasan valid.
4. Verifikasi Laporan & Decorator: Memeriksa ringkasan statistik dan jejak audit log.
"""

from typing import Any, Dict, List

try:
    from .pengguna import Mahasiswa, Petugas
    from .perlengkapan import Proyektor, Kamera, Speaker
    from .peminjaman import Peminjaman
    from .persetujuan import LayananPersetujuan
    from .pengembalian import DendaHarian, LayananPengembalian
    from .laporan import LaporanPeminjaman
except (ImportError, ValueError):
    from pengguna import Mahasiswa, Petugas
    from perlengkapan import Proyektor, Kamera, Speaker
    from peminjaman import Peminjaman
    from persetujuan import LayananPersetujuan
    from pengembalian import DendaHarian, LayananPengembalian
    from laporan import LaporanPeminjaman


def buat_data_demo() -> Dict[str, Any]:
    """Menyusun fixture data sintetis awal untuk demonstrasi bersama."""
    # TODO: Siapkan instance data mahasiswa untuk demonstrasi
    mhs_1 = Mahasiswa(nim=..., nama=...)
    mhs_2 = Mahasiswa(nim=..., nama=...)
    mhs_3 = Mahasiswa(nim=..., nama=...)

    # TODO: Siapkan instance data petugas inventaris
    petugas_1 = Petugas(nip=..., nama=...)
    petugas_2 = Petugas(nip=..., nama=...)

    # TODO: Siapkan instance katalog perlengkapan (Proyektor, Kamera, Speaker)
    proyektor_1 = Proyektor(id_barang=..., nama=...)
    kamera_1 = Kamera(id_barang=..., nama=...)
    speaker_1 = Speaker(id_barang=..., nama=...)

    return {
        "mahasiswa": [mhs_1, mhs_2, mhs_3],
        "petugas": [petugas_1, petugas_2],
        "perlengkapan": [proyektor_1, kamera_1, speaker_1],
    }


def jalankan_demo() -> None:
    """Menjalankan demonstrasi alur peminjaman sesuai spesifikasi praktikum."""
    print("=" * 76)
    print("DEMO SISTEM KAMPUSPINJAM: INTEGRASI LENGKAP KELAS 2025C")
    print("Pemrograman Berorientasi Objek: Gasal 2026 (S1 Kecerdasan Artifisial)")
    print("=" * 76)

    data = buat_data_demo()
    daftar_transaksi: List[Peminjaman] = []

    mhs_ahmad: Mahasiswa = data["mahasiswa"][0]
    mhs_bunga: Mahasiswa = data["mahasiswa"][1]
    mhs_candra: Mahasiswa = data["mahasiswa"][2]

    petugas_budi: Petugas = data["petugas"][0]

    proyektor: Proyektor = data["perlengkapan"][0]
    kamera: Kamera = data["perlengkapan"][1]
    speaker: Speaker = data["perlengkapan"][2]

    # TODO: Instansiasi objek layanan persetujuan dan layanan pengembalian
    layanan_persetujuan = ...
    kebijakan_denda = ...
    layanan_pengembalian = LayananPengembalian(...)

    # --------------------------------------------------------------------------
    # SKENARIO 1: Alur Sukses Utama dengan Denda 2 Hari Terlambat
    # --------------------------------------------------------------------------
    print("\n[SKENARIO 1: ALUR SUKSES DENGAN DENDA TERLAMBAT]")
    print(f"Peminjam         : {mhs_ahmad.nama} (NIM {mhs_ahmad.nim})")
    print(f"Barang           : {proyektor.nama} (Batas Pinjam: {proyektor.batas_durasi_hari()} hari)")
    print("Tanggal Pinjam   : 2026-10-15")
    print("Rencana Kembali  : 2026-10-18 (Durasi: 3 hari)")

    # 1. Mahasiswa mengajukan
    # TODO: Buat pengajuan transaksi baru sesuai data peminjaman di atas
    trx_1 = Peminjaman(
        id_peminjaman=...,
        mahasiswa=...,
        barang=...,
        tanggal_pinjam=...,
        tanggal_kembali=...,
    )
    daftar_transaksi.append(trx_1)
    print(f">> Status Awal   : {trx_1.status}")
    print(f">> Ketersediaan  : {proyektor.nama} : Tersedia: {proyektor.tersedia}")

    # 2. Petugas menyetujui
    # TODO: Jalankan evaluasi persetujuan peminjaman oleh petugas
    layanan_persetujuan.putuskan(
        peminjaman=...,
        petugas=...,
        disetujui=...,
    )
    print(f">> Disetujui Oleh: {trx_1.petugas.nama} (NIP {trx_1.petugas.nip})")
    print(f">> Status Baru   : {trx_1.status}")

    # 3. Pengembalian 2 hari terlambat (jatuh tempo 18 Okt, kembali 20 Okt)
    print("Tanggal Aktual   : 2026-10-20 (Terlambat 2 hari)")
    # TODO: Proses pengembalian barang dan kalkulasi denda
    hasil_kembali = layanan_pengembalian.proses(
        peminjaman=...,
        tanggal_aktual=...,
    )
    print(f">> Hari Terlambat: {hasil_kembali['hari_terlambat']} hari")
    print(f">> Denda Dihitung: Rp{hasil_kembali['denda']:,} (Tarif Rp5.000 per hari)")
    print(f">> Status Akhir  : {trx_1.status}")
    print(f">> Ketersediaan  : {proyektor.nama} : Tersedia: {proyektor.tersedia}")

    # --------------------------------------------------------------------------
    # SKENARIO 2: Kasus Ditolak 1: Durasi Pinjam Melebihi Batas
    # --------------------------------------------------------------------------
    print("\n[SKENARIO 2: PENOLAKAN KARENA MELEBIHI BATAS DURASI]")
    print(f"Peminjam         : {mhs_bunga.nama} (NIM {mhs_bunga.nim})")
    print(f"Barang           : {kamera.nama} (Batas Pinjam: {kamera.batas_durasi_hari()} hari)")
    print("Rencana Durasi   : 2026-10-15 s.d. 2026-10-19 (4 hari)")
    try:
        # TODO: Uji penolakan pengajuan peminjaman yang melebihi batas maksimal durasi
        trx_2 = Peminjaman(
            id_peminjaman=...,
            mahasiswa=...,
            barang=...,
            tanggal_pinjam=...,
            tanggal_kembali=...,
        )
        daftar_transaksi.append(trx_2)
    except ValueError as e:
        print(f">> Validasi Error: Berhasil ditolak pada validasi pengajuan.")
        print(f"   Pesan Sistem  : {e}")

    # --------------------------------------------------------------------------
    # SKENARIO 3: Kasus Ditolak 2: Pengajuan Saat Barang Sedang Tidak Tersedia
    # --------------------------------------------------------------------------
    print("\n[SKENARIO 3: PENOLAKAN KARENA BARANG SEDANG DIPINJAM]")
    trx_speaker = Peminjaman("TRX-2026-003", mhs_bunga, speaker, "2026-10-16", "2026-10-18")
    daftar_transaksi.append(trx_speaker)
    print(f">> Speaker dipinjam oleh {mhs_bunga.nama}. Status Tersedia: {speaker.tersedia}")

    print(f">> {mhs_candra.nama} mencoba meminjam speaker yang sama:")
    try:
        # TODO: Uji penolakan pengajuan saat barang sedang tidak tersedia
        trx_3 = Peminjaman(
            id_peminjaman=...,
            mahasiswa=...,
            barang=...,
            tanggal_pinjam=...,
            tanggal_kembali=...,
        )
        daftar_transaksi.append(trx_3)
    except ValueError as e:
        print(f">> Validasi Error: Berhasil dicegah.")
        print(f"   Pesan Sistem  : {e}")

    # --------------------------------------------------------------------------
    # SKENARIO 4: Kasus Ditolak 3: Penolakan Resmi oleh Petugas dengan Alasan
    # --------------------------------------------------------------------------
    print("\n[SKENARIO 4: PENOLAKAN OLEH PETUGAS DENGAN ALASAN VALID]")
    trx_kamera_sah = Peminjaman("TRX-2026-005", mhs_candra, kamera, "2026-10-21", "2026-10-23")
    daftar_transaksi.append(trx_kamera_sah)
    print(f">> Pengajuan dibuat: {trx_kamera_sah.id_peminjaman} (Status: {trx_kamera_sah.status})")
    print(f">> Ketersediaan sebelum keputusan: {kamera.nama} : {kamera.tersedia}")

    alasan_tolak = "Kamera dijadwalkan untuk pemeliharaan lensa berkala oleh teknisi."
    # TODO: Jalankan keputusan penolakan resmi oleh petugas dengan alasan
    layanan_persetujuan.putuskan(
        peminjaman=...,
        petugas=...,
        disetujui=...,
        alasan=...,
    )
    print(f">> Status Pasca Keputusan : {trx_kamera_sah.status}")
    print(f">> Alasan Penolakan       : {trx_kamera_sah.alasan_penolakan}")
    print(f">> Ketersediaan Kamera    : {kamera.nama} : Kembali Tersedia: {kamera.tersedia}")

    # --------------------------------------------------------------------------
    # SKENARIO 5: Riwayat dan Rekapitulasi Laporan
    # --------------------------------------------------------------------------
    print("\n[SKENARIO 5: LAPORAN RIWAYAT DAN REKAPITULASI]")
    # TODO: Instansiasi objek pelaporan peminjaman menggunakan daftar transaksi
    laporan = LaporanPeminjaman(...)

    print("--- Riwayat Peminjaman NIM 2501001 (Ahmad Fauzi) ---")
    riwayat_ahmad = laporan.riwayat(nim="2501001")
    for r in riwayat_ahmad:
        print(f"  * ID: {r.id_peminjaman} | Barang: {r.barang.nama} | Status: {r.status} | Denda: Rp{r.denda:,}")

    print("\n--- Riwayat Peminjaman Berstatus SELESAI ---")
    riwayat_selesai = laporan.riwayat(status="SELESAI")
    for r in riwayat_selesai:
        print(f"  * ID: {r.id_peminjaman} | Peminjam: {r.mahasiswa.nama} | Denda: Rp{r.denda:,}")

    ringkasan = laporan.ringkasan()
    print("\n--- Ringkasan Eksekutif Sistem ---")
    print(f"  Total Transaksi Tercatat : {ringkasan['total_transaksi']}")
    print(f"  Transaksi Diajukan       : {ringkasan['diajukan']}")
    print(f"  Transaksi Disetujui      : {ringkasan['disetujui']}")
    print(f"  Transaksi Ditolak        : {ringkasan['ditolak']}")
    print(f"  Transaksi Selesai        : {ringkasan['selesai']}")
    print(f"  Total Penerimaan Denda   : Rp{ringkasan['total_denda']:,}")

    print(f"\n--- Log Operasi Audit (Tercatat via Decorator @catat_operasi) ---")
    for log in laporan.log_operasi():
        print(f"  [{log['timestamp']}] Operasi: {log['operasi']} | Filter: args={log['args']} kwargs={log['kwargs']}")

    print("\n" + "=" * 76)
    print("DEMO SELESAI: SELURUH KONTRAK 7 TIM TERVERIFIKASI SEMPURNA.")
    print("=" * 76)


if __name__ == "__main__":
    print("Modul main.py siap dikerjakan oleh Tim 7.")
    print("Silakan lengkapi bagian rumpang yang bertanda (...) sesuai petunjuk logika bisnis.")
