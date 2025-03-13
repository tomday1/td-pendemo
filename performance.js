/* Performance Example with Page URL and Visitor ID */
const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === "navigation") {
            const loadTimeMs = entry.loadEventEnd - entry.loadEventStart;
            const domCompleteTimeMs = entry.domComplete - entry.startTime;

            const loadTimeS = loadTimeMs / 1000; // Convert to seconds
            const domCompleteTimeS = domCompleteTimeMs / 1000; // Convert to seconds

            const pageUrl = window.location.href;
            const visitorId = window.pendo && window.pendo.visitor && window.pendo.visitor.id ? window.pendo.visitor.id : null;

            console.log("Page Load Time (ms):", loadTimeMs, "ms");
            console.log("Page Load Time (s):", loadTimeS.toFixed(2), "s"); // Display with 2 decimal places

            console.log("DOM Complete Time (ms):", domCompleteTimeMs, "ms");
            console.log("DOM Complete Time (s):", domCompleteTimeS.toFixed(2), "s"); // Display with 2 decimal places

            console.log("Page URL:", pageUrl);
            console.log("Visitor ID:", visitorId);

            // Optional: Send data to a server
            // sendPerformanceData({
            //     loadTimeMs: loadTimeMs,
            //     loadTimeS: loadTimeS,
            //     domCompleteTimeMs: domCompleteTimeMs,
            //     domCompleteTimeS: domCompleteTimeS,
            //     pageUrl: pageUrl,
            //     visitorId: visitorId,
            // });
        }
    });
});

observer.observe({ type: "navigation", buffered: true });

// Optional: Function to send performance data to a server
// function sendPerformanceData(data) {
//     fetch('/api/performance', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//     .then(response => {
//         if (!response.ok) {
//             console.error('Failed to send performance data.');
//         }
//     })
//     .catch(error => {
//         console.error('Error sending performance data:', error);
//     });
// }