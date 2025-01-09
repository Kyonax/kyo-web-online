/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 426:
/***/ ((module) => {

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
    FAST_IMG: {
      name: "blast-image"
    }
  }
};

/***/ }),

/***/ 270:
/***/ ((module) => {

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

module.exports.D = {
  IMG_ATTRIBUTE_REQUIRED: "Attribute 'img' is required on <blast-image> elements.",
  IMG_ATTRIBUTE_MISSING: "Error: 'img' attribute missing.",
  IMGs_NOT_LOADED_YET: "Images not loaded yet. Initializing loadImages...",
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
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(499), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face{font-family:"SpaceMono";src:url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:"SpaceMono";src:url(${___CSS_LOADER_URL_REPLACEMENT_1___}) format("truetype");font-weight:700;font-style:normal}@font-face{font-family:"SpaceMono";src:url(${___CSS_LOADER_URL_REPLACEMENT_2___}) format("truetype");font-weight:400;font-style:italic}@font-face{font-family:"SpaceMono";src:url(${___CSS_LOADER_URL_REPLACEMENT_3___}) format("truetype");font-weight:700;font-style:italic}@font-face{font-family:"SymbolsNerdFont";src:url(${___CSS_LOADER_URL_REPLACEMENT_4___}) format("truetype");font-weight:700;font-style:italic}body{font-family:"SpaceMono",monospace;font-display:swap;font-size:12px;line-height:14px;letter-spacing:-0.6px}symbol{font-display:swap;font-size:12px;line-height:14px;margin-right:.6rem}*{scrollbar-width:thin}body{background-color:#111;color:#fff;height:100%;overflow:hidden}#main-container{height:93%;display:grid;grid-template-columns:min-content auto;column-gap:.5rem}.container-block{position:relative;border:1px solid hsla(0,0%,100%,.1);padding:.36rem}.page-loader{display:none}.main-scroll-block{display:block;overflow-y:auto;max-height:95vh}#left-section,#right-section{display:grid}#left-section{gap:.5rem}@media(max-width: 575.98px){body{overflow:auto}#main-container{grid-template-columns:1fr;gap:.25rem}#left-section,#right-section{gap:.25rem}.container-block{padding:.25rem}.main-scroll-block{overflow-y:scroll;max-height:100vh}}@media(min-width: 576px)and (max-width: 767.98px){body{overflow:auto}#main-container{grid-template-columns:1fr 2fr}.container-block{padding:.3rem}.main-scroll-block{overflow-y:scroll;max-height:100vh}}@media(min-width: 768px)and (max-width: 991.98px){body{overflow:auto}#main-container{grid-template-columns:min-content auto}.container-block{padding:.36rem}#left-section,#right-section{gap:.5rem}.main-scroll-block{overflow-y:scroll;max-height:100vh}}@media(min-width: 992px)and (max-width: 1199.98px){body{overflow:hidden}#main-container{grid-template-columns:min-content auto}.container-block{padding:.4rem}}@media(min-width: 1200px){body{overflow:hidden}#main-container{grid-template-columns:min-content auto}.container-block{padding:.5rem}}.dev-info{display:block;justify-content:center}.dev-info header{display:grid;gap:.25rem}.dev-info span,.dev-communities span,.dev-tech span{padding-left:.25rem;padding-right:.25rem;background-color:#fff;color:#000}.dev-marquee{position:absolute;bottom:0px;left:0px;right:0px;margin-top:auto;background-color:#000}.dev-communities{margin-bottom:3rem}.dev-info .span-container,.dev-communities .span-container{font-weight:900;display:grid;gap:.25rem;grid-template-columns:max-content auto}.dev-tech .span-container{font-weight:900;display:grid;gap:.25rem;grid-template-columns:max-content max-content max-content}.dev-profile{padding:.25rem;border:1px solid hsla(0,0%,100%,.1);width:min-content;left:0px;right:0px;margin:auto}.dev-img{width:150px;height:150px;overflow:hidden;position:relative;background-color:hsla(0,0%,100%,.1)}.dev-img picture{position:absolute;width:max-content;height:100%;top:0px;right:0px}.dev-img img{height:201%;object-fit:cover}@media(max-width: 575.98px){.dev-tech .span-container{grid-template-columns:repeat(4, 1fr)}}@media(max-width: 414.98px){.dev-tech .span-container{grid-template-columns:repeat(3, 1fr)}}@media(max-width: 320.98px){.dev-tech .span-container{grid-template-columns:repeat(2, 1fr)}}.marquee{background-color:#f9cd26;color:#111;position:absolute;bottom:0;left:0;width:100%;overflow:hidden;--marquee-play: running;--marquee-speed: 33s;box-shadow:0 0 9px 1px #f9cd26;animation:cyberpunk-pulse-1px-9px 1.5s infinite alternate}@keyframes cyberpunk-pulse-1px-9px{0%{box-shadow:0 0 calc(9px/2) calc(1px/2) rgba(249,205,38,.8)}100%{box-shadow:0 0 9px 1px rgba(249,205,38,.5)}}.marquee__items{display:flex;white-space:nowrap;animation:marqueeScroll var(--marquee-speed) linear infinite;animation-play-state:var(--marquee-play);will-change:transform;width:max-content;line-height:1.1rem;font-weight:900}.marquee__item{display:inline-block;margin-right:.5rem}@keyframes marqueeScroll{from{transform:translateX(0%)}to{transform:translateX(-50%)}}`, "",{"version":3,"sources":["webpack://./src/app/scss/abstracts/_mixins.scss","webpack://./src/app/scss/base/_typography.scss","webpack://./src/app/scss/base/_global.scss","webpack://./src/app/scss/abstracts/_variables.scss","webpack://./src/app/scss/layout/_dev-info.scss","webpack://./src/app/scss/components/_marquee.scss"],"names":[],"mappings":"AAkBI,WACI,uBAAA,CACA,8DAAA,CACA,eAAA,CACA,iBAAA,CAJJ,WACI,uBAAA,CACA,8DAAA,CACA,eAAA,CACA,iBAAA,CAJJ,WACI,uBAAA,CACA,8DAAA,CACA,eAAA,CACA,iBAAA,CAJJ,WACI,uBAAA,CACA,8DAAA,CACA,eAAA,CACA,iBAAA,CAJJ,WACI,6BAAA,CACA,8DAAA,CACA,eAAA,CACA,iBAAA,CC4BR,KACI,iCAAA,CACA,iBAAA,CACA,cAAA,CACA,gBAAA,CACA,qBAAA,CAGJ,OACI,iBAAA,CACA,cAAA,CACA,gBAAA,CACA,kBAAA,CC5CJ,EACI,oBAAA,CAUJ,KACI,qBCVY,CDWZ,UCVe,CDWf,WAAA,CACA,eAAA,CAUJ,gBACI,UAAA,CACA,YAAA,CACA,sCAAA,CACA,gBAAA,CAGJ,iBACI,iBAAA,CACA,mCAAA,CACA,cAAA,CAGJ,aACI,YAAA,CAGJ,mBACI,aAAA,CACA,eAAA,CACA,eAAA,CAUJ,6BAEI,YAAA,CAGJ,cACI,SAAA,CAYJ,4BACI,KACI,aAAA,CAGJ,gBACI,yBAAA,CACA,UAAA,CAGJ,6BAEI,UAAA,CAGJ,iBACI,cAAA,CAGJ,mBACI,iBAAA,CACA,gBAAA,CAAA,CAKR,kDACI,KACI,aAAA,CAGJ,gBACI,6BAAA,CAGJ,iBACI,aAAA,CAGJ,mBACI,iBAAA,CACA,gBAAA,CAAA,CAKR,kDACI,KACI,aAAA,CAGJ,gBACI,sCAAA,CAGJ,iBACI,cAAA,CAGJ,6BAEI,SAAA,CAGJ,mBACI,iBAAA,CACA,gBAAA,CAAA,CAKR,mDACI,KACI,eAAA,CAGJ,gBACI,sCAAA,CAGJ,iBACI,aAAA,CAAA,CAKR,0BACI,KACI,eAAA,CAGJ,gBACI,sCAAA,CAGJ,iBACI,aAAA,CAAA,CEzLR,UACI,aAAA,CACA,sBAAA,CAEA,iBACI,YAAA,CACA,UAAA,CAOJ,oDACI,mBAAA,CACA,oBAAA,CACA,qBAAA,CACA,UAAA,CAIR,aACI,iBAAA,CACA,UAAA,CACA,QAAA,CACA,SAAA,CACA,eAAA,CACA,qBAAA,CAGJ,iBACI,kBAAA,CAKA,2DACI,eAAA,CACA,YAAA,CACA,UAAA,CACA,sCAAA,CAKJ,0BACI,eAAA,CACA,YAAA,CACA,UAAA,CACA,yDAAA,CAIR,aACI,cAAA,CACA,mCAAA,CACA,iBAAA,CACA,QAAA,CACA,SAAA,CACA,WAAA,CAGJ,SACI,WAAA,CACA,YAAA,CACA,eAAA,CACA,iBAAA,CACA,mCDlDW,CCqDf,iBACI,iBAAA,CACA,iBAAA,CACA,WAAA,CACA,OAAA,CACA,SAAA,CAGJ,aACI,WAAA,CACA,gBAAA,CAGJ,4BACI,0BACI,oCAAA,CAAA,CAIR,4BACI,0BACI,oCAAA,CAAA,CAIR,4BACI,0BACI,oCAAA,CAAA,CChGR,SACI,wBAAA,CACA,UFeY,CEdZ,iBAAA,CACA,QAAA,CACA,MAAA,CACA,UAAA,CACA,eAAA,CACA,uBAAA,CACA,oBAAA,CLgCA,8BAAA,CAII,yDAAA,CAEA,mCACI,GACI,0DAAA,CAGJ,KACI,0CAAA,CAAA,CKzCZ,gBACI,YAAA,CACA,kBAAA,CACA,4DAAA,CACA,wCAAA,CACA,qBAAA,CACA,iBAAA,CACA,kBAAA,CACA,eAAA,CAGJ,eACI,oBAAA,CACA,kBAAA,CAIJ,yBACI,KACI,wBAAA,CAGJ,GACI,0BAAA,CAAA","sourceRoot":""}]);
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

/***/ }),

/***/ 499:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/fonts/SymbolsNerdFontMono-Regular.ttf";

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
;// ./src/app/utils/loadImages.js
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



// Cached images store
var app_imagesCache = null;

/**
 * Loads images from the assets folder into memory and prepares `<picture>` elements.
 *
 * @description
 * Processes images in the specified folder, identifying WebP and fallback formats,
 * and creates an object keyed by image IDs for efficient access.
 *
 * @returns {Object} - A collection of image IDs mapped to their `<picture>` elements.
 */
var app_loadImages = function loadImages() {
  if (app_imagesCache) {
    console.log("Using cached images.");
    return app_imagesCache;
  }
  var imagesContext = __webpack_require__(718);
  var images = {}; // Store `<picture>` elements by ID
  var variants = {}; // Store image variants for responsive `srcset`
  var sortedImages = imagesContext.keys().sort(); // Sort image paths for consistency

  sortedImages.forEach(function (imagePath) {
    var baseImagePath = imagePath.replace(/\.(png|jpe?g|gif|webp)$/, ""); // Remove extension
    var imageId = baseImagePath.split("/").pop(); // Extract image ID
    var variantMatch = imagePath.match(/-\d+/g); // Detect variant numbering

    if (variantMatch) {
      // Process variant images
      var originalId = imageId.replace(variantMatch.join(","), ""); // Base ID without variant
      variants[originalId] = variants[originalId] || [];
      variants[originalId].push(imagePath); // Store variant for later processing
      return; // Skip main processing for variants
    }
    var webpSrcSet = variants[imageId] ? variants[imageId].map(function (variant) {
      return "/assets/".concat(variant.replace(/\.(png|jpe?g|gif|webp)$/, ""), ".webp ").concat(variant.match(/\d+/g), "w");
    }).join(", ") : "/assets/".concat(baseImagePath, ".webp");
    var fallbackSrc = imagesContext(imagePath); // Fallback image path

    var pictureHTML = "\n      <picture id=\"".concat(imageId, "\">\n        <source type=\"image/webp\" srcset=\"").concat(webpSrcSet, "\">\n        <img src=\"").concat(fallbackSrc, "\" alt=\"").concat(imageId, "\">\n      </picture>\n    ");
    var template = document.createElement("template");
    template.innerHTML = pictureHTML.trim();
    images[imageId] = template.content.firstChild; // Add `<picture>` to collection
  });
  app_imagesCache = images; // Cache the loaded images
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
var app_getImageById = function getImageById(id) {
  if (!app_imagesCache) {
    console.warn(app_Error/* ERROR_MSG */.D.IMGs_NOT_LOADED_YET);
    app_loadImages(); // Load images if not already cached
  }
  return app_imagesCache ? app_imagesCache[id] : null;
};

// EXTERNAL MODULE: ./src/app/constants/Data.js
var app_Data = __webpack_require__(426);
;// ./src/app/components/blastImage.js
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
 * Blast Image Component
 *
 * @description
 * This file defines the `<blast-image>` custom element and replaces all instances
 * in the DOM with `<picture>` elements using metadata provided via the `img` attribute.
 * If additional attributes are present, they are applied to either the container or
 * the `<img>` element inside the `<picture>`. Handles error scenarios for missing or
 * invalid attributes.
 *
 * Dependencies:
 * - `getImageById` from `@utils/loadImages` for fetching pre-defined `<picture>` elements.
 *
 * Author: Cristian Moreno (Kyonax)
 * Email: iamkyo@kyo.wtf
 */

// App Imports


// Constant Files


var app_BlastImage = /*#__PURE__*/function (_HTMLElement) {
  function BlastImage() {
    var _this;
    app_classCallCheck(this, BlastImage);
    _this = app_callSuper(this, BlastImage);

    /**
     * Default options for the `<blast-image>` component.
     *
     * @description
     * Stores configuration data for processing the `<blast-image>` element.
     * Includes:
     * - `imageName`: Name of the image to fetch (from `img` attribute).
     * - `attributes`: Array of additional attributes to transfer.
     */
    _this.options = {
      attributes: Array.from(_this.attributes).filter(function (attr) {
        return attr.name !== "img";
      }),
      imageName: _this.getAttribute("img") || null
    };
    return _this;
  }

  /**
   * Lifecycle method triggered when the element is added to the DOM.
   */
  app_inherits(BlastImage, _HTMLElement);
  return app_createClass(BlastImage, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.processBlastImage();
    }

    /**
     * Processes a single `<blast-image>` element by replacing it with a `<picture>` element.
     *
     * @description
     * Fetches the image using the `img` attribute, transfers additional attributes,
     * and handles error cases if the image is not found.
     */
  }, {
    key: "processBlastImage",
    value: function processBlastImage() {
      var _this$options = this.options,
        imageName = _this$options.imageName,
        attributes = _this$options.attributes;
      if (!imageName) {
        console.error(app_Error/* ERROR_MSG */.D.IMG_ATTRIBUTE_REQUIRED);
        this.textContent = app_Error/* ERROR_MSG */.D.IMG_ATTRIBUTE_MISSING;
        return;
      }
      var image = app_getImageById(imageName);
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
        console.error(app_Error/* ERROR_MSG */.D.IMG_NAME_NOT_FOUND(imageName));
        this.textContent = app_Error/* ERROR_MSG */.D.IMG_NAME_NOT_FOUND(imageName);
      }
    }
  }]);
}(/*#__PURE__*/app_wrapNativeSuper(HTMLElement)); // Replace all `<blast-image>` elements when DOM is fully loaded
var app_replaceAllBlastImages = function replaceAllBlastImages() {
  document.querySelectorAll(app_Data.CUSTOM_COMPONENT.FAST_IMG.name).forEach(function (fastImage) {
    fastImage.connectedCallback();
  });
};

// Run the replacement function after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", app_replaceAllBlastImages);

// Define the custom element
customElements.define(app_Data.CUSTOM_COMPONENT.FAST_IMG.name, app_BlastImage);
;// ./src/app/index.js
/**
 * index.js - Entry Point for Application
 *
 * @description
 * This file serves as the main entry point for the application, initializing styles,
 * custom components, and utilities. It ensures that images are preloaded into the cache
 * for efficient use across the site.
 *
 * @author
 * Cristian Moreno (Kyonax)
 * Email: iamkyo@kyo.wtf
 */

// Import global styles


// Initialize custom elements


// Preload image assets into memory for faster access

app_loadImages();
})();

/******/ })()
;
//# sourceMappingURL=bundle-cdfdc8ce2bee2384fc27.js.map