pendo.location.setUrl('http://localhost:8000/charts-area');

function updateUrl(tabId) {
    var baseUrl = '';

    if (window.location.hostname === 'localhost') {
        baseUrl = 'http://localhost:8000/charts';
    } else if (window.location.hostname === 'tomday1.github.io') {
        baseUrl = 'https://tomday1.github.io/td-pendemo/charts';
    } else {
        baseUrl = 'http://localhost:8000/charts';
    }

    var url = tabId ? baseUrl + '-' + tabId : baseUrl + '-area';
    console.log('Setting URL:', url);
    pendo.location.setUrl(url);
}

$(function() {
    updateUrl('area');
});