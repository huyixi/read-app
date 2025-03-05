const fs = require("fs");
const path = require("path");

/**
 * Creates a book folder with index.md based on Chinese title
 * @param {string} chineseTitle - The Chinese title of the book
 * @param {Object} options - Additional options for the frontmatter
 */
function createBookFolder(chineseTitle, options = {}) {
  // Generate a timestamp-based folder name to avoid pinyin conversion issues
  const sanitizedTitle = chineseTitle
    .replace(/[^\w\s\u4e00-\u9fff]/gi, "") // Keep Chinese characters and alphanumerics
    .trim();

  // Path for the new folder
  const folderPath = path.join(
    __dirname,
    "../",
    "content",
    "books",
    chineseTitle,
  );

  // Create the folder if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  } else {
    console.log(`Folder already exists: ${folderPath}`);
  }

  // Format current time in the required format
  const now = new Date();
  // Adjust to UTC+8
  const utcPlus8Date = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const currentTime = utcPlus8Date.toISOString().replace("Z", "+08:00");

  // Create frontmatter content
  const frontmatter = `---
title: "${chineseTitle}"
author: "${options.author || ""}"
date: ${currentTime}
draft: false
star: 0
recommender: "${options.recommender || ""}"
recommendation: "${options.recommendation || ""}"
referrer: "${options.referrer || ""}"
---

`;

  // Path for the index.md file
  const filePath = path.join(folderPath, "index.md");

  // Write the file
  fs.writeFileSync(filePath, frontmatter);
  console.log(`Created file: ${filePath}`);
}

// Example usage
// Get command line arguments
const args = process.argv.slice(2);
const chineseTitle = args[0];

if (!chineseTitle) {
  console.error("Please provide a Chinese title as a parameter");
  process.exit(1);
}

// Additional options can be passed as JSON string in second argument
let options = {};
if (args[1]) {
  try {
    options = JSON.parse(args[1]);
  } catch (e) {
    console.error("Error parsing options JSON:", e.message);
  }
}

createBookFolder(chineseTitle, options);
