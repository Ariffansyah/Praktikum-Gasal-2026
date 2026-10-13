"""Tim 2: Katalog Perlengkapan (perlengkapan.py).

Panduan Pengerjaan Kode Rumpang:
Struktur class, method, dekorator, dan property telah disediakan. Tugas tim Anda
adalah melengkapi bagian rumpang yang ditandai dengan tanda elipsis (...) sesuai
dengan kontrak abstract method dan aturan mutasi ketersediaan inventaris.

Item OOP yang Dipraktikkan:
1. Abstract Base Class (ABC): Perlengkapan mewarisi abc.ABC.
2. Abstract Method (@abstractmethod): batas_durasi_hari() sebagai kontrak interface wajib.
3. Polimorfisme: Subclass konkret menentukan batas durasinya masing-masing.
4. Encapsulation: Status ketersediaan (_tersedia) dijaga dan dimutasi secara terkontrol.
"""

from abc import ABC, abstractmethod
from typing import List


class Perlengkapan(ABC):
    """Abstract Base Class untuk seluruh barang inventaris kampus."""

    def __init__(self, id_barang: str, nama: str) -> None:
        """Konstruktor perlengkapan inventaris.

        Aturan:
        1. ID barang dan nama tidak boleh kosong atau hanya spasi.
        2. Simpan id_barang dan nama ke atribut privat.
        3. Tentukan status ketersediaan awal barang baru.
        """
        if not id_barang or not id_barang.strip():
            raise ValueError("ID barang tidak boleh kosong.")
        if not nama or not nama.strip():
            raise ValueError("Nama barang tidak boleh kosong.")

        # TODO: Inisialisasi atribut privat dan tentukan status ketersediaan awal barang baru
        self._id_barang: str = ...
        self._nama: str = ...
        self._tersedia: bool = ...

    @property
    def id_barang(self) -> str:
        """Property getter untuk membaca ID unik perlengkapan."""
        # TODO: Kembalikan atribut privat ID barang
        return ...

    @property
    def nama(self) -> str:
        """Property getter untuk membaca nama deskriptif perlengkapan."""
        # TODO: Kembalikan atribut privat nama barang
        return ...

    @property
    def tersedia(self) -> bool:
        """Property getter untuk membaca status ketersediaan barang."""
        # TODO: Kembalikan atribut privat status ketersediaan
        return ...

    def ubah_ketersediaan(self, status: bool) -> None:
        """Method mutasi terkontrol untuk mengubah status ketersediaan barang."""
        # TODO: Perbarui status ketersediaan barang berdasarkan parameter yang diterima
        self._tersedia = ...

    @abstractmethod
    def batas_durasi_hari(self) -> int:
        """Kontrak abstract method: wajib dioverride oleh seluruh subclass konkret."""
        pass

    def __repr__(self) -> str:
        status_teks = "Tersedia" if self.tersedia else "Dipinjam"
        return f"<{self.__class__.__name__} id='{self.id_barang}' nama='{self.nama}' status='{status_teks}'>"


class Proyektor(Perlengkapan):
    """Subclass konkret untuk perangkat proyektor laboratorium."""

    def __init__(self, id_barang: str, nama: str = "Proyektor Epson EB-X400") -> None:
        # TODO: Teruskan parameter id_barang dan nama ke konstruktor induk
        super().__init__(id_barang=..., nama=...)

    def batas_durasi_hari(self) -> int:
        """Batas durasi peminjaman proyektor sesuai ketentuan studi kasus."""
        # TODO: Kembalikan batas maksimal hari peminjaman untuk proyektor
        return ...


class Kamera(Perlengkapan):
    """Subclass konkret untuk perangkat kamera multimedia."""

    def __init__(self, id_barang: str, nama: str = "Kamera Sony Alpha A6400") -> None:
        # TODO: Teruskan parameter id_barang dan nama ke konstruktor induk
        super().__init__(id_barang=..., nama=...)

    def batas_durasi_hari(self) -> int:
        """Batas durasi peminjaman kamera sesuai ketentuan studi kasus."""
        # TODO: Kembalikan batas maksimal hari peminjaman untuk kamera
        return ...


class Speaker(Perlengkapan):
    """Subclass konkret untuk perangkat audio portable."""

    def __init__(self, id_barang: str, nama: str = "Speaker Portable JBL EON ONE") -> None:
        # TODO: Teruskan parameter id_barang dan nama ke konstruktor induk
        super().__init__(id_barang=..., nama=...)

    def batas_durasi_hari(self) -> int:
        """Batas durasi peminjaman speaker sesuai ketentuan studi kasus."""
        # TODO: Kembalikan batas maksimal hari peminjaman untuk speaker
        return ...


def buat_katalog_contoh() -> List[Perlengkapan]:
    """Helper fixture data katalog barang awal untuk demonstrasi pengujian."""
    # TODO: Siapkan instance Proyektor, Kamera, dan Speaker sebagai data inventaris
    return [
        Proyektor(id_barang=..., nama=...),
        Kamera(id_barang=..., nama=...),
        Speaker(id_barang=..., nama=...),
    ]


if __name__ == "__main__":
    print("Modul perlengkapan.py siap dikerjakan oleh Tim 2.")
    print("Silakan lengkapi bagian rumpang yang bertanda (...) sesuai petunjuk logika bisnis.")
