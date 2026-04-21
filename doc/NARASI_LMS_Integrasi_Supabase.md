# Narasi untuk LMS — Integrasi Expo dengan Supabase (Data Mahasiswa di Cloud)

**Mata kuliah:** Pemrograman Perangkat Mobile 2  
**Topik:** Menghubungkan aplikasi Expo/React Native ke database cloud Supabase; menampilkan data tabel `mahasiswa` di tab **Cloud**.

---

Halo semua,

Pada pembaruan materi kali ini, kita melanjutkan project Expo yang sudah kalian kenal (login, tab, CRUD lokal di **Modul**). Sekarang kita tambahkan satu langkah baru: **data tidak hanya di memori HP**, tapi bisa diambil dari **internet**, tepatnya dari **database PostgreSQL** yang di-host oleh **Supabase**.

Supabase itu bisa dibayangkan seperti “backend siap pakai”: kita buat tabel di server, lalu aplikasi mobile membaca (dan nanti bisa menulis) data lewat **API** dan **kunci anon** yang aman dipakai di sisi aplikasi—asalkan aturan keamanan (**Row Level Security**) di database sudah diset dengan benar.

---

## Apa yang kalian akan dapat setelah mengikuti langkah ini?

1. Memahami **perbedaan** antara data di **tab Modul** (masih pakai `useState` di dalam app, hilang/reset sesuai perilaku demo) dan data di **tab Cloud** (diambil dari **Supabase**).
2. Tahu **di mana** melihat **Project URL** dan **API key (anon)** di dashboard Supabase, lalu memasukkannya ke file **`.env`** di laptop masing-masing.
3. Menjalankan **skrip SQL** di Supabase untuk membuat tabel **`mahasiswa`**.
4. Menjalankan app, login, membuka tab **Cloud**, dan melihat **baris data** yang sama dengan yang ada di Table Editor Supabase.
5. Memahami bahwa library **`@supabase/supabase-js`** sudah tercantum di **`package.json`**, jadi cukup **`npm install`** setelah clone—tidak perlu menginstal paket itu secara terpisah kecuali project kalian belum menyertakannya.

---

## Ringkasan: file baru vs file yang berubah (agar tidak bingung)

**File / folder baru (utama):**

| Lokasi | Fungsi singkat |
|--------|------------------|
| `lib/supabase.ts` | Membuat **satu klien** Supabase memakai URL dan anon key dari variabel lingkungan. |
| `app/(tabs)/mahasiswa-cloud.tsx` | **Halaman tab Cloud**: mengambil data dari tabel `mahasiswa`, menampilkan sebagai tabel atau kartu, ada *pull to refresh*. |
| `doc/supabase_mahasiswa.sql` | Skrip **SQL** untuk dijalankan di **SQL Editor** Supabase agar tabel dan kebijakan akses dasar terbentuk. |
| `.env.example` | **Contoh** nama variabel untuk URL dan key; **aman di-commit** ke Git. Kalian **menyalin** ini jadi file `.env` dan mengisi nilai asli sendiri. |

**File yang diubah (penting untuk diketahui):**

| Lokasi | Perubahan singkat |
|--------|-------------------|
| `package.json` / `package-lock.json` | Menambah dependency **`@supabase/supabase-js`**. |
| `app/(tabs)/_layout.tsx` | Menambah **satu tab** baru (**Cloud**) yang mengarah ke `mahasiswa-cloud.tsx`. |
| `components/ui/icon-symbol.tsx` | Menambah pemetaan ikon **awan** untuk tab Cloud. |
| `.gitignore` | Memastikan file **`.env`** (berisi rahasia) **tidak ikut ter-upload** ke GitHub. |
| `README.md` | Panduan lengkap: setup Supabase, cara lihat API key di dashboard, checklist belajar. |
| `app/(tabs)/modul.tsx` | Bisa ada penyesuaian dari versi sebelumnya (CRUD lokal); fokus materi cloud ada di tab **Cloud**. |

**Yang tidak ikut ke Git:** file **`.env`** di laptop kalian masing-masing (isi URL dan kunci asli). Itu sengaja, supaya **rahasia project** tidak bocor ke repositori publik.

---

## Langkah praktik (bisa diulang sendiri di rumah)

**A. Siapkan repository**

1. Clone atau *pull* repo terbaru dari GitHub dosen / asisten.  
2. Di folder project, jalankan **`npm install`** supaya semua dependency (termasuk Supabase JS) terpasang.

**B. Buat project di Supabase**

1. Buka [supabase.com](https://supabase.com), login, buat **New project**, tunggu status **Ready**.  
2. Buka **Settings** (ikon gerigi) → menu **API** atau **Data API** (nama bisa sedikit beda).  
3. Catat **Project URL** (`https://xxxx.supabase.co`) dan **anon public key** (biasanya JWT panjang diawali `eyJ...`). Itulah yang nanti masuk ke `.env`.  
4. Kalau dashboard menampilkan tab **Publishable / Secret** dan tab **Legacy**: untuk materi kita, yang paling sering dipakai dulu adalah **URL + anon (JWT)**. **Secret key** jangan dipakai di kode aplikasi yang di-*build* ke HP—itu untuk server atau skrip admin.

**C. Buat tabel di database**

1. Di Supabase, buka **SQL Editor** → query baru.  
2. Buka file **`doc/supabase_mahasiswa.sql`** di project kalian, salin **seluruh** isinya, tempel di SQL Editor, lalu **Run**.  
3. Cek **Table Editor** → pastikan ada tabel **`mahasiswa`** dan bisa ada beberapa baris contoh.

**D. Hubungkan project Expo ke Supabase**

1. Salin **`.env.example`** menjadi **`.env`** (nama file persis `.env`).  
2. Isi **`EXPO_PUBLIC_SUPABASE_URL`** dan **`EXPO_PUBLIC_SUPABASE_ANON_KEY`** dengan nilai dari dashboard (langkah B).  
3. Simpan file, lalu **restart** Metro (`Ctrl+C` lalu `npm start`) agar Expo membaca ulang variabel `EXPO_PUBLIC_*`.

**E. Uji di aplikasi**

1. Jalankan app (`npm start`), buka di emulator atau Expo Go.  
2. Login seperti biasa, pilih tab **Cloud**.  
3. Kalau konfigurasi benar, kalian akan melihat data dari tabel `mahasiswa`. Coba **tarik layar ke bawah** untuk *refresh*.

---

## Catatan penting untuk keamanan dan etika akademik

- **Jangan** mengunggah screenshot yang memperlihatkan **secret key** ke forum atau tugas yang bisa diakses semua orang.  
- **Jangan** meng-commit file **`.env`** ke Git. Kalau tidak sengaja ter-commit, segera hubungi dosen/asisten dan **rotate** (ganti) kunci di dashboard Supabase.  
- Anon key memang untuk client, tapi keamanan data bergantung pada **RLS** dan desain policy—itu akan kita dalami bertahap.

---

## Penutup

Dengan materi ini, kalian sudah menyentuh alur lengkap: **database di cloud → kunci & URL di `.env` → klien di `lib/supabase.ts` → tampilan di `mahasiswa-cloud.tsx`**. Silakan baca juga **`README.md`** di root project untuk penjelasan yang lebih rinci dan **tabel** pemetaan API key ke variabel `.env`.

Kalau ada yang error, cek urutan: internet hidup, URL dan anon key satu project yang sama, SQL sudah sukses, RLS mengizinkan `SELECT` untuk role `anon` (sesuai skrip pembelajaran), dan Metro sudah di-restart setelah mengubah `.env`.

Selamat mencoba, dan semangat belajarnya.

---

*Dokumen ini dapat disalin ke LMS apa adanya atau dipersingkat oleh pengajar.*
