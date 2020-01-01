function checklocalStorage() {
  var _lsTotal = 0, _xLen, _x;
  for (_x in localStorage) {
    if (!localStorage.hasOwnProperty(_x)) {
      continue;
    }
    _xLen = (localStorage[_x].length + _x.length) * 2;
    _lsTotal += _xLen;
    console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
  }
  console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
}

var localStorageSpace = function() {
  var allStrings = "";
  for (var key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      allStrings += window.localStorage[key];
    }
  }
  return allStrings
    ? 3 + allStrings.length * 16 / (8 * 1024) + " KB"
    : "Empty (0 KB)";
};
