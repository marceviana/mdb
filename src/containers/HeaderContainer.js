import { connect } from 'react-redux'
import AppHeader from "../components/AppHeader";
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { videoSearch, removeFromList, addToList } from '../actions'

const mapStateToProps = state => ({
  ...state.milista,
  focus: state.filters.focus,
  search_term: state.filters.search_term,
  peliculas: state.peliculas.peliculas,
  series: state.series.series,
});

const mapDispatchToProps = dispatch => bindActionCreators({ videoSearch, removeFromList, addToList }, dispatch);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AppHeader);
