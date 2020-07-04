
window.onload = function() {
    if('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('/scripts/client/service-worker.js')
               .then(function() { console.log('Service Worker Registered'); });
    }  
};
  