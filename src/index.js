import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import App from './App'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './rootReducer'
import registerServiceWorker from './registerServiceWorker'

const history = createHistory()

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;


const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history)),
  // other store enhancers if any
);

const store = createStore(
  rootReducer,
  enhancer
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
, document.getElementById('root'))

registerServiceWorker()
