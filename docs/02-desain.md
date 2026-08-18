# Sistem desain

Situs ini adalah "Terang" — satu dari tiga arah yang dibangun dan dibandingkan
di repo terpisah, `noodle-shop-samples`, sebelum klien memutuskan. Dokumen ini
menjelaskan sistem desain yang terpilih itu sebagai satu-satunya arah, bukan
sebagai perbandingan lagi.

## Asal

Diturunkan dari sebuah referensi landing page kafe editorial ("Little Latte
Cafe", template aura.build) yang di-brainstorm ulang dan disesuaikan penuh ke
brand identity klien (`docs/01-brief.md`). Yang diambil dari referensi itu
mekanismenya, bukan kontennya:

- Headline grotesk tebal, tracking rapat, uppercase, ukuran besar sekali.
- Layout asimetris: mark kecil + paragraf pendek di satu sisi, headline
  raksasa di sisi lain.
- **Huruf outline raksasa ditumpuk di atas foto** (`components/OutlineMark.tsx`).

### Kenapa OutlineMark itu keputusan paling penting di sini

Perlakuan huruf outline itu diisi **牛肉面馆** (Simplified, mengikuti logo
asli klien di flyer promo — lihat "Kenapa Simplified, bukan Traditional" di
bawah), bukan nama kafe referensinya. Satu gerakan ini menyelesaikan dua
masalah sekaligus:

- mandat bilingual dari brief — tanpa perlu membangun layer terjemahan penuh
  (lihat "Kenapa tidak full i18n" di bawah),
- fakta bahwa logo dari graphic designer belum ada, dan situs mungkin harus
  tayang sebelum itu datang. Karakter Cina raksasa berstroke di atas foto
  gerai menjadi identitas tanpa memerlukan logo. Saat logo asli turun, ia
  tidak bentrok dengannya — device ini hidup di lapisan visual yang berbeda
  (lihat `public/brand/README.md`).

## Kenapa Simplified, bukan Traditional

Sebelum ada materi brand asli dari klien, dokumen ini sempat menyimpulkan
Traditional Chinese (繁中) sebagai pilihan yang tepat — logikanya, brief
tidak menyebut varian dan Malaysia resminya Simplified, jadi Traditional
dibaca sebagai "penanda keaslian Taiwan". Itu asumsi, bukan fakta. Flyer
promo asli klien ("Opening this August") menulis logonya **牛肉面馆** —
Simplified, bukan Traditional (麵/館 → 面/馆), dan begitu juga semua teks
Cina lain di flyer itu. Situs ini sekarang ikut itu: Simplified, karena itu
tulisan asli klien sendiri, bukan karena alasan sinyal budaya. Kebetulan ini
juga otomatis cocok dengan Simplified yang dipakai resmi di Malaysia.

## Kenapa tidak full bilingual routing (`/en` `/zh`)

Sempat ada draf awal repo ini yang membangun routing locale penuh (`/en`,
`/zh`, dictionary per bahasa). Itu dibuang secara sadar — argumen ini berdiri
lepas dari soal Simplified/Traditional di atas. Membangun i18n penuh
(routing per bahasa, dictionary per bahasa) untuk sesuatu yang cuma perlu
jadi aksen brand adalah scope besar untuk masalah yang tidak ada. Situsnya
English-primary; 中文 muncul sebagai aksen tipografi/brand (nama, tagline,
nama hidangan di menu) lewat `OutlineMark` dan field `chinese` di
`lib/content.ts` — bukan lewat rute atau dictionary terpisah.

## Token warna

Sama seperti yang dipakai dan sudah diverifikasi kontrasnya di direction
Terang, dideklarasikan di `app/globals.css`:

| Token            | Nilai                     | Peran                                |
| ---------------- | -------------------------- | ------------------------------------ |
| `--ground`        | `#f4ede1` (Paper Cream)    | background utama                     |
| `--ground-alt`     | `#ede4d5`                  | background sekunder                  |
| `--ink`            | `#2b2320` (Ink Brown)      | teks utama                           |
| `--ink-muted`       | `#6e625a`                  | teks sekunder, caption               |
| `--accent`          | `#b5502c` (Broth Rust)     | aksi, penekanan                      |
| `--gold`            | `#c99a3f` (Warm Gold)      | garis, aksen dekoratif — **bukan teks**, lihat `docs/03-konvensi.md` |
| `--line`            | `rgba(43,35,32,.16)`       | garis rambut pemisah                 |
| `--font-display`    | Archivo 700/900             | headline                             |
| `--font-body`       | Archivo 400/500             | teks badan                           |

## Tipografi

Archivo (`next/font/google`), dua instance di `app/layout.tsx` — 700/900 untuk
display, 400/500 untuk body. Dipilih karena weight 800/900-nya punya karakter
grotesk editorial tebal yang dibutuhkan headline; alternatif seperti Inter
Tight terbaca lebih seperti tipografi UI daripada tipografi editorial.

Karakter Cina (di `OutlineMark` dan field `chinese` menu) masih memakai
fallback sistem CJK (PingFang TC / Microsoft JhengHei / Noto Sans TC) —
dipakai murni sebagai display/aksen, bukan teks badan, jadi belum butuh
subsetting webfont. Kalau nanti dipakai lebih luas, lihat catatan subsetting
di `docs/01-brief.md`.

## Yang sengaja tidak dipakai

Nol kartu ber-shadow, nol pill rounded penuh, nol CTA lingkaran. Radius yang
dipakai kecil (`rounded-lg`) dan hanya pada foto — situsnya sebagian besar
tetap hard-edged.

## Perangkat non-tipografis

Situs ini hampir seluruhnya foto dan tipografi. Yang bukan keduanya cuma empat,
dan sedikitnya jumlah itu disengaja — tiap perangkat jadi punya bobot:

| Perangkat | Dipakai di | Peran |
| --- | --- | --- |
| `OutlineMark` | Hero, sekali | 牛肉面馆 raksasa di atas foto. Keputusan paling penting di sistem ini — lihat bagian di atas. Sengaja **hanya satu instans**; pernah dicoba diulang di Footer dan justru melemahkan aslinya. |
| `DiamondGrid` | Hero, Footer | Wajik dekoratif, tone campur ink/accent/gold. Gold aman di sini justru karena ini bentuk solid, bukan teks. |
| `Character` | Story, tiap kategori menu, Signature, Footer | Ilustrasi sapi dari klien, dirender lewat CSS mask dalam warna aslinya. |
| Hover-zoom foto | `Photo` | 700ms, sengaja lambat untuk gambar besar. |

Indikator carousel di `MenuCarousel` memakai wajik, bukan titik, supaya
meminjam motif `DiamondGrid` alih-alih memperkenalkan bentuk baru — sekaligus
karena bentuk rounded penuh masuk daftar "sengaja tidak dipakai" di atas.

### Batas `Character`

Karakter datang dari klien setelah brief ditulis; lihat catatan "maskot" di
`docs/01-brief.md`. Batasnya, supaya tetap terbaca sebagai brand yang punya
kepribadian dan bukan brand kartun:

- **Tidak di Hero, tidak di Heritage.** Hero milik `OutlineMark` sendirian.
  Heritage memakai foto keluarga asli klien, dan menempeli wajah orang dengan
  kartun adalah kategori keluhan yang sama dengan lapisan gelap yang sudah
  pernah ditolak klien.
- **Warna aslinya, lewat token `--character`.** Klien memilih merah bawaan
  ilustrasinya dipertahankan. Sadari ongkosnya: `#A50A0A` terukur 6.8:1 di atas
  Paper Cream sementara `--accent` 4.35:1, jadi karakter adalah hal paling
  kontras di halaman. Hindari menaruhnya tepat di sebelah teks ber-`--accent` —
  dua merah yang beda tipis terbaca meleset, bukan berpasangan. Satu-satunya
  tempat itu terjadi sekarang adalah Signature.
- **Tidak di bawah ~72px** (`w-18`). Di bawah itu wajahnya lumer.
- **Jangan dipetakan ke makanan.** Kesebelasnya bertema sapi, mi, dan mangkuk,
  sementara kategori menunya termasuk Rice, Sides, dan Sweet & Drinks. Karakter
  per kategori dikunci by index di `MenuCategory.tsx` — dekorasi, bukan label.
- Tanpa animasi.
