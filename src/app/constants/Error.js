/**
 * Error.js - Application Error Constants
 *
 * @description
 * This file holds all error messages that are used across the application. It ensures consistency
 * when handling error messages related to various features or operations.
 *
 * @author
 * Cristian Moreno (Kyonax)
 * Email: iamkyo@kyo.wtf
 */

module.exports.ERROR_MSG = {
  IMG_ATTRIBUTE_REQUIRED:
    "Attribute 'img' is required on <blast-image> elements.",
  IMG_ATTRIBUTE_MISSING: "Error: 'img' attribute missing.",
  IMGs_NOT_LOADED_YET: "Images not loaded yet. Initializing loadImages...",

  /**
   * Example dynamic error message with placeholders.
   * @param {string} field - The name of the field with the invalid value.
   * @param {string} expectedType - The expected type of the field value.
   * @returns {string} - The error message with placeholders filled in.
   */
  IMG_NAME_NOT_FOUND: (imageName) =>
    `Image with name "${imageName}" not found.`,
};
