let btnStart = document.querySelector('.btnStart'),
    btnStop = document.querySelector('.btnStop'),
    field = document.getElementById('field'),
    options = {
      characterData: true,
      subtree: true
    },
    observer = new MutationObserver(mCallback);

function mCallback(mutations) {
  for (let mutation of mutations) {
    if (mutation.type === 'characterData') {
      console.log('Mutation Detected: Character data has been altered.');
    }
  }
}

function doLogAndBtn(msg) {
  console.log(msg);
  btnStart.disabled = !btnStart.disabled;
  btnStop.disabled = !btnStop.disabled;
}

btnStart.addEventListener('click', function() {
  observer.observe(field, options);
  doLogAndBtn('Observing for mutations: STARTED');
}, false);

btnStop.addEventListener('click', function() {
  observer.disconnect();
  doLogAndBtn('STOPPED observing for mutations');
}, false);