let btnStart = document.querySelector('.btnStart'),
    btnStop = document.querySelector('.btnStop'),
    field = document.getElementById('field'),
    options = {
      characterData: true
    },
    observer = new MutationObserver(mCallback);

function mCallback(mutations) {
  for (let mutation of mutations) {
    if (mutation.type === 'characterData') {
      console.log('Mutation Detected: Character data has been altered.');
    }
  }
}

function doFieldInput() {
  field.addEventListener('input', function () {
    if (!field.childNodes[0]) {
      btnStop.click();
    }
  }, false);
}

function doLogAndBtn(msg) {
  console.log(msg);
  btnStart.disabled = !btnStart.disabled;
  btnStop.disabled = !btnStop.disabled;
}

field.addEventListener('blur', function() {
  if (!field.childNodes[0]) {
    field.innerHTML = 'Edit this text!';
    btnStop.click();
  }
}, false);

btnStart.addEventListener('click', function() {
  if (field.childNodes[0]) {
    observer.observe(field.childNodes[0], options);
    doLogAndBtn('Observing for mutations: STARTED');
  }
}, false);

btnStop.addEventListener('click', function() {
  observer.disconnect();
  doLogAndBtn('STOPPED observing for mutations');
}, false);

doFieldInput();