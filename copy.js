const fs = require("fs");

const sourceFile = process.argv[2];
const destinationFile = process.argv[3];

if (!sourceFile || !destinationFile) {
  console.log("Usage: node copy.js <source> <destination>");
  process.exit(1);
}

// Create read stream
const readStream = fs.createReadStream(sourceFile);

// Create write stream
const writeStream = fs.createWriteStream(destinationFile);

// Handle source file read error
readStream.on("error", (error) => {
  console.error("Error reading source file:");
  console.error(error.message);
});

// Handle destination file write error
writeStream.on("error", (error) => {
  console.error("Error writing destination file:");
  console.error(error.message);
});

// Copy file using pipe
readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("File copied successfully!");
  console.log(`Source: ${sourceFile}`);
  console.log(`Destination: ${destinationFile}`);
});