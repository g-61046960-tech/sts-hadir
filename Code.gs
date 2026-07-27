const SPREADSHEET_ID = '1bCTR-eJoQEBAvqDKxnKxdWQE5eix5rcIG-3ItP-oHMY';
const SHEET_NAME = 'Rekod Ketidakhadiran';

function doGet(e) {
  try {
    const action = String((e && e.parameter && e.parameter.action) || 'list');
    if (action === 'list') return jsonOutput({ success: true, records: getRecords_() });
    return jsonOutput({ success: false, message: 'Tindakan tidak sah.' });
  } catch (err) {
    return jsonOutput({ success: false, message: String(err.message || err) });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (data.action !== 'add') throw new Error('Tindakan tidak sah.');
    validate_(data);
    const sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      data.date,
      data.day,
      data.stream,
      data.teacher,
      data.reason,
      data.details || ''
    ]);
    return jsonOutput({ success: true, message: 'Rekod berjaya disimpan.' });
  } catch (err) {
    return jsonOutput({ success: false, message: String(err.message || err) });
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Tarikh', 'Hari', 'Arus', 'Nama Guru', 'Sebab', 'Butiran']);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#0b4f9c').setFontColor('#ffffff');
  }
  return sheet;
}

function getRecords_() {
  const sheet = getSheet_();
  const last = sheet.getLastRow();
  if (last < 2) return [];
  const values = sheet.getRange(2, 1, last - 1, 7).getValues();
  const tz = Session.getScriptTimeZone() || 'Asia/Kuala_Lumpur';
  return values.map(r => ({
    timestamp: r[0] instanceof Date ? Utilities.formatDate(r[0], tz, 'dd/MM/yyyy HH:mm:ss') : String(r[0] || ''),
    date: r[1] instanceof Date ? Utilities.formatDate(r[1], tz, 'yyyy-MM-dd') : String(r[1] || ''),
    day: String(r[2] || ''),
    stream: String(r[3] || ''),
    teacher: String(r[4] || ''),
    reason: String(r[5] || ''),
    details: String(r[6] || '')
  })).reverse();
}

function validate_(d) {
  ['stream','teacher','date','day','reason'].forEach(k => {
    if (!String(d[k] || '').trim()) throw new Error('Maklumat wajib tidak lengkap: ' + k);
  });
  const allowedStreams = ['Perdana', 'Tingkatan 6'];
  const allowedReasons = ['Cuti Rehat Khas','Kursus','Mesyuarat','Cuti Tanpa Rekod','Temujanji Klinik','Urusan Keluarga'];
  if (!allowedStreams.includes(d.stream)) throw new Error('Arus tidak sah.');
  if (!allowedReasons.includes(d.reason)) throw new Error('Sebab tidak sah.');
  if (['Kursus','Mesyuarat','Urusan Keluarga'].includes(d.reason) && !String(d.details || '').trim()) throw new Error('Sila nyatakan butiran.');
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
