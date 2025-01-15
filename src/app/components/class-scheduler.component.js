import { ERROR_MSG } from "@constants/Error";
import { CUSTOM_COMPONENT } from "@constants/Data";

//TODO: Improve/Refine Class
class ClassScheduler extends HTMLElement {
  constructor() {
    super();

    this.options = {
      classScheduled: this.getAttribute("classScheduled") || null,
      component: this || null,
      start: this.getAttribute("start") || null,
    };
  }

  connectedCallback() {
    this.initializeScheduler();
  }

  initializeScheduler() {
    const scheduler = this.options;

    Object.keys(scheduler).forEach((attribute, value) => {
      if (!scheduler[attribute] && attribute !== "component") {
        console.error(
          ERROR_MSG.COMPONENT_ATTRIBUTE_REQUIRED(
            attribute,
            CUSTOM_COMPONENT.CLASS_SCHEDULER_COMPONENT.name,
          ),
        );
        this.textContent = ERROR_MSG.COMPONENT_ATTRIBUTE_MISSING(attribute);
        return;
      }
    });

    setTimeout(() => {
      scheduler.component.classList.add(scheduler.classScheduled);
    }, scheduler.start);
  }
}

const initializeAllComponents = () => {
  document
    .querySelectorAll(CUSTOM_COMPONENT.CLASS_SCHEDULER_COMPONENT.name)
    .forEach((component) => {
      component.connectedCallback();
    });
};

document.addEventListener("DOMContentLoaded", initializeAllComponents);

customElements.define(
  CUSTOM_COMPONENT.CLASS_SCHEDULER_COMPONENT.name,
  ClassScheduler,
);
