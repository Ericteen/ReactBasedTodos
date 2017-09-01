import { connect } from 'react-redux'
import * as actions from '../actions'
import TodoList from '../components/TodoList'
import { getVisibleTodos, getIsFetching } from '../reducers'
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
    const { filter, fetchTodos } = this.props
    fetchTodos(filter)
  }

  render() {
    const { toggleTodo, todos, isFetching } = this.props

    if (isFetching && !todos.length) {
      return (<p>Loading..</p>)
    }

    return (
      <TodoList
       todos={todos} 
       onTodoClick={toggleTodo}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.filter
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  }
  
}

VisibleTodoList = connect(
  mapStateToProps,
  actions,
)(VisibleTodoList)

export default VisibleTodoList
