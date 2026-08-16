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

Perlakuan huruf outline itu diisi **牛肉麵**, bukan nama kafe referensinya.
Satu gerakan ini menyelesaikan dua masalah sekaligus:

- mandat bilingual dari brief — tanpa perlu membangun layer terjemahan penuh
  (lihat "Kenapa tidak full i18n" di bawah),
- fakta bahwa logo dari graphic designer belum ada, dan situs mungkin harus
  tayang sebelum itu datang. Karakter Cina raksasa berstroke di atas foto
  gerai menjadi identitas tanpa memerlukan logo. Saat logo asli turun, ia
  tidak bentrok dengannya — device ini hidup di lapisan visual yang berbeda
  (lihat `public/brand/README.md`).

## Kenapa tidak full bilingual routing (`/en` `/zh`)

Sempat ada draf awal repo ini yang membangun routing locale penuh (`/en`,
`/zh`, dictionary per bahasa). Itu dibuang secara sadar. Alasannya ada di
`docs/01-brief.md`: Malaysia memakai Chinese **Simplified** secara resmi;
Traditional Chinese di situs ini adalah **penanda keaslian Taiwan**, bukan
alat komunikasi untuk pembaca lokal. Membangun i18n penuh untuk sinyal brand,
bukan kebutuhan bahasa yang nyata, adalah scope besar untuk masalah yang
tidak ada. Situsnya English-primary; 繁中 muncul sebagai aksen tipografi/brand
(nama, tagline, nama hidangan di menu) lewat `OutlineMark` dan field
`chinese` di `lib/content.ts` — bukan lewat rute atau dictionary terpisah.

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
