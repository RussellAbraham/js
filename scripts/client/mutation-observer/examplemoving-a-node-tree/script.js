let container = document.querySelector('.container'),
    mList = document.getElementById('nestedList'),
    li = document.querySelectorAll('#myList li')[3],
    btnChild = document.querySelector('.btnChild'),
    btnStart = document.querySelector('.btnStart'),
    btnStop = document.querySelector('.btnStop'),
    btnDc = document.querySelector('.dcList'),
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

function doLogAndBtn(msg) {
  console.log(msg);
  btnStart.disabled = !btnStart.disabled;
  btnStop.disabled = !btnStop.disabled;
}

btnStart.addEventListener('click', function () {
  observer.observe(mList, options);
  doLogAndBtn('Observing for mutations: STARTED');
}, false);

btnStop.addEventListener('click', function () {
  observer.disconnect();
  doLogAndBtn('Observing for mutations: STOPPED');
}, false);

btnChild.addEventListener('click', function () {
  if (document.querySelector('.child')) {
    mList.removeChild(document.querySelector('.child'));
  } else {
    mList.insertAdjacentHTML('beforeend', '\n<li class="child">Nectarine</li>');
  }
}, false);

btnDc.addEventListener('click', function () {
  console.log('The node has been disconnected!');
  container.appendChild(li.removeChild(mList));
  btnDc.disabled = true;
}, false);