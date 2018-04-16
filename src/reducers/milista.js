const initalState = {
  milista: (localStorage.milista && JSON.parse(localStorage.milista)) || []
};

export default (state = initalState, { type, id }) => {

    // if (type.indexOf('_MY_LIST')!==-1) {
    //     console.log('---milista---------');
    //     console.log('type', type);
    //     console.log('state', state);
    //     console.log('id', id);
    //     console.log('------------');
    //     console.log(' ');
    // }

  switch (type) {
    case 'ADD_TO_MY_LIST':
      localStorage.setItem('milista', JSON.stringify([...(new Set([id, ...state.milista]))]))
      return {
        ...state,
        milista: [...(new Set([id, ...state.milista]))]
      }
    case 'REMOVE_FROM_MY_LIST':
      localStorage.setItem('milista', JSON.stringify([...state.milista].filter((item) => item!==id )))
      return {
        ...state,
        milista: [...state.milista].filter((item) => item!==id )
      }
    default:
      return state
  }
}
