(function () {
    self.onmessage = function (event) {
        return postMessage(evaluator(event.data));
    };
})();