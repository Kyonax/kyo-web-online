/**
 * @file Blast Image Component
 *
 * This file defines the `<blast-image>` custom element and its functionality.
 * The component replaces instances of `<blast-image>` in the DOM with `<picture>`
 * elements based on metadata provided via the `img` attribute. Additional attributes
 * can be transferred to the `<picture>` element or its child `<img>` element.
 *
 * Error scenarios are handled for missing or invalid attributes, ensuring robustness.
 *
 * @dependencies
 * - `get_image_by_id` from `@utils/loadImages`: Fetches pre-defined `<picture>` elements.
 * - Constants from `@constants/Error` and `@constants/Data` for error handling and
 *   custom component definitions.
 *
 * @author Cristian Moreno (Kyonax)
 * @contact iamkyo@kyo.wtf
 * @since 2025-01-15

 * @usage
 * ```html
 * <blast-image img="image_name"></blast-image>
 * ```
 */

// App Imports
import { get_image_by_id } from "@utils/load-images.util";

// Constant Files
import { ERROR_MSG } from "@constants/Error";
import { CUSTOM_COMPONENT } from "@constants/Data";

/**
 * Custom Element: BlastImage
 *
 * @description
 * Defines the `<blast-image>` element to enhance image management and rendering.
 * Replaces the element with a `<picture>` tag while transferring attributes and
 * handling errors for missing or invalid configurations.
 */
class BlastImage extends HTMLElement {
  constructor() {
    super();

    /**
     * Default options for the `<blast-image>` component.
     *
     * @property {Object} options - Component options extracted from attributes.
     * @property {string|null} options.image_name - Name of the image to fetch from the `img` attribute.
     * @property {Array} options.attributes - Additional attributes to transfer to the `<picture>` or `<img>`.
     */
    this.options = {
      attributes: Array.from(this.attributes).filter(
        (attr) => attr.name !== "img",
      ),
      image_name: this.getAttribute("img") || null,
    };
  }

  /**
   * Lifecycle method triggered when the element is added to the DOM.
   * Processes the `<blast-image>` element by invoking `_process_blast_image`.
   */
  connectedCallback() {
    this._process_blast_image();
  }

  /**
   * Processes a single `<blast-image>` element by replacing it with a `<picture>` element.
   *
   * @description
   * Fetches the image using the `img` attribute, transfers additional attributes,
   * and handles error cases if the image is not found.
   *
   * @throws
   * Logs errors and displays fallback messages for missing `img` attributes
   * or unfound image references.
   */
  _process_blast_image() {
    const { image_name, attributes } = this.options;

    if (!image_name) {
      console.error(ERROR_MSG.COMPONENT_ATTRIBUTE_REQUIRED("img", "blast-image"));
      this.textContent = ERROR_MSG.COMPONENT_ATTRIBUTE_MISSING("img");
      return;
    }

    const image = get_image_by_id(image_name);

    if (image) {
      const picture = image.cloneNode(true);
      const container = attributes.some((attr) => attr.name === "class")
        ? document.createElement("div")
        : this;

      attributes.forEach((attr) => {
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
      console.error(ERROR_MSG.IMG_NAME_NOT_FOUND(image_name));
      this.textContent = ERROR_MSG.IMG_NAME_NOT_FOUND(image_name);
    }
  }
}

/**
 * Replaces all `<blast-image>` elements in the DOM with `<picture>` elements.
 *
 * @description
 * Iterates through all instances of the `<blast-image>` element and invokes
 * their `connectedCallback` method to replace them with the appropriate `<picture>` tags.
 */
const _replace_all_blast_images = () => {
  document
    .querySelectorAll(CUSTOM_COMPONENT.BLAST_IMG.name)
    .forEach((blast_image) => {
      blast_image.connectedCallback();
    });
};

document.addEventListener("DOMContentLoaded", _replace_all_blast_images);
customElements.define(CUSTOM_COMPONENT.BLAST_IMG.name, BlastImage);
