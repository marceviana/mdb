const initalState = {
  viewed: (localStorage.viewed && JSON.parse(localStorage.viewed)) || []
};

export default (state = initalState, { type, id }) => {

    // if (type.indexOf('_VIEWED')!==-1) {
    //     console.log('---viewed---------');
    //     console.log('type', type);
    //     console.log('state', state);
    //     console.log('id', id);
    //     console.log('------------');
    //     console.log(' ');
    // }

  switch (type) {
    case 'ADD_TO_VIEWED':
      localStorage.setItem('viewed', JSON.stringify([...(new Set([id, ...state.viewed]))]))
      return {
        ...state,
        viewed: [...(new Set([id, ...state.viewed]))]
      }
    case 'REMOVE_FROM_VIEWED':
      localStorage.setItem('viewed', JSON.stringify([...state.viewed].filter((item) => item!==id )))
      return {
        ...state,
        viewed: [...state.viewed].filter((item) => item!==id )
      }
    default:
      return state
  }
}
