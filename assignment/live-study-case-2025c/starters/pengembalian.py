"""Tim 5: Pengembalian dan Denda (pengembalian.py).

Panduan Pengerjaan Kode Rumpang:
Struktur class, method, dekorator, dan property telah disediakan. Tugas tim Anda
adalah melengkapi bagian rumpang yang ditandai dengan tanda elipsis (...) sesuai
dengan strategi kebijakan denda, dependency injection, dan pemulihan ketersediaan barang.

Item OOP yang Dipraktikkan:
1. Abstract Base Class (KebijakanDenda): Kontrak metode perhitungan denda.
2. Dependency Injection: LayananPengembalian menerima strategi KebijakanDenda via konstruktor.
3. Polimorfisme: DendaHarian mengimplementasikan tarif per hari keterlambatan.
4. Transisi Status dan Pemulihan Aset: Transaksi diselesaikan dan status barang kembali True.
"""

from abc import ABC, abstractmethod
from datetime import date, datetime
from typing import Any, Dict, Optional, Union

try:
    from .peminjaman import Peminjaman, konversi_tanggal
except (ImportError, ValueError):
    from peminjaman import Peminjaman, konversi_tanggal


class KebijakanDenda(ABC):
    """Abstract Base Class yang mendefinisikan strategi perhitungan denda."""

    @abstractmethod
    def hitung_denda(self, tanggal_kembali: date, tanggal_aktual: date) -> int:
        """Kontrak abstract method untuk menghitung nominal denda keterlambatan."""
        pass


class DendaHarian(KebijakanDenda):
    """Implementasi kebijakan denda flat berbasis hari keterlambatan kalender."""

    def __init__(self, tarif_per_hari: int = 5000) -> None:
        if tarif_per_hari < 0:
            raise ValueError("Tarif denda tidak boleh bernilai negatif.")
        # TODO: Simpan nilai tarif harian ke atribut privat
        self._tarif_per_hari: int = ...

    @property
    def tarif_per_hari(self) -> int:
        return self._tarif_per_hari

    def hitung_denda(self, tanggal_kembali: date, tanggal_aktual: date) -> int:
        """Menghitung denda berdasarkan selisih hari kalender dan tarif harian."""
        # TODO: Hitung selisih hari pengembalian terhadap rencana tanggal kembali
        selisih_hari = (tanggal_aktual - ...).days
        # TODO: Pastikan hari keterlambatan tidak menghasilkan nilai negatif jika kembali tepat waktu
        hari_terlambat = max(0, ...)

        # TODO: Hitung nominal total denda berdasarkan hari keterlambatan dan tarif
        return hari_terlambat * ...


class LayananPengembalian:
    """Layanan domain untuk memproses pengembalian barang dan penyelesaian transaksi."""

    def __init__(self, kebijakan_denda: Optional[KebijakanDenda] = None) -> None:
        """Konstruktor layanan pengembalian.

        Menerapkan Dependency Injection: jika strategi kebijakan denda tidak
        diinjeksikan dari luar, gunakan strategi default sistem.
        """
        # TODO: Terapkan strategi default kebijakan denda jika parameter bernilai None
        self._kebijakan_denda: KebijakanDenda = (
            kebijakan_denda if kebijakan_denda is not None else ...
        )

    def proses(
        self,
        peminjaman: Peminjaman,
        tanggal_aktual: Union[date, str],
    ) -> Dict[str, Any]:
        """Memproses pengembalian perlengkapan kampus.

        Validasi dan tahapan:
        1. Transaksi wajib berada pada status yang telah disetujui.
        2. Tanggal aktual tidak boleh mendahului tanggal pinjam.
        3. Hitung denda keterlambatan melalui objek kebijakan denda.
        4. Simpan tanggal aktual pengembalian dan nominal denda pada transaksi.
        5. Ubah status transaksi ke status selesai.
        6. Pulihkan status ketersediaan barang inventaris.
        """
        # TODO: Periksa apakah transaksi berstatus sah untuk diproses pengembaliannya
        if peminjaman.status != ...:
            raise ValueError(
                f"Pengembalian hanya dapat diproses untuk transaksi DISETUJUI, "
                f"bukan '{peminjaman.status}'."
            )

        tgl_aktual = konversi_tanggal(tanggal_aktual)
        if tgl_aktual < peminjaman.tanggal_pinjam:
            raise ValueError("Tanggal pengembalian aktual tidak boleh mendahului tanggal pinjam.")

        # Hitung hari terlambat kalender
        selisih = (tgl_aktual - peminjaman.tanggal_kembali).days
        hari_terlambat = max(0, selisih)

        # TODO: Delegasikan penghitungan denda ke instance kebijakan denda
        denda = self._kebijakan_denda.hitung_denda(
            tanggal_kembali=...,
            tanggal_aktual=...,
        )

        peminjaman._tanggal_aktual = tgl_aktual
        peminjaman._denda = denda

        # TODO: Perbarui status transaksi untuk menandai siklus transaksi telah tuntas
        peminjaman.ubah_status(...)

        # TODO: Lepaskan reservasi barang agar status barang kembali tersedia
        peminjaman.barang.ubah_ketersediaan(...)

        return {
            "id_peminjaman": peminjaman.id_peminjaman,
            "hari_terlambat": hari_terlambat,
            "denda": denda,
            "status": peminjaman.status,
        }


if __name__ == "__main__":
    print("Modul pengembalian.py siap dikerjakan oleh Tim 5.")
    print("Silakan lengkapi bagian rumpang yang bertanda (...) sesuai petunjuk logika bisnis.")
