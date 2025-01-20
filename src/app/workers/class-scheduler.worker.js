/**
 * @file class-scheduler.worker.js - ClassSchedulerWorker
 *
 * This worker script handles scheduling tasks by processing messages from the main thread.
 * It simulates a delay based on the provided `start` time and returns the `class_scheduled`
 * back to the main thread. If required attributes are missing, an error message is sent.
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
 * @usage
 * The main thread should instantiate this worker and post messages containing the
 * required attributes: `class-scheduled` (name of the class to schedule) and
 * `start` (delay in milliseconds).
 */
self.onmessage = function (event) {
  const { class_scheduled, start } = event.data;

  // Simulate scheduling delay
  setTimeout(() => {
    self.postMessage({ class_scheduled });
  }, start);
};
