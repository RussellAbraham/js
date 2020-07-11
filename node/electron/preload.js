
document.addEventListener('DOMContentLoaded', function(event){
    try {
      if(event.isTrusted){
        console.info('event is trusted');
      } else {
        console.error('event is not trusted');
      }
    } catch (er){
      console.error(er.stack);
    } finally {
      console.log('document content has loaded');
    }
  }, false);
  
  window.addEventListener('load', function(event){
    try {
      if(event.isTrusted){
        console.info('event is trusted');
      } else {
        console.error('event is not trusted');
      }
    } catch (er){
      console.error(er.stack);
    } finally {
      console.log('window has loaded');
    }
  }, false);
  
  
  /**
   * window.addEventListener('DOMContentLoaded', () => {
  
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  
    if('serviceWorker' in navigator) {
      navigator.serviceWorker
      .register('js/service-worker.js')
      .then(function(){ 
        console.log('Service Worker Registered'); 
      });
    }
  
    const webworker = new Worker('js/web-worker.js');
  
  
  })
   */