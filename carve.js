const fs = require('fs');

const pdfBuffer = fs.readFileSync('passport mithun.pdf');

// JPEG SOI (Start of Image) marker: FF D8 FF
const soi = Buffer.from([0xFF, 0xD8, 0xFF]);
// JPEG EOI (End of Image) marker: FF D9
const eoi = Buffer.from([0xFF, 0xD9]);

let startIdx = pdfBuffer.indexOf(soi);
if (startIdx !== -1) {
  let endIdx = pdfBuffer.indexOf(eoi, startIdx);
  if (endIdx !== -1) {
    const jpegBuffer = pdfBuffer.slice(startIdx, endIdx + 2);
    fs.writeFileSync('public/profile.jpg', jpegBuffer);
    console.log('Successfully extracted JPEG from PDF to public/profile.jpg');
  } else {
    console.log('Found SOI but no EOI');
  }
} else {
  console.log('No JPEG found in PDF');
}
