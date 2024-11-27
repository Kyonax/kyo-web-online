/**
 * Data.js - Global Constants for Application
 *
 * @description
 * This file contains all the global constants used throughout the application.
 * These constants are critical for SEO, social media, and general configuration of the website.
 *
 * @author
 * Cristian Moreno (Kyonax)
 * Email: iamkyo@kyo.wtf
 */

// General Application Info
module.exports.APP_NAME = "Kyo's Personal Website"; // The name of the application
module.exports.APP_VERSION = "1.0.0"; // Current version of the application
module.exports.DEFAULT_LANGUAGE = "en"; // Default language for the application
module.exports.MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // Max upload size in bytes (10MB)
module.exports.SUPPORTED_LANGUAGES = ["en", "es", "fr"]; // Supported languages for the application

// Author Information (includes email)
module.exports.AUTHOR_INFO = {
  name: "Cristian Moreno (Kyonax)", // Author of the website
  email: "support@kyo.wtf", // Support email for the application
};

// SEO and Social Media Metadata
module.exports.SEO = {
  description:
    "Welcome to the universe of a Syndicate Sentinel—where freedom in cyberspace isn’t just a concept, it’s a damn way of life!", // Main description for SEO
  keywords: ["KYO-T", "kyo", "kyonax", "kyonax_on_tech", "kyo-wtf", "京"], // SEO keywords
  ogTitle: "My name is Kyonax", // Open Graph title for social media
  twitterTitle: "My name is Kyonax", // Twitter card title
  title: "I'm Kyo", // Website title
  websiteBanner: "assets/landscape_mountain-pink-sky.webp", // Website banner image
  websiteUrl: "https://kyo.wtf", // Website URL
};

// Theme Settings
module.exports.THEME_SETTINGS = {
  color: "#ffffff", // Theme color for the application
  msApplicationTileColor: "#ffffff", // MS Tile color for Windows
  primaryColor: "#ff5733", // Primary color for UI
  secondaryColor: "#4a90e2", // Secondary color for UI
  backgroundColor: "#f4f4f4", // Background color for the website
};

// Favicon and Site Configuration
module.exports.FAVICON = {
  path: "src/assets/favicon.png", // Path to the favicon image
};

// Application URL and Metadata
module.exports.SITE_URL = "https://kyo.wtf"; // Main URL of the website
module.exports.SITE_TITLE = module.exports.SEO.title; // The site's title (from SEO object)
module.exports.APP_DESCRIPTION = module.exports.SEO.description; // The app description (from SEO object)

// Components Information
module.exports.CUSTOM_COMPONENT = {
  FAST_IMG: {
    name: "blast-image",
  },
};
