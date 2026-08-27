const fs = require("fs");
const path = require("path");

const sourceDir = path.resolve(process.argv[2] || "./source");
const destinationDir = path.resolve(process.argv[3] || "./backup");

// Files to skip
const SKIP_NAMES = new Set([
  ".env",
  "node_modules",
  ".git",
]);

function formatSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function shouldSkip(name) {
  return SKIP_NAMES.has(name);
}

function getFiles(currentDir, relativeDir = "") {
  const files = [];

  const entries = fs.readdirSync(currentDir, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const name = entry.name;

    if (shouldSkip(name)) {
      continue;
    }

    const fullPath = path.join(currentDir, name);
    const relativePath = path.join(relativeDir, name);

    if (entry.isDirectory()) {
      files.push(...getFiles(fullPath, relativePath));
    } else if (entry.isFile()) {
      files.push({
        fullPath,
        relativePath,
      });
    }
  }

  return files;
}

function needsCopy(sourcePath, destinationPath) {
  // File doesn't exist in backup
  if (!fs.existsSync(destinationPath)) {
    return true;
  }

  const sourceStats = fs.statSync(sourcePath);
  const destinationStats = fs.statSync(destinationPath);

  if (sourceStats.size !== destinationStats.size) {
    return true;
  }

  if (sourceStats.mtimeMs > destinationStats.mtimeMs) {
    return true;
  }

  return false;
}

function backup() {
  console.log("Scanning files...\n");

  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory does not exist: ${sourceDir}`);
    process.exit(1);
  }

  fs.mkdirSync(destinationDir, {
    recursive: true,
  });

  const files = getFiles(sourceDir);

  let filesCopied = 0;
  let totalSize = 0;

  for (const file of files) {
    const destinationPath = path.join(
      destinationDir,
      file.relativePath
    );

    fs.mkdirSync(path.dirname(destinationPath), {
      recursive: true,
    });

    // Skip unchanged files
    if (!needsCopy(file.fullPath, destinationPath)) {
      continue;
    }

    console.log(`Copying: ${file.relativePath}`);

    fs.copyFileSync(
      file.fullPath,
      destinationPath
    );

    const stats = fs.statSync(file.fullPath);

    filesCopied++;
    totalSize += stats.size;
  }

  console.log("\nBackup completed successfully.");
  console.log(`Files copied: ${filesCopied}`);
  console.log(`Total size: ${formatSize(totalSize)}`);
}

try {
  backup();
} catch (error) {
  console.error("\nBackup failed.");
  console.error(error.message);

  process.exit(1);
}