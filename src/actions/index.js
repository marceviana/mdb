import Axios from 'axios'
import { BASE_URL, API_KEY } from '../App'

export const addToList = id => {
  // console.log('---------------------');
  // console.log('action: addToList', id);
  // console.log('---------------------');
  return ({
  type: 'ADD_TO_MY_LIST',
  id
})}

export const removeFromList = id => {
  // console.log('---------------------');
  // console.log('action: addToList', id);
  // console.log('---------------------');
  return ({
  type: 'REMOVE_FROM_MY_LIST',
  id
})}

export const setAsNotViewed = id => {
  // console.log('---------------------');
  // console.log('action: setAsNotViewed', id);
  // console.log('---------------------');
  return ({
  type: 'REMOVE_FROM_VIEWED',
  id
})}

export const setAsViewed = id => {
  // console.log('---------------------');
  // console.log('action: setAsViewed', id);
  // console.log('---------------------');
  return ({
  type: 'ADD_TO_VIEWED',
  id
})}

export const videoSearch = term => {
  // console.log('---------------------');
  // console.log('action: videoSearch', term.name);
  // console.log('action: videoSearch', term.value);
  // console.log('---------------------');
  return ({
  type: 'SET_SEARCH_TERM',
  search_term: term
})}

export const setFilters = input => {
  // console.log('---------------------');
  // console.log('action: setFilters', input.name);
  // console.log('action: setFilters', input.value);
  // console.log('---------------------');
  return ({
  type: 'ADD_MOVIES_FILTER',
  input
})}

export const removeFilters = () => {
  // console.log('---------------------');
  // console.log('action: removeFilters');
  // console.log('---------------------');
  return ({
  type: 'REMOVE_MOVIES_FILTER'
})}

export const changeView = (view) => {
  // console.log('---------------------');
  // console.log('action: changeView');
  // console.log('---------------------');
  return ({
  type: 'CHANGE_VIEW',
  view: view
})}

export const genresSuccess = data => {
  // console.log('---------------------');
  // console.log('action: genresSuccess', data);
  // console.log('---------------------');
  return ({
  type: 'FETCH_GENRES_SUCCESS',
  generos: data.genres
})}

export const genresFetched = () => {
  // console.log('---------------------');
  // console.log('action: genresFetched');
  // console.log('---------------------');
  return ({
  type: 'FETCH_GENRES_REQUEST'
})}

export const genresFailed = error => {
  // console.log('---------------------');
  // console.log('action: genresFailed', error);
  // console.log('---------------------');
  return ({
  type: 'FETCH_GENRES_FAILURE',
  error
})}

export const peliculasSuccess = data => {
  // console.log('---------------------');
  // console.log('action: peliculasSuccess', data);
  // console.log('---------------------');
  return ({
  type: 'FETCH_MOVIES_SUCCESS',
  peliculas: data.results.map((item, i) => {
      item.viewed=0;
      item.cat='peliculas';
      return item
  })
})}

export const peliculasFetched = () => {
  // console.log('---------------------');
  // console.log('action: peliculasFetched');
  // console.log('---------------------');
  return ({
  type: 'FETCH_MOVIES_REQUEST'
})}

export const peliculasFailed = error => {
  // console.log('---------------------');
  // console.log('action: peliculasFailed', error);
  // console.log('---------------------');
  return ({
  type: 'FETCH_MOVIES_FAILURE',
  error
})}

export const seriesSuccess = data => {
  // console.log('---------------------');
  // console.log('action: seriesSuccess', data);
  // console.log('---------------------');
  return ({
  type: 'FETCH_SERIES_SUCCESS',
  series: data.results.map((item, i) => {
      item.viewed=0;
      item.cat='series';
      item.title=item.name;
      item.release_date = item.first_air_date;
      return item
  })
})}

export const seriesFetched = () => {
  // console.log('---------------------');
  // console.log('action: seriesFetched');
  // console.log('---------------------');
  return ({
  type: 'FETCH_SERIES_REQUEST'
})}

export const seriesFailed = error => {
  // console.log('---------------------');
  // console.log('action: seriesFailed', error);
  // console.log('---------------------');
  return ({
  type: 'FETCH_SERIES_FAILURE',
  error
})}

export const creditsSuccess = data => {
  // console.log('---------------------');
  // console.log('action: creditsSuccess', data);
  // console.log('---------------------');
  return ({
  type: 'FETCH_CREDITS_SUCCESS',
  credits: data.credits
})}

export const creditsFetched = () => {
  // console.log('---------------------');
  // console.log('action: creditsFetched');
  // console.log('---------------------');
  return ({
  type: 'FETCH_CREDITS_REQUEST'
})}

export const creditsFailed = error => {
  // console.log('---------------------');
  // console.log('action: creditsFailed', error);
  // console.log('---------------------');
  return ({
  type: 'FETCH_CREDITS_FAILURE',
  error
})}

export const resetCredits = error => {
  // console.log('---------------------');
  // console.log('action: resetCredits');
  // console.log('---------------------');
  return ({
  type: 'RESET_CREDITS'
})}

export const fetchGenres = () => dispatch => {

    let localData = localStorage.getItem('generos');

    if (localData){
        dispatch(genresSuccess({ genres: JSON.parse(localData) }))
        return
    }

    dispatch(genresFetched())

    Axios.get(`/genre/movie/list`, {
          baseURL: BASE_URL,
          params: {
            api_key: API_KEY,
            language: 'es-AR',
            page: 1
          }
    }).then(response => {
        // console.log('response:',response);
        if ( response.status === 200 && response.data.genres ) {
          localStorage.setItem('generos', JSON.stringify(response.data.genres));
          return dispatch(genresSuccess(response.data))
        }
        return dispatch(genresFailed('Ocurrió un error'))
    }
    , err =>
        dispatch(genresFailed(err.message))
    )
}

export const fetchMovies = () => dispatch => {

    let localData = localStorage.getItem('peliculas');

    if (localData){
        dispatch(peliculasSuccess({ results: JSON.parse(localData) }))
        return
    }

    dispatch(peliculasFetched())

    Axios.get(`/movie/popular`, {
          baseURL: BASE_URL,
          params: {
            api_key: API_KEY,
            language: 'es-AR',
            page: 1
          }
    }).then(response => {
          // console.log('response:',response);
          if ( response.status === 200 && response.data.results ) {
            localStorage.setItem('peliculas', JSON.stringify(response.data.results));
            return dispatch(peliculasSuccess(response.data))
          }
          return dispatch(peliculasFailed('Ocurrió un error'))
    }
    , err =>
        dispatch(peliculasFailed(err.message))
    )
}

export const fetchSeries = () => dispatch => {

    let localData = localStorage.getItem('series');

    if (localData){
        dispatch(seriesSuccess({ results: JSON.parse(localData) }))
        return
    }

    dispatch(seriesFetched())

    Axios.get(`/tv/popular`, {
          baseURL: BASE_URL,
          params: {
            api_key: API_KEY,
            language: 'es-AR',
            page: 1
          }
    }).then(response => {
          // console.log('response:',response);
          if ( response.status === 200 && response.data.results ) {
            localStorage.setItem('series', JSON.stringify(response.data.results));
            return dispatch(seriesSuccess(response.data))
          }
          return dispatch(seriesFailed('Ocurrió un error'))
    }
    , err =>
        dispatch(seriesFailed(err.message))
    )
}

export const fetchCredits = (id) => dispatch => {
    // console.log(id);

    let localData = JSON.parse(localStorage.getItem('peliculas'));

    if ( localData ){
        let peli = localData.find((a) => a.id===id)
        if (peli && peli.credits){
            dispatch(creditsSuccess({ credits: peli.credits}))
            return
        }
    }

    dispatch(creditsFetched())

    Axios.get(`/movie/${id}`, {
        baseURL: BASE_URL,
        params: {
            api_key: API_KEY,
            language: 'es-AR',
            append_to_response: 'credits',
            page: 1
        }
    })
    .then(response => {
          // console.log('response:',response);
          let peliculas = JSON.parse(localStorage.getItem('peliculas'));

          if ( response.status === 200 && response.data.id && peliculas ) {
                let peli = peliculas.find(function(a,i){
                    if (a.id===id) {
                        peliculas[i].credits = response.data.credits;
                        localStorage.setItem('peliculas', JSON.stringify(peliculas) );
                        return true
                    }
                    return false
                })
                if (peli) return dispatch(creditsSuccess(response.data))
          }

          return dispatch(creditsFailed('No fue posible obtener los créditos'))
    }
    , err =>
        dispatch(creditsFailed(err))
    )
}
