"""Tim 1: Identitas Pengguna (pengguna.py).

Panduan Pengerjaan Kode Rumpang:
Struktur class, method, dekorator, dan property telah disediakan. Tugas tim Anda
adalah melengkapi bagian rumpang yang ditandai dengan tanda elipsis (...) sesuai
dengan aturan bisnis dan logika enkapsulasi objek.

Item OOP yang Dipraktikkan:
1. Encapsulation: Atribut privat dilindungi dengan awalan underscore.
2. Property (@property): Getter publik untuk membaca atribut privat secara aman.
3. Inheritance: Mahasiswa dan Petugas mewarisi class dasar Pengguna.
4. super(): Memanggil konstruktor class induk dengan parameter yang tepat.
5. Class Method (@classmethod): Factory method untuk instansiasi dari dictionary data.
"""

from typing import Any, Dict


class Pengguna:
    """Class dasar untuk seluruh entitas pengguna sistem KampusPinjam."""

    def __init__(self, identitas: str, nama: str, role: str) -> None:
        """Konstruktor dasar pengguna.

        Aturan:
        1. Identitas dan nama tidak boleh string kosong atau hanya spasi.
        2. Role wajib divalidasi hanya menerima 'mahasiswa' atau 'petugas'.
        3. Simpan nilai parameter ke atribut privat dengan awalan underscore.
        """
        if not identitas or not identitas.strip():
            raise ValueError("Identitas pengguna tidak boleh kosong.")
        if not nama or not nama.strip():
            raise ValueError("Nama pengguna tidak boleh kosong.")

        # TODO: Tentukan tuple role yang diizinkan untuk pengguna sistem
        daftar_role_valid = (...)

        if role not in daftar_role_valid:
            raise ValueError(f"Role '{role}' tidak valid. Harus 'mahasiswa' atau 'petugas'.")

        # TODO: Simpan parameter ke atribut privat menggunakan nama yang telah distrip
        self._identitas: str = ...
        self._nama: str = ...
        self._role: str = ...

    @property
    def identitas(self) -> str:
        """Property getter untuk membaca nomor identitas unik pengguna."""
        # TODO: Kembalikan atribut privat identitas pengguna
        return ...

    @property
    def nama(self) -> str:
        """Property getter untuk membaca nama lengkap pengguna."""
        # TODO: Kembalikan atribut privat nama pengguna
        return ...

    @property
    def role(self) -> str:
        """Property getter untuk membaca peran pengguna."""
        # TODO: Kembalikan atribut privat peran pengguna
        return ...

    def __repr__(self) -> str:
        return f"<{self.__class__.__name__} id='{self.identitas}' nama='{self.nama}'>"


class Mahasiswa(Pengguna):
    """Subclass pengguna kampus yang memiliki hak mengajukan peminjaman."""

    def __init__(self, nim: str, nama: str) -> None:
        """Konstruktor Mahasiswa.

        Mahasiswa otomatis memiliki role 'mahasiswa'.
        """
        # TODO: Teruskan parameter nim, nama, dan role mahasiswa ke konstruktor induk
        super().__init__(identitas=..., nama=..., role=...)

    @property
    def nim(self) -> str:
        """Property getter alias untuk NIM mahasiswa (mengacu ke identitas)."""
        # TODO: Kembalikan nilai identitas mahasiswa
        return ...

    @classmethod
    def dari_data(cls, data: Dict[str, Any]) -> "Mahasiswa":
        """Factory class method untuk membuat objek Mahasiswa dari dictionary."""
        # TODO: Ambil nilai identitas/NIM dan nama dari dictionary data
        nim = data.get(...)
        nama = data.get(...)

        if not nim or not nama:
            raise KeyError("Data dictionary mahasiswa wajib memiliki kunci 'nim' dan 'nama'.")

        # TODO: Buat dan kembalikan instance Mahasiswa baru
        return cls(nim=..., nama=...)


class Petugas(Pengguna):
    """Subclass pengguna kampus yang memiliki wewenang memproses persetujuan."""

    def __init__(self, nip: str, nama: str) -> None:
        """Konstruktor Petugas.

        Petugas otomatis memiliki role 'petugas'.
        """
        # TODO: Teruskan parameter nip, nama, dan role petugas ke konstruktor induk
        super().__init__(identitas=..., nama=..., role=...)

    @property
    def nip(self) -> str:
        """Property getter alias untuk NIP petugas (mengacu ke identitas)."""
        # TODO: Kembalikan nilai identitas petugas
        return ...

    @classmethod
    def dari_data(cls, data: Dict[str, Any]) -> "Petugas":
        """Factory class method untuk membuat objek Petugas dari dictionary."""
        # TODO: Ambil nilai identitas/NIP dan nama dari dictionary data
        nip = data.get(...)
        nama = data.get(...)

        if not nip or not nama:
            raise KeyError("Data dictionary petugas wajib memiliki kunci 'nip' dan 'nama'.")

        # TODO: Buat dan kembalikan instance Petugas baru
        return cls(nip=..., nama=...)


def buat_pengguna_contoh() -> Dict[str, Any]:
    """Helper fixture data untuk demonstrasi pengujian mandiri Tim 1."""
    # TODO: Siapkan instance Mahasiswa dan Petugas sebagai data simulasi
    mhs_contoh = Mahasiswa(nim=..., nama=...)
    petugas_contoh = Petugas(nip=..., nama=...)
    return {
        "mahasiswa": [mhs_contoh],
        "petugas": [petugas_contoh],
    }


if __name__ == "__main__":
    print("Modul pengguna.py siap dikerjakan oleh Tim 1.")
    print("Silakan lengkapi bagian rumpang yang bertanda (...) sesuai petunjuk logika bisnis.")
