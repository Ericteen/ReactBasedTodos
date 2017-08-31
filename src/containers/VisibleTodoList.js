import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../reducers'
import { fetchTodos } from '../api'
import React, { Component } from 'react';

export class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos => 
      console.log(this.props.filter, todos)
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos => 
        console.log(this.props.filter, todos)
      )
    }
  }

  render() {
    return <TodoList {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.filter
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  }
  
}

const mapDispatchToProps = {
  onTodoClick: toggleTodo
}

VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList)

export default VisibleTodoList
