"""Tim 3: Pengajuan Transaksi (peminjaman.py).

Panduan Pengerjaan Kode Rumpang:
Struktur class, method, dekorator, dan property telah disediakan. Tugas tim Anda
adalah melengkapi bagian rumpang yang ditandai dengan tanda elipsis (...) sesuai
dengan invariant status transaksi, validasi tanggal, dan reservasi aset.

Item OOP yang Dipraktikkan:
1. Object Aggregation: Mengaitkan objek Mahasiswa dan Perlengkapan ke transaksi.
2. State Machine Invariant: Menjaga siklus transisi status (DIAJUKAN, DISETUJUI, DITOLAK, SELESAI).
3. Encapsulation: State transaksi terlindungi dan dibaca via property.
4. Domain Validation: Validasi tanggal, batas durasi barang, dan ketersediaan barang.
"""

from datetime import date, datetime
from typing import Any, Optional, Tuple, Union

try:
    from .pengguna import Mahasiswa
    from .perlengkapan import Perlengkapan
except (ImportError, ValueError):
    from pengguna import Mahasiswa
    from perlengkapan import Perlengkapan

# Kamus pemetaan transisi status yang sah dalam siklus sistem KampusPinjam
TRANSISI_SAH = {
    "DIAJUKAN": ("DISETUJUI", "DITOLAK"),
    "DISETUJUI": ("SELESAI",),
    "DITOLAK": (),
    "SELESAI": (),
}


def konversi_tanggal(nilai: Union[date, str]) -> date:
    """Helper fungsi untuk mengonversi format tanggal ke objek date."""
    if isinstance(nilai, date):
        return nilai
    # TODO: Lakukan parsing tanggal string ISO ke objek date
    return datetime.strptime(nilai.strip(), ...).date()


class Peminjaman:
    """Class entitas transaksi peminjaman perlengkapan kampus."""

    def __init__(
        self,
        id_peminjaman: str,
        mahasiswa: Mahasiswa,
        barang: Perlengkapan,
        tanggal_pinjam: Union[date, str],
        tanggal_kembali: Union[date, str],
    ) -> None:
        """Konstruktor transaksi pengajuan peminjaman.

        Aturan:
        1. Peminjam wajib berhak meminjam berdasarkan perannya.
        2. Tanggal kembali tidak boleh mendahului tanggal pinjam.
        3. Durasi peminjaman minimal 1 hari dan tidak melebihi batas barang.
        4. Barang yang diajukan harus sedang berstatus tersedia.
        5. Lakukan pembaruan status reservasi pada barang setelah pengajuan sah dibuat.
        """
        if not id_peminjaman or not id_peminjaman.strip():
            raise ValueError("ID peminjaman tidak boleh kosong.")

        # TODO: Periksa apakah pengguna memiliki hak akses mengajukan peminjaman
        if not hasattr(mahasiswa, "role") or mahasiswa.role != ...:
            raise PermissionError(f"Hanya mahasiswa yang berhak meminjam, bukan '{getattr(mahasiswa, 'role', None)}'.")

        if not hasattr(barang, "batas_durasi_hari") or not hasattr(barang, "tersedia"):
            raise TypeError("Barang wajib merupakan turunan class Perlengkapan.")

        tgl_pinjam = konversi_tanggal(tanggal_pinjam)
        tgl_kembali = konversi_tanggal(tanggal_kembali)

        # TODO: Periksa urutan logis antara tanggal pinjam dan tanggal kembali
        if tgl_kembali < ...:
            raise ValueError("Tanggal kembali tidak boleh mendahului tanggal pinjam.")

        # TODO: Hitung total durasi hari peminjaman yang direncanakan
        durasi = (tgl_kembali - ...).days
        if durasi < 1:
            raise ValueError("Durasi peminjaman minimal adalah 1 hari.")

        batas_maksimal = barang.batas_durasi_hari()
        # TODO: Validasi apakah rencana durasi melanggar batas maksimal barang
        if durasi > ...:
            raise ValueError(
                f"Pengajuan ditolak: durasi {durasi} hari melebihi batas maksimal untuk "
                f"{barang.nama} ({batas_maksimal} hari)."
            )

        # TODO: Periksa ketersediaan barang inventaris saat ini
        status_ketersediaan_barang = ...
        if not status_ketersediaan_barang:
            raise ValueError(
                f"Pengajuan ditolak: barang '{barang.nama}' (ID: {barang.id_barang}) "
                f"saat ini sedang tidak tersedia."
            )

        # Inisialisasi atribut internal transaksi
        self._id_peminjaman: str = id_peminjaman.strip()
        self._mahasiswa: Mahasiswa = mahasiswa
        self._barang: Perlengkapan = barang
        self._tanggal_pinjam: date = tgl_pinjam
        self._tanggal_kembali: date = tgl_kembali
        self._status: str = "DIAJUKAN"
        self._petugas: Optional[Any] = None
        self._alasan_penolakan: str = ""
        self._tanggal_aktual: Optional[date] = None
        self._denda: int = 0

        # TODO: Lakukan mutasi reservasi pada barang agar tidak dapat dipinjam pihak lain
        self._barang.ubah_ketersediaan(...)

    @property
    def id_peminjaman(self) -> str:
        return self._id_peminjaman

    @property
    def mahasiswa(self) -> Mahasiswa:
        return self._mahasiswa

    @property
    def barang(self) -> Perlengkapan:
        return self._barang

    @property
    def tanggal_pinjam(self) -> date:
        return self._tanggal_pinjam

    @property
    def tanggal_kembali(self) -> date:
        return self._tanggal_kembali

    @property
    def status(self) -> str:
        return self._status

    @property
    def petugas(self) -> Optional[Any]:
        return self._petugas

    @property
    def alasan_penolakan(self) -> str:
        return self._alasan_penolakan

    @property
    def tanggal_aktual(self) -> Optional[date]:
        return self._tanggal_aktual

    @property
    def denda(self) -> int:
        return self._denda

    def durasi_rencana_hari(self) -> int:
        """Menghitung total hari durasi rencana peminjaman."""
        # TODO: Hitung selisih hari antara tanggal rencana kembali dan tanggal pinjam
        return (self._tanggal_kembali - ...).days

    def ubah_status(self, status_baru: str) -> None:
        """Mengubah status transaksi dengan menegakkan aturan state machine."""
        status_tujuan = status_baru.strip().upper()
        transisi_valid: Tuple[str, ...] = TRANSISI_SAH.get(self._status, ())

        # TODO: Periksa apakah perpindahan status diizinkan sesuai alur state machine
        if status_tujuan not in ...:
            raise ValueError(
                f"Transisi status dari '{self._status}' ke '{status_tujuan}' tidak diizinkan."
            )

        # TODO: Tetapkan status baru pada transaksi
        self._status = ...

    def __repr__(self) -> str:
        return (
            f"<Peminjaman id='{self.id_peminjaman}' mhs='{self.mahasiswa.nama}' "
            f"barang='{self.barang.nama}' status='{self.status}'>"
        )


if __name__ == "__main__":
    print("Modul peminjaman.py siap dikerjakan oleh Tim 3.")
    print("Silakan lengkapi bagian rumpang yang bertanda (...) sesuai petunjuk logika bisnis.")
