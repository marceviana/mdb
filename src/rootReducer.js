import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { filters, series, milista, viewed, peliculas, generos, credits } from './reducers'

export default combineReducers({
  filters,
  series,
  milista,
  viewed,
  peliculas,
  generos,
  credits,
  router: routerReducer,
  routing: routerReducer
})
