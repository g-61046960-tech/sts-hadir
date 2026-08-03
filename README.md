# e-Keberadaan SMK Tinggi Segamat

Aplikasi statik untuk GitHub Pages atau Netlify yang menyimpan rekod ke Google Sheet melalui Google Apps Script.

## Kandungan
- `index.html` — aplikasi utama
- `app-config.js` — URL Apps Script, login admin dan senarai guru
- `Code.gs` — kod backend Google Apps Script
- `assets/` — logo KPM dan logo sekolah

## Langkah 1 — Kemas kini senarai guru
Buka `app-config.js` dan gantikan nama contoh di bawah arus `Perdana` dan `Tingkatan 6` dengan nama guru sebenar.

## Langkah 2 — Pasang Apps Script
1. Buka Google Sheet: `1bCTR-eJoQEBAvqDKxnKxdWQE5eix5rcIG-3ItP-oHMY`.
2. Pilih **Extensions > Apps Script**.
3. Padam kod asal dan tampal keseluruhan kandungan `Code.gs`.
4. Tetapkan zon masa projek kepada **Asia/Kuala_Lumpur**.
5. Pilih **Deploy > New deployment > Web app**.
6. Execute as: **Me**.
7. Who has access: **Anyone**.
8. Tekan **Deploy** dan salin URL yang berakhir dengan `/exec`.

## Langkah 3 — Masukkan URL /exec
Buka `app-config.js` dan gantikan:
`PASTE_URL_APPS_SCRIPT_EXEC_DI_SINI`
dengan URL Web App Apps Script yang sebenar.

## Langkah 4 — Upload ke GitHub
Upload semua fail dan folder dalam pakej ini ke repository. Aktifkan GitHub Pages melalui **Settings > Pages**.

## Login admin
- Username: `jeb7029`
- Password: `admin`

## Nota keselamatan
Login ini dilaksanakan pada bahagian frontend dan sesuai sebagai kawalan asas dalaman. Untuk keselamatan lebih tinggi, pengesahan perlu dipindahkan ke backend atau menggunakan akaun Google sekolah.

## Formula dashboard
- Harian: bilangan guru unik tidak hadir pada tarikh dipilih ÷ jumlah guru.
- Mingguan: jumlah rekod minggu tersebut ÷ (jumlah guru × hari bekerja Isnin–Jumaat).
- Bulanan: jumlah rekod bulan tersebut ÷ (jumlah guru × hari bekerja Isnin–Jumaat).


## Upload senarai guru melalui Excel

Klik **Upload Nama Guru (Excel)**. Fail mesti mengandungi lajur **Nama** dan **Arus**. Arus yang diterima: **Perdana** atau **Tingkatan 6**. Senarai akan disimpan dalam Local Storage pelayar pada peranti yang digunakan.
