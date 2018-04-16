const initalState = {
  series: (localStorage.series && JSON.parse(localStorage.getItem('series'))) || [],
  isFetching: false,
  isFetched: false,
  error: null
};

export default (state = initalState, { type, ...payload }) => {

  // console.log('---series---------');
  // console.log('type', type);
  // console.log('state', state);
  // console.log('payload', payload);
  // console.log('------------');
  // console.log(' ');

  switch (type) {
    case 'FETCH_SERIES_REQUEST':
      return {
        ...state,
        isFetching: true
      }
    case 'FETCH_SERIES_SUCCESS':
      return {
        ...state,
        series: payload.series,
        isFetching: false,
        isFetched: true
      }
    case 'FETCH_SERIES_FAILURE':
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
