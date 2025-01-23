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
 * - ERROR_MSG from "@constants/Error"
 * - CUSTOM_COMPONENT from "@constants/Data"
 *
 * @usage
 * <class-scheduler class-scheduled="some-class" start="2025-01-15T10:00:00"></class-scheduler>
 */
import { ERROR_MSG } from "@constants/Error";
import { CUSTOM_COMPONENT } from "@constants/Data";

class ClassScheduler extends HTMLElement {
  constructor() {
    super();

    /**
     * Component options extracted from attributes.
     *
     * @property {Object} options - Configuration options for the `ClassScheduler` component.
     * @property {string|null} options.class_scheduled - The class to be scheduled, derived from the `class_scheduled` attribute.
     * @property {HTMLElement|null} options.component - Reference to the component instance.
     * @property {string|null} options.start - The start time for scheduling, derived from the `start` attribute.
     */
    this.options = {
      class_scheduled: this.getAttribute("class-scheduled") || null,
      component: this || null,
      start: this.getAttribute("start") || null,
    };

    /**
     * Web worker instance for handling background scheduling logic.
     *
     * @property {Worker} worker - Instance of the worker used for processing
     * scheduling tasks asynchronously.
     */
    this.worker = new Worker(
      new URL("../workers/class-scheduler.worker.js", import.meta.url),
    );
    this.worker.onmessage = this._handle_worker_message.bind(this);
  }

  /**
   * Lifecycle method triggered when the element is added to the DOM.
   *
   * @description
   * Invokes the `initialize_scheduler` method to validate attributes and initiate
   * the scheduling process.
   */
  connectedCallback() {
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
  _initialize_scheduler() {
    const { class_scheduled, start } = this.options;

    if (!class_scheduled || !start) {
      console.error(
        ERROR_MSG.COMPONENT_ATTRIBUTE_REQUIRED(
          !class_scheduled ? "class-scheduled" : "start",
          CUSTOM_COMPONENT.CLASS_SCHEDULER_COMPONENT.name,
        ),
      );
      this.textContent = ERROR_MSG.COMPONENT_ATTRIBUTE_REQUIRED(
        !class_scheduled ? "class-scheduled" : "start",
      );
      return;
    }

    this.worker.postMessage({ class_scheduled, start });
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
  _handle_worker_message(event) {
    const { class_scheduled, error } = event.data;

    if (error) {
      console.error(error);
      this.textContent = error;
      return;
    }

    this.options.component.classList.add(class_scheduled);
  }
}

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
const _initialize_all_components = () => {
  document
    .querySelectorAll(CUSTOM_COMPONENT.CLASS_SCHEDULER_COMPONENT.name)
    .forEach((component) => {
      component.connectedCallback();
    });
};

document.addEventListener("DOMContentLoaded", _initialize_all_components);
customElements.define(CUSTOM_COMPONENT.CLASS_SCHEDULER_COMPONENT.name, ClassScheduler);
