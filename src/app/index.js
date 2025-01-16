/**
 * @file index.js - Entry Point for Application
 *
 * This file serves as the main entry point for the application. It initializes
 * global styles, registers custom web components, and preloads image assets into
 * memory to optimize site performance.
 *
 * @description
 * - Loads the primary SCSS styles for the application.
 * - Registers custom web components for enhanced UI functionality.
 * - Preloads image assets to improve performance and user experience.
 *
 * @author Cristian Moreno (Kyonax)
 * @contact iamkyo@kyo.wtf
 * @since 2025-01-15
 *
 * @dependencies
 * - SCSS file: @styling/main.scss
 * - Custom components:
 *   - @components/blast-image.component
 *   - @components/class-scheduler.component
 * - Utility: loadImages from @utils/loadImages
 */

// Import global styles
import "@styling/main.scss";

// Initialize custom components
import "@components/blast-image.component";
import "@components/class-scheduler.component";

// Preload image assets into memory for faster access
import { loadImages } from "@utils/loadImages";
loadImages();
