/* Pendo Install */
(function(apiKey){
    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
    v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
        o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
        y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
        z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
  
        // This function creates visitors and accounts in Pendo
        // You will need to replace <visitor-id-goes-here> and <account-id-goes-here> with values you use in your app
        // Please use Strings, Numbers, or Bools for value types.
        pendo.initialize({
            visitor: {
              id:           sessionStorage.getItem('username'),
              email:        sessionStorage.getItem('email'),
              full_name:    sessionStorage.getItem('full_name'),
              role:         sessionStorage.getItem('role'),
              company:      sessionStorage.getItem('company'),
              location:     sessionStorage.getItem('location'),
              localisation:     sessionStorage.getItem('localisation')
  
                // You can add any additional visitor level key-values here,
                // as long as it's not one of the above reserved names.
            },
  
            account: {
                id:              'account_001',
                name:            'Pendo',
                status:          'Active'
                // is_paying:    // Recommended if using Pendo Feedback
                // monthly_value:// Recommended if using Pendo Feedback
                // planLevel:    // Optional
                // planPrice:    // Optional
                // creationDate: // Optional
  
                // You can add any additional account level key-values here,
                // as long as it's not one of the above reserved names.
            },
            guides: {
                disabled: false
            },
    });
  })('7bd1af5c-40f4-4a4b-6320-7e20f662c90d');


  document.dispatchEvent(new Event('pendoReady'));
  
  /* Track Event - When the charts page loads */
  function trackChartsPageLoad() {
      if (window.location.href === 'https://tomday1.github.io/td-pendemo/charts.html') {
        pendo.track("Auto TD Track Event", {
          visitorId: window.visitorId,
          accountId: window.accountId,
          role: window.role,
          source: window.source,
          location: window.location.href
        });
      }
    }
    window.addEventListener('load', trackChartsPageLoad);

  /* Track Event - Performance Observation */
  (function perfObserver() {
    if (!window.PerformanceObserver) return;

    var metricQueue = [];
    var observer = new window.PerformanceObserver(function(list) {
        var entries = list.getEntries();
        var i, name, type, entry, eventName, metric, time, route;

        url = window.location.pathname;
        for (i = 0; i < entries.length; i++) {
        entry = entries[i];
        name = entry.name;
        type = entry.entryType;
        time = null;
        if (name === 'first-contentful-paint' || name === 'first-meaningful-paint') {
            time = entry.startTime;
            eventName = name;
        } else if (type === 'longtask' && entry.duration > 500) {
            time = entry.duration;
            eventName = type + '_over500';
        }
        if (time != null) {
            metricQueue.push({
            eventName: eventName,
            time: Math.round(time),
            type: '__pendo__performance',
            route: route
            });
        }
        }
        if (!window.pendo || !window.pendo.track || typeof window.pendo.track !== 'function') {
        if (metricQueue.length > 25) {
            metricQueue.length = 0;
        }
        return;
        }
        for (i = 0; i < metricQueue.length; i++) {
        metric = metricQueue[i];
        eventName = metric.eventName;
        delete metric.eventName;
        window.pendo.track(eventName, metric);
        }
        metricQueue.length = 0;
    });
    observer.observe({
        entryTypes: ['paint', 'mark', 'longtask']
    });
    })();

perfObserver(); 