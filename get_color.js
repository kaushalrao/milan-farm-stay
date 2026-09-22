const fs = require('fs');
const buf = fs.readFileSync('src/app/opengraph-image.png');
// Quick hack: PNG starts with signature, then IHDR. We can just use a library to read it.
