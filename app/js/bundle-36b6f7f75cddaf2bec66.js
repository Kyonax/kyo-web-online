/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 426:
/***/ ((module) => {

/**
 * @file Data.js - Data
 *
 * This file contains all the global constants used throughout the application.
 * These constants are critical for SEO, social media, and
 * general configuration of the website.
 *
 * node.js-v20.17.0
 *
 * @author Cristian Moreno (Kyonax)
 * @contact iamkyo@kyo.wtf
 * @date 2025-01-17
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
module.exports = {
  // General Application Info
  APP_NAME: "Kyo's Personal Website",
  // The name of the application
  APP_VERSION: "1.0.0",
  // Current version of the application
  DEFAULT_LANGUAGE: "en",
  // Default language for the application
  MAX_UPLOAD_SIZE: 10 * 1024 * 1024,
  // Max upload size in bytes (10MB)
  SUPPORTED_LANGUAGES: ["en", "es", "fr"],
  // Supported languages for the application

  // Author Information (includes email)
  AUTHOR_INFO: {
    name: "Cristian Moreno (Kyonax)",
    // Author of the website
    email: "support@kyo.wtf" // Support email for the application
  },
  // SEO and Social Media Metadata
  SEO: {
    description: "Welcome to the universe of a Syndicate Sentinel—where freedom in cyberspace isn’t just a concept, it’s a damn way of life!",
    // Main description for SEO
    keywords: ["KYO-T", "kyo", "kyonax", "kyonax_on_tech", "kyo-wtf", "京"],
    // SEO keywords
    ogTitle: "My name is Kyonax",
    // Open Graph title for social media
    twitterTitle: "My name is Kyonax",
    // Twitter card title
    title: "I'm Kyo",
    // Website title
    websiteBanner: "assets/landscape_mountain-pink-sky.webp",
    // Website banner image
    websiteUrl: "https://kyo.wtf" // Website URL
  },
  // Theme Settings
  THEME_SETTINGS: {
    color: "#ffffff",
    // Theme color for the application
    msApplicationTileColor: "#ffffff",
    // MS Tile color for Windows
    primaryColor: "#ff5733",
    // Primary color for UI
    secondaryColor: "#4a90e2",
    // Secondary color for UI
    backgroundColor: "#f4f4f4" // Background color for the website
  },
  // Favicon and Site Configuration
  FAVICON: {
    path: "src/assets/favicon.png",
    // Path to the favicon image
    dest: "dist/favicons",
    grunt: {
      path: "/",
      appName: "Kyo Web Online",
      // Name of your app
      appShortName: "Kyo",
      // Short name of your app
      appDescription: "Cristian Moreno (Kyonax)",
      // Description of your app
      developerName: "Cristian Moreno",
      // Developer name
      developerURL: "https://kyo.wtf",
      // Developer URL
      dir: "auto",
      url: "https://kyo.wtf/",
      // URL for your site
      display: "standalone",
      // How the app should be displayed
      orientation: "any",
      // Orientation of the icons
      start_url: "/?homescreen=1",
      // Start URL of the app
      version: 1.0,
      // Version of the favicons
      logging: false,
      icons: {
        android: true,
        // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        appleIcon: true,
        // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        appleStartup: false,
        // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        coast: false,
        // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        favicons: true,
        // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        firefox: true,
        // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        windows: true,
        // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        yandex: false
      }
    }
  },
  // Application URL and Metadata
  SITE_URL: "https://kyo.wtf",
  // Main URL of the website
  SITE_TITLE: "I'm Kyo",
  // The site's title (from SEO object)
  APP_DESCRIPTION: "Welcome to the universe of a Syndicate Sentinel—where freedom in cyberspace isn’t just a concept, it’s a damn way of life!",
  // The app description (from SEO object)

  // Components Information
  CUSTOM_COMPONENT: {
    BLAST_IMG: {
      name: "blast-image"
    },
    CLASS_SCHEDULER_COMPONENT: {
      name: "class-scheduler"
    }
  }
};

/***/ }),

/***/ 270:
/***/ ((module) => {

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
module.exports.D = {
  IMGs_NOT_LOADED_YET: "Images not loaded yet. Initializing loadImages...",
  COMPONENT_ATTRIBUTE_REQUIRED: function COMPONENT_ATTRIBUTE_REQUIRED(attributeName, componentName) {
    return "Attribute '".concat(attributeName, "' is required on <").concat(componentName, "> component.");
  },
  COMPONENT_ATTRIBUTE_MISSING: function COMPONENT_ATTRIBUTE_MISSING(attributeName) {
    return "Error: '".concat(attributeName, "' attribute is missing.");
  },
  /**
   * Example dynamic error message with placeholders.
   * @param {string} field - The name of the field with the invalid value.
   * @param {string} expectedType - The expected type of the field value.
   * @returns {string} - The error message with placeholders filled in.
   */
  IMG_NAME_NOT_FOUND: function IMG_NAME_NOT_FOUND(imageName) {
    return "Image with name \"".concat(imageName, "\" not found.");
  }
};

/***/ }),

/***/ 701:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(417);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(619), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(916), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(457), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(940), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root{--clr-primary-50: hsl(48, 95%, 78%);--clr-primary-100: hsl(47, 95%, 56%);--clr-primary-200: hsl(49, 100%, 39%);--clr-primary-300: hsl(48, 100%, 29%);--clr-primary-400: hsl(45, 100%, 20%);--clr-primary-500: hsl(35, 100%, 13%);--clr-secondary-50: hsl(224, 95%, 78%);--clr-secondary-100: hsl(224, 95%, 56%);--clr-secondary-200: hsl(224, 74%, 45%);--clr-secondary-300: hsl(224, 74%, 39%);--clr-secondary-400: hsl(224, 74%, 34%);--clr-secondary-500: hsl(224, 74%, 22%);--clr-neutral-50: hsl(0, 0%, 91%);--clr-neutral-100: hsl(0, 0%, 79%);--clr-neutral-200: hsl(0, 0%, 59%);--clr-neutral-300: hsl(0, 0%, 40%);--clr-neutral-400: hsl(0, 0%, 22%);--clr-neutral-500: hsl(0, 0%, 7%);--clr-border-50: hsla(0, 0%, 95.29%, 0.1);--clr-border-100: hsla(0, 0%, 100%, 0.1);--clr-border-200: hsla(0, 0%, 90.59%, 0.1);--clr-border-300: hsla(0, 0%, 85.88%, 0.1);--clr-border-400: hsla(0, 0%, 81.18%, 0.1);--clr-border-500: hsla(0, 0%, 76.47%, 0.1);--clr-success-50: hsl(91, 48%, 72%);--clr-success-100: hsl(91, 62%, 44%);--clr-success-200: hsl(91, 100%, 28%);--clr-success-300: hsl(105, 100%, 21%);--clr-success-400: hsl(120, 100%, 15%);--clr-success-500: hsl(120, 100%, 9%);--clr-warning-50: hsl(29, 95%, 78%);--clr-warning-100: hsl(29, 95%, 56%);--clr-warning-200: hsl(30, 100%, 40%);--clr-warning-300: hsl(25, 100%, 32%);--clr-warning-400: hsl(17, 100%, 24%);--clr-warning-500: hsl(0, 100%, 17%);--clr-error-50: hsl(352, 65%, 74%);--clr-error-100: hsl(352, 69%, 48%);--clr-error-200: hsl(352, 70%, 39%);--clr-error-300: hsl(352, 70%, 34%);--clr-error-400: hsl(352, 70%, 29%);--clr-error-500: hsl(352, 69%, 19%);--fs-100: 0.625rem;--fs-200: 0.875rem;--fs-300: 1rem;--fs-400: 1.125rem;--fs-500: 1.5rem;--fs-600: 1.875rem;--fs-700: 2.25rem;--fs-800: 3rem}@media only screen and (min-width: 64em){:root{--fs-100: 0.75rem;--fs-200: 1rem;--fs-300: 1.125rem;--fs-400: 1.25rem;--fs-500: 1.75rem;--fs-600: 2.25rem;--fs-700: 3rem;--fs-800: 4rem}}@font-face{font-family:"SpaceMono";src:url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:"SpaceMono";src:url(${___CSS_LOADER_URL_REPLACEMENT_1___}) format("truetype");font-weight:700;font-style:normal}@font-face{font-family:"SpaceMono";src:url(${___CSS_LOADER_URL_REPLACEMENT_2___}) format("truetype");font-weight:400;font-style:italic}@font-face{font-family:"SpaceMono";src:url(${___CSS_LOADER_URL_REPLACEMENT_3___}) format("truetype");font-weight:700;font-style:italic}html{font-size:12px}body{font-family:"SpaceMono","Roboto Mono","Courier New",Courier,monospace;font-display:swap;font-size:var(--fs-300);line-height:var(--fs-500);letter-spacing:-0.03rem}*{scrollbar-width:thin}body{background-color:var(--clr-neutral-500);color:var(--clr-neutral-50)}#main-container{overflow:hidden;height:calc(var(--vh, 1vh)*98);display:grid;grid-template-columns:min-content auto;column-gap:.5rem}.container-block{position:relative;border:1px solid var(--clr-border-100);padding:.36rem}.page-loader{display:none}.main-scroll-block{display:block;overflow-y:auto;height:auto}#left-section,#right-section{position:relative;display:grid;height:calc(var(--vh, 1vh)*98)}#left-section{gap:.5rem}@media(max-width: 767.98px){body{overflow:auto}#main-container{height:auto;overflow:auto;grid-template-columns:1fr;gap:.25rem;margin-bottom:3rem}#left-section,#right-section{height:auto;gap:.5rem}}@media(min-width: 768px)and (max-width: 991.98px){#main-container{grid-template-columns:min-content auto}.container-block{padding:.36rem}#left-section,#right-section{gap:.5rem}}@media(min-width: 992px)and (max-width: 1199.98px){body{overflow:hidden}#main-container{grid-template-columns:min-content auto}.container-block{padding:.4rem}}@media(min-width: 1200px){body{overflow:hidden}#main-container{grid-template-columns:min-content auto}.container-block{padding:.5rem}}.dev-info{display:block;justify-content:center}.dev-info header{display:grid;gap:.25rem}.flare-100{position:relative}.flare-100:before{content:"";position:absolute;top:calc(-3px/2);left:calc(-3px/2);right:calc(-3px/2);bottom:calc(-3px/2);border:2px solid rgba(0,0,0,0);border-radius:inherit;background:linear-gradient(90deg, transparent, var(--clr-border-100), transparent);background-size:200% 200%;filter:blur(4px);opacity:.9;z-index:-1;animation:flare-breathe 15s linear infinite,flare-opacity 3s ease-in-out infinite}@keyframes flare-breathe{0%{background-position:100% 0}25%{background-position:0 100%}50%{background-position:100% 100%}75%{background-position:0 0}100%{background-position:100% 0}}@keyframes flare-opacity{0%{opacity:0}50%{opacity:.9}100%{opacity:0}}.flare-300{position:relative}.flare-300:before{content:"";position:absolute;top:calc(-3px/2);left:calc(-3px/2);right:calc(-3px/2);bottom:calc(-3px/2);border:2px solid rgba(0,0,0,0);border-radius:inherit;background:linear-gradient(90deg, transparent, var(--clr-border-100), transparent);background-size:200% 200%;filter:blur(4px);opacity:.9;z-index:-1;animation:flare-breathe 15s linear infinite,flare-opacity 6s ease-in-out infinite}@keyframes flare-breathe{0%{background-position:100% 0}25%{background-position:0 100%}50%{background-position:100% 100%}75%{background-position:0 0}100%{background-position:100% 0}}@keyframes flare-opacity{0%{opacity:0}50%{opacity:.9}100%{opacity:0}}.flare-600{position:relative}.flare-600:before{content:"";position:absolute;top:calc(-3px/2);left:calc(-3px/2);right:calc(-3px/2);bottom:calc(-3px/2);border:2px solid rgba(0,0,0,0);border-radius:inherit;background:linear-gradient(90deg, transparent, var(--clr-neutral-100), transparent);background-size:200% 200%;filter:blur(4px);opacity:.9;z-index:-1;animation:flare-breathe 15s linear infinite,flare-opacity 12s ease-in-out infinite}@keyframes flare-breathe{0%{background-position:100% 0}25%{background-position:0 100%}50%{background-position:100% 100%}75%{background-position:0 0}100%{background-position:100% 0}}@keyframes flare-opacity{0%{opacity:0}50%{opacity:.9}100%{opacity:0}}.flare-900{position:relative}.flare-900:before{content:"";position:absolute;top:calc(-3px/2);left:calc(-3px/2);right:calc(-3px/2);bottom:calc(-3px/2);border:2px solid rgba(0,0,0,0);border-radius:inherit;background:linear-gradient(90deg, transparent, var(--clr-primary-100), transparent);background-size:200% 200%;filter:blur(4px);opacity:.9;z-index:-1;animation:flare-breathe 15s linear infinite,flare-opacity 24s ease-in-out infinite}@keyframes flare-breathe{0%{background-position:100% 0}25%{background-position:0 100%}50%{background-position:100% 100%}75%{background-position:0 0}100%{background-position:100% 0}}@keyframes flare-opacity{0%{opacity:0}50%{opacity:.9}100%{opacity:0}}.dev-info span,.dev-communities span,.dev-tech span{padding-left:.25rem;padding-right:.5rem;background-color:var(--clr-neutral-50);color:var(--clr-neutral-500)}.dev-marquee{position:absolute;bottom:0px;left:0px;right:0px;margin-top:auto;background-color:var(--clr-neutral-500)}.dev-communities{margin-bottom:6rem}.dev-info .span-container,.dev-communities .span-container{font-weight:900;display:grid;gap:.25rem;grid-template-columns:max-content auto}.dev-tech .span-container{font-weight:900;display:grid;gap:.25rem;grid-template-columns:max-content max-content max-content}.dev-profile{padding:.25rem;border:1px solid var(--clr-border-100);width:min-content;left:0px;right:0px;margin:auto}.dev-img{width:150px;height:150px;overflow:hidden;position:relative;background-color:var(--clr-neutral-400)}.dev-img picture{position:absolute;width:max-content;height:100%;top:0px;right:0px}.dev-img img{height:201%;object-fit:cover}.parent-contact{position:relative;display:flex;justify-content:center;align-items:center}.contact-me{display:grid;width:100%;grid-template-columns:1fr;padding:.25rem;gap:1rem}.contact-me__socials{display:grid;grid-template-columns:repeat(3, 1fr);gap:1rem}.contact-me__socials class-scheduler{cursor:pointer;display:flex;font-size:var(--fs-400);width:100%;border:1px solid var(--clr-border-100);justify-content:center;align-items:center;text-decoration:none;color:var(--clr-neutral-50)}.contact-me__socials class-scheduler:hover{background-color:var(--clr-border-100);box-shadow:0 0 9px 1px var(--clr-border-100);animation:cyberpunk-pulse-1px-9px 1.5s infinite alternate}@keyframes cyberpunk-pulse-1px-9px{0%{box-shadow:0 0 calc(9px/2) calc(1px/2) rgba(var(--clr-border-100), 0.8) !important}100%{box-shadow:0 0 9px 1px rgba(var(--clr-border-100), 0.5) !important}}.contact-me__contact-btn{cursor:pointer;display:flex;width:100%;border:1px solid var(--clr-border-100);justify-content:center;align-items:center;height:3rem}.contact-me__contact-btn:hover{background-color:var(--clr-border-100);box-shadow:0 0 9px 1px var(--clr-border-100);animation:cyberpunk-pulse-1px-9px 1.5s infinite alternate}@keyframes cyberpunk-pulse-1px-9px{0%{box-shadow:0 0 calc(9px/2) calc(1px/2) rgba(var(--clr-border-100), 0.8) !important}100%{box-shadow:0 0 9px 1px rgba(var(--clr-border-100), 0.5) !important}}@media(max-width: 767.98px){.dev-tech .span-container{grid-template-columns:repeat(4, 1fr)}}@media(max-width: 414.98px){.dev-tech .span-container{grid-template-columns:repeat(3, 1fr)}}@media(max-width: 320.98px){.dev-tech .span-container{grid-template-columns:repeat(2, 1fr)}}.marquee{font-size:var(--fs-200);line-height:var(--fs-400);background-color:var(--clr-primary-100);color:var(--clr-neutral-500);position:absolute;bottom:0;left:0;width:100%;overflow:hidden;--marquee-play: running;--marquee-speed: 33s;box-shadow:0 0 9px 1px hsl(47,95%,56%);animation:cyberpunk-pulse-1px-9px 1.5s infinite alternate}@keyframes cyberpunk-pulse-1px-9px{0%{box-shadow:0 0 calc(9px/2) calc(1px/2) hsla(47,95%,56%,.8) !important}100%{box-shadow:0 0 9px 1px hsla(47,95%,56%,.5) !important}}.marquee__items{display:flex;white-space:nowrap;animation:marqueeScroll var(--marquee-speed) linear infinite;animation-play-state:var(--marquee-play);will-change:transform;width:max-content;font-weight:900}.marquee__item{display:inline-block;margin-right:.5rem}@keyframes marqueeScroll{0%{transform:translateX(0%)}100%{transform:translateX(-50%)}}@media only screen and (max-width: 48em){.marquee .marquee{font-size:var(--fs-100);line-height:var(--fs-300)}}`, "",{"version":3,"sources":["webpack://./src/app/scss/abstracts/_theme.scss","webpack://./src/app/scss/abstracts/_mixins.scss","webpack://./src/app/scss/base/_typography.scss","webpack://./src/app/scss/base/_global.scss","webpack://./src/app/scss/layout/_dev-info.scss","webpack://./src/app/scss/components/_marquee.scss"],"names":[],"mappings":"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","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 314:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 417:
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ 354:
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 72:
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 659:
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 540:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 825:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 718:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ai_kyonax_landscape_background.jpg": 338,
	"./kyonax_multiverse_characters-100.jpg": 858,
	"./kyonax_multiverse_characters-300.jpg": 552,
	"./kyonax_multiverse_characters-600.jpg": 393,
	"./kyonax_multiverse_characters-900.jpg": 274,
	"./kyonax_multiverse_characters.jpg": 428
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 718;

/***/ }),

/***/ 338:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/ai_kyonax_landscape_background.webp";

/***/ }),

/***/ 858:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/kyonax_multiverse_characters-100.webp";

/***/ }),

/***/ 552:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/kyonax_multiverse_characters-300.webp";

/***/ }),

/***/ 393:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/kyonax_multiverse_characters-600.webp";

/***/ }),

/***/ 274:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/kyonax_multiverse_characters-900.webp";

/***/ }),

/***/ 428:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/kyonax_multiverse_characters.webp";

/***/ }),

/***/ 916:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/SpaceMonoNerdFont-Bold.ttf";

/***/ }),

/***/ 940:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/SpaceMonoNerdFont-BoldItalic.ttf";

/***/ }),

/***/ 457:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/SpaceMonoNerdFont-Italic.ttf";

/***/ }),

/***/ 619:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/SpaceMonoNerdFont-Regular.ttf";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "app/js/bundle-" + "0b6005e6c1a79ea7f66f" + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			792: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var app_injectStylesIntoStyleTag = __webpack_require__(72);
var app_injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(app_injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var app_styleDomAPI = __webpack_require__(825);
var app_styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(app_styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var app_insertBySelector = __webpack_require__(659);
var app_insertBySelector_default = /*#__PURE__*/__webpack_require__.n(app_insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var app_setAttributesWithoutAttributes = __webpack_require__(56);
var app_setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(app_setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var app_insertStyleElement = __webpack_require__(540);
var app_insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(app_insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var app_styleTagTransform = __webpack_require__(113);
var app_styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(app_styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/app/scss/main.scss
var app_main = __webpack_require__(701);
;// ./src/app/scss/main.scss

      
      
      
      
      
      
      
      
      

var app_options = {};

app_options.styleTagTransform = (app_styleTagTransform_default());
app_options.setAttributes = (app_setAttributesWithoutAttributes_default());
app_options.insert = app_insertBySelector_default().bind(null, "head");
app_options.domAPI = (app_styleDomAPI_default());
app_options.insertStyleElement = (app_insertStyleElement_default());

var app_update = app_injectStylesIntoStyleTag_default()(app_main/* default */.A, app_options);




       /* harmony default export */ const app_scss_main = (app_main/* default */.A && app_main/* default */.A.locals ? app_main/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./src/app/constants/Error.js
var app_Error = __webpack_require__(270);
;// ./src/app/utils/load-images.util.js
/**
 * @file load-images.util.js - LoadImages
 *
 * Manages the loading and caching of image assets from a predefined folder.
 * It supports loading WebP and fallback formats, and allows retrieval of
 * `<picture>` elements by their unique image IDs for efficient reuse across
 * the application.
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
 * @dependencies
 * - ERROR_MSG from "@constants/Error"
 *
 * @usage
 * Import and call `load_images()` to preload and cache images from the assets folder.
 * Use `get_image_by_id(id)` to retrieve a `<picture>` element by its unique image ID
 * after images are loaded.
 */


// Cached images store
var app_images_cache = null;

/**
 * Load Images
 *
 * Loads images from the assets folder into memory and prepares `<picture>` elements.
 * Processes images in the specified folder, identifying WebP and fallback formats,
 * and creates an object keyed by image IDs for efficient access.
 *
 * @returns {Object} - A collection of image IDs mapped to their `<picture>` elements.
 */
var app_load_images = function load_images() {
  if (app_images_cache) {
    console.log("ƛ :: IMAGE CACHE SUCCESSFULLY LOADED - ", app_images_cache);
    return app_images_cache;
  }
  var _images_context = __webpack_require__(718);
  var images = {}; // Store `<picture>` elements by ID
  var variants = {}; // Store image variants for responsive `srcset`
  var sorted_images = _images_context.keys().sort(); // Sort image paths for consistency

  sorted_images.forEach(function (image_path) {
    var base_image_path = image_path.replace(/\.(png|jpe?g|gif|webp)$/, ""); // Remove extension
    var image_id = base_image_path.split("/").pop(); // Extract image ID
    var variant_match = image_path.match(/-\d+/g); // Detect variant numbering

    if (variant_match) {
      // Process variant images
      var original_id = image_id.replace(variant_match.join(","), ""); // Base ID without variant
      variants[original_id] = variants[original_id] || [];
      variants[original_id].push(image_path); // Store variant for later processing
      return; // Skip main processing for variants
    }
    var webp_src_set = variants[image_id] ? variants[image_id].map(function (variant) {
      return "/assets/".concat(variant.replace(/\.(png|jpe?g|gif|webp)$/, ""), ".webp ").concat(variant.match(/\d+/g), "w");
    }).join(", ") : "/assets/".concat(base_image_path, ".webp");
    var fallback_src = _images_context(image_path); // Fallback image path

    var picture_html = "\n      <picture id=\"".concat(image_id, "\">\n        <source type=\"image/webp\" srcset=\"").concat(webp_src_set, "\">\n        <img src=\"").concat(fallback_src, "\" alt=\"").concat(image_id, "\">\n      </picture>\n    ");
    var template = document.createElement("template");
    template.innerHTML = picture_html.trim();
    images[image_id] = template.content.firstChild; // Add `<picture>` to collection
  });
  app_images_cache = images; // Cache the loaded images
  return images;
};

/**
 * Get Image By ID
 *
 * Retrieves a `<picture>` element by its unique image ID.
 *
 * @description
 * Ensures images are loaded into memory and provides a method to fetch specific
 * `<picture>` elements using their IDs.
 *
 * @param {string} id - The unique ID of the image (filename without extension).
 * @returns {HTMLElement|null} - The corresponding `<picture>` element or `null` if not found.
 */
var app_get_image_by_id = function get_image_by_id(id) {
  if (!app_images_cache) {
    console.warn(app_Error/* ERROR_MSG */.D.IMGs_NOT_LOADED_YET);
    app_load_images(); // Load images if not already cached
  }
  return app_images_cache ? app_images_cache[id] : null;
};

// EXTERNAL MODULE: ./src/app/constants/Data.js
var app_Data = __webpack_require__(426);
;// ./src/app/components/blast-image.component.js
function app_typeof(o) { "@babel/helpers - typeof"; return app_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, app_typeof(o); }
function app_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function app_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, app_toPropertyKey(o.key), o); } }
function app_createClass(e, r, t) { return r && app_defineProperties(e.prototype, r), t && app_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function app_toPropertyKey(t) { var i = app_toPrimitive(t, "string"); return "symbol" == app_typeof(i) ? i : i + ""; }
function app_toPrimitive(t, r) { if ("object" != app_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != app_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function app_callSuper(t, o, e) { return o = app_getPrototypeOf(o), app_possibleConstructorReturn(t, app_isNativeReflectConstruct() ? Reflect.construct(o, e || [], app_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function app_possibleConstructorReturn(t, e) { if (e && ("object" == app_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return app_assertThisInitialized(t); }
function app_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function app_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && app_setPrototypeOf(t, e); }
function app_wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return app_wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !app_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return app_construct(t, arguments, app_getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), app_setPrototypeOf(Wrapper, t); }, app_wrapNativeSuper(t); }
function app_construct(t, e, r) { if (app_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && app_setPrototypeOf(p, r.prototype), p; }
function app_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (app_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function app_isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function app_setPrototypeOf(t, e) { return app_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, app_setPrototypeOf(t, e); }
function app_getPrototypeOf(t) { return app_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, app_getPrototypeOf(t); }
/**
 * @file blast-image.component.js - BlastImageComponent
 *
 * This file defines the `<blast-image>` custom element and its functionality.
 * The component replaces instances of `<blast-image>` in the DOM with `<picture>`
 * elements based on metadata provided via the `img` attribute. Additional attributes
 * can be transferred to the `<picture>` element or its child `<img>` element.
 *
 * Error scenarios are handled for missing or invalid attributes, ensuring robustness.
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
 * @dependencies
 * - get_image_by_id from "@utils/load-images.util"
 * - ERROR_MSG from "@constants/Error"
 * - CUSTOM_COMPONENT from "@constants/Data"
 *
 * @usage
 * <blast-image img="image_name"></blast-image>
 */



var app_BlastImage = /*#__PURE__*/function (_HTMLElement) {
  function BlastImage() {
    var _this;
    app_classCallCheck(this, BlastImage);
    _this = app_callSuper(this, BlastImage);

    /**
     * Default options for the `<blast-image>` component.
     *
     * @property {Object} options - Component options extracted from attributes.
     * @property {string|null} options.image_name - Name of the image to fetch from the `img` attribute.
     * @property {Array} options.attributes - Additional attributes to transfer to the `<picture>` or `<img>`.
     */
    _this.options = {
      attributes: Array.from(_this.attributes).filter(function (attr) {
        return attr.name !== "img";
      }),
      image_name: _this.getAttribute("img") || null
    };
    return _this;
  }

  /**
   * Lifecycle method triggered when the element is added to the DOM.
   * Processes the `<blast-image>` element by invoking `_process_blast_image`.
   */
  app_inherits(BlastImage, _HTMLElement);
  return app_createClass(BlastImage, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this._process_blast_image();
    }

    /**
     * _Process Blast Image
     *
     * Processes a single `<blast-image>` element by replacing it with a `<picture>` element.
     *
     * Fetches the image using the `img` attribute, transfers additional attributes,
     * and handles error cases if the image is not found.
     *
     * @throws
     * Logs errors and displays fallback messages for missing `img` attributes
     * or unfound image references.
     */
  }, {
    key: "_process_blast_image",
    value: function _process_blast_image() {
      var _this$options = this.options,
        image_name = _this$options.image_name,
        attributes = _this$options.attributes;
      if (!image_name) {
        console.error(app_Error/* ERROR_MSG */.D.COMPONENT_ATTRIBUTE_REQUIRED("img", "blast-image"));
        this.textContent = app_Error/* ERROR_MSG */.D.COMPONENT_ATTRIBUTE_MISSING("img");
        return;
      }
      var image = app_get_image_by_id(image_name);
      if (image) {
        var picture = image.cloneNode(true);
        var container = attributes.some(function (attr) {
          return attr.name === "class";
        }) ? document.createElement("div") : this;
        attributes.forEach(function (attr) {
          if (attr.name === "class") {
            container.classList.add(attr.value);
          } else if (attr.name === "sizes") {
            picture.querySelector("source").setAttribute(attr.name, attr.value);
          } else {
            picture.querySelector("img").setAttribute(attr.name, attr.value);
          }
        });
        if (container === this) {
          this.replaceWith(picture);
        } else {
          container.appendChild(picture);
          this.replaceWith(container);
        }
      } else {
        console.error(app_Error/* ERROR_MSG */.D.IMG_NAME_NOT_FOUND(image_name));
        this.textContent = app_Error/* ERROR_MSG */.D.IMG_NAME_NOT_FOUND(image_name);
      }
    }
  }]);
}(/*#__PURE__*/app_wrapNativeSuper(HTMLElement));
/**
 * _Replace All Blast Images
 *
 * Replaces all `<blast-image>` elements in the DOM with `<picture>` elements.
 *
 * @description
 * Iterates through all instances of the `<blast-image>` element and invokes
 * their `connectedCallback` method to replace them with the appropriate `<picture>` tags.
 */
var app_replace_all_blast_images = function _replace_all_blast_images() {
  document.querySelectorAll(app_Data.CUSTOM_COMPONENT.BLAST_IMG.name).forEach(function (blast_image) {
    blast_image.connectedCallback();
  });
};
document.addEventListener("DOMContentLoaded", app_replace_all_blast_images);
customElements.define(app_Data.CUSTOM_COMPONENT.BLAST_IMG.name, app_BlastImage);
;// ./src/app/components/class-scheduler.component.js
function app_class_scheduler_component_typeof(o) { "@babel/helpers - typeof"; return app_class_scheduler_component_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, app_class_scheduler_component_typeof(o); }
function app_class_scheduler_component_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function app_class_scheduler_component_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, app_class_scheduler_component_toPropertyKey(o.key), o); } }
function app_class_scheduler_component_createClass(e, r, t) { return r && app_class_scheduler_component_defineProperties(e.prototype, r), t && app_class_scheduler_component_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function app_class_scheduler_component_toPropertyKey(t) { var i = app_class_scheduler_component_toPrimitive(t, "string"); return "symbol" == app_class_scheduler_component_typeof(i) ? i : i + ""; }
function app_class_scheduler_component_toPrimitive(t, r) { if ("object" != app_class_scheduler_component_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != app_class_scheduler_component_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function app_class_scheduler_component_callSuper(t, o, e) { return o = app_class_scheduler_component_getPrototypeOf(o), app_class_scheduler_component_possibleConstructorReturn(t, app_class_scheduler_component_isNativeReflectConstruct() ? Reflect.construct(o, e || [], app_class_scheduler_component_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function app_class_scheduler_component_possibleConstructorReturn(t, e) { if (e && ("object" == app_class_scheduler_component_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return app_class_scheduler_component_assertThisInitialized(t); }
function app_class_scheduler_component_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function app_class_scheduler_component_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && app_class_scheduler_component_setPrototypeOf(t, e); }
function app_class_scheduler_component_wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return app_class_scheduler_component_wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !app_class_scheduler_component_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return app_class_scheduler_component_construct(t, arguments, app_class_scheduler_component_getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), app_class_scheduler_component_setPrototypeOf(Wrapper, t); }, app_class_scheduler_component_wrapNativeSuper(t); }
function app_class_scheduler_component_construct(t, e, r) { if (app_class_scheduler_component_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && app_class_scheduler_component_setPrototypeOf(p, r.prototype), p; }
function app_class_scheduler_component_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (app_class_scheduler_component_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function app_class_scheduler_component_isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function app_class_scheduler_component_setPrototypeOf(t, e) { return app_class_scheduler_component_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, app_class_scheduler_component_setPrototypeOf(t, e); }
function app_class_scheduler_component_getPrototypeOf(t) { return app_class_scheduler_component_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, app_class_scheduler_component_getPrototypeOf(t); }
/**
 * @file class-scheduler.component.js - ClassSchedulerComponent
 *
 * This file defines the `ClassScheduler` custom element, a web component used
 * to schedule classes dynamically. It handles attributes to initialize scheduling,
 * communicates with a web worker for background processing, and updates the DOM
 * based on the worker's response.
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
 * @dependencies
 * - CUSTOM_COMPONENT from "@constants/Data"
 * - ERROR_MSG from "@constants/Error"
 *
 * @usage
 * <class-scheduler class-scheduled="some-class" start="2025-01-15T10:00:00"></class-scheduler>
 */


var app_ClassScheduler = /*#__PURE__*/function (_HTMLElement) {
  function ClassScheduler() {
    var _this;
    app_class_scheduler_component_classCallCheck(this, ClassScheduler);
    _this = app_class_scheduler_component_callSuper(this, ClassScheduler);

    /**
     * Options for the ClassScheduler component.
     *
     * @property {string|null} class_scheduled - The class to schedule, taken from the `class-scheduled` attribute.
     * @property {HTMLElement|null} component - The component instance itself.
     * @property {string|null} start - The start time, taken from the `start` attribute.
     */
    _this.options = {
      class_scheduled: _this.getAttribute("class-scheduled") || null,
      component: _this || null,
      start: _this.getAttribute("start") || null
    };

    /**
     * Web worker instance for handling background scheduling logic.
     *
     * @property {Worker} worker - Instance of the worker used for processing
     * scheduling tasks asynchronously.
     */
    _this.worker = new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(424), __webpack_require__.b));
    _this.worker.onmessage = _this._handle_worker_message.bind(_this);
    return _this;
  }

  /**
   * Lifecycle method triggered when the element is added to the DOM.
   *
   * @description
   * Invokes the `initialize_scheduler` method to validate attributes and initiate
   * the scheduling process.
   *
   * @return {void}
   */
  app_class_scheduler_component_inherits(ClassScheduler, _HTMLElement);
  return app_class_scheduler_component_createClass(ClassScheduler, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this._initialize_scheduler();
    }

    /**
     * _Initialize Scheduler
     *
     * Initializes the scheduler by validating required attributes and posting
     * the scheduling data to the web worker for background processing.
     *
     * Validates the presence of `class_scheduled` and `start` attributes.
     * If validation passes, sends a message to the worker with the scheduling details.
     *
     * @return {void}
     */
  }, {
    key: "_initialize_scheduler",
    value: function _initialize_scheduler() {
      var _this$options = this.options,
        class_scheduled = _this$options.class_scheduled,
        start = _this$options.start;
      if (!class_scheduled || !start) {
        console.error(app_Error/* ERROR_MSG */.D.COMPONENT_ATTRIBUTE_REQUIRED(!class_scheduled ? "class-scheduled" : "start", app_Data.CUSTOM_COMPONENT.CLASS_SCHEDULER_COMPONENT.name));
        this.textContent = app_Error/* ERROR_MSG */.D.COMPONENT_ATTRIBUTE_REQUIRED(!class_scheduled ? "class-scheduled" : "start");
        return;
      }
      this.worker.postMessage({
        class_scheduled: class_scheduled,
        start: start
      });
    }

    /**
     * _Handle Worker Message
     *
     * Handles messages received from the web worker.
     *
     * Processes the response from the worker, updating the DOM or handling errors as necessary.
     * If the worker responds with an error, logs the error and displays it as text content.
     * Otherwise, applies the scheduled class to the component.
     *
     * @param {MessageEvent} event - The message event object containing data from the worker.
     *
     * @return {void}
     */
  }, {
    key: "_handle_worker_message",
    value: function _handle_worker_message(event) {
      var _event$data = event.data,
        class_scheduled = _event$data.class_scheduled,
        error = _event$data.error;
      if (error) {
        console.error(error);
        this.textContent = error;
        return;
      }
      this.options.component.classList.add(class_scheduled);
    }
  }]);
}(/*#__PURE__*/app_class_scheduler_component_wrapNativeSuper(HTMLElement));
/**
 * _Initialize All Components
 *
 * Initialize all `<class-scheduler>` elements in the DOM.
 *
 * Iterates through all instances of the `<class-scheduler>` element and invokes
 * their `connectedCallback` method to set the setTimeOut() for the ClassScheduled
 * of each element.
 *
 * @return {void}
 */
var app_initialize_all_components = function _initialize_all_components() {
  document.querySelectorAll(app_Data.CUSTOM_COMPONENT.CLASS_SCHEDULER_COMPONENT.name).forEach(function (component) {
    component.connectedCallback();
  });
};
document.addEventListener("DOMContentLoaded", app_initialize_all_components);
customElements.define(app_Data.CUSTOM_COMPONENT.CLASS_SCHEDULER_COMPONENT.name, app_ClassScheduler);
;// ./src/app/index.js
/**
 * @file index.js - AppIndex
 *
 * This file serves as the main entry point for the application. It initializes
 * global styles, registers custom web components, and preloads image assets into
 * memory to optimize site performance.
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
 * @dependencies
 * - load_images from "@utils/load-images.util"
 *
 * @usage
 * Include this file as the entry point in the Webpack configuration to
 * ensure the application is properly initialized during build and runtime.
 */




app_load_images();
})();

/******/ })()
;
//# sourceMappingURL=bundle-36b6f7f75cddaf2bec66.js.map