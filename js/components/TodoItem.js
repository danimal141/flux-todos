import React from 'react';
import classNames from 'classnames';

import todoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };
  }

  /**
   * @return {object}
   */
  render() {
    let todo = this.props.todo;
    let input = this._generateTextInput(todo);

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={classNames({
          'completed': todo.complete,
          'editing': this.state.isEditing
        })}
        key={todo.id}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={todo.complete}
            onChange={this._onToggleComplete.bind(this)}
          />
          <label onDoubleClick={this._onDoubleClick.bind(this)}>{todo.text}</label>
          <button className='destroy' onClick={this._onDestroyClick.bind(this)} />
        </div>
        {input}
      </li>
    );
  }

  _generateTextInput(todo) {
    if (!this.state.isEditing) { return null; }

    return (
      <TodoTextInput
        className='edit'
        onSave={this._onSave.bind(this)}
        value={todo.text}
      />
    );
  }

  _onToggleComplete() {
    todoActions.toggleComplete(this.props.todo);
  }

  _onDoubleClick() {
    this.setState({isEditing: true});
  }

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave(text) {
    todoActions.updateText(this.props.todo.id, text);
    this.setState({isEditing: false});
  }

  _onDestroyClick() {
    todoActions.destroy(this.props.todo.id);
  }
}

TodoItem.propTypes = {
  todo: React.PropTypes.object.isRequired
};
