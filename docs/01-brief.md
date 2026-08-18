# Ringkasan brief klien

Sumber: `The-Beef-Noodle-Shop-Brand-Brief-1.docx`. Brief aslinya ditulis untuk
**brand graphic designer** — deliverable-nya logo lock-up, varian warna, dan
aplikasi ke signage/packaging/seragam. Bukan brief website. Dokumen ini menyaring
bagian yang mengikat keputusan desain web.

## Fakta

| Field       | Isi                                                                       |
| ----------- | ------------------------------------------------------------------------- |
| Nama        | The Beef Noodle Shop · 牛肉面馆                                            |
| Kategori    | Restoran Taiwan modern — bakmi sapi, pork chop, lu rou fan, gua bao, shaved ice, plum juice |
| Lokasi      | Paradigm Mall, Petaling Jaya, Malaysia                                    |
| Format      | Dine-in 30 pax + takeaway + delivery (GrabFood, ShopeeFood, Foodpanda)     |
| Status      | **Non-halal**                                                             |
| Buka        | 1 Agustus 2026                                                            |
| Visi 3 thn  | Dua cabang lagi — KL, dan Puchong atau Bukit Jalil                        |
| Tagline     | "Good food, better mood." / 好味道，好心情。                                |

## Kepribadian merek

Satu baris dari brief: *fun, energetic dan modern — tapi berakar pada tradisi.
Hangat dan berani, tidak pernah berisik. Sederhana dan bersih, tapi tidak pernah
dingin.*

Brief menyajikannya sebagai **dial, bukan saklar** — semuanya duduk di tengah
yang percaya diri, tidak pernah mentok ke salah satu ujung:

- Tradisional ←→ Modern — berakar di warisan, diungkapkan dengan tangan modern
- Tenang ←→ Berisik — berani, bukan berisik
- Kasual ←→ Fine dining — hangat dan berkelas, tetap terasa kedai tetangga
- Fast food ←→ Slow food — layanan efisien, tapi tidak pernah terbaca fast food
- Minimal ←→ Ornate — bersih sebagai default, detail kultural sebagai aksen
- Playful ←→ Serius — nada boleh jenaka, tapi mark-nya harus tenang dan bisa dipercaya

## DO / DON'T

**DO** — terasa seperti sudah ada berpuluh tahun tapi relevan hari ini · isyaratkan
kualitas bahan (Australian beef, soup bone) tanpa menjelaskan berlebihan · terasa
dipikirkan sampai ke serbet · terbaca jelas di ukuran kecil (ikon app delivery)
maupun besar (signage).

**DON'T** — terlihat seperti rantai fast-casual atau cloud kitchen · mengejar tren
estetik (neon-brutalist, Y2K, meme) · mengandalkan kekacauan, gimmick, atau maskot
· **terlihat mahal/eksklusif sampai merusak posisi "affordable, everyday treat"**.

### Catatan atas "maskot" — Agustus 2026

Klien kemudian mengirim sendiri 11 ilustrasi sapi dan meminta dipakai untuk
menambah kesan "fun energy". Itu haknya, dan larangan di atas tidak dicabut —
kata kuncinya selalu **"mengandalkan"**. Yang dilarang adalah menjadikan maskot
tumpuan identitas, bukan keberadaan ilustrasi itu sendiri.

Batas yang menjaga baris "mark-nya harus tenang dan bisa dipercaya" tetap benar:

- Dekoratif sepenuhnya. `aria-hidden`, tidak pernah jadi satu-satunya pembawa
  informasi apa pun.
- Kepadatan rendah. Tujuh penempatan: Story, empat kategori menu,
  Signature, Footer.
- **Tidak pernah menggantikan mark.** Hero tetap milik `OutlineMark` 牛肉面馆
  sendirian; Heritage tetap milik foto keluarga asli klien.
- Memakai warna aslinya (`--character`), atas permintaan klien. Tetap lewat
  token, bukan hex di komponen.
- Tanpa animasi.

Rinciannya di `docs/superpowers/specs/2026-08-18-karakter-ilustrasi-design.md`.

## Palette awal dari brief

| Token         | Hex       | Peran                                     |
| ------------- | --------- | ----------------------------------------- |
| Broth Rust    | `#B5502C` | primer — hangat, menggugah selera         |
| Warm Gold     | `#C99A3F` | aksen — menggemakan cahaya neon gerai     |
| Ink Brown     | `#2B2320` | teks/garis — lebih hangat dari hitam murni |
| Paper Cream   | `#F4EDE1` | background — hangat, bukan putih steril   |

Jangkarnya adalah **neon warm-white 2700–3000K** yang sudah dipilih klien untuk
tampak depan gerai. Itu suhu warna yang harus dikejar seluruh sistem. Lihat
`docs/02-desain.md` untuk bagaimana palette ini diterjemahkan jadi token CSS
yang sedang dipakai.

## Arahan tipografi

- Serif atau humanis display yang percaya diri dan sedikit berkarakter untuk
  wordmark — hangat dan berkelas, bukan sans generik yang bisa jadi milik kafe mana pun
- Pendamping yang sangat terbaca untuk menu, kemasan, listing app delivery —
  ini kuda beban, harus tahan di ukuran kecil
- Kalau karakter Cina dipakai, harus terasa dipertimbangkan, bukan font sistem default

## Tiga hal yang brief tidak jawab, tapi mengubah desain

**1. Restonya sudah buka.** Brief menulis "Opening 1 August 2026". Situs ini
dibangun setelah tanggal itu — restonya sudah jalan. Jadi tugas situs ini bukan
membangun hype pra-buka, tapi **mengisi kursi weekday dan mendorong order
delivery**.

**2. 中文 di sini aksen brand, bukan terjemahan — dan itu Simplified, bukan
Traditional.** Draf awal dokumen ini menyimpulkan Traditional Chinese
(繁中) sebagai "penanda keaslian Taiwan", karena brief sendiri tidak
menyebut varian dan Malaysia resminya memakai Simplified. Itu asumsi, dibuat
sebelum ada materi brand asli dari klien. Logo resmi di flyer promo klien
("Opening this August") menulis **牛肉面馆** — Simplified, bukan
Traditional (麵/館 → 面/馆) — dan begitu juga semua teks Cina lain di flyer
itu. Situs ini sekarang mengikuti itu: Simplified Chinese, sesuai logo asli
klien. Kebetulan ini juga otomatis cocok dengan Simplified yang dipakai
resmi di Malaysia — jadi tidak ada lagi tegangan "sinyal Taiwan vs. bisa
dibaca orang lokal" yang tadinya coba dijembatani.

Yang tetap berlaku dari kesimpulan awal: 中文 di situs ini masih
**aksen tipografi/brand** (nama, tagline, nama hidangan), bukan terjemahan
penuh — **tidak ada layer terjemahan** (tanpa routing `/en` `/zh`, tanpa
dictionary per bahasa). Itu bagian dari argumen yang tetap benar terlepas
dari Simplified/Traditional. Lihat `docs/02-desain.md` untuk detailnya.

**3. Non-halal harus dinyatakan tenang dan awal.** Di Malaysia ini bukan detail
kecil — ini soal menghormati ekspektasi orang dan menentukan siapa audiensnya.
Harus masuk ke konten dengan tenang, tidak dikubur di footer, tidak pula canggung.

## Catatan teknis yang lahir dari brief

Font Chinese (Simplified) berukuran **5–15 MB** kalau full character set.
Situs ini cuma memakai segelintir karakter (牛肉面馆, 好味道，好心情, nama
hidangan). Kalau nanti dipakai sebagai
webfont (saat ini masih fallback sistem), harus di-**subset** jadi beberapa KB.
