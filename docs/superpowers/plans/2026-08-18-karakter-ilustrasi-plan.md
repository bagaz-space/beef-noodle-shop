# Rencana implementasi — sistem karakter ilustrasi

Turunan dari `docs/superpowers/specs/2026-08-18-karakter-ilustrasi-design.md`.
Spec menjelaskan **apa dan kenapa**; dokumen ini **urutan eksekusinya**. Kalau
keduanya berbeda, spec yang menang — perbaiki dokumen ini, jangan diam-diam
menyimpang.

Branch: **`characters`**, sudah dicabang dari `light-refresh` di `dd336ed`.
Commit per langkah, supaya klien bisa menerima sebagian.

---

## Langkah 0 — Keluarkan file `.ai` dari `public/` *(sebelum commit apa pun)*

`public/character/BEEF NOODLE characters.ai` — 883KB art source Adobe
Illustrator milik klien.

Ini **wajib duluan**, bukan sekadar sebaiknya. `public/` disajikan apa adanya
ke internet, dan repo ini publik. Sekali file itu masuk satu commit, ia
tersimpan permanen di riwayat Git; menghapusnya di commit berikutnya tidak
menghapusnya dari riwayat. Urutan adalah satu-satunya perlindungan di sini.

```sh
mkdir -p konten-baru/karakter
mv "public/character/BEEF NOODLE characters.ai" konten-baru/karakter/
```

`/konten-baru/` sudah ada di `.gitignore`.

**Verifikasi:** `git status --short` — tidak boleh ada `.ai` di daftar
untracked. `ls public/character/` hanya berisi 11 SVG.

**Belum ada commit di langkah ini** — tidak ada perubahan yang bisa
di-commit, justru itu intinya.

---

## Langkah 1 — Rename 11 SVG

Nama sekarang mengandung spasi dan huruf kapital. Windows tidak peduli, Vercel
jalan di Linux yang case-sensitive — ini kelas bug yang lolos total di lokal
dan muncul sebagai 404 hanya setelah deploy.

```sh
cd public/character
mv "BEEF NOODLE characters-01.svg" lounge.svg
mv "BEEF NOODLE characters-02.svg" takeaway.svg
mv "BEEF NOODLE characters-03.svg" noodle-wrap.svg
mv "BEEF NOODLE characters-04.svg" chef.svg
mv "BEEF NOODLE characters-05.svg" chopsticks.svg
mv "BEEF NOODLE characters-06.svg" dive.svg
mv "BEEF NOODLE characters-07.svg" slurp.svg
mv "BEEF NOODLE characters-08.svg" bowl.svg
mv "BEEF NOODLE characters-09.svg" bowl-head.svg
mv "BEEF NOODLE characters-10.svg" paper-plane.svg
mv "BEEF NOODLE characters-11.svg" wink.svg
```

Isi filenya **tidak disentuh**. CSS mask hanya membaca kanal alpha, jadi
`fill:#A50A0A` di dalamnya tidak relevan.

**Verifikasi:** `ls public/character` — 11 file, semua huruf kecil, tanpa
spasi, tanpa `.ai`.

**Commit:** `Add the client's 11 character illustrations`

---

## Langkah 2 — Komponen `Character`

File baru `components/Character.tsx`. Server component — tidak ada state,
tidak ada `"use client"`.

```tsx
/**
 * Ilustrasi karakter dari klien, diwarnai lewat token.
 *
 * Diwarnai dengan CSS mask, bukan inline SVG atau <img>: mask hanya membaca
 * kanal alpha, jadi merah bawaan di dalam file jadi tidak relevan dan
 * warnanya bisa datang dari token — sementara filenya tetap eksternal dan
 * ter-cache terpisah dari HTML. Inline akan menambah ~50KB path data ke
 * setiap page load; <img> akan mengunci warnanya di luar sistem token.
 *
 * Dekoratif sepenuhnya, jadi aria-hidden dan tanpa teks alternatif — sama
 * seperti DiamondGrid. Tidak ada informasi yang hanya lewat sini.
 */
const CHARACTERS = [
  "bowl", "bowl-head", "chef", "chopsticks", "dive", "lounge",
  "noodle-wrap", "paper-plane", "slurp", "takeaway", "wink",
] as const;

export type CharacterName = (typeof CHARACTERS)[number];

export function Character({
  name,
  className = "",
  tone = "var(--accent)",
}: {
  name: CharacterName;
  className?: string;
  /** Token warna. Default --accent; --ink untuk tempat yang butuh tenang. */
  tone?: string;
}) {
  const url = `/character/${name}.svg`;
  return (
    <span
      aria-hidden="true"
      className={`block aspect-square ${className}`}
      style={{
        background: tone,
        maskImage: `url("${url}")`,
        WebkitMaskImage: `url("${url}")`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
```

Kenapa `CHARACTERS` sebagai array konstan lalu diturunkan jadi type, bukan
union yang ditulis tangan: satu daftar, jadi tidak bisa lepas sinkron dengan
dirinya sendiri.

Kenapa `aspect-square`: kesebelas artwork sudah dinormalisasi ke sisi terpanjang
400px di dalam kotak 500 (spec, bagian "Aset"). Kotak persegi + `contain`
karena itu menghasilkan ukuran optis yang konsisten antar karakter tanpa
penyetelan per file.

Prefix `-webkit-` untuk Safari, yang masih memerlukannya.

**Verifikasi:** `npx tsc --noEmit` bersih. Belum ada yang merender komponen ini
— itu wajar, langkah berikutnya yang memakainya.

**Commit:** `Character: token-coloured illustration primitive`

---

## Langkah 3 — Empat penempatan yang kuat

Kerjakan berurutan, screenshot setelah masing-masing. Ukuran dinyatakan
responsif dan **tidak pernah turun di bawah ~72px** di mobile — di 64px detail
wajahnya lumer (spec, "Pewarnaan").

Kelas ukurannya sudah diukur langsung di browser terhadap Tailwind v4.3.3
repo ini, bukan diasumsikan:

| | | | | |
| --- | --- | --- | --- | --- |
| `w-18` 72px | `w-20` 80px | `w-24` 96px | `w-28` 112px | `w-30` 120px |
| `w-32` 128px | `w-36` 144px | `w-40` 160px | | |

Perlu diukur karena **`w-18` dan `w-30` tidak ada di Tailwind v3** — skalanya
melompat 16 → 20 dan 28 → 32. v4 menghasilkan tiap kelipatan `--spacing`
secara dinamis, jadi keduanya valid di sini. Kalau ditulis dari ingatan v3,
keduanya akan gagal diam-diam jadi lebar 0 — karakternya hilang tanpa error
apa pun, mode kegagalan yang sama persis dengan mask yang gagal muat.

### 3a · Story — `chef`

`components/Story.tsx`, blok kiri baris atas, tepat di atas eyebrow
`nav.story`.

```tsx
<Character name="chef" className="w-20 sm:w-28 lg:w-30" />
```

### 3b · Menu — `bowl`

`components/MenuList.tsx`, di samping eyebrow `nav.menu`, sebelum tumpukan
`.mt-10`. **Sekali saja untuk seluruh section**, bukan per kategori — alasannya
di spec, "Keputusan yang sudah diambil".

```tsx
<Character name="bowl" className="w-24 sm:w-32 lg:w-36" />
```

### 3c · Signature — `slurp`, `--ink`

`components/Signature.tsx`, kanan headline "4 Categories. / 9 Dishes".

```tsx
<Character name="slurp" tone="var(--ink)" className="w-20 sm:w-28" />
```

`--ink`, bukan accent. Headline di sebelahnya sudah mewarnai angka **4** dan
**9** dengan `--accent` sebagai satu-satunya percikan warna di section itu.
Karakter accent 110px tepat di sampingnya membuat percikan itu kehilangan arti.

### 3d · Footer — `noodle-wrap`, `--ink`

`components/Footer.tsx`, di sel yang sama dengan `DiamondGrid` (baris 43), di
atasnya.

```tsx
<Character name="noodle-wrap" tone="var(--ink)" className="w-28 sm:w-40" />
```

Footer sudah berbobot visual berat dan brief menghendaki penutup yang tenang —
alasan yang sama kenapa `DiamondGrid` di footer tidak diberi tone accent.

**Verifikasi tiap sub-langkah:** screenshot Playwright section terkait di
1440px, lalu di 390px. Karakter harus benar-benar terender — mask yang gagal
menghasilkan elemen tak terlihat **tanpa error apa pun di konsol**, jadi mata
adalah satu-satunya penjaga di sini.

**Commit:** satu per sub-langkah, mis. `Story: chef character above the eyebrow`

---

## Langkah 4 — InfoStrip `takeaway` — DICOBA, DIBUANG

**Hasil: tidak jadi dikirim.** Dipasang di dalam blok Delivery, diukur, dan
gagal dua dari tiga kriteria yang ditulis di bawah:

| Kriteria | Baseline | Dengan karakter | |
| --- | --- | --- | --- |
| Kolom sejajar di 1440px | semua `top=41` | semua `top=41` | lolos |
| Tinggi strip di 1440px | 197px | 241px | **gagal** |
| Tinggi strip di 390px | 479px | 575px (+20%) | **gagal** |

Screenshot mengonfirmasi angkanya: strip itu satu baris rapi berisi empat blok
teks kecil dengan ikon 20px, dan karakter 96px menggantung di bawah salah
satunya membuat kolom itu timpang sekaligus meninggalkan ruang mati di bawah
tiga kolom lainnya. Terbaca sebagai elemen nyasar, bukan yang ditempatkan.

Akar masalahnya struktural, bukan soal ukuran: strip ini `lg:grid-cols-4`, jadi
karakternya tidak punya tempat selain di dalam salah satu sel — dan tiap sel
dirancang untuk teks kecil fungsional. Mengecilkan karakter tidak
menyelesaikannya; di bawah 72px wajahnya lumer.

`components/InfoStrip.tsx` dikembalikan utuh; baseline terukur pulih persis.
Empat penempatan yang tersisa berdiri sendiri dengan baik. **Jangan diulang
tanpa struktur yang benar-benar menyediakan ruang untuknya.**

<details>
<summary>Rencana asli langkah ini (disimpan sebagai catatan)</summary>


`components/InfoStrip.tsx`, di tepi strip dekat blok Delivery.

```tsx
<Character name="takeaway" className="w-20 sm:w-24" />
```

**Ini penempatan paling lemah dan sudah dianggarkan untuk dibuang.** InfoStrip
itu strip fungsional empat kolom dengan ikon 20px; karakter 96px berisiko
merusak ritmenya. Karakter ini **tidak** menggantikan ikon `BagIcon` — ikon itu
fungsional dan tetap.

Kriteria putusannya tegas, supaya tidak jadi debat selera saat sudah lelah:

- Strip tetap sejajar empat kolom di 1440px → **simpan**
- Ada kolom yang tergeser atau tingginya melompat → **buang**
- Di 390px strip jadi lebih panjang dari sebelumnya → **buang**

Empat titik yang kuat lebih baik daripada lima dengan satu yang dipaksakan.
Ini pola yang sama dengan Langkah 4 di rencana `light-refresh` — dibangun,
dinilai lewat screenshot, dibuang. Kalau dibuang, catat di dokumen ini seperti
di sana, jangan hapus jejaknya.

**Commit:** `InfoStrip: takeaway character` — atau tidak sama sekali.

</details>

---

## Langkah 5 — Selaraskan dokumen

Tidak boleh ada situs tayang yang bertentangan dengan dokumen brief-nya
sendiri.

- `docs/01-brief.md:45` — daftar DON'T memuat "mengandalkan kekacauan,
  gimmick, atau maskot". Tambahkan catatan bahwa klien menyediakan karakter dan
  menyahkannya **dengan batas**: dekoratif, kepadatan rendah, tidak pernah
  menggantikan mark, tidak pernah masuk Hero atau Heritage. Batas itu yang
  menjaga baris 35 ("mark-nya harus tenang dan bisa dipercaya") tetap benar.
- `docs/02-desain.md` — catat karakter sebagai perangkat non-tipografis
  keempat, di samping `DiamondGrid`, `OutlineMark`, dan hover-zoom foto.
- `docs/03-konvensi.md` — catat aturan aset: `public/character/*.svg`, huruf
  kecil kebab-case, diwarnai lewat `Character` saja, jangan pernah dirujuk
  dengan `<img>` karena warnanya akan lepas dari token.

**Commit:** `docs: record the character system and its limits`

---

## Langkah 6 — Verifikasi menyeluruh

1. `npx tsc --noEmit` — bersih.
2. `npm run lint` — bersih.
3. `ALLOW_PLACEHOLDER_BUILD=1 npm run build` — lolos. Override-nya masih perlu
   selama `CONTENT_STATUS.placeholder` di `lib/content.ts` masih `true`.
4. Playwright full-page 1440px: **kelima (atau keempat) karakter terender**,
   bukan lubang kosong.
5. Playwright full-page 390px, lalu `scrollWidth === clientWidth` — karakter
   berukuran tetap adalah penyebab umum overflow horizontal di mobile.
6. Periksa satu karakter di 390px memastikan tidak menyusut di bawah ~72px.
7. Cek jumlah aksen: hitung berapa elemen `--accent` yang tampak sekaligus di
   satu layar. Kalau karakter membuat accent jadi warna dominan alih-alih
   percikan, turunkan satu ke `--ink`.

---

## Yang bisa membuat rencana ini salah

| Risiko | Tanda | Tindakan |
| --- | --- | --- |
| Mask gagal muat | Elemen tak terlihat, **tanpa error konsol** | Hanya ketahuan lewat screenshot — itu sebabnya tiap langkah wajib di-screenshot |
| Karakter mendominasi | Situs terbaca kartun, bukan "berpuluh tahun" | Turunkan ke `--ink`, atau kurangi jadi 3 titik |
| Aksen berlebihan | Accent tidak lagi terasa sebagai percikan | Langkah 6 poin 7 |
| InfoStrip berantakan | Kolom tergeser | Sudah dianggarkan — buang, Langkah 4 |
| Klien menolak semuanya | — | `git branch -D characters`. `light-refresh` dan `main` tidak tersentuh |

## Catatan terpisah, masih menggantung

Production branch di Vercel masih `main`, sementara `main` belum berisi kerja
light-refresh maupun carousel. Push ke `main` akan menimpa deployment yang
sekarang dengan versi lama. Bukan bagian dari rencana ini, tapi bertambah
rumit tiap kali ada branch baru — sekarang ada tiga.
