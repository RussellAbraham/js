
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
  It should be possible with a combination of the child_process functions (e.g exec, execFile, spawn) and the Android SDK. Just use the child_process functions to execute the command for creating the .apk file.

apk build command: “ant -Dsdk.dir= debug” (old command based on eclipse) .

Check the Android SDK documentation for the latest information on building the apk from the command line: http://developer.android.com/tools/building/building-cmdline.html 332

Example:

Render process (index.html)
<script type="text/javascript">
    var ipc = require('ipc');
    ipc.send('create_apk', 1);

	ipc.on('create_apk_response', function(arg) {
 		document.getElementById('div').innerHTML = "apk file name: " + arg;
	});
    </script>
main process (main.js)
var ipc = require('ipc');
ipc.on('create_apk', function(event, arg) {
  var e = require('child_process');
  e.exec('ant -Dsdk.dir='+ ANDROID_SDK_PATH +' debug', function(err,stdout, stderr) {
  // process stdout, stderr printouts and get the apk filename if successfull
  // return the apk file name in stdout
  event.sender.send('create_apk_response', stdout);
  });
});
   */