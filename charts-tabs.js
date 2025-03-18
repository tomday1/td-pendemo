$(document).ready(function() {
    function determinePageUrl() {
        var activeTabId = $('.nav-tabs .nav-link.active').attr('href').substring(1); // Get the active tab ID
        if (activeTabId) {
            return 'https://tomday1.github.io/td-pendemo/charts-' + activeTabId;
        } else {
            return 'https://tomday1.github.io/td-pendemo/charts-area'; // Default URL
        }
    }

    // Initialize the URL on page load
    pendo.location.setUrl(function() {
        return determinePageUrl();
    });

    // Listen for tab click events
    $('.nav-tabs .nav-link').on('click', function() {
        pendo.location.setUrl(function() {
            return determinePageUrl();
        });
    });
});