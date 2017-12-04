import { createStore, applyMiddleware, compose } from 'redux'
import {createLogger} from 'redux-logger'
import todoApp from './reducers'
import thunk from 'redux-thunk'

const configureStore = () => {
  const middlewares = [thunk]
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  return createStore(
    todoApp,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  )
}

export default configureStore