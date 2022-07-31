const path = require("path");
const fs = require("fs");
const mergeImages = require("merge-images");
const { Canvas, Image } = require("node-canvas");
const { bool, MersenneTwister19937, real } = require("random-js");
const { metadataTemplate } = require("./layers/content");

const layersPath = path.join(process.cwd(), "layers");
const outputPath = path.join(process.cwd(), "output");

/**
 * Writes .png file from 64-base format
 * @param {string} base64PNG - 64-base url of .png file
 * @param {string} filename - name of file to save
 */
function saveBase64Image(base64PNG, filename) {
  let base64 = base64PNG.split(",")[1];
  let imageBuffer = Buffer.from(base64, "base64");
  fs.writeFileSync(filename, imageBuffer);
}

/**
 * Merge layers into one image
 * @param layers - array for  generating image from layers
 * @param {string} outputFile - name of file to save
 */
async function mergeLayersAndSave(layers, outputFile) {
  const image = await mergeImages(layers, { Canvas: Canvas, Image: Image });
  saveBase64Image(image, outputFile);
}

/**
 * Randomly selects layers
 * @param {string} layersPath - path to the images of layers
 * @param layers - array for generating image from layers
 */
function randomlySelectLayers(layersPath, layers) {
  const mt = MersenneTwister19937.autoSeed();

  let images = [];
  let selectedTraits = {};

  for (const layer of layers) {
    if (bool(layer.probability)(mt)) {
      let selected = pickWeighted(mt, layer.options);
      selectedTraits[layer.name] = selected.name;
      images.push(path.join(layersPath, selected.file));
    }
  }
  return { images, selectedTraits };
}

/**
 * Picks options with weight with Mersenne Twister
 * @param {MersenneTwister19937} mt - MersenneTwister19937 object
 * @param options - array of options for some layer
 */
function pickWeighted(mt, options) {
  const weightSum = options.reduce((acc, option) => {
    return acc + (option.weight ?? 1.0);
  }, 0);

  const r = real(0.0, weightSum, false)(mt);

  let summedWeight = 0.0;
  for (const option of options) {
    summedWeight += option.weight ?? 1.0;
    if (r <= summedWeight) {
      return option;
    }
  }
}

/**
 * Generates NFT collection images and metadata from layers
 * @param {number} num - how much images generates
 * @param {string} layersPath - path to layers folder
 * @param {string} outputPath - path to generated images
 */
async function generateNFT(num, layersPath, outputPath) {
  const content = require(layersPath + "/content");
  let generated = new Set();

  for (let tokenId = 1; tokenId <= num; tokenId++) {
    console.log(`Generating NFT #${tokenId}`);
    let selection = randomlySelectLayers(layersPath, content.layers);
    const traits = JSON.stringify(selection.selectedTraits);

    // prevent duplicates
    if (generated.has(traits)) {
      tokenId--;
      continue;
    } else {
      generated.add(traits);
      await mergeLayersAndSave(
        selection.images,
        path.join(outputPath, "images", `${tokenId}.png`),
      );
      let metadata = generateMetadata(
        content,
        tokenId,
        selection.selectedTraits,
      );
      fs.writeFileSync(
        path.join(outputPath, "properties", `${tokenId}`),
        JSON.stringify(metadata, null, 2),
      );
    }
  }
}

function generateMetadata(content, tokenId, traits) {
  let attributes = [];

  for (const [trait_type, value] of Object.entries(traits)) {
    attributes.push({ trait_type, value });
  }

  return content.metadataTemplate(tokenId, attributes);
}

generateNFT(50, layersPath, outputPath);
