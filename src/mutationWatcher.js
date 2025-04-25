export default class MutationWatcher {
  constructor(target, callback, options = {}) {
    this.target = target;
    this.callback = callback;
    // default options
    this.options = {
      childList: true,
      characterData: true,
      subtree: true,
      ...options // override default options with provide options
    };
    this.observer = new MutationObserver((mutations) => {
      this.callback(mutations);
    });
  }

  start() {
    if (this.target) {
      this.observer.observe(this.target, this.options);
    }
  }

  stop() {
    this.observer.disconnect();
  }

  dispose() {
    this.stop();
    this.target = null;
    this.callback = null;
  }
}
