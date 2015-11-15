import appDispatcher from '../dispatcher/AppDispatcher';
import todoConstants from '../constants/TodoConstants';

const todoActions = {
  /**
   * @param  {string} text
   */
  create: (text) => {
    appDispatcher.dispatch({
      actionType: todoConstants.TODO_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: (id, text) => {
    appDispatcher.dispatch({
      actionType: todoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: (todo) => {
    let id = todo.id;
    let actionType = todo.complete ?
        todoConstants.TODO_UNDO_COMPLETE :
        todoConstants.TODO_COMPLETE;

    appDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: () => {
    appDispatcher.dispatch({
      actionType: todoConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: (id) => {
    appDispatcher.dispatch({
      actionType: todoConstants.TODO_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: () => {
    appDispatcher.dispatch({
      actionType: todoConstants.TODO_DESTROY_COMPLETED
    });
  }
}

export default todoActions;
