let mPar = document.getElementById('myParagraph'),
    mStrong = document.querySelector('.child'),
    btnAttr = document.querySelector('.btnAttr'),
    btnAttr2 = document.querySelector('.btnAttr2'),
    btnStart = document.querySelector('.btnStart'),
    btnStop = document.querySelector('.btnStop'),
    options = {
      attributes: true,
      attributeFilter: ['hidden', 'contenteditable', 'data-par'],
      subtree: true
    },
    observer = new MutationObserver(mCallback);

function mCallback (mutations) {
  for (let mutation of mutations) {
    if (mutation.type === 'attributes') {
      console.log(`Mutation Detected: Valid attribute has been toggled. Attribute name is: ${mutation.attributeName}.`);
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

btnStop.addEventListener('click', function () {
  observer.disconnect();
  doLogAndBtn('Observing for mutations: STOPPED');
}, false);

btnAttr.addEventListener('click', function () {
  mPar.toggleAttribute(document.querySelector('select').value.toString());
}, false);

btnAttr2.addEventListener('click', function () {
  mStrong.toggleAttribute(document.querySelectorAll('select')[0].value.toString());
}, false);