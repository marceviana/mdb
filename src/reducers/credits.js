const initalState = {
  credits: [],
  isFetchingCredits: false,
  isFetchedCredits: false,
  error: null
};

export default (state = initalState, { type, ...payload }) => {

  // if ( type.indexOf('_CREDITS_')>=0 ) {
  //     console.log('---credits---------');
  //     console.log('type', type);
  //     console.log('state', state);
  //     console.log('payload', payload);
  //     console.log('------------');
  //     console.log(' ');
  // }

  switch (type) {
    case 'RESET_CREDITS':
      return {
        ...state,
        credits: [],
        error: '',
        isFetchingCredits: true,
        isFetchedCredits: false
      }
    case 'FETCH_CREDITS_REQUEST':
      return {
        ...state,
        credits: [],
        isFetchingCredits: true
      }
    case 'FETCH_CREDITS_SUCCESS':
      return {
        ...state,
        credits: payload.credits,
        isFetchingCredits: false,
        isFetchedCredits: true
      }
    case 'FETCH_CREDITS_FAILURE':
      return {
        ...state,
        credits: [],
        error: payload.error,
        isFetchingCredits: false,
        isFetchedCredits: false
      }
    default:
      return state
  }
}
