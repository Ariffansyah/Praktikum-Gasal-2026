"""Tim 4: Layanan Persetujuan (persetujuan.py).

Panduan Pengerjaan Kode Rumpang:
Struktur class, method, dekorator, dan property telah disediakan. Tugas tim Anda
adalah melengkapi bagian rumpang yang ditandai dengan tanda elipsis (...) sesuai
dengan validasi peran petugas, static method alasan penolakan, dan pelepasan aset.

Item OOP yang Dipraktikkan:
1. Static Method (@staticmethod): alasan_valid() sebagai fungsi utilitas independen.
2. Kewenangan Akses (Role): Memvalidasi bahwa hanya Petugas yang berhak memproses.
3. Transisi Status Terkontrol: Mengubah status transaksi menjadi DISETUJUI atau DITOLAK.
4. Pemulihan Ketersediaan: Jika pengajuan ditolak, barang otomatis kembali tersedia.
"""

from typing import Any

try:
    from .peminjaman import Peminjaman
    from .pengguna import Petugas
except (ImportError, ValueError):
    from peminjaman import Peminjaman
    from pengguna import Petugas


class LayananPersetujuan:
    """Layanan domain untuk mengevaluasi dan memutuskan pengajuan peminjaman."""

    @staticmethod
    def alasan_valid(alasan: str) -> bool:
        """Fungsi statis untuk memeriksa validitas teks alasan penolakan.

        Aturan: Alasan wajib bertipe string dan memiliki panjang karakter minimal
        yang memadai setelah spasi dibersihkan.
        """
        # TODO: Periksa tipe data teks dan tentukan ambang batas minimal panjang karakter alasan
        if not isinstance(alasan, str):
            return False
        panjang_minimal = ...
        return len(alasan.strip()) >= panjang_minimal

    def putuskan(
        self,
        peminjaman: Peminjaman,
        petugas: Petugas,
        disetujui: bool,
        alasan: str = "",
    ) -> bool:
        """Memproses keputusan pengajuan peminjaman (menyetujui atau menolak).

        Tahapan logika:
        1. Validasi wewenang petugas: pastikan peran pengguna sah sebagai petugas.
        2. Validasi status transaksi: transaksi harus berada pada status awal yang sah.
        3. Catat referensi petugas yang mengevaluasi.
        4. Jika disetujui: perbarui status transaksi ke status disetujui.
        5. Jika ditolak: validasi alasan penolakan, simpan alasan, perbarui status
           ke status ditolak, dan lepaskan ketersediaan barang.
        """
        # TODO: Periksa kewenangan peran petugas yang memproses transaksi
        role_petugas = getattr(petugas, "role", None)
        if not hasattr(petugas, "role") or role_petugas != ...:
            raise PermissionError(
                f"Hanya petugas yang berhak memproses persetujuan, bukan '{role_petugas}'."
            )

        # TODO: Periksa apakah transaksi berada pada status pengajuan yang sah untuk diputuskan
        status_sekarang = peminjaman.status
        if status_sekarang != ...:
            raise ValueError(
                f"Hanya transaksi berstatus DIAJUKAN yang dapat diputuskan, "
                f"status saat ini: '{status_sekarang}'."
            )

        # Catat referensi petugas pada transaksi
        peminjaman._petugas = petugas

        if disetujui:
            # TODO: Lakukan transisi status transaksi untuk pengajuan yang disetujui
            peminjaman.ubah_status(...)
            return True
        else:
            # Validasi teks alasan penolakan
            if not self.alasan_valid(alasan):
                raise ValueError("Penolakan wajib menyertakan alasan minimal 5 karakter.")

            peminjaman._alasan_penolakan = alasan.strip()

            # TODO: Lakukan transisi status transaksi untuk pengajuan yang ditolak
            peminjaman.ubah_status(...)

            # TODO: Kembalikan status barang inventaris agar dapat digunakan kembali
            peminjaman.barang.ubah_ketersediaan(...)
            return False


if __name__ == "__main__":
    print("Modul persetujuan.py siap dikerjakan oleh Tim 4.")
    print("Silakan lengkapi bagian rumpang yang bertanda (...) sesuai petunjuk logika bisnis.")
