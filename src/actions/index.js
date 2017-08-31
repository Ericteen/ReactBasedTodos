import { v4 } from 'node-uuid'

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
})
// interpreted as an expression

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})
