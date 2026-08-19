/**
 * version.js
 * Script to update cache busting version automatically.
 * Run with: node version.js
 */

const fs = require("fs");
const path = require("path");

// Read package.json or create version file
const versionFile = path.join(__dirname, "version.json");
let version = { version: "1.0.0" };

try {
  if (fs.existsSync(versionFile)) {
    version = JSON.parse(fs.readFileSync(versionFile, "utf8"));

    // Increment patch version
    const [major, minor, patch] = version.version.split(".").map(Number);
    version.version = `${major}.${minor}.${patch + 1}`;
  }
} catch (error) {
  console.error("Error reading version file:", error);
}

// Write updated version
fs.writeFileSync(versionFile, JSON.stringify(version, null, 2));

// Update index.html
const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// Update version in all assets
html = html.replace(/\?v=\d+\.\d+\.\d+/g, `?v=${version.version}`);

fs.writeFileSync(indexPath, html);
console.log(`Version updated to ${version.version}`);
