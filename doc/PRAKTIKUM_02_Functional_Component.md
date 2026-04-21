# Praktikum 2 – Functional Component

**Pemrograman Mobile II · Expo / React Native**

Panduan ini mengajak kamu belajar **Functional Component** dari nol—dengan bahasa yang santai dan runut, cocok buat yang baru pertama kali main React/React Native.

---

## Target Pelajaran Hari Ini

| No | Target | Keterangan |
|----|--------|------------|
| 1 | **Membuat folder components** | Component praktikum diletakkan di folder `components/praktikum/` (di dalam `components/`). |
| 2 | **Membuat Header, Card, dan CustomButton** | Tiga component dengan props: **Header** (title, subtitle), **Card** (title, subtitle), **CustomButton** (title, onPress, variant). |
| 3 | **Membuat Counter dengan useState** | Component yang punya state (angka) dan tombol Tambah/Kurangi; nilai berubah saat user tap. |

Di app, buka tab **Praktikum** untuk melihat contoh Header, Card, CustomButton, dan Counter. **Semua component target pelajaran disimpan di folder `components/praktikum/`:** `Header.tsx`, `CustomButton.tsx`, `CardWithProps.tsx` (Card), `Counter.tsx`.

---

## Pendahuluan: Kenapa Belajar Functional Component?

Di React (dan React Native/Expo), hampir semua yang tampil di layar itu **component**. Bisa dibayangin kayak blok LEGO: satu blok buat tombol, satu blok buat kartu, satu blok buat header. Nanti blok-blok itu disusun jadi satu layar penuh.

**Functional Component** itu salah satu cara bikin “blok” itu: kita nulis dalam bentuk **function** yang isinya return tampilan (JSX). Cara ini yang paling dipakai sekarang—ringan, gampang dibaca, dan cocok dipadu sama **Hooks** (seperti `useState`, `useEffect`) buat ngatur data dan interaksi.

Di praktikum ini kita akan urut dari: **apa itu functional component** → **cara kasih data lewat props** → **cara simpan data yang bisa berubah pakai state**. Setiap bagian ada contoh kode dan penjelasan singkat biar enggak bingung.

---

## 1. Apa Itu Functional Component?

### 1.1 Definisi Sederhana

**Functional Component** = komponen yang didefinisikan dengan **function** (bukan class). Input-nya bisa **props** (parameter), output-nya **JSX** (tampilan yang keliatan di layar).

Jadi alurnya singkat: **function terima data → function return UI**.

### 1.2 Ciri-Ciri yang Perlu Kamu Ingat

- Bentuknya **function** JavaScript/TypeScript (bisa `function Nama() { }` atau arrow `const Nama = () => { }`).
- Bisa **menerima parameter** (biasanya kita sebut **props**).
- **Mengembalikan** JSX (campuran tag mirip HTML, tapi komponen React Native seperti `<View>`, `<Text>`).
- Nanti bisa pakai **Hooks** (misalnya `useState`) buat data yang berubah-ubah.

Kalau kamu sudah pernah bikin function yang return nilai, ini mirip—cuma yang di-return-nya bukan angka atau string, tapi “tampilan”.

### 1.3 Bentuk Dasar: Function Biasa

Ini contoh paling polos: komponen tanpa props, cuma nampilin satu kalimat.

```tsx
import { Text, View } from 'react-native';

function NamaKomponen() {
  return (
    <View>
      <Text>Halo, ini Functional Component!</Text>
    </View>
  );
}

export default NamaKomponen;
```

Yang perlu diperhatikan:

- **`function NamaKomponen()`** — nama bebas, usahakan PascalCase (huruf pertama besar) biar konsisten dengan aturan React.
- **`return (...)`** — isi return harus **satu elemen pembungkus** (di sini `<View>`). Kalau mau dua elemen bersebelahan, tetap bungkus pakai satu `<View>` atau `<></>` (Fragment).
- **`export default NamaKomponen`** — biar file lain bisa pakai komponen ini dengan `import NamaKomponen from '...'`.

Di React Native, **`View`** mirip `<div>` di web (wadah layout), **`Text`** wajib dipakai buat teks; teks enggak boleh “telanjang” di luar `<Text>`.

### 1.4 Bentuk Lain: Arrow Function

Kebanyakan orang juga nulis pakai arrow function. Hasilnya sama aja, cuma gaya nulis.

```tsx
const NamaKomponen = () => {
  return (
    <View>
      <Text>Halo, ini Functional Component!</Text>
    </View>
  );
};

export default NamaKomponen;
```

Pilih yang menurutmu paling enak dibaca; di project ini kadang pakai function, kadang arrow—keduanya sah.

### 1.5 Sedikit tentang JSX

Yang ada di dalam `return (...)` itu namanya **JSX**: sintaks mirip HTML, tapi dijalankan di JavaScript. Di React Native, tag-nya bukan `div`/`span` tapi **`View`**, **`Text`**, **`Pressable`**, dll. Nilai dinamis (variabel, ekspresi) pakai kurung kurawal **`{ }`**, misalnya **`{count}`** atau **`{nama}`**.

---

## 2. Props: Mengirim Data ke Component

### 2.1 Props Itu Apa?

**Props** (kependekan dari *properties*) = **data yang dikirim dari “parent” ke component**. Mirip parameter function: parent ngasih nilai, component terima lalu dipakai buat nentuin tampilan atau perilaku.

Contoh singkat: component **Card** bisa terima **title** dan **description**. Parent yang panggil `<Card title="Belajar React" description="Materi minggu ini" />`. Di dalam Card, kita bisa nampilin `title` dan `description` itu.

Penting: **props itu read-only**. Component enggak boleh mengubah props dari dalam; yang boleh mengubah ya parent (dengan ngasih nilai props baru).

### 2.2 Cara Pakai Props di TypeScript

Supaya rapi dan enggak typo, kita definisikan dulu “bentuk” props-nya pakai **type** (atau interface). Lalu di parameter function, kita terima props itu (biasanya pakai destructuring supaya enggak nulis `props.title` terus).

```tsx
type CardProps = {
  title: string;           // wajib
  description?: string;   // optional (boleh tidak dikasih)
};

function Card({ title, description }: CardProps) {
  return (
    <View>
      <Text>{title}</Text>
      {description && <Text>{description}</Text>}
    </View>
  );
}
```

Penjelasan singkat:

- **`CardProps`** — nama bebas, isinya daftar property: **title** (string, wajib), **description** (string, optional pakai **`?`**).
- **`{ title, description }`** — destructuring: kita terima object props terus “buka” jadi variabel **title** dan **description**.
- **`{description && <Text>...</Text>}`** — kalau **description** ada (truthy), baru render `<Text>`. Kalau tidak dikasih, bagian itu enggak tampil.

Contoh pemakaian di parent:

```tsx
<Card title="Judul Kartu" description="Ini deskripsi singkat." />
<Card title="Tanpa deskripsi" />
```

### 2.3 Kenapa Pakai Type/Interface?

Biar TypeScript bisa ngecek: kalau kamu lupa kasih **title** atau salah tulis nama prop, bakal dapat error di editor. Itu bantu banget biar bug ketahuan dari awal, bukan pas jalan di HP/emulator.

---

## 3. State: Data yang Bisa Berubah di Dalam Component

### 3.1 Kapan Pakai State?

**Props** itu dari luar (parent). Kalau datanya **berubah karena aksi user** di dalam satu component itu sendiri—misalnya counter naik/turun, checkbox centang/tidak, teks di input—kita simpan di **state**. State itu “ingatan” component: nilainya bisa berubah, dan tiap berubah React akan **render ulang** bagian yang perlu.

### 3.2 useState: Hook Pertama yang Kamu Kenal

**useState** itu Hook dari React buat nyimpan satu nilai (dan fungsi buat mengubah nilai itu). Format dasarnya:

```tsx
const [nilai, setNilai] = useState(nilaiAwal);
```

- **nilai** — nilai saat ini (bisa number, string, boolean, object, dll.).
- **setNilai** — function buat mengubah **nilai**. Setiap **setNilai(...)** dipanggil, React akan render ulang component dan **nilai** yang kamu baca jadi yang terbaru.
- **nilaiAwal** — nilai pertama saat component pertama kali tampil.

Kamu **tidak** assign ulang pakai `nilai = ...`; harus lewat **setNilai(...)** biar React ngeh dan UI-nya ke-update.

### 3.3 Contoh: Counter

Counter itu contoh klasik: satu angka yang naik/turun tiap tombol diklik.

```tsx
import { useState } from 'react';
import { Text, View, Button } from 'react-native';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Tambah" onPress={() => setCount(count + 1)} />
    </View>
  );
}
```

Alurnya:

1. **count** mulanya **0**.
2. User tap **Tambah** → **onPress** jalan → **setCount(count + 1)** → count jadi 1, React render ulang, **Count: 1** keliatan.
3. Tap lagi, count jadi 2, dan seterusnya.

Kalau mau ada tombol “Kurangi”, tambah saja **setCount(count - 1)** di **onPress** tombol lain. Itu bisa jadi latihan kecil.

---

## 4. Contoh di Project Ini

Agar teori tadi langsung keliatan di app, di project ini sudah disiapkan tiga file contoh:

| File | Isi singkat |
|------|------------------|
| **`components/praktikum/Header.tsx`** | Header dengan props **title** dan **subtitle** (optional). |
| **`components/praktikum/CustomButton.tsx`** | Tombol dengan props **title**, **onPress**, **variant** (primary/secondary). |
| **`components/praktikum/CardWithProps.tsx`** | Card dengan props **title** dan **subtitle** (optional). |
| **`components/praktikum/Counter.tsx`** | Component dengan **useState** buat counter plus tombol Tambah/Kurangi. |
| **`components/praktikum/HelloFunctional.tsx`** | Functional component paling sederhana (tanpa props). |

Cara lihat hasilnya: jalankan app (misalnya **`npm start`** lalu pilih Android/Web/iOS), lalu buka tab **Praktikum**. Di sana ditampilkan **Target Pelajaran Hari Ini** (Header, Card, CustomButton, Counter) plus contoh HelloFunctional, CardWithProps, dan Counter; bandingkan dengan kode di masing-masing file biar nyambung sama penjelasan di atas.

### 4.1 Penjelasan File & Halaman yang Dibuat

Berikut penjelasan tiap file dan halaman yang dipakai di praktikum ini—biar kamu enggak cuma jalanin, tapi juga ngerti “file ini ngapain” dan “halaman ini isinya apa”.

---

#### **`doc/PRAKTIKUM_02_Functional_Component.md`** (file ini)

Ini **dokumen panduan** praktikum: berisi teori Functional Component, Props, dan State (useState), plus contoh kode dan latihan. Dibuat supaya kamu bisa baca sambil praktik; tidak dijalankan oleh app, cuma buat referensi.

---

#### **`components/praktikum/Header.tsx`**

**Fungsi:** Component **Header** reusable — menampilkan judul dan subtitle (opsional) di bagian atas.

**Isi singkat:** Menerima props **title** (wajib) dan **subtitle** (opsional). Dipakai di halaman Praktikum di blok "Target Pelajaran Hari Ini" dan di section "✓ Header". Contoh: `<Header title="Praktikum 2" subtitle="Pemrograman Mobile II" />`.

---

#### **`components/praktikum/CustomButton.tsx`**

**Fungsi:** Component **tombol** reusable dengan props title, onPress, dan variant (primary/secondary).

**Isi singkat:** Memakai **Pressable** (bukan Button) agar styling fleksibel; variant **primary** = tombol isi warna, **secondary** = outline. Ada efek pressed (opacity). Dipakai di halaman Praktikum di section "✓ CustomButton". Contoh: `<CustomButton title="Simpan" onPress={() => ...} />`.

---

#### **`components/praktikum/HelloFunctional.tsx`**

**Fungsi:** Contoh **functional component paling sederhana**—tanpa props, tanpa state.

**Isi singkat:** Satu function **HelloFunctional** yang return satu **View** berisi **Text** “Halo, ini Functional Component!”. Styling pakai **StyleSheet** (background biru muda, teks biru). File ini dipakai buat nunjukkin “bentuk paling dasar” component: function → return JSX → export.

**Dipakai di mana:** Di halaman Praktikum, di section “1. HelloFunctional (tanpa props)”.

---

#### **`components/praktikum/CardWithProps.tsx`**

**Fungsi:** Contoh **functional component yang menerima props**.

**Isi singkat:**  
- Ada **type** **CardWithPropsType** dengan **title** (string, wajib) dan **subtitle** (string, optional).  
- Function **CardWithProps** menerima **{ title, subtitle }** lalu menampilkan **title** dan **subtitle** (kalau ada) di dalam satu **View** yang di-style kayak kartu (background abu-abu muda, padding, border radius).  
- Jadi satu component bisa dipakai berkali-kali dengan **title** dan **subtitle** yang beda-beda—sesuai konsep “props = data dari parent”.

**Dipakai di mana:** Di halaman Praktikum, di section “2. CardWithProps (dengan props)”—dipanggil beberapa kali dengan kombinasi title/subtitle yang berbeda (termasuk tanpa subtitle). Juga dipakai di section "✓ Card" (Target Pelajaran).

---

#### **`components/praktikum/Counter.tsx`**

**Fungsi:** Contoh **functional component yang pakai state** (useState).

**Isi singkat:**  
- **useState(0)** nyimpan angka **count** dan function **setCount** buat mengubahnya.  
- Tampilan: teks “Count: {count}” dan dua tombol (**Pressable**): **Kurangi** (setCount(count - 1)) dan **Tambah** (setCount(count + 1)).  
- Styling hijau muda; tombol ada efek pressed (opacity).  
- Setiap tombol diklik, state berubah → React render ulang → angka di layar ikut berubah. Cocok buat nangkep konsep “state = data yang bisa berubah di dalam component”.

**Dipakai di mana:** Di halaman Praktikum, di section "✓ Counter (useState)" (Target Pelajaran) dan "3. Counter (dengan useState)".

---

#### **`app/(tabs)/praktikum.tsx`** — Halaman Praktikum

**Fungsi:** Ini **satu halaman (screen)** yang menampilkan semua contoh di atas dalam satu layar.

**Isi singkat:**  
- Export default **PraktikumScreen** — function component yang return **ScrollView** (biar bisa scroll kalau konten panjang).  
- Di dalamnya: judul “Praktikum 2: Functional Component”, **Blok "Target Pelajaran Hari Ini"**: **Header**, lalu **✓ Header**, **✓ Card**, **✓ CustomButton**, **✓ Counter (useState)**. Di bawahnya **Contoh Lain**: **HelloFunctional**, **CardWithProps** (beberapa card), **Counter**.  
- Di bawah ada teks kecil yang ngasih tau lokasi panduan (doc/...).  
- Semua styling pakai **StyleSheet** (padding, font size, warna, margin antar section).

Jadi file ini ibarat “panggung”: dia yang **import** semua component (Header, CustomButton, CardWithProps, Counter, HelloFunctional) lalu **menyusun** tampilannya di satu halaman. Kamu bisa ubah-ubah isi section ini (misalnya nambah CardWithProps lagi atau ganti teks) buat eksperimen.

---

#### **`app/(tabs)/_layout.tsx`** — Layout Tab (perubahan)

**Fungsi:** File ini **mendefinisikan tab bar** di bawah layar (Home, Explore, Praktikum). Bagian yang **ditambah** khusus buat praktikum adalah **satu tab baru** untuk halaman Praktikum.

**Isi yang relevan:**  
- Di dalam **&lt;Tabs&gt;** ada beberapa **&lt;Tabs.Screen&gt;**; masing-masing = satu tab.  
- **Tabs.Screen** dengan **name="praktikum"** itu yang bikin tab “Praktikum” muncul: **title** di tab bar = "Praktikum", **tabBarIcon** pakai ikon topi wisuda (**graduationcap.fill** / school).  
- Karena **name="praktikum"**, Expo Router otomatis nampilin isi file **praktikum.tsx** saat tab itu dipilih.

Tanpa penambahan ini, halaman **praktikum.tsx** tetap ada di project tapi tidak muncul sebagai tab; dengan **Tabs.Screen** ini, kamu bisa buka tab “Praktikum” dan langsung lihat semua contoh.

---

**Ringkasannya:**  
- **doc/** = panduan (teori + latihan).  
- **components/praktikum/** = semua component target pelajaran + contoh: **Header**, **CustomButton**, **CardWithProps** (Card), **Counter**, **HelloFunctional**.
- **app/(tabs)/praktikum.tsx** = halaman yang menampilkan Target Pelajaran (Header, Card, CustomButton, Counter) plus contoh HelloFunctional, CardWithProps, Counter.  
- **app/(tabs)/_layout.tsx** = konfigurasi tab; di sini tab “Praktikum” didaftarkan supaya halaman tadi bisa diakses dari tab bar.

Kalau kamu bingung “ubah di file mana?”, ingat: ubah **tampilan/perilaku satu contoh** → edit file di **components/praktikum/**; ubah **urutan atau jumlah contoh di halaman** → edit **app/(tabs)/praktikum.tsx**; ubah **nama tab atau ikon** → edit **app/(tabs)/_layout.tsx**.

---

## 5. Latihan (Supaya Ilmu Nempel)

Coba kerjakan sendiri; kalau mentok, buka lagi bagian yang relevan di dokumen ini.

1. **Latihan 1 – Component dengan satu prop**  
   Buat component **Salam** yang menerima props **nama** (string) dan menampilkan teks: **"Halo, {nama}!"**. Lalu di suatu screen, panggil `<Salam nama="Budi" />` dan pastikan teksnya keluar.

2. **Latihan 2 – Prop untuk styling**  
   Di **CardWithProps**, tambah satu prop optional misalnya **warna** (string, nama warna atau kode hex). Pakai **warna** itu buat **backgroundColor** card. Contoh: `<CardWithProps title="Merah" warna="#ffcdd2" />`.

3. **Latihan 3 – Tombol Kurangi**  
   Di **Counter** yang di project sudah ada tombol “Kurangi”. Coba baca kodenya; kalau belum ada, tambahkan sendiri tombol yang memanggil **setCount(count - 1)** (dan kalau mau, batasi agar count tidak jadi negatif).

---

## 6. Ringkasan Cepat

| Konsep | Arti singkat |
|--------|----------------|
| **Functional Component** | Component yang didefinisikan dengan function dan return JSX. |
| **Props** | Data yang dikirim parent ke component; read-only di dalam component. |
| **State (useState)** | Data yang bisa berubah di dalam component; diubah lewat setter, React akan render ulang. |
| **Export default** | Supaya component bisa di-import di file lain. |

Alur yang bisa kamu ikuti ke depan: **baca teori** → **lihat contoh di `components/praktikum/`** → **ubah-ubah kode dan lihat hasil di tab Praktikum** → **kerjakan latihan**. Kalau sudah nyaman, lanjut ke materi berikutnya di slide (misalnya StyleSheet, List, Navigation) dengan pola yang sama: baca → lihat contoh → praktik.

Semoga panduan ini bantu; kalau ada yang kurang jelas, coba run kodenya sambil baca lagi baris per baris—sering itu yang bikin “oh, ternyata gitu”-nya muncul.
