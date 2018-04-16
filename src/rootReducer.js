import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { filters, series, milista, peliculas, generos, credits } from './reducers'

export default combineReducers({
  filters,
  series,
  milista,
  peliculas,
  generos,
  credits,
  router: routerReducer,
  routing: routerReducer
})
