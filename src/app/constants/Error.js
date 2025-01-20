/**
 * @file Error.js - ErrorConstant
 *
 * This file holds all error messages that are used across the application. It ensures consistency
 * when handling error messages related to various features or operations.
 *
 * node.js-v20.18.1
 *
 * @author Cristian Moreno (Kyonax)
 * @contact iamkyo@kyo.wtf
 * @date 2025-01-19
 *
 * Code Guidelines :: @CCSv0.1
 * More details: https://code-guidelines.cybercodesyndicate.org
 * - Tabs only—no spaces.
 * - Naming:
 *   - snake_case for variables/methods.
 *   - _private_method() for private methods (underscore prefix).
 *   - UPPER_SNAKE_CASE for constants (in constant files).
 *   - kebab-case for file names (e.g., file-example.js).
 * - Meaningful names—fetch_user_data() over doThing().
 *
 * Repository-URL
 * https://github.com/Kyonax/kyo-web-online
 *
 * @usage
 * This file should be called on this way:
 * - const { CONSTANTs } = require('path-to-this-file.constant.js')
 */
module.exports.ERROR_MSG = {
  IMGs_NOT_LOADED_YET: "Images not loaded yet. Initializing loadImages...",

  COMPONENT_ATTRIBUTE_REQUIRED: (attributeName, componentName) =>
    `Attribute '${attributeName}' is required on <${componentName}> component.`,

  COMPONENT_ATTRIBUTE_MISSING: (attributeName) =>
    `Error: '${attributeName}' attribute is missing.`,

  /**
   * Example dynamic error message with placeholders.
   * @param {string} field - The name of the field with the invalid value.
   * @param {string} expectedType - The expected type of the field value.
   * @returns {string} - The error message with placeholders filled in.
   */
  IMG_NAME_NOT_FOUND: (imageName) =>
    `Image with name "${imageName}" not found.`,
};
