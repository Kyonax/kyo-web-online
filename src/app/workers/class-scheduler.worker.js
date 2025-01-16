self.onmessage = function (event) {
  const { classScheduled, start } = event.data;

  if (!classScheduled || !start) {
    self.postMessage({
      error:
        `Required attributes are missing: ${!classScheduled ? "classScheduled" : ""} ${!start ? "start" : ""}`.trim(),
    });
    return;
  }

  // Simulate scheduling delay
  setTimeout(() => {
    self.postMessage({ classScheduled });
  }, start);
};
