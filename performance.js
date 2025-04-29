function pageLoadTime() {
    if (typeof pendo !== 'undefined' && typeof pendo.isReady === 'function' && pendo.isReady()) {
        console.log("Pendo is ready. Proceeding with performance data recording.");

        if (window.performance && window.performance.getEntriesByType) {
            const navigationEntries = performance.getEntriesByType('navigation');

            if (navigationEntries && navigationEntries.length > 0) {
                const navigationEntry = navigationEntries[0];

                const startTime = navigationEntry.startTime;
                const domContentLoadedTime = navigationEntry.domContentLoadedEventEnd - startTime;
                const loadTime = navigationEntry.loadEventEnd - startTime;
                const responseTime = navigationEntry.responseEnd - startTime;

                const pageUrl = window.location.href;

                const metadata = pendo.getSerializedMetadata();

                let visitorId = 'Pendo visitor ID not found';
                let location = 'Location not found';

                try {
                    if (metadata && metadata.visitor && metadata.visitor.id) {
                        visitorId = metadata.visitor.id;
                    }
                } catch (error) {
                    console.error("Error getting Pendo visitor ID:", error);
                }

                try {
                    if (metadata && metadata.visitor && metadata.visitor.location) {
                        location = metadata.visitor.location;
                    }
                } catch (error) {
                    console.error("Error getting Location:", error);
                }

                console.log("Page Load Time Data:");

                console.log("  Pendo Visitor ID:", visitorId);
                console.log("  Location:", location);
                console.log("  Start Time:", startTime, "ms");
                console.log("  DOMContentLoaded Time:", domContentLoadedTime, "ms");
                console.log("  Load Time:", loadTime, "ms");
                console.log("  Response Time:", responseTime, "ms");
                console.log("  Page URL:", pageUrl);

                pendo.track("Page Load Performance", {
                    visitorId: visitorId,
                    location: location,
                    loadTimeSec: loadTime / 1000, // Convert to seconds
                    domContentLoadedTimeSec: domContentLoadedTime / 1000,
                    responseTimeSec: responseTime / 1000,
                    pageURL: pageUrl
                });

            } else {
                console.log("Navigation timing data not available.");
            }
        } else {
            console.log("Performance navigation API not supported.");
        }
    } else {
        console.log("Pendo is not ready yet. Retrying performance data recording...");
        setTimeout(pageLoadTime, 200);
    }
}

// Start the process when the page finishes loading
window.addEventListener('load', function() {
    pageLoadTime();
});