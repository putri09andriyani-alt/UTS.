# Panduan Praktikum: Integrasi Supabase & Tab “Cloud” (Expo)

**Tujuan singkat:** Mahasiswa bisa memahami apa yang ditambahkan di project, mengapa dipakai, dan langkah apa saja yang harus dilakukan supaya fitur data mahasiswa dari database cloud (Supabase) jalan di app. Panduan ini bisa diulang dari awal mengikuti urutan langkah.

---

## 1. Apa yang kamu pelajari hari ini?

- **Modul (tab Modul):** Data mahasiswa masih bisa disimpan di HP saja pakai state React (`useState`) — ini yang sudah ada sebelumnya (**CRUD lokal**).

- **Cloud (tab Cloud):** Ditambahkan cara **membaca data dari internet**, disimpan di server **PostgreSQL** lewat layanan **Supabase**. Jadi kamu belajar satu alur lengkap: buat tabel di cloud → isi kunci di project → app Expo memanggil API Supabase → tampil di layar.

**Bedanya ringkas:** **Modul** = data di memori app; **Cloud** = data di database online (selama tabel dan kunci sudah benar).

---

## 2. Langkah demi langkah (bisa diulang dari awal)

Ikuti urutan ini. Kalau salah satu langkah gagal, cek bagian **tips** di bawah.

### Langkah A — Siapkan project di komputer

1. **Clone** repo dari GitHub (atau **pull** kalau sudah pernah clone):

   ```bash
   git clone <URL-repo-dosen>
   cd <nama-folder-project>
   ```

   atau di folder yang sudah ada:

   ```bash
   git pull
   ```

2. **Install dependency:**

   ```bash
   npm install
   ```

3. Pastikan **Node.js (LTS)** dan **npm** sudah terpasang.

---

### Langkah B — Buat project Supabase (akun gratis)

1. Buka [supabase.com](https://supabase.com), login, buat **New project**.
2. Tunggu sampai project **siap** (beberapa menit).
3. Buka **Settings → API**, catat:
   - **Project URL** (bentuk `https://xxxx.supabase.co`)
   - **anon public key** (JWT panjang) — ini yang aman dipakai di app **asalkan** aturan keamanan di database (**RLS**) sudah diset dengan benar untuk pembelajaran.

---

### Langkah C — Buat tabel `mahasiswa` di database

1. Di dashboard Supabase, buka **SQL Editor**.
2. Buat **query baru**.
3. Buka file **`doc/supabase_mahasiswa.sql`** di project kamu, **salin semua isinya**, tempel di SQL Editor, klik **Run**.
4. Kalau sukses, cek **Table Editor** → schema **public** → harus ada tabel **`mahasiswa`** (kolom seperti `id`, `nim`, `nama`, `prodi`, `kelas`, dll.).
5. Kalau ada contoh `INSERT` di skrip, bisa muncul beberapa baris data awal — itu **normal**.

---

### Langkah D — Hubungkan project Expo ke Supabase (file `.env`)

1. Di folder project, salin file **`/.env.example`** jadi **`/.env`** (nama file persis `.env`).
2. Isi **`/.env`** dengan nilai dari dashboard Supabase (minimal **URL** dan **anon key** — lihat komentar di dalam `.env.example`).

   **Penting:** File **`.env`** berisi **rahasia**. Di project ini **`.env` tidak ikut ke Git** (supaya tidak bocor ke GitHub). Jadi **setiap mahasiswa wajib buat sendiri** `.env` di laptopnya.

3. Setelah mengubah `.env`, **restart** server Expo: hentikan (**Ctrl+C**) lalu jalankan lagi:

   ```bash
   npm start
   ```

---

### Langkah E — Jalankan app dan coba tab Cloud

1. Jalankan:

   ```bash
   npm start
   ```

2. Buka app di **Expo Go** atau **emulator**.
3. **Login** (demo) → masuk ke tab utama.
4. Tap tab **Cloud** (ikon awan).
5. Kalau semua benar, muncul **daftar mahasiswa** dari tabel `mahasiswa`.
6. Coba **tarik layar ke bawah** (*pull to refresh*) atau tombol **Muat ulang** untuk ambil data lagi dari server.

---

### Langkah F — Kalau error, cek hal ini

- Apakah **SQL** sudah di-**Run** tanpa error?
- Apakah **nama tabel** persis **`mahasiswa`**?
- Apakah **`.env`** sudah benar dan **Expo sudah di-restart**?
- Apakah HP/laptop **terhubung internet**?
- Di Supabase, untuk pembelajaran biasanya ada **policy** agar role **anon** bisa membaca data — sesuai skrip di **`doc/supabase_mahasiswa.sql`**. Kalau policy dihapus atau RLS terlalu ketat, query dari app bisa **ditolak**.

---

## 3. File baru — apa fungsinya? (bahasa santai)

| File / folder | Penjelasan mudah |
|-----------------|------------------|
| **`lib/supabase.ts`** | “Pintu masuk” ke Supabase. Di sini dibuat **satu klien** Supabase pakai URL + anon key dari `.env`. Halaman lain (misalnya tab Cloud) tinggal **import** dari sini, tidak perlu tulis URL panjang di setiap file. |
| **`app/(tabs)/mahasiswa-cloud.tsx`** | Layar tab **Cloud**. Isinya: panggil Supabase baca tabel `mahasiswa`, tampilkan sebagai **tabel** (layar lebar) atau **kartu** (HP sempit), ada loading, pesan error, *pull to refresh*, dan tombol **Muat ulang**. |
| **`doc/supabase_mahasiswa.sql`** | Skrip SQL untuk ditempel di **SQL Editor** Supabase. Fungsinya: buat tabel, index, trigger `updated_at`, **RLS + policy** contoh untuk pembelajaran, dan bisa ada data contoh. |
| **`.env.example`** | Contoh isi variabel lingkungan — **tanpa rahasia sungguhan**. Aman di Git. Mahasiswa menyalin jadi **`.env`** lalu mengisi sendiri. Di dalamnya ada komentar panjang yang menjelaskan tiap variabel. |

**Catatan:** File **`.env`** kamu buat **sendiri** di lokal; **tidak ada** di repo.

---

## 4. File yang diubah — kenapa diubah?

| File | Perubahan apa? (santai) |
|------|-------------------------|
| **`package.json`** / **`package-lock.json`** | Ditambah library **`@supabase/supabase-js`** supaya app bisa ngomong dengan API Supabase dari kode JavaScript/TypeScript. |
| **`app/(tabs)/_layout.tsx`** | Ditambah **satu tab baru** di bottom bar: nama route `mahasiswa-cloud`, judul di UI **“Cloud”**, ikon awan. Tanpa edit di sini, tab Cloud **tidak muncul**. |
| **`components/ui/icon-symbol.tsx`** | Ditambah mapping ikon **`cloud.fill`** → ikon Material **`cloud`**, supaya tab Cloud punya ikon yang konsisten di Android/iOS. |
| **`.gitignore`** | Ditambah pengabaian untuk **`.env`** supaya file berisi kunci API tidak ke-upload ke GitHub. |
| **`README.md`** | Diperbarui jadi **panduan utama** untuk mahasiswa: penjelasan Modul vs Cloud, langkah setup Supabase, struktur folder, checklist belajar, dan pengingat soal rahasia `.env`. |

**File lain** yang ikut berubah di repo (misalnya **`app/(tabs)/modul.tsx`**) bergantung pada versi terakhir yang di-push: biasanya berisi penyesuaian isi atau format agar selaras dengan materi; intinya **tab Modul** tetap untuk **CRUD lokal**, berbeda fungsi dengan **tab Cloud**.

---

## 5. Ringkasan satu kalimat per fitur

| Istilah | Satu kalimat |
|---------|----------------|
| **Supabase** | Database + API di cloud. |
| **`.env`** | Tempat menyimpan URL dan kunci tanpa menulis langsung di kode. |
| **`lib/supabase.ts`** | Satu tempat bikin koneksi. |
| **`mahasiswa-cloud.tsx`** | Layar yang menampilkan hasil baca database. |
| **`supabase_mahasiswa.sql`** | Cara membuat tabel di server dengan konsisten. |
| **`README.md`** | Peta belajar untuk dibaca berulang kali. |

---

## 6. Checklist “sudah berhasil” untuk mahasiswa

- [ ] `npm install` dan `npm start` jalan **tanpa error**.
- [ ] Tabel **`mahasiswa`** terlihat di Supabase **Table Editor**.
- [ ] File **`.env`** sudah diisi dan **Expo sudah di-restart**.
- [ ] Tab **Cloud** menampilkan data (bukan hanya pesan error atau kosong tanpa alasan).
- [ ] Paham: **Modul** = lokal, **Cloud** = data dari Supabase.

---

*Dokumen ini melengkapi **`doc/NARASI_LMS_Integrasi_Supabase.md`** dan **`README.md`** di root project.*
