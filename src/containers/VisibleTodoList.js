import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../actions'
import TodoList from '../components/TodoList'
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers'
import React, { Component } from 'react';
import FetchError from '../components/FetchError'
 
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
    const { toggleTodo, todos, errorMessage, isFetching } = this.props

    if (isFetching && !todos.length) {
      return (<p>Loading..</p>)
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError 
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      )
    }

    return (
      <TodoList
       todos={todos} 
       onTodoClick={toggleTodo}
      />
    )
  }
}

VisibleTodoList.proptypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  todos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.filter
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  }
  
}

VisibleTodoList = connect(
  mapStateToProps,
  actions,
)(VisibleTodoList)

export default VisibleTodoList
