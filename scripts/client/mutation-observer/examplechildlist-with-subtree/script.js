let mList = document.getElementById('myList'),
    nestedList = document.getElementById('nestedList'),
    btnChild = document.querySelector('.btnChild'),
    btnStart = document.querySelector('.btnStart'),
    btnStop = document.querySelector('.btnStop'),
    btnSubtree = document.querySelector('.btnSubtree'),
    options = {
      childList: true,
      subtree: true
    },    
    observer = new MutationObserver(mCallback);

function mCallback(mutations) {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      console.log('Mutation Detected: A child element has been added or removed.');
    }
  }
}

function doLogAndBtn(msg) {
  console.log(msg);
  btnStart.disabled = !btnStart.disabled;
  btnStop.disabled = !btnStop.disabled;
}

btnStart.addEventListener('click', function () {
  observer.observe(mList, options);
  doLogAndBtn('Observing for mutations: STARTED');
}, false);

btnChild.addEventListener('click', function () {
  if (document.querySelector('.child')) {
    mList.removeChild(document.querySelector('.child'));
  } else {
    mList.insertAdjacentHTML('beforeend', '\n<li class="child">Peaches</li>');
  }
}, false);

btnSubtree.addEventListener('click', function () {
  if (document.querySelector('.nestedchild')) {
    nestedList.removeChild(document.querySelector('.nestedchild'));
  } else {
    nestedList.insertAdjacentHTML('beforeend', '\n<li class="nestedchild">Tangelos</li>');
  }
}, false);

btnStop.addEventListener('click', function () {
  observer.disconnect();
  doLogAndBtn('Observing for mutations: STOPPED');
}, false);