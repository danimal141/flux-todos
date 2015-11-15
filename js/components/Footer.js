import React from 'react';

import todoActions from '../actions/TodoActions';

export default class Footer extends React.Component {
  render() {
    let allTodos = this.props.allTodos;
    let total = Object.keys(allTodos).length;

    if (!total) { return null; }

    let completedCount = this._getCompletedCount();
    let itemsLeft = total - completedCount;
    let itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';
    let clearCompleteButton = this._generateClearCompleteButton(completedCount);

    return (
      <footer id='footer'>
        <span id='todo-count'>
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearCompleteButton}
      </footer>
    );
  }
  _getCompletedCount() {
    let completed = 0;
    let allTodos = this.props.allTodos;

    for (let key in allTodos) {
      if (allTodos[key].complete) { completed++; }
    }

    return completed;
  }
  _generateClearCompleteButton(completed) {
    // Undefined and thus not rendered if no completed items are left.
    if (!completed) { return null; }

    return (
      <button
        id='clear-completed'
        onClick={this._onClearCompletedClick}
      >
        Clear completed ({completed})
      </button>
    );
  }

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick() {
    todoActions.destroyCompleted();
  }
}

Footer.propTypes = {
  allTodos: React.PropTypes.object.isRequired
};
