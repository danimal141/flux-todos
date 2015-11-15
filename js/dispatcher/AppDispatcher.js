//import { Dispatcher } from 'flux';
//
//const appDispatcher = new Dispatcher()
//export default appDispatcher;

class AppDispatcher {
  /**
   * Register a Store's callback so that it may be invoked by an action.
   * @param {function} callback The callback to be registered.
   * @return {number} The index of the callback within the _callbacks array.
   */

  constructor() {
    this._callbacks = [];
    this._promises = [];
  }

  register(callback) {
    this._callbacks.push(callback);
    return this._callbacks.length - 1 // index
  }

  /**
   * dispatch
   * @param  {object} payload The data from the action.
   */
  dispatch(payload) {
    // First create array of promises for callbacks to reference.
    let resolves = [];
    let rejects = [];

    this._promises = this._callbacks.map((_, idx) => {
      return new Promise((resolve, reject) => {
        resolves[idx] = resolve;
        rejects[idx] = reject;
      });
    });
    // Dispatch to callbacks and resolve/reject promises.
    this._callbacks.forEach((callback, idx) => {
      Promise.resolve(callback(payload)).then(() => {
        resolves[idx](payload);
      }).catch((err) => {
        rejects[idx](new Error('Dispatcher callback unsuccessful'));
      });
    });
    this._promises = [];
  }
}

const appDispatcher = new AppDispatcher();
export default appDispatcher;
