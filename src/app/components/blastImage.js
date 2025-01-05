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
import { getImageById } from "@utils/loadImages";

// Constant Files
import { ERROR_MSG } from "@constants/Error";
import { CUSTOM_COMPONENT } from "@constants/Data";

class BlastImage extends HTMLElement {
  constructor() {
    super();

    /**
     * Default options for the `<blast-image>` component.
     *
     * @description
     * Stores configuration data for processing the `<blast-image>` element.
     * Includes:
     * - `imageName`: Name of the image to fetch (from `img` attribute).
     * - `attributes`: Array of additional attributes to transfer.
     */
    this.options = {
      attributes: Array.from(this.attributes).filter(
        (attr) => attr.name !== "img",
      ),
      imageName: this.getAttribute("img") || null,
    };
  }

  /**
   * Lifecycle method triggered when the element is added to the DOM.
   */
  connectedCallback() {
    this.processBlastImage();
  }

  /**
   * Processes a single `<blast-image>` element by replacing it with a `<picture>` element.
   *
   * @description
   * Fetches the image using the `img` attribute, transfers additional attributes,
   * and handles error cases if the image is not found.
   */
  processBlastImage() {
    const { imageName, attributes } = this.options;

    if (!imageName) {
      console.error(ERROR_MSG.IMG_ATTRIBUTE_REQUIRED);
      this.textContent = ERROR_MSG.IMG_ATTRIBUTE_MISSING;
      return;
    }

    const image = getImageById(imageName);

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
      console.error(ERROR_MSG.IMG_NAME_NOT_FOUND(imageName));
      this.textContent = ERROR_MSG.IMG_NAME_NOT_FOUND(imageName);
    }
  }
}

// Replace all `<blast-image>` elements when DOM is fully loaded
const replaceAllBlastImages = () => {
  document
    .querySelectorAll(CUSTOM_COMPONENT.FAST_IMG.name)
    .forEach((fastImage) => {
      fastImage.connectedCallback();
    });
};

// Run the replacement function after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", replaceAllBlastImages);

// Define the custom element
customElements.define(CUSTOM_COMPONENT.FAST_IMG.name, BlastImage);
