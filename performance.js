function pageLoadTime() {
    
    if (typeof pendo !== 'undefined' && typeof pendo.isReady === 'function' && pendo.isReady()) {
        console.log("Pendo is ready. Proceeding with performance data recording.");

        if (window.performance && window.performance.getEntriesByType) {
            const navigationEntries = performance.getEntriesByType('navigation');

            if (navigationEntries && navigationEntries.length > 0) {
                const loadTimeMs = navigationEntries[0].loadEventEnd - navigationEntries[0].startTime;
                const loadTimeSec = loadTimeMs / 1000;
                const pageUrl = window.location.href;
                
                const metadata = pendo.getSerializedMetadata();

                let visitorId = 'Pendo visitor ID not found'; // Default value
                let location = 'Location not found'; // Default value

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
                console.log("  Location", location);
                console.log("  Load Time:", loadTimeSec, "seconds");
                console.log("  Page URL:", pageUrl);
                // Send this data to your server or analytics tool.

                pendo.track("Page Performance", {
                    visitorId: visitorId,
                    location: location,
                    loadTimeSec: loadTimeSec,
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
        setTimeout(pageLoadTime, 200); // Retry after a delay
    }
}

// Start the process when the page finishes loading
window.addEventListener('load', function() {
    pageLoadTime();
});