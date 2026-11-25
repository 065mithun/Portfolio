const { exportImages } = require('pdf-export-images/legacy');

(async () => {
  try {
    console.log("Extracting images...");
    const images = await exportImages('passport mithun.pdf', 'public');
    console.log(`Extracted ${images.length} images`);
    images.forEach(img => console.log(img.name, img.file));
  } catch (err) {
    console.error("Error:", err);
  }
})();
