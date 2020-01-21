let mList = document.getElementById('myList'),
    mList2 = document.getElementById('myList2'),
    btnChild = document.querySelector('.btnChild'),
    btnChild2 = document.querySelector('.btnChild2'),
    btnStart = document.querySelector('.btnStart'),
    btnStart2 = document.querySelector('.btnStart2'),
    btnStop = document.querySelector('.btnStop'),
    btnStop2 = document.querySelector('.btnStop2'),
    options = {
      childList: true
    },
    observer = new MutationObserver(mCallback);

function mCallback(mutations) {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      console.log('Mutation Detected: A child element has been added or removed.');
    }
  }
}

function doLogAndBtn(msg, pList) {
  console.log(msg);
  if (pList === 1) {
    btnStart.disabled = !btnStart.disabled;
    btnStop.disabled = !btnStop.disabled
  } else {
    btnStart2.disabled = !btnStart2.disabled;
    btnStop2.disabled = !btnStop2.disabled;
  }
}

btnStart.addEventListener('click', function () {
  observer.observe(mList, options);
  doLogAndBtn('Observing for mutations: STARTED (1)', 1);
}, false);

btnChild.addEventListener('click', function () {
  if (mList.querySelector('.child')) {
    mList.removeChild(mList.querySelector('.child'));
  } else {
    mList.insertAdjacentHTML('beforeend', '\n<li class="child">Peaches</li>');
  }
}, false);

btnStop.addEventListener('click', function () {
  observer.disconnect();
  doLogAndBtn('Observing for mutations: STOPPED (1)', 1);
}, false);

// List 2 events
btnStart2.addEventListener('click', function () {
  observer.observe(mList2, options);
  doLogAndBtn('Observing for mutations: STARTED (2)', 2);
}, false);

btnChild2.addEventListener('click', function () {
  if (mList2.querySelector('.child')) {
    mList2.removeChild(mList2.querySelector('.child'));
  } else {
    mList2.insertAdjacentHTML('beforeend', '\n<li class="child">Horses</li>');
  }
}, false);

btnStop2.addEventListener('click', function () {
  observer.disconnect();
  doLogAndBtn('Observing for mutations: STOPPED (2)', 2);
}, false);