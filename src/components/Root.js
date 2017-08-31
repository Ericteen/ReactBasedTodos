import React, { PropTypes } from 'react'
import App from './App.js'
import { Provider } from 'react-redux'

const Root = ({ store }) => {
  return (
      <Provider store={ store } >
        <App />
      </Provider>
    )
}

Root.PropTypes = {
  store: PropTypes.object.isRequired
}

export default Root