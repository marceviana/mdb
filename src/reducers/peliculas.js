const initalState = {
  peliculas: (localStorage.peliculas && JSON.parse(localStorage.getItem('peliculas'))) || [],
  isFetching: false,
  isFetched: false,
  error: null
};

export default (state = initalState, { type, ...payload }) => {

  // console.log('---peliculas---------');
  // console.log('type', type);
  // console.log('state', state);
  // console.log('payload', payload);
  // console.log('------------');
  // console.log(' ');

  switch (type) {
    case 'FETCH_MOVIES_REQUEST':
      return {
        ...state,
        isFetching: true
      }
    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state,
        peliculas: payload.peliculas,
        isFetching: false,
        isFetched: true
      }
    case 'FETCH_MOVIES_FAILURE':
      return {
        ...state,
        error: payload.error,
        isFetching: false,
        isFetched: false
      }
    default:
      return state
  }
}
