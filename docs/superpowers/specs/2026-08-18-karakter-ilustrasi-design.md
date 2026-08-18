# Sistem karakter ilustrasi

Klien mengirim 11 ilustrasi sapi ke `public/character/` dan memintanya dipakai
untuk menambah kesan **"fun energy"** — kelanjutan dari feedback yang sama yang
melahirkan `light-refresh`:

> "I prefer the light version as it goes better with our bright modern looking
> restaurant ID. I wonder if we can incorporate more of the 'fun energy' feel."

`light-refresh` menjawab bagian "light"-nya dengan membuang dua lapisan
penggelap foto. Dokumen ini menjawab bagian "fun energy"-nya.

## Aset

Sebelas SVG, `viewBox="0 0 500 500"`, satu warna (`#A50A0A` / `#A31E21`), path
solid tanpa gradient dan tanpa raster tertanam. Ekspor Adobe Illustrator 30.6.

Semuanya sudah **dinormalisasi dengan benar oleh desainernya**: `getBBox()`
menunjukkan sisi terpanjang tiap karakter tepat 400px di dalam kotak 500,
margin 50px, terpusat. 09 dan 10 tampak lebih kecil bukan karena salah ekspor
— komposisinya memang melebar (266px dan 259px tinggi). Tidak ada pekerjaan
normalisasi.

| # | Isi | Nama file baru |
| --- | --- | --- |
| 01 | sapi bersandar santai | `lounge.svg` |
| 02 | sapi membawa tas takeaway | `takeaway.svg` |
| 03 | sapi terbelit mi | `noodle-wrap.svg` |
| 04 | sapi koki, topi chef + centong di bahu | `chef.svg` |
| 05 | sapi memeluk sumpit raksasa | `chopsticks.svg` |
| 06 | sapi menyelam | `dive.svg` |
| 07 | sapi menyeruput dari mangkuk pakai sumpit | `slurp.svg` |
| 08 | sapi mengintip dari balik mangkuk berasap | `bowl.svg` |
| 09 | sapi dengan mangkuk di kepala, mi menjuntai | `bowl-head.svg` |
| 10 | sapi menunggangi pesawat kertas | `paper-plane.svg` |
| 11 | kepala sapi mengedip, tangan di dagu | `wink.svg` |

Dinamai menurut isinya, bukan nomornya: `character-04.svg` tidak memberi tahu
apa pun ke orang yang membuka repo ini enam bulan lagi.

Nama aslinya (`BEEF NOODLE characters-04.svg`) **wajib** diganti, bukan
sekadar sebaiknya. Ada spasi — yang harus jadi `%20` di URL — dan huruf
kapital. Windows tidak peduli soal kapitalisasi, tapi Vercel jalan di Linux
yang case-sensitive, jadi ini kelas bug yang lolos sepenuhnya di lokal dan
baru muncul sebagai 404 setelah deploy.

## Keputusan yang sudah diambil

**Kepadatan: sedang, 5 titik.** Di bawah itu terasa belum menjawab permintaan
klien; di atas itu situs berubah jadi brand kartun dan posisi "sudah ada
berpuluh tahun, terpercaya" dari brief-nya ikut hilang.

**Digantung ke makna, bukan ke slot.** Rencana awal — satu karakter per
kategori menu — dibatalkan. Kesebelas karakter bertema sapi, mi, dan mangkuk,
sementara kategorinya Beef Noodles, Rice, Sides, dan **Sweet & Drinks**. Tidak
ada satu pun yang terbaca sebagai nasi, sayur, apalagi es serut. Memaksakan
satu per kategori berarti tiga dari empatnya jadi sapi acak penambal slot —
persis "gimmick" yang dilarang brief. Kepadatannya benar, cantolannya yang
salah.

## Konflik dengan brief — dan penyelesaiannya

`docs/01-brief.md:45` memuat di daftar DON'T:

> mengandalkan kekacauan, gimmick, atau **maskot**

Kata kuncinya **"mengandalkan"**. Larangannya adalah menjadikan maskot sebagai
tumpuan identitas, bukan larangan mutlak terhadap ilustrasi — dan yang
mengirim karakter ini adalah kliennya sendiri, jadi klien sedang menimpa
brief-nya sendiri. Itu haknya.

Tapi tidak boleh ada situs tayang yang bertentangan dengan dokumen brief-nya.
Sebagai bagian dari pekerjaan ini, `01-brief.md` diperbarui agar mencatat
karakter sebagai perangkat yang disahkan **dengan batasnya**: dekoratif,
kepadatan rendah, tidak pernah menggantikan mark, tidak pernah masuk hero.
Batas itulah yang menjaga "mark-nya harus tenang dan bisa dipercaya" di baris
35 tetap benar.

## Pewarnaan: CSS mask

Merah bawaan `#A50A0A` bukan warna sistem ini. Kontrasnya di atas Paper Cream
**6.8:1** — lebih kuat dari `--accent` Broth Rust yang 4.35:1. Dipasang apa
adanya, karakter akan berteriak lebih keras daripada aksen brand-nya sendiri,
sekaligus menambah warna kelima di luar token.

Tiga cara mewarnai ulang ditimbang:

| Cara | Putusan |
| --- | --- |
| `<img src>` | Warna terkunci di hex bawaan. Melanggar aturan tokens-only `docs/03-konvensi.md`. |
| Inline React (pola `components/icons.tsx`) | Kontrol penuh lewat `currentColor`, tapi path data 6–15KB per karakter berarti ~50KB masuk HTML di **setiap** page load, tidak ter-cache. |
| **CSS mask** | Dipilih. |

CSS mask hanya membaca kanal alpha, jadi hex bawaan di dalam file menjadi
tidak relevan — **file SVG tidak perlu disentuh sama sekali**, cukup di-rename.
Warnanya datang dari token lewat `background`, filenya tetap eksternal dan
ter-cache terpisah dari HTML, dan tidak ada JavaScript yang terlibat.
Diverifikasi di Chromium: bentuknya identik dengan render aslinya, dan
`--accent`, `--ink`, maupun `--gold` semuanya bekerja.

Warna default **`--accent`**. `--ink` menghasilkan garis yang lebih tegas tapi
membuat area solid (mangkuk di `bowl`, tas di `takeaway`) jadi gumpalan nyaris
hitam yang berat. Warna dilewatkan sebagai prop supaya tiap penempatan bisa
memilih.

**Ukuran minimum ~72px.** Di 64px detail wajah mulai lumer. Ukuran nyamannya
96–140px.

Dua warna dalam satu karakter (garis `--ink` + isian `--accent`) secara teknis
mungkin — area solidnya path terpisah — tapi harus diidentifikasi manual per
file dan rapuh terhadap ekspor ulang. **Di luar cakupan.**

## Komponen

```tsx
// components/Character.tsx — server component, tanpa "use client"
export function Character({ name, className, tone = "var(--accent)" }: {
  name: CharacterName;
  className?: string;
  tone?: string;
}) {
  const url = `/character/${name}.svg`;
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        background: tone,
        maskImage: `url("${url}")`, WebkitMaskImage: `url("${url}")`,
        maskSize: "contain", WebkitMaskSize: "contain",
        maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat",
      }}
    />
  );
}
```

Prefix `-webkit-` disertakan untuk Safari, yang masih membutuhkannya untuk
`mask-image`.

### Penanganan kegagalan

Mask yang gagal dimuat **tidak menghasilkan error**. Elemennya tetap ada,
ukurannya tetap benar, tapi tidak terlihat sama sekali — tidak ada 404 yang
mencolok di UI, tidak ada peringatan di konsol. Itu kelas bug yang bisa lolos
ke produksi tanpa siapa pun sadar.

Penjaganya: `CharacterName` adalah union type yang diturunkan dari satu daftar
konstan di file yang sama, sehingga salah ketik nama gagal saat compile, bukan
saat dilihat pengunjung. Keberadaan filenya sendiri dijamin oleh screenshot
Playwright di tahap verifikasi — karakter yang hilang akan terlihat sebagai
lubang kosong.

## Penempatan

| | File | Posisi | Karakter | Ukuran | Warna |
| --- | --- | --- | --- | --- | --- |
| 1 | `Story.tsx` | Blok kiri baris atas, di atas eyebrow `nav.story` | `chef` | ~120px | `--accent` |
| 2 | `MenuList.tsx` | Di samping eyebrow `nav.menu`, sebelum tumpukan `.mt-10` | `bowl` | ~140px | `--accent` |
| 3 | `Signature.tsx` | Kanan headline "4 Categories. / 9 Dishes" | `slurp` | ~110px | **`--ink`** |
| 4 | `InfoStrip.tsx` | Tepi strip, dekat blok Delivery | `takeaway` | ~96px | `--accent` |
| 5 | `Footer.tsx` | Sel yang sama dengan `DiamondGrid`, di atasnya | `noodle-wrap` | ~160px | `--ink` |

Nomor 2 sengaja **sekali saja** untuk seluruh section Menu, bukan per kategori
— lihat alasannya di "Keputusan yang sudah diambil".

Nomor 3 memakai `--ink`, bukan accent seperti sisanya. Headline di sebelahnya
sudah mewarnai angka **4** dan **9** dengan `--accent` sebagai satu-satunya
percikan warna di section itu (`Signature.tsx`, lihat komentarnya di sana).
Menaruh karakter accent 110px tepat di sampingnya membuat percikan itu
kehilangan artinya — dua aksen bersebelahan saling meniadakan.

Nomor 5 memakai `--ink` karena footer sudah punya bobot visual berat dan brief
menghendaki penutup yang tenang; ini juga alasan `DiamondGrid` di footer tidak
diberi tone accent.

**Nomor 4 adalah yang paling lemah dan boleh dibuang.** InfoStrip itu strip
fungsional empat kolom dengan ikon 20px; karakter 96px di dalam satu selnya
akan merusak ritme. Rencananya ditempel di tepi strip, bukan menggantikan
ikon. Kalau screenshot menunjukkan hasilnya berantakan, buang — empat titik
yang kuat lebih baik daripada lima dengan satu yang dipaksakan.

Hero **tidak** mendapat karakter. Di sana `OutlineMark` 牛肉面馆 adalah
keputusan desain paling penting di sistem ini (`docs/02-desain.md`), dan
menaruh kartun di sebelahnya akan melemahkannya.

Heritage juga tidak. Fotonya foto keluarga asli milik klien; menempelkan
kartun di atasnya adalah kategori keluhan yang sama dengan lapisan gelap yang
sudah pernah ditolak klien.

## Aksesibilitas dan gerak

Semua karakter `aria-hidden="true"` dan tanpa teks alternatif — murni
dekoratif, sama seperti `DiamondGrid`. Tidak ada informasi yang hanya
tersampaikan lewat karakter, jadi pembaca layar tidak kehilangan apa pun.

Tidak ada animasi. Rencana `light-refresh` sudah menutup pintu `@keyframes`,
dan karakter bergerak akan langsung menabrak larangan gimmick di brief. Kalau
klien meminta lebih setelah melihat versi diam ini, itu putaran terpisah.

Karena dekoratif, ambang kontras 4.5:1 tidak berlaku. `--gold` pun secara
teknis boleh dipakai di sini dengan alasan yang sama seperti `DiamondGrid` —
tapi tidak dipakai di rencana ini.

## Urutan kerja

**Langkah 0 mendahului commit pertama, bukan sesudahnya.**
`public/character/BEEF NOODLE characters.ai` (883KB) harus dipindah ke
`konten-baru/` yang sudah gitignored. Apa pun di `public/` bisa diunduh siapa
saja, dan repo ini publik — artinya art source klien yang bisa diedit akan
terekspos dan **tersimpan permanen di riwayat Git**. Menghapusnya di commit
berikutnya tidak menghapusnya dari riwayat.

1. Pindahkan `.ai` keluar dari `public/`.
2. Rename 11 SVG ke kebab-case semantis.
3. `components/Character.tsx` + union `CharacterName`.
4. Penempatan 1–3 dan 5.
5. Penempatan 4 (InfoStrip) — screenshot, nilai, buang kalau merusak strip.
6. Perbarui `docs/01-brief.md` dan `docs/02-desain.md`.

Kerja di branch **`characters`**, dicabang dari `light-refresh`. Keduanya
belum disetujui klien, jadi harus bisa diterima atau ditolak secara terpisah.
Commit per langkah supaya klien bisa menerima sebagian.

## Verifikasi

1. `npx tsc --noEmit` bersih.
2. `npx eslint` bersih.
3. Production build lolos (butuh `ALLOW_PLACEHOLDER_BUILD=1` selama
   `CONTENT_STATUS.placeholder` masih `true`).
4. Playwright full-page 1440px dan 390px — tiap karakter benar-benar terender,
   bukan lubang kosong.
5. `scrollWidth === clientWidth` di 390px; karakter berukuran tetap adalah
   penyebab umum overflow horizontal di mobile.
6. Periksa satu karakter di lebar mobile untuk memastikan tidak menyusut di
   bawah ambang ~72px.

## Di luar cakupan

- Karakter dua warna (garis + isian terpisah).
- Animasi apa pun.
- Karakter di Hero dan Heritage.
- Karakter sebagai favicon, OG image, atau ikon app delivery — semuanya
  keputusan brand terpisah dengan syarat teknis sendiri.
- Tujuh karakter yang tidak terpakai tetap disimpan di `public/character/`
  (~90KB total) sebagai opsi untuk klien, tapi tidak dirujuk kode mana pun.
