function pageLoadTimeDetailed() {
    if (typeof pendo !== 'undefined' && typeof pendo.isReady === 'function' && pendo.isReady()) {
        console.log("Pendo is ready. Proceeding with performance data recording.");

        if (window.performance && window.performance.getEntriesByType) {
            const navigationEntries = performance.getEntriesByType('navigation');
            const resourceEntries = performance.getEntriesByType('resource');

            if (navigationEntries && navigationEntries.length > 0) {
                const navigationEntry = navigationEntries[0];

                const startTime = navigationEntry.startTime / 1000;
                const domContentLoadedTime = (navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime) / 1000;
                const loadTime = (navigationEntry.loadEventEnd - navigationEntry.startTime) / 1000;
                const responseTime = (navigationEntry.responseEnd - navigationEntry.startTime) / 1000;
                const finishTime = (navigationEntry.loadEventEnd - navigationEntry.startTime) / 1000;

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
                console.log("  Start Time:", startTime.toFixed(2), "secs");
                console.log("  DOMContentLoaded Time:", domContentLoadedTime.toFixed(2), "secs");
                console.log("  Response Time:", responseTime.toFixed(2), "secs");
                console.log("  Load Time:", loadTime.toFixed(2), "secs");
                console.log("  Finish Time:", finishTime.toFixed(2), "secs");
                console.log("  Page URL:", pageUrl);

                // Check if the visitorId is 'tom' before proceeding with pendo.track
                if (visitorId === 'tom') {
                    const filteredResources = resourceEntries.filter(entry => entry.initiatorType === 'script' || entry.initiatorType === 'link');
                    const sortedResources = filteredResources.sort((a, b) => b.duration - a.duration);

                    console.log("\nSlowest Script and Stylesheet Loading Times (First):");
                    const tableHeader = "| Resource Name                           | Duration (secs) | Full Request URL                                                |";
                    const separator = "|-----------------------------------------|-----------------|-----------------------------------------------------------------|";
                    console.log(tableHeader);
                    console.log(separator);

                    sortedResources.forEach(entry => {
                        let resourceName = '';
                        const parts = entry.name.split('/');
                        if (parts.length > 0) {
                            resourceName = parts[parts.length - 1];
                            if (resourceName === '') {
                                resourceName = entry.name.substring(0, 40) + (entry.name.length > 40 ? '...' : '');
                            }
                        } else {
                            resourceName = entry.name.substring(0, 40) + (entry.name.length > 40 ? '...' : '');
                        }
                        const paddedResourceName = resourceName.padEnd(40, ' ');
                        const durationSec = (entry.duration / 1000).toFixed(2);
                        const fullRequestURL = entry.name;
                        console.log(`| ${paddedResourceName} | ${durationSec} | ${fullRequestURL} |`);

                        // Track each resource as a separate Pendo event
                        pendo.track("Resource Load Time", {
                            visitorId: visitorId,
                            location: location,
                            pageURL: pageUrl,
                            resourceName: entry.name, // Use the full URL for consistency in Pendo
                            durationSec: entry.duration / 1000
                        });
                    });

                    // Track the overall page load performance once
                    pendo.track("Page Load Performance Summary", {
                        visitorId: visitorId,
                        location: location,
                        loadTimeSec: loadTime / 1000,
                        domContentLoadedTimeSec: domContentLoadedTime / 1000,
                        responseTimeSec: responseTime / 1000,
                        finishTimeSec: finishTime / 1000,
                        pageURL: pageUrl
                    });
                } else {
                    console.log("Pendo tracking skipped for visitor ID:", visitorId);
                }

            } else {
                console.log("Navigation timing data not available.");
            }
        } else {
            console.log("Performance navigation API not supported.");
        }
    } else {
        console.log("Pendo is not ready yet. Retrying performance data recording...");
        setTimeout(pageLoadTimeDetailed, 200);
    }
}

// Start the process when the page finishes loading
window.addEventListener('load', function() {
        pageLoadTimeDetailed();
});