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
import "@styling/main.scss";

// Initialize custom elements
import "@components/blastImage";

// Preload image assets into memory for faster access
import { loadImages } from "@utils/loadImages";
loadImages();
