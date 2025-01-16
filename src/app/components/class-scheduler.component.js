/**
 * @file ClassScheduler Component
 *
 * This file defines the `ClassScheduler` custom element, a web component used
 * to schedule classes dynamically. It handles attributes to initialize scheduling,
 * communicates with a web worker for background processing, and updates the DOM
 * based on the worker's response.
 *
 * @author Cristian Moreno (Kyonax)
 * @contact iamkyo@kyo.wtf
 * @since 2025-01-15
 *
 * @dependencies
 * - ERROR_MSG from "@constants/Error"
 * - CUSTOM_COMPONENT from "@constants/Data"
 *
 * @usage
 * ```html
 * <class-scheduler classScheduled="some-class" start="2025-01-15T10:00:00"></class-scheduler>
 * ```
 */

import { ERROR_MSG } from "@constants/Error";
import { CUSTOM_COMPONENT } from "@constants/Data";

class ClassScheduler extends HTMLElement {
  constructor() {
    super();

    /**
     * @property {Object} options - Component options extracted from attributes.
     * @property {string|null} options.classScheduled - The class to schedule.
     * @property {HTMLElement|null} options.component - Reference to the component itself.
     * @property {string|null} options.start - The start time for scheduling.
     */
    this.options = {
      classScheduled: this.getAttribute("classScheduled") || null,
      component: this || null,
      start: this.getAttribute("start") || null,
    };

    /**
     * @property {Worker} worker - Web worker instance for background processing.
     */
    this.worker = new Worker(
      new URL("../workers/class-scheduler.worker.js", import.meta.url),
    );
    this.worker.onmessage = this.handleWorkerMessage.bind(this);
  }

  /**
   * Lifecycle method called when the component is added to the DOM.
   */
  connectedCallback() {
    this.initializeScheduler();
  }

  /**
   * Initializes the scheduler by validating attributes and posting
   * a message to the worker.
   */
  initializeScheduler() {
    const { classScheduled, start } = this.options;

    if (!classScheduled || !start) {
      console.error(
        ERROR_MSG.COMPONENT_ATTRIBUTE_REQUIRED(
          !classScheduled ? "classScheduled" : "start",
          CUSTOM_COMPONENT.CLASS_SCHEDULER_COMPONENT.name,
        ),
      );
      this.textContent = ERROR_MSG.COMPONENT_ATTRIBUTE_REQUIRED(
        !classScheduled ? "classScheduled" : "start",
      );
      return;
    }

    this.worker.postMessage({ classScheduled, start });
  }

  /**
   * Handles messages received from the worker.
   *
   * @param {MessageEvent} event - The message event from the worker.
   */
  handleWorkerMessage(event) {
    const { classScheduled, error } = event.data;

    if (error) {
      console.error(error);
      this.textContent = error;
      return;
    }

    this.options.component.classList.add(classScheduled);
  }
}

/**
 * Initializes all `ClassScheduler` components on the page.
 */
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
