# e-Keberadaan SMK Tinggi Segamat v4

## Fail utama
- `index.html`
- `assets/logo-kpm.jpg`
- `assets/logo-sts.jpg`

## Login pentadbir
- Username: `jeb7029`
- Password: `admin`

## Upload jadual waktu
Fail Excel/CSV perlu mempunyai lajur berikut:
- Nama
- Arus (`Perdana` atau `Tingkatan 6`)
- Hari
- Masa
- Kelas (pilihan)
- Subjek (pilihan)

Jadual disimpan dalam pelayar peranti menggunakan `localStorage`.

## Google Apps Script
Aplikasi menggunakan URL berikut:
`https://script.google.com/macros/s/AKfycbyH2CAUOxa4r2DLE2n6oZ28YwWB-h6L_z-B8yEG39se5VBcfGzSODOJM7LODeQtEDDc/exec`

Frontend menghantar objek JSON dengan `action: add` dan membaca rekod menggunakan `?action=list`.
