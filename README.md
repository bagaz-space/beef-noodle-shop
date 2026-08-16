# The Beef Noodle Shop

Situs untuk **The Beef Noodle Shop 牛肉麵**, restoran bakmi sapi Taiwan modern
di Paradigm Mall, Petaling Jaya, Malaysia.

Desainnya ("Terang") diadaptasi dari repo perbandingan tiga-arah
[`noodle-shop-samples`](../noodle-shop-samples) — klien memilih arah ini,
jadi repo ini adalah tempat arah itu dibangun sebagai situs produksi,
lepas dari dua arah lain yang tidak dipilih.

```bash
npm install
npm run dev
```

## Status

| Bagian                | Status                                                        |
| ---------------------- | -------------------------------------------------------------- |
| Struktur & halaman     | selesai — satu halaman, 9 section (lihat `app/page.tsx`)        |
| Token warna & tipografi | selesai — Archivo, palette dari brief                          |
| Konten                 | **placeholder** — menu, harga, jam, unit number, link delivery belum final |
| Foto                   | **belum ada** — semua foto masih Unsplash sementara, dilabeli "Temp stock" langsung di halaman |
| Font 繁中               | fallback sistem — belum di-subset webfont                       |

## Pengaman build

`npm run build` **menolak jalan** selama situs masih membawa konten placeholder.

```
✖ Refusing to build: the site is still carrying placeholder content
    CONTENT_STATUS.placeholder is still true
    GrabFood link still points at #
    ...
```

| | |
| --- | --- |
| Kapan jalan | `prebuild`, jadi hanya pada `npm run build` — `npm run dev` tidak tersentuh |
| Cek manual | `npm run check:placeholders` |
| Lolos sengaja | `ALLOW_PLACEHOLDER_BUILD=1 npm run build` |
| Skrip | `scripts/check-placeholders.mjs` |

## Konten asli yang sedang masuk

`konten-baru/` — folder lokal (di-gitignore, tidak ikut ke GitHub karena
repo ini publik dan isinya konten bisnis mentah) tempat menaruh menu, harga,
jam, link delivery, cerita bisnis, dan foto asli sebelum diolah ke
`lib/content.ts` dkk. Kalau folder itu ada isinya, cek `konten-baru/README.md`
dulu sebelum menganggap `lib/content.ts` sebagai sumber paling baru.

## Yang masih ditunggu dari klien

1. **Foto.** Penentu terbesar hasil akhirnya — ruangan 30-pax, mangkuk, uap,
   proses masak, tampak depan gerai saat neon menyala, foto arsip 1980-an
   kalau keluarga pendiri punya (aset paling berharga di situs manapun untuk
   restoran dengan cerita warisan seperti ini).
2. **Menu dan harga sebenarnya.** Yang ada sekarang karangan — lihat
   `lib/content.ts`, semuanya ditandai `PLACEHOLDER`.
3. **Jam buka, nomor unit persis di Paradigm Mall, link merchant** GrabFood /
   ShopeeFood / Foodpanda.
4. **Logo final** dari graphic designer, kalau/pas sudah ada — lihat
   `public/brand/README.md` untuk kenapa situs ini tidak menunggu itu untuk
   tayang.

## Bacaan lanjutan

- [`docs/01-brief.md`](docs/01-brief.md) — ringkasan brief klien dan apa yang tidak dijawabnya
- [`docs/02-desain.md`](docs/02-desain.md) — sistem desain: asal, token, tipografi, kenapa bukan i18n penuh
- [`docs/03-konvensi.md`](docs/03-konvensi.md) — konvensi kode dan aksesibilitas
