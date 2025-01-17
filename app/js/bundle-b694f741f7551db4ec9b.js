/******/ (() => { // webpackBootstrap
/**
 * Class Scheduler Worker
 *
 * @description
 * This worker script handles scheduling tasks by processing messages from the main thread.
 * It simulates a delay based on the provided `start` time and returns the `class_scheduled`
 * back to the main thread. If required attributes are missing, an error message is sent.
 *
 * Message Protocol:
 * - Incoming Message: `{ class_scheduled: string, start: number }`
 * - Outgoing Messages:
 *   - Success: `{ class_scheduled: string }`
 *   - Error: `{ error: string }`
 *
 * Usage:
 * The main thread should instantiate this worker and post messages containing the
 * required attributes: `class-scheduled` (name of the class to schedule) and
 * `start` (delay in milliseconds).
 *
 * @author Cristian Moreno (Kyonax)
 * @contact iamkyo@kyo.wtf
 * @since 2025-01-15
 *
 * @note
 * Ensure the main thread validates the data structure before posting messages to this worker
 * to minimize unnecessary error handling within the worker.
 */

// Handle messages from the main thread
self.onmessage = function (event) {
  var _event$data = event.data,
    class_scheduled = _event$data.class_scheduled,
    start = _event$data.start;

  // Simulate scheduling delay
  setTimeout(function () {
    self.postMessage({
      class_scheduled: class_scheduled
    });
  }, start);
};
/******/ })()
;
//# sourceMappingURL=bundle-b694f741f7551db4ec9b.js.map