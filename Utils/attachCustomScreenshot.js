const fs = require("fs");
const path = require("path");
const  attach  = require("wdio-cucumberjs-json-reporter");

async function attachImage(imageDir, imageName) {
  screenshotPath_actual = path.join(process.cwd(), imageDir, imageName);
  const absolutePath = path.resolve(screenshotPath_actual);
  const imageDiffScreenshot = fs.readFileSync(absolutePath, "base64");
  console.log(imageDiffScreenshot);
  attach(imageDiffScreenshot, "image/png");
};

async function attachText(text) {
  attach(text, "text/plain");
};

module.exports ={ attachImage, attachText}