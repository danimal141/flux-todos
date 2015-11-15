import { EventEmitter } from 'events';

import appDispatcher from '../dispatcher/AppDispatcher';
import todoConstants from '../constants/TodoConstants';

const CHANGE_EVENT = 'change';

let _todos = {}; // Collection of todo items

/**
 * Create a todo item.
 * @param {string} text The content of the todo
 */
function create(text) {
  // Using the current timestamp in place of a real id.
  let id = Date.now();
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a todo item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _todos[id] = Object.assign({}, _todos[id], updates);
}
/**
 * Update all of the todo items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (let id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a todo item.
 * @param {string} id
 */
function destroy(id) {
  delete _todos[id];
}
/**
 * Delete all the completed todo items.
 */
function destroyCompleted() {
  for (let id in _todos) {
    if (_todos[id].complete) { destroy(id); }
  }
}

class TodoStore extends EventEmitter {
  constructor(props) {
    super(props);

    // Register callback to handle all updates
    appDispatcher.register(this.actionHandler.bind(this));
  }

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll() {
    return _todos;
  }

  /**
   * Tests whether all the remaining todo items are marked as completed.
   * @return {boolean}
   */
  areAllComplete() {
    for (let id in _todos) {
      if (!_todos[id].complete) { return false; }
    }
    return true;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  actionHandler(action) {
    let text;
    switch(action.actionType) {
      case todoConstants.TODO_CREATE:
        text = action.text.trim();

        if (text === '') { return }
        create(text);
        this.emitChange();
        break;

      case todoConstants.TODO_TOGGLE_COMPLETE_ALL:
        if (this.areAllComplete()) {
          updateAll({complete: false});
        } else {
          updateAll({complete: true});
        }
        this.emitChange();
        break;

      case todoConstants.TODO_UNDO_COMPLETE:
        update(action.id, {complete: false});
        this.emitChange();
        break;

      case todoConstants.TODO_COMPLETE:
        update(action.id, {complete: true});
        this.emitChange();
        break;

      case todoConstants.TODO_UPDATE_TEXT:
        text = action.text.trim();

        if (text === '') { return }
        update(action.id, {text: text});
        this.emitChange();
        break;

      case todoConstants.TODO_DESTROY:
        destroy(action.id);
        this.emitChange();
        break;

      case todoConstants.TODO_DESTROY_COMPLETED:
        destroyCompleted();
        this.emitChange();
        break;

      default: // Do nothing
    }
  }
}

const todoStore = new TodoStore();
export default todoStore;
