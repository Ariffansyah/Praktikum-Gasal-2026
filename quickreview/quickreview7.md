---
title: Quick Review 7
layout: default
parent: Quick Review
tampil: true
nav_order: 4
---

# Quick Review - Chapter 7

Recall singkat sebelum masuk ke study case. Fokusnya adalah menggunakan satu kontrak untuk berbagai object dan memilih hubungan antarkelas yang sesuai. Penjelasan lengkap dan latihan bertahap ada pada [Chapter 7 - Polymorphism and Class Relationships]({{ '/readings-chapter7/' | relative_url }}).

## Main topics

1. **Polymorphism dan dynamic dispatch**
   - Kode pemroses memanggil method yang sama pada object dengan implementasi berbeda.
   - Overriding menyediakan perilaku khusus di child class. Implementasi yang dipanggil ditentukan saat program berjalan berdasarkan object penerimanya.
   - Jika method parent memanggil `self.hitung()`, implementasi child tetap dapat dijalankan.
   - Hindari percabangan untuk setiap class konkret jika perilakunya dapat ditempatkan pada method masing-masing object.

2. **Duck typing dan kontrak method**
   - Object tidak harus mewarisi parent buatan yang sama; cukup menyediakan perilaku yang dibutuhkan pemanggil.
   - Nama method saja belum cukup. Parameter, nilai kembalian, dan efek pada state harus sesuai kontrak.
   - `print(hasil)` berbeda dari `return hasil`. Pemanggil yang membutuhkan angka tidak dapat menggunakan hasil `None` dari method yang hanya mencetak.
   - `Protocol` membantu mendokumentasikan kontrak untuk pemeriksa tipe. Type hints dan pemeriksaan protocol saat runtime tidak membuktikan seluruh perilaku object benar.

3. **Overriding dan overloading**
   - Overriding: child mengganti implementasi method yang diwarisi.
   - Dua `def` bernama sama di satu class tidak membuat pilihan berdasarkan jumlah parameter; definisi terakhir menggantikan yang sebelumnya.
   - Operator dan operasi bawaan memakai special method: `len(obj)` melalui `__len__()`, `str(obj)` melalui `__str__()`, dan `a + b` melibatkan `__add__()` serta kemungkinan `__radd__()`.
   - `NotImplemented` adalah nilai khusus untuk operasi yang tidak didukung oleh implementasi operator; berbeda dari exception `NotImplementedError`.

4. **Class relationships**
   - Inheritance menyatakan hubungan is-a yang harus menjaga kontrak parent.
   - Association adalah hubungan umum antarobject. Dependency menunjukkan pemakaian layanan, misalnya melalui parameter method.
   - Aggregation dan composition sama-sama memodelkan whole-part; bedakan berdasarkan kepemilikan dan kemandirian bagian.
   - Menyimpan object sebagai attribute tidak otomatis membuktikan bahwa hubungan itu composition eksklusif.

5. **Delegation**
   - Satu object menyerahkan pekerjaan kepada kolaborator, misalnya `kelas.penilai.hitung(...)`.
   - Kolaborator dapat diganti tanpa menambahkan percabangan jenis class pada pemroses.
   - Delegation menjelaskan pembagian pekerjaan; aggregation atau composition menjelaskan hubungan dan kepemilikan object.

6. **Kontrak perilaku dan Liskov Substitution Principle (LSP)**
   - Object turunan harus dapat menggantikan parent dalam konteks kontrak yang dijanjikan.
   - Jangan menambah parameter wajib, mengubah jenis hasil yang diperlukan pemanggil, atau menolak input yang dijanjikan valid oleh kontrak parent.
   - `ABC` memeriksa kelengkapan abstract method sebelum object dibuat, tetapi tidak otomatis memeriksa rumus dan seluruh aturan perilaku.

### Bedakan hubungan dengan satu pertanyaan

| Hubungan            | Pertanyaan                                                         | Contoh                                   |
| :------------------ | :----------------------------------------------------------------- | :--------------------------------------- |
| Inheritance / is-a  | Apakah child merupakan jenis parent dan dapat memenuhi kontraknya? | `PenilaiProyek` merupakan `Penilai`      |
| Association         | Apakah kedua object berhubungan?                                   | Dosen membimbing mahasiswa               |
| Dependency / uses-a | Apakah operasi ini membutuhkan layanan object lain?                | Pembuat laporan memakai formatter        |
| Aggregation         | Apakah bagian tetap memiliki identitas mandiri?                    | Kelas praktikum mengelompokkan mahasiswa |
| Composition         | Apakah bagian dikelola sebagai bagian khusus dari pemiliknya?      | Kelas membuat catatan hasil penilaian    |

**Ingat tentang referensi:** `list(peserta)` menyalin container list, bukan mahasiswa di dalamnya. `del pemilik` melepaskan binding nama; object bagian yang masih dirujuk dari tempat lain tetap dapat digunakan. Kepemilikan dalam desain tidak sama dengan jaminan penghapusan object secara berantai.

## Pro Tip

1. Tulis dahulu kontrak method: argumen, hasil, input yang valid, dan state yang boleh berubah.
2. Pisahkan pemroses dari variasi perilaku. Kelas mengatur rekap, penilai menentukan rumus.
3. Gunakan inheritance untuk hubungan is-a yang memenuhi kontrak; gunakan kolaborator jika object membutuhkan layanan atau perilaku yang dapat diganti.
4. Buat list milik instance di `__init__()` agar data tidak tercampur antarobject.
5. Uji daftar kosong, pemanggilan berulang, pergantian kolaborator, dan perubahan data yang dibagikan.

> Playground berikut merupakan contoh recall yang langsung dapat dijalankan. Gunakan untuk mengamati polymorphism, duck typing, aggregation, composition, dan delegation sebelum mengerjakan latihan sendiri.

## Playground: satu kelas, beberapa kebijakan penilaian

Pada contoh ini, nilai tugas dan ujian diasumsikan integer `0..100`. Penilai reguler memakai bobot 40:60, sedangkan penilai proyek memakai bobot 70:30. Pembagian `// 100` sengaja membulatkan ke bawah sesuai kebijakan contoh.

```text
PenilaiReguler ----|> Penilai <|---- PenilaiProyek
                         ^
                         | perhitungan didelegasikan ke penilai
                         |
Mahasiswa --------o KelasPraktikum *-------- HasilPenilaian
```

Penanda `o` menunjukkan aggregation dan `*` menunjukkan composition, keduanya di sisi kelas sebagai whole. Garis ke penilai menunjukkan pemakaian kolaborator. `PenilaiTetap` pada kode berikut memenuhi kontrak melalui duck typing tanpa mewarisi `Penilai`.

{% capture quickreview_ch7_playground %}from abc import ABC, abstractmethod
from dataclasses import dataclass

class Penilai(ABC):
@abstractmethod
def hitung(self, tugas, ujian):
pass

class PenilaiReguler(Penilai):
def hitung(self, tugas, ujian):
return (40 _ tugas + 60 _ ujian) // 100

class PenilaiProyek(Penilai):
def hitung(self, tugas, ujian):
return (70 _ tugas + 30 _ ujian) // 100

class PenilaiTetap:
def hitung(self, tugas, ujian):
return 100

@dataclass
class Mahasiswa:
nama: str
tugas: int
ujian: int

@dataclass(frozen=True)
class HasilPenilaian:
nama: str
nilai: int

class KelasPraktikum:
def **init**(self, peserta, penilai):
self.peserta = list(peserta)
self.penilai = penilai
self.\_hasil = []

    def __len__(self):
        return len(self.peserta)

    def rekap(self):
        self._hasil = [
            HasilPenilaian(m.nama, self.penilai.hitung(m.tugas, m.ujian))
            for m in self.peserta
        ]

    def tampilkan(self):
        return [f'{h.nama}: {h.nilai}' for h in self._hasil]

# 1. Aggregation: mahasiswa sudah ada sebelum kelas dibentuk

andi = Mahasiswa('Andi', 80, 90)
sari = Mahasiswa('Sari', 100, 80)
daftar_awal = [andi, sari]
kelas = KelasPraktikum(daftar_awal, PenilaiReguler())
daftar_awal.clear()
print('Jumlah peserta:', len(kelas))
print('Object sama:', kelas.peserta[0] is andi)

# 2. Delegation dan polymorphism: pemroses rekap tidak berubah

kelas.rekap()
print('Reguler:', kelas.tampilkan())
kelas.penilai = PenilaiProyek()
kelas.rekap()
print('Proyek:', kelas.tampilkan())

# 3. Duck typing: kontrak yang sama tanpa inheritance dari Penilai

kelas.penilai = PenilaiTetap()
kelas.rekap()
print('Tetap:', kelas.tampilkan())
print('Turunan Penilai:', isinstance(kelas.penilai, Penilai))

# 4. Composition: rekap membuat catatan hasil baru sebagai snapshot

andi.tugas = 0
print('Snapshot:', kelas.tampilkan())
kelas.penilai = PenilaiProyek()
kelas.rekap()
print('Data baru:', kelas.tampilkan())
kelas.rekap()
print('Rekap ulang:', kelas.tampilkan())

# 5. Daftar kosong tetap mengikuti kontrak

kosong = KelasPraktikum([], PenilaiReguler())
kosong.rekap()
print('Kosong:', kosong.tampilkan())
{% endcapture %}
{% include pyodide-exercise.html id="quickreview-ch7-playground" title="Chapter 7 - Polymorphism dan class relationships" prompt="Jalankan kode terlebih dahulu. Coba ganti penilai, ubah nilai mahasiswa, atau ubah rekap() menjadi append tanpa mengosongkan hasil. Amati perbedaan output, snapshot, dan rekap berulang. Tekan Reset untuk kembali ke kode awal." starter=quickreview_ch7_playground %}  

### Output

```text
Jumlah peserta: 2
Object sama: True
Reguler: ['Andi: 86', 'Sari: 88']
Proyek: ['Andi: 83', 'Sari: 94']
Tetap: ['Andi: 100', 'Sari: 100']
Turunan Penilai: False
Snapshot: ['Andi: 100', 'Sari: 100']
Data baru: ['Andi: 27', 'Sari: 94']
Rekap ulang: ['Andi: 27', 'Sari: 94']
Kosong: []
```
