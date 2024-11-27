/**
 * getImageById.js - Utility for Retrieving Images
 *
 * @description
 * Provides a method to retrieve a `<picture>` element by its ID from a preloaded
 * set of images. Ensures a consistent approach for accessing images across the application.
 *
 * @author
 * Cristian Moreno (Kyonax)
 * Email: iamkyo@kyo.wtf
 *
 * @param {string} imageId - The unique identifier for the image (base name of the image).
 * @param {Object} images - The collection of all preloaded images as key-value pairs.
 * @returns {HTMLElement|null} - The `<picture>` element matching the ID, or `null` if not found.
 */
const getImageById = (imageId, images) => images[imageId] || null;

export default getImageById;
