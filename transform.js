const fs = require("fs");
const { Transform } = require("stream");

const uppercaseStream = new Transform({
  transform(chunk, encoding, callback) {
    const text = chunk.toString();

    const uppercaseText = text.toUpperCase();

    callback(null, uppercaseText);
  },
});

process.stdin
  .pipe(uppercaseStream)
  .pipe(process.stdout);

  // Create read stream
const readStream = fs.createReadStream("source.txt");

// Create write stream
const writeStream = fs.createWriteStream("destination.txt");

readStream
  .pipe(uppercaseStream)
  .pipe(writeStream);