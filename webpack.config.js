/**
 * Webpack Configuration File
 *
 * @description
 * Webpack setup for bundling JavaScript, compiling SCSS to CSS, and injecting the bundled files
 * into the HTML template using HtmlWebpackPlugin. Includes development server settings,
 * source maps, and image optimization (with WebP support, excluding SVGs).
 *
 * It also loads metadata from the constants file for dynamic HTML generation (SEO, OG tags, etc.).
 *
 * Author: Cristian Moreno (Kyonax)
 * Email: iamkyo@kyo.wtf
 */

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

// Import configuration constants from Data.js
const {
  AUTHOR_INFO,
  SEO,
  THEME_SETTINGS,
  FAVICON,
  SITE_URL,
  SITE_TITLE,
  APP_DESCRIPTION,
} = require("./src/app/constants/Data");

module.exports = {
  /**
   * Development server
   *
   * @description
   * Configures the Webpack Dev Server to serve files from the "dist" directory.
   * Includes hot reloading, live reload, and support for single-page applications.
   */
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    open: true,
    port: 9000,
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },

  /**
   * Source maps
   *
   * @description
   * Enables source maps for easier debugging during development.
   * Maps bundled code to original source files for error tracing.
   */
  devtool: "source-map",

  /**
   * Entry point for the application
   *
   * @description
   * Specifies the main JavaScript file to start the bundling process.
   * Webpack will begin from this file and include any dependencies.
   */
  entry: "./src/app/index.js",

  /**
   * Build mode
   *
   * @description
   * Defines the mode of the build process. Options are "development" or "production".
   * Development mode enables debugging features like source maps.
   */
  mode: "development",

  /**
   * Module rules
   *
   * @description
   * Defines rules for handling various file types, including SCSS, JavaScript, and images.
   * Excludes SVG files from WebP conversion.
   */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/svg/[name][ext]",
        },
        use: [
          {
            loader: "svgo-loader",
            options: {
              plugins: [{ removeViewBox: false }],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]'
        },
      },
    ],
  },

  /**
   * Optimization settings
   *
   * @description
   * Configures optimization steps, including image compression for PNG, JPEG, and WebP formats
   * while excluding SVG files from being converted to WebP.
   */
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["imagemin-mozjpeg", { quality: 75 }],
              ["imagemin-pngquant", { quality: [0.65, 0.9] }],
              ["imagemin-webp", { quality: 75 }],
            ],
          },
        },
      }),
    ],
  },

  /**
   * Output configuration
   *
   * @description
   * Defines the output location and filename format for the generated files.
   * Ensures clean builds and organizes assets in structured directories.
   */
  output: {
    assetModuleFilename: "assets/[name][ext]",
    clean: true,
    filename: "app/js/bundle-[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },

  /**
   * Plugins
   *
   * @description
   * Defines plugins to extend Webpack's functionality. Includes:
   * - HtmlWebpackPlugin: Injects the JavaScript bundle into the HTML template and uses dynamic metadata from constants.
   * - WebpackManifestPlugin: Generates a manifest for bundled assets.
   * - FaviconsWebpackPlugin: Generates and injects favicon assets in different sizes.
   */
  plugins: [
    new FaviconsWebpackPlugin({
      logo: FAVICON.path,
      prefix: "assets/favicon/",
      inject: true,
      mode: "webapp",
      favicons: {
        appName: SITE_TITLE,
        appDescription: APP_DESCRIPTION,
        developerName: AUTHOR_INFO.name,
        developerURL: SITE_URL,
        background: THEME_SETTINGS.primaryColor,
        theme_color: THEME_SETTINGS.primaryColor,
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "src/views/index.html",
      title: SITE_TITLE,
      description: APP_DESCRIPTION,
      keywords: SEO.keywords,
      author: AUTHOR_INFO.name,
      website_url: SITE_URL,
      website_banner: SEO.websiteBanner,
      og_title: SEO.ogTitle,
      twitter_title: SEO.twitterTitle,
      theme_color: THEME_SETTINGS.primaryColor,
      msapplication_tile_color: THEME_SETTINGS.msApplicationTileColor,
      filename: "index.html",
    }),
    new WebpackManifestPlugin(),
  ],

  /**
   * Resolve configuration
   *
   * @description
   * Adds path aliases for cleaner imports.
   */
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app/'),
      "@components": path.resolve(__dirname, "src/app/components"),
      "@constants": path.resolve(__dirname, "src/app/constants"),
      "@fonts": path.resolve(__dirname, "src/app/fonts"),
      "@plugins": path.resolve(__dirname, "src/app/plugins"),
      "@styling": path.resolve(__dirname, "src/app/scss"),
      "@utils": path.resolve(__dirname, "src/app/utils"),
    },
    extensions: [".js", ".json"],
  },
};
