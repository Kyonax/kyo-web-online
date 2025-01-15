import { ERROR_MSG } from "@constants/Error";
import { CUSTOM_COMPONENT } from "@constants/Data";

// TODO: REMOVE CLASS
class FlareElement extends HTMLElement {
  constructor() {
    super();

    this.options = {
      start: this.getAttribute("start") || null,
      element: this || null,
      flare: this.getAttribute("flare") || null,
    };
  }

  connectedCallback() {
    this.initializeFlareElement();
  }

  initializeFlareElement() {
    const flareElement = this.options;

    if (!flareElement.start) {
      console.error(ERROR_MSG.COMPONENT_ATTRIBUTE_REQUIRED("start", "flare-element"));
      this.textContent = ERROR_MSG.COMPONENT_ATTRIBUTE_MISSING("start");
      return;
    }

    if (!flareElement.flare) {
      console.error(ERROR_MSG.COMPONENT_ATTRIBUTE_REQUIRED("flare", "flare-element"));
      this.textContent = ERROR_MSG.COMPONENT_ATTRIBUTE_MISSING("flare");
      return;
    }
    // TODO: Improve Coding and Create Code Documentation
    setTimeout(() => {
      flareElement.element.classList.add(flareElement.flare);
    }, flareElement.start)
  }
}

const initializeAllFlareElements = () => {
  document.querySelectorAll(CUSTOM_COMPONENT.FLARE_ELEMENT.name).forEach((flareElement) => {
    console.log(`Querying: `, flareElement);
    flareElement.connectedCallback();
  })
};

