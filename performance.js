function pageLoadTime() {
    if (typeof pendo !== 'undefined' && typeof pendo.isReady === 'function' && pendo.isReady()) {
        console.log("Pendo is ready. Proceeding with performance data recording.");

        if (window.performance && window.performance.getEntriesByType) {
            const navigationEntries = performance.getEntriesByType('navigation');
            const resourceEntries = performance.getEntriesByType('resource');

            if (navigationEntries && navigationEntries.length > 0) {
                const navigationEntry = navigationEntries[0];

                const startTime = navigationEntry.startTime;
                const domContentLoadedTime = navigationEntry.domContentLoadedEventEnd - startTime;
                const loadTime = navigationEntry.loadEventEnd - startTime;
                const responseTime = navigationEntry.responseEnd - startTime;
                const finishTime = navigationEntry.loadEventEnd - startTime;

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
                console.log("  Finish Time:", finishTime, "ms");
                console.log("  Page URL:", pageUrl);

                const sortedResources = resourceEntries.sort((a, b) => b.duration - a.duration);

                console.log("\nSlowest Resource Loading Times (First):");
                const tableHeader = "| Resource Name                           | Duration (ms) | Start Time (ms) | Response End Time (ms) | Full Request URL                                                |";
                const separator = "|-----------------------------------------|---------------|-----------------|------------------------|-----------------------------------------------------------------|";
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
                    const duration = entry.duration.toFixed(2).padEnd(13, ' ');
                    const startTimeFormatted = entry.startTime.toFixed(2).padEnd(15, ' ');
                    const responseEndTime = entry.responseEnd.toFixed(2).padEnd(22, ' ');
                    const fullRequestURL = entry.name;
                    console.log(`| ${paddedResourceName} | ${duration} | ${startTimeFormatted} | ${responseEndTime} | ${fullRequestURL} |`);
                });

                const resourceTimings = sortedResources.map(entry => ({
                    name: entry.name,
                    duration: entry.duration / 1000
                }));

                pendo.track("Page Load Performance", {
                    visitorId: visitorId,
                    location: location,
                    loadTimeSec: loadTime / 1000,
                    domContentLoadedTimeSec: domContentLoadedTime / 1000,
                    responseTimeSec: responseTime / 1000,
                    finishTimeSec: finishTime / 1000,
                    pageURL: pageUrl,
                    resourceTimings: resourceTimings
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