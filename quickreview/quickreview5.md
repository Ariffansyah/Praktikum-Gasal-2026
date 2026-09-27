---
title: Quick Review 5
layout: default
parent: Quick Review
tampil: true
nav_order: 2
---
# Quick Review - Chapter 5

Recall singkat sebelum masuk ke study case. Fokusnya adalah cara menyusun hierarki class agar bagian yang umum cukup ditulis sekali, sementara perilaku khusus tetap bisa disesuaikan di setiap turunan.

## Main topics

1. **Inheritance dan hubungan is-a**
   - `class Child(Parent)` membuat child mewarisi attribute dan method milik parent.
   - Parent disebut base class atau superclass; child disebut derived class atau subclass.
   - Pakai inheritance hanya jika kalimat "child is-a parent" benar-benar masuk akal.
   - `isinstance(objek, Parent)` memeriksa object; `issubclass(Child, Parent)` memeriksa class.

2. **`super()` pada constructor**
   - Child yang menuliskan `__init__()` sendiri wajib memanggil constructor parent.
   - `super().__init__(...)` mengisi attribute milik parent. `self` tidak ditulis sebagai argument.
   - Tanpa pemanggilan itu, attribute parent tidak pernah terisi dan muncul `AttributeError`.
   - Child yang tidak menuliskan `__init__()` otomatis memakai constructor parent apa adanya.

3. **Method overriding**
   - Child menuliskan kembali method parent untuk menyesuaikan perilakunya sendiri.
   - Override tambahan menjalankan `super().nama_method()` dulu, lalu menambah perilaku.
   - Override penuh mengganti seluruh perilaku parent tanpa memanggil `super()`.
   - Nama dan parameter method yang dioverride harus tetap kompatibel dengan versi parent.

4. **Method parent yang memanggil method lain**
   - Jika parent memanggil `self.nama_method()`, yang dijalankan adalah versi milik class object yang sebenarnya.
   - Akibatnya satu method parent bisa ikut berubah hasilnya tanpa isinya diubah sama sekali.
   - Pola ini sering dipakai untuk batas, biaya, atau label yang berbeda di tiap turunan.

5. **Multilevel, multiple, dan MRO**
   - Multilevel: `A` diwarisi `B`, lalu `B` diwarisi `C`, sehingga `C` otomatis mewarisi `A`.
   - Multiple: `class C(A, B)` menggabungkan dua parent; parent paling kiri diprioritaskan.
   - MRO adalah urutan pencarian method. Lihat dengan `C.mro()` atau `C.__mro__`.
   - `super()` mengacu pada class berikutnya dalam MRO, bukan selalu parent langsung.

## Pro Tip

1. Gambar dulu hierarki class-nya sebelum menulis kode.
2. Tentukan attribute mana milik parent dan mana yang khusus milik child.
3. Selesaikan parent class lebih dahulu, baru turun ke child.
4. Pastikan setiap constructor child memanggil constructor parent.
5. Jika soal meminta `super()`, jangan menuliskan hasil akhirnya secara langsung.
6. Pada multiple inheritance, periksa MRO sebelum memilih `super()` atau nama class.
7. Cocokkan nama class, signature method, label, dan format output dengan starter code.

> Playground berikut bukan jawaban study case. Gunakan untuk mengingat kembali inheritance, `super()`, method overriding, multilevel inheritance, dan cara membaca MRO.

## Playground: inheritance dan super()

{% include pyodide-exercise.html id="quickreview-ch5-playground" title="Chapter 5 - Inheritance dan super()" prompt="Jalankan starter code terlebih dahulu. Setelah itu, coba hapus salah satu super() dan amati apa yang hilang, tambahkan satu class turunan baru, atau tukar urutan parent pada multiple inheritance. Perhatikan bahwa peran() berubah di setiap tingkat sementara constructor tetap memakai super()." starter="class User:
    total_user = 0

    def __init__(self, nama, email):
        self.nama = nama
        self.email = email
        User.total_user += 1

    def peran(self):
        return 'User'

    def sapa(self):
        return f'Halo, {self.nama}'


class Mahasiswa(User):
    def __init__(self, nama, email, nim):
        super().__init__(nama, email)
        self.nim = nim

    def peran(self):
        return 'Mahasiswa'

    def sapa(self):
        return f'{super().sapa()}, NIM {self.nim}'


class AsistenPraktikum(Mahasiswa):
    def __init__(self, nama, email, nim, matkul):
        super().__init__(nama, email, nim)
        self.matkul = matkul

    def peran(self):
        return 'Asisten Praktikum'

    def sapa(self):
        return f'{super().sapa()}, asisten {self.matkul}'


user = User('Rina', 'rina@unesa.ac.id')
mhs = Mahasiswa('Andi', 'andi@mhs.unesa.ac.id', '25051204001')
asisten = AsistenPraktikum('Budi', 'budi@mhs.unesa.ac.id', '25051204002', 'PBO')

print('Peran user    :', user.peran())
print('Peran mhs     :', mhs.peran())
print('Peran asisten :', asisten.peran())
print('Sapa user     :', user.sapa())
print('Sapa asisten  :', asisten.sapa())
print('is-a Mahasiswa:', isinstance(asisten, Mahasiswa))
print('is-a User     :', isinstance(asisten, User))
print('MRO           :', [k.__name__ for k in AsistenPraktikum.mro()])
print('Total user    :', User.total_user)
" %}

Tampilan dari kode tersebut secara visual, ada di [sini](https://cscircles.cemc.uwaterloo.ca/visualize#code=class+User%3A%0A++++total_user+%3D+0%0A%0A++++def+__init__(self,+nama,+email)%3A%0A++++++++self.nama+%3D+nama%0A++++++++self.email+%3D+email%0A++++++++User.total_user+%2B%3D+1%0A%0A++++def+peran(self)%3A%0A++++++++return+'User'%0A%0A++++def+sapa(self)%3A%0A++++++++return+f'Halo,+%7Bself.nama%7D'%0A%0A%0Aclass+Mahasiswa(User)%3A%0A++++def+__init__(self,+nama,+email,+nim)%3A%0A++++++++super().__init__(nama,+email)%0A++++++++self.nim+%3D+nim%0A%0A++++def+peran(self)%3A%0A++++++++return+'Mahasiswa'%0A%0A++++def+sapa(self)%3A%0A++++++++return+f'%7Bsuper().sapa()%7D,+NIM+%7Bself.nim%7D'%0A%0A%0Aclass+AsistenPraktikum(Mahasiswa)%3A%0A++++def+__init__(self,+nama,+email,+nim,+matkul)%3A%0A++++++++super().__init__(nama,+email,+nim)%0A++++++++self.matkul+%3D+matkul%0A%0A++++def+peran(self)%3A%0A++++++++return+'Asisten+Praktikum'%0A%0A++++def+sapa(self)%3A%0A++++++++return+f'%7Bsuper().sapa()%7D,+asisten+%7Bself.matkul%7D'%0A%0A%0Auser+%3D+User('Rina',+'rina%40unesa.ac.id')%0Amhs+%3D+Mahasiswa('Andi',+'andi%40mhs.unesa.ac.id',+'25051204001')%0Aasisten+%3D+AsistenPraktikum('Budi',+'budi%40mhs.unesa.ac.id',+'25051204002',+'PBO')%0A%0Aprint('Peran+user++++%3A',+user.peran())%0Aprint('Peran+mhs+++++%3A',+mhs.peran())%0Aprint('Peran+asisten+%3A',+asisten.peran())%0Aprint('Sapa+user+++++%3A',+user.sapa())%0Aprint('Sapa+asisten++%3A',+asisten.sapa())%0Aprint('is-a+Mahasiswa%3A',+isinstance(asisten,+Mahasiswa))%0Aprint('is-a+User+++++%3A',+isinstance(asisten,+User))%0Aprint('MRO+++++++++++%3A',+%5Bk.__name__+for+k+in+AsistenPraktikum.mro()%5D)%0Aprint('Total+user++++%3A',+User.total_user)&mode=display&raw_input=&curInstr=0)

## Checklist sebelum study case

- Pastikan hubungan is-a antara child dan parent benar-benar terpenuhi.
- Cari attribute parent yang harus diisi melalui constructor parent.
- Bedakan override yang menambah perilaku dan override yang mengganti seluruhnya.
- Periksa method parent yang memanggil `self.nama_method()`, karena hasilnya ikut berubah.
- Pada multiple inheritance, pastikan constructor kedua parent benar-benar dijalankan.
- Pastikan operasi yang ditolak tidak mengubah state maupun counter class.
- Jangan mengubah program utama, signature, label, atau format output yang sudah disediakan.
