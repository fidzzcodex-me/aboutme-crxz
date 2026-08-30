# about me ( fidzzcodex )

Portfolio developer personal. Next.js App Router, JavaScript, tanpa TypeScript.

## Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Build & deploy

```bash
npm run build
```

Deploy ke Vercel seperti biasa (`vercel` CLI atau connect repo lewat dashboard). Tidak ada environment variable yang wajib diisi — tanpa konfigurasi apa pun, project langsung jalan.

## Edit konten

Semua konten ada di `data/`, tidak perlu sentuh component:

- `data/profile.js` — nama, role, tagline, about, kontak, GitHub username, metadata SEO
- `data/projects.js` — daftar project di Selected Projects + Currently Building
- `data/stack.js` — tech stack
- `data/timeline.js` — My Journey
- `data/build-categories.js` — 4 kategori di What I Build
- `data/nav.js` — link navbar

### Menambahkan GitHub Activity

Isi `profile.github.username` di `data/profile.js`. Kalau kosong, section Activity otomatis menampilkan empty state, tidak error.

### Mengaktifkan pengiriman email dari form contact

Default: pesan yang masuk lewat form contact hanya di-log ke console server (aman untuk development, tidak butuh setup apa pun).

Untuk benar-benar mengirim email, daftar di [Resend](https://resend.com), lalu isi di environment variables (lihat `.env.example`):

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=email-tujuan@example.com
```

Provider bisa diganti tanpa mengubah frontend — cukup edit `lib/email.js`.

## Catatan jujur soal status build

Project ini dibuat di lingkungan tanpa akses internet, jadi `npm install` dan `npm run build` **belum pernah benar-benar dijalankan** oleh saya. Yang sudah saya lakukan:

- Cek manual semua path import (`@/...`) memang menunjuk ke file yang ada
- Cek semua nama icon Font Awesome valid dan diimpor dari package yang benar (solid vs brands)
- Cek `"use client"` terpasang di semua component yang pakai hooks/event handler
- Menemukan dan memperbaiki bug nyata: `jsconfig.json` sempat tidak ada, yang akan membuat alias `@/*` gagal resolve total

Yang **belum** bisa saya pastikan karena tidak bisa menjalankan build:
- Tidak ada jaminan 100% bebas typo runtime atau edge case Next.js App Router yang cuma muncul saat build sungguhan

Jalankan `npm run build` di mesin Anda dulu sebelum deploy ke production. Kalau ada error, kirim pesan errornya, saya perbaiki.

## Struktur

## Halaman 3D Robot (`/robot`)

Robot 3D interaktif dibangun dari primitive geometries Three.js (bukan model import dari asset store), lengkap dengan idle animation (breathing, blink, head-turn), drag-to-rotate, dan text-to-speech pakai `SpeechSynthesis` browser native.

- Auto-intro saat halaman dibuka, baca `profile.tagline`
- Input teks — apa pun yang diketik akan dibacakan robotnya
- Gratis, tanpa API key — kualitas suara tergantung browser/OS user (Web Speech API bawaan)

**Keterbatasan yang perlu diketahui:**
- Web Speech API tidak mengekspos audio stream, jadi gerakan mulut/kepala saat bicara bukan lipsync asli dari amplitude suara — itu animasi pulse yang disinkronkan ke event start/end bicara. Cukup meyakinkan secara visual, tapi bukan analisis audio real.
- Kualitas suara TTS tergantung device (biasanya lebih natural di macOS/iOS dibanding Windows/Android).
- Model robotnya geometric/low-poly, dirakit dari kode sendiri (`lib/robot-builder.js`) — bukan file 3D yang diimpor dari mana pun.

Akses lewat navbar ("3D Robot"), command palette (Ctrl+K → "Open 3D Robot"), atau langsung ke `/robot`.


```
app/            layout, page, api/contact, 404, sitemap
components/     Navbar, Footer, ParticleField, CommandPalette, ProjectModal, Toast, Reveal
sections/       Hero, About, WhatIBuild, Stack, Projects, CurrentlyBuilding, Timeline, Activity, Contact
data/           semua konten yang bisa diedit
lib/            hooks, theme context, github fetch, email adapter, rate limiter
```
