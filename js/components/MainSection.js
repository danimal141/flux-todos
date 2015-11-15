import React from 'react';

import todoActions from '../actions/TodoActions';
import TodoItem from './TodoItem';

export default class MainSection extends React.Component {
  render() {
    if (!this._hasTodos()) { return null; }

    let todos = this._getTodos();
    return (
      <section id='main'>
        <input
          id='toggle-all'
          type='checkbox'
          onChange={this._onToggleCompleteAll}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor='toggle-all'>Mark all as complete</label>
        <ul id='todo-list'>
          {todos}
        </ul>
      </section>
    );
  }

  _hasTodos() {
    return Object.keys(this.props.allTodos).length > 0;
  }
  _getTodos() {
    let todos = [];
    let allTodos = this.props.allTodos;

    for (let key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }
    return todos;
  }

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll() {
    todoActions.toggleCompleteAll();
  }
}

MainSection.propTypes = {
  allTodos: React.PropTypes.object.isRequired,
  areAllComplete: React.PropTypes.bool.isRequired
};

