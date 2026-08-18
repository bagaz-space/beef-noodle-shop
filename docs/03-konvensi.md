# Konvensi kode

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · tanpa dependency
UI tambahan (tidak ada library ikon/animasi).

Tailwind v4 memakai konfigurasi berbasis CSS — tidak ada `tailwind.config.js`.
Token warna hidup sebagai CSS custom property di `app/globals.css`.

## Aturan yang tidak boleh dilanggar

**Semua teks dari `lib/content.ts`.** Tidak ada string konten yang di-hardcode di
dalam komponen. Kalau sebuah section butuh potongan copy yang belum ada, tambahkan
ke `content.ts`, jangan tulis langsung di JSX.

**Warna hanya lewat token.** Tidak ada hex di dalam komponen. Pakai
`var(--accent)`, bukan `#B5502C`. `app/globals.css` adalah satu-satunya tempat
nilai hex boleh muncul.

**Foto belum final — dan itu harus terlihat.** Semua foto di halaman ini masih
foto Unsplash sementara (`components/Photo.tsx` menempelkan label "Temp stock —
{credit}" ke setiap foto, tidak bisa dihapus tanpa sengaja). Jangan pernah
mengunci layout ke rasio aspek satu foto tertentu — pakai `object-fit: cover`
dengan tinggi yang ditentukan container (className di pemanggil `Photo`), bukan
tinggi yang ditentukan gambarnya.

**Guard placeholder tetap menyala.** `npm run build` menolak jalan selama
`CONTENT_STATUS.placeholder` di `lib/content.ts` masih `true`, atau selagi link
delivery/unit number masih placeholder — lihat `scripts/check-placeholders.mjs`.
Override sengaja: `ALLOW_PLACEHOLDER_BUILD=1 npm run build`. Jangan menonaktifkan
guard ini untuk "membereskan" build yang gagal — perbaiki datanya, bukan
guard-nya.

## Font

Dimuat sekali di `app/layout.tsx` lewat `next/font`, diikat ke
`--font-display-src` / `--font-body-src`. `app/globals.css` mengarahkan token
semantik `--font-display` / `--font-body` ke situ dengan fallback sistem
(`var(--font-display-src, ui-sans-serif, ...)`), supaya kalau font gagal
dimuat, tidak ada custom property yang undefined.

(Repo asal tempat arah ini dibangun — `noodle-shop-samples` — memuat font per
arah, bukan di root, karena ada tiga arah yang harus bisa berbeda total. Repo
ini cuma punya satu arah, jadi batasan itu tidak berlaku lagi; font boleh
dimuat di root layout.)

## Struktur

```
app/
  layout.tsx      font + metadata + <html>
  globals.css      token warna + reset
  page.tsx          satu-satunya halaman, merangkai semua section
components/          semua section + primitif dekoratif
lib/
  content.ts         SATU sumber semua copy, harga, jam, dll.
  menuPhotos.ts       URL foto per item menu, dikunci nama item (implementation detail, bukan content)
docs/                 brief, sistem desain, konvensi (dokumen ini)
scripts/              build guard placeholder
public/
  menu/                foto hidangan
  story/               foto + video origin story dari klien
  character/           11 ilustrasi sapi dari klien
```

## Aset di `public/`

- **Huruf kecil, kebab-case, tanpa spasi.** Windows tidak peduli soal
  kapitalisasi, Vercel jalan di Linux yang case-sensitive — nama yang salah
  akan resolve mulus di lokal dan baru 404 setelah deploy. Spasi juga harus
  jadi `%20` di URL. Aset karakter dari klien datang bernama
  `BEEF NOODLE characters-01.svg`; keduanya kena.
- **Dinamai menurut isinya, bukan nomornya.** `chef.svg`, bukan
  `character-04.svg`.
- **Jangan pernah taruh file sumber di `public/`.** Isinya disajikan apa adanya
  ke internet dan repo ini publik. File `.ai` klien tinggal di
  `konten-baru/karakter/`, yang sudah gitignored. Urutannya juga penting:
  sekali file itu masuk satu commit, ia menetap di riwayat Git apa pun yang
  dilakukan commit berikutnya.
- **`public/character/*.svg` hanya dirujuk lewat `components/Character.tsx`**,
  tidak pernah lewat `<img>` langsung. `<img>` akan mengunci warnanya di hex
  bawaan file dan lepas dari sistem token; `Character` mewarnainya lewat CSS
  mask sehingga warnanya tetap datang dari token.
- **Video autoplay — atas permintaan klien, dan ada ongkosnya.**
  `public/story/origin-story.mp4` berukuran 6,3MB, direkam vertikal 720x1280
  untuk sosial media, diputar di `components/OriginVideo.tsx`. Diputar di rasio
  aslinya 9:16, tidak pernah di-crop: crop ke 16:9 hanya menyisakan ~31% frame
  dan memotong subtitle yang terbakar di sepertiga bawahnya.

  Tiga konsekuensi yang saling terkait, jangan diubah salah satunya sendirian:
  **wajib `muted`** (semua browser memblokir autoplay bersuara), **6,3MB
  terunduh di tiap page load** termasuk di HP — `preload="none"` tidak mungkin
  berbarengan dengan autoplay, dan **`loop` wajib** karena di desktop tidak ada
  kontrol untuk mengulang.

  `controls` hanya muncul di bawah 1024px. Karena itu atribut HTML dan bukan
  class, breakpoint-nya dibaca lewat JS — itu satu-satunya alasan komponen ini
  `"use client"`.

  **`prefers-reduced-motion` di sini bukan pemanis.** WCAG 2.2.2 meminta gerak
  yang berjalan lebih dari lima detik bisa dihentikan, sementara di desktop
  video ini tidak punya kontrol terlihat sama sekali. Untuk yang menyalakan
  preferensi itu di OS-nya: tidak autoplay, dan controls dimunculkan.
- Empat dari 11 karakter belum dipakai (`bowl-head`, `dive`, `paper-plane`,
  `takeaway`). Sengaja disimpan sebagai opsi untuk klien, dan sudah terdaftar di
  union `CharacterName`.

Tidak ada lagi pemisahan `app/<slug>/_components/` — itu pola dari repo
perbandingan tiga-arah. Di sini semua komponen sudah "shared" karena cuma ada
satu halaman.

## Aksesibilitas

Bukan tambahan belakangan — ini restoran, pengunjungnya termasuk kakek-nenek
(brief menyebut "multi-generational groups").

- Kontras teks badan minimal 4.5:1 terhadap ground-nya.
- **Temuan yang sudah diukur pada palette ini**: `--gold` (`#c99a3f`) di atas
  `--ground`/`--ink` cuma dapat kontras ~2.2:1 — **gagal AA untuk teks**,
  termasuk teks kecil. Batasi `--gold` untuk garis rambut, border, atau glyph
  dekoratif besar (≥24px) — jangan pernah untuk label/angka kecil yang harus
  terbaca sebagai teks. `--accent` (`#b5502c`) di atas `--ground` ~4.35:1 —
  lolos ambang teks besar saja, marjinal untuk teks kecil.
- Harga (kalau nanti ditampilkan lagi) tidak boleh hanya dibedakan lewat warna.
- Target sentuh minimal 44×44px. Banyak orang membuka ini sambil berdiri di mal.

## Menambah section baru

1. Tambahkan copy-nya ke `lib/content.ts` dulu.
2. Bangun komponennya di `components/`, ambil semua teks dari `content.ts`.
3. Render section itu di `app/page.tsx`.
4. Kalau butuh foto, pakai `<Photo>` (`components/Photo.tsx`) supaya label
   "Temp stock" otomatis ikut, sampai foto asli tersedia.
