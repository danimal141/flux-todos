import React from 'react';

import todoStore from '../stores/TodoStore';
import todoActions from '../actions/TodoActions';

import Header from './Header';
import MainSection from './MainSection';
import Footer from './Footer';

/**
 * Retrieve the current todo data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: todoStore.getAll(),
    areAllComplete: todoStore.areAllComplete()
  };
}

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = getTodoState();
  }

  componentDidMount() {
    todoStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount() {
    todoStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  }

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange() {
    this.setState(getTodoState());
  }
}
