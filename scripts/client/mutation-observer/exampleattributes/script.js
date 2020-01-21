let mPar = document.getElementById('myParagraph'),
    btnAttr = document.querySelector('.btnAttr'),
    btnStart = document.querySelector('.btnStart'),
    btnStop = document.querySelector('.btnStop'),
    options = {
      attributes: true
    },
    observer = new MutationObserver(mCallback);

function mCallback (mutations) {
  for (let mutation of mutations) {
    if (mutation.type === 'attributes') {
      console.log(`Mutation Detected: An attribute has been added or removed. The attribute name is: ${mutation.attributeName}.`);
    }
  }
}

function doLogAndBtn(msg) {
  console.log(msg);
  btnStart.disabled = !btnStart.disabled;
  btnStop.disabled = !btnStop.disabled;
}

btnStart.addEventListener('click', function () {
  observer.observe(mPar, options);
  doLogAndBtn('Observing for mutations: STARTED');
}, false);

btnAttr.addEventListener('click', function () {
  mPar.classList.toggle('paragraph');
}, false);

btnStop.addEventListener('click', function () {
  observer.disconnect();
  doLogAndBtn('Observing for mutations: STOPPED');
}, false);