/* Performance Example */
const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === "navigation") {
        const loadTime = entry.loadEventEnd - entry.loadEventStart;
        const domCompleteTime = entry.domComplete - entry.startTime;
        console.log("Page Load Time (loadEvent):", loadTime, "ms");
        console.log("DOM Complete Time:", domCompleteTime, "ms");
      }
    });
  });
  
  observer.observe({ type: "navigation", buffered: true });