const initalState = {
  generos: [],
  isFetchingGenres: false,
  isFetchedGenres: false,
  error: null
};

export default (state = initalState, { type, ...payload }) => {

  // console.log('---generos---------');
  // console.log('type', type);
  // console.log('state', state);
  // console.log('payload', payload);
  // console.log('------------');
  // console.log(' ');

  switch (type) {
    case 'FETCH_GENRES_REQUEST':
      return {
        ...state,
        isFetchingGenres: true
      }
    case 'FETCH_GENRES_SUCCESS':
      return {
        ...state,
        generos: payload.generos,
        isFetchingGenres: false,
        isFetchedGenres: true
      }
    case 'FETCH_GENRES_FAILURE':
      return {
        ...state,
        error: payload.error,
        isFetchingGenres: false,
        isFetchedGenres: false
      }
    default:
      return state
  }
}
