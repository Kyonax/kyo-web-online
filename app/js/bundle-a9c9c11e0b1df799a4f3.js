/******/ (() => { // webpackBootstrap
self.onmessage = function (event) {
  var _event$data = event.data,
    classScheduled = _event$data.classScheduled,
    start = _event$data.start;
  if (!classScheduled || !start) {
    self.postMessage({
      error: "Required attributes are missing: ".concat(!classScheduled ? "classScheduled" : "", " ").concat(!start ? "start" : "").trim()
    });
    return;
  }

  // Simulate scheduling delay
  setTimeout(function () {
    self.postMessage({
      classScheduled: classScheduled
    });
  }, start);
};
/******/ })()
;
//# sourceMappingURL=bundle-a9c9c11e0b1df799a4f3.js.map