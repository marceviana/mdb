const body = document.getElementsByTagName('body')[0];
const initalState = {
  filters: [],
  focus: body,
  search_term: '',
  view: 'grid'
};

export default (state = initalState, { type, ...payload }) => {

    // if ( type.indexOf('_VIEW')>=0 ) {
    //   console.log('---filters---------');
    //   console.log('type', type);
    //   console.log('state', state);
    //   console.log('payload', payload);
    //   console.log('------------');
    //   console.log(' ');
    // }

  let newFilters = [...state.filters]
  let { input } = payload;

  switch (type) {
    case 'ADD_MOVIES_FILTER':
     newFilters = newFilters.filter((item) => item.name !== input.name )
     input.value && newFilters.push({name: input.name, value: input.value})
     return {
        ...state,
        filters: newFilters,
        focus: input.value ? input : body
      }
    case 'REMOVE_MOVIES_FILTER':
      return {
        ...state,
        filters: [],
        focus: body
      }
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        search_term: payload.search_term
      }
    case 'CHANGE_VIEW':
      return {
        ...state,
        view: payload.view
      }
    default:
      return state
  }
}
