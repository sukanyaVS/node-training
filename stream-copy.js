const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');

const SKIP_NAMES = new Set(['.env', 'node_modules', '.git']);

async function copyFileWithStream(sourcePath, destinationPath) {
  await fs.promises.mkdir(path.dirname(destinationPath), { recursive: true });

  await pipeline(
    fs.createReadStream(sourcePath),
    fs.createWriteStream(destinationPath)
  );
}

async function copyDirectory(sourceDir, destinationDir) {
  const entries = await fs.promises.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    if (SKIP_NAMES.has(entry.name)) {
      continue;
    }

    const sourcePath = path.join(sourceDir, entry.name);
    const destinationPath = path.join(destinationDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath);
    } else if (entry.isFile()) {
      await copyFileWithStream(sourcePath, destinationPath);
    }
  }
}

async function main() {
  const sourceDir = process.argv[2] || './source';
  const destinationDir = process.argv[3] || './backup';

  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory does not exist: ${sourceDir}`);
  }

  await fs.promises.mkdir(destinationDir, { recursive: true });
  await copyDirectory(sourceDir, destinationDir);

  console.log('Copy completed successfully.');
}

main().catch((error) => {
  console.error('Copy failed:', error.message);
  process.exit(1);
});
