/**
 * loadImages.js - Utility for Loading and Retrieving Images
 *
 * @description
 * Handles the loading of image assets from a predefined folder and caches them
 * for efficient reuse across the application. Provides methods to retrieve
 * `<picture>` elements by their unique IDs, supporting WebP and fallback formats.
 *
 * Supports variant images, automatically creating `srcset` attributes for responsive design.
 *
 * @author
 * Cristian Moreno (Kyonax)
 * Email: iamkyo@kyo.wtf
 */

import { ERROR_MSG } from "@constants/Error";

// Cached images store
let imagesCache = null;

/**
 * Loads images from the assets folder into memory and prepares `<picture>` elements.
 *
 * @description
 * Processes images in the specified folder, identifying WebP and fallback formats,
 * and creates an object keyed by image IDs for efficient access.
 *
 * @returns {Object} - A collection of image IDs mapped to their `<picture>` elements.
 */
const loadImages = () => {
  if (imagesCache) {
    console.log("Using cached images.");
    return imagesCache;
  }

  const imagesContext = require.context(
    "../../assets/app", // Path to the assets folder
    false,
    /\.(png|jpe?g|gif|webp)$/, // Supported image formats
  );

  const images = {}; // Store `<picture>` elements by ID
  const variants = {}; // Store image variants for responsive `srcset`
  const sortedImages = imagesContext.keys().sort(); // Sort image paths for consistency

  sortedImages.forEach((imagePath) => {
    const baseImagePath = imagePath.replace(/\.(png|jpe?g|gif|webp)$/, ""); // Remove extension
    const imageId = baseImagePath.split("/").pop(); // Extract image ID
    const variantMatch = imagePath.match(/-\d+/g); // Detect variant numbering

    if (variantMatch) {
      // Process variant images
      const originalId = imageId.replace(variantMatch.join(","), ""); // Base ID without variant
      variants[originalId] = variants[originalId] || [];
      variants[originalId].push(imagePath); // Store variant for later processing
      return; // Skip main processing for variants
    }

    const webpSrcSet = variants[imageId]
      ? variants[imageId]
          .map(
            (variant) =>
              `/assets/${variant.replace(/\.(png|jpe?g|gif|webp)$/, "")}.webp ${variant.match(/\d+/g)}w`,
          )
          .join(", ")
      : `/assets/${baseImagePath}.webp`;

    const fallbackSrc = imagesContext(imagePath); // Fallback image path

    const pictureHTML = `
      <picture id="${imageId}">
        <source type="image/webp" srcset="${webpSrcSet}">
        <img src="${fallbackSrc}" alt="${imageId}">
      </picture>
    `;

    const template = document.createElement("template");
    template.innerHTML = pictureHTML.trim();
    images[imageId] = template.content.firstChild; // Add `<picture>` to collection
  });

  imagesCache = images; // Cache the loaded images
  return images;
};

/**
 * Retrieves a `<picture>` element by its unique image ID.
 *
 * @description
 * Ensures images are loaded into memory and provides a method to fetch specific
 * `<picture>` elements using their IDs.
 *
 * @param {string} id - The unique ID of the image (filename without extension).
 * @returns {HTMLElement|null} - The corresponding `<picture>` element or `null` if not found.
 */
const getImageById = (id) => {
  if (!imagesCache) {
    console.warn(ERROR_MSG.IMGs_NOT_LOADED_YET);
    loadImages(); // Load images if not already cached
  }
  return imagesCache ? imagesCache[id] : null;
};

export { loadImages, getImageById };
