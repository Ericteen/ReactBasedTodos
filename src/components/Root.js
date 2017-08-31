import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, browserHistory } from 'react-router'
import App from './App.js'
import { Provider } from 'react-redux'

const Root = ({ store }) => {
  return (
      <Provider store={ store } >
        <Router history={browserHistory}>
          <Route path='/(:filter)' component={App} />
        </Router>
      </Provider>
    )
}

Root.PropTypes = {
  store: PropTypes.object.isRequired
}

export default Root