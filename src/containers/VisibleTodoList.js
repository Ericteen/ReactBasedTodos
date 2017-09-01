import { connect } from 'react-redux'
import * as actions from '../actions'
import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../reducers'
import { fetchTodos } from '../api'
import React, { Component } from 'react';

export class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData()
    }
  }

  fetchData() {
    const { filter, receiveTodos } = this.props
    fetchTodos(filter).then(todos => 
      receiveTodos(filter, todos)
    )
  }

  render() {
    const { toggleTodo, ...rest } = this.props
    return (
      <TodoList
       {...rest} 
       onTodoClick={toggleTodo}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.filter
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  }
  
}

VisibleTodoList = connect(
  mapStateToProps,
  actions,
)(VisibleTodoList)

export default VisibleTodoList
