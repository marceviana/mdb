import { connect } from 'react-redux'
import AppHeader from "../components/AppHeader";
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { videoSearch, addToList, removeFromList, setAsNotViewed, setAsViewed } from '../actions'

const mapStateToProps = state => ({
  focus: state.filters.focus,
  search_term: state.filters.search_term,
  peliculas: state.peliculas.peliculas,
  series: state.series.series,
  milista: state.milista.milista,
  viewed: state.viewed.viewed,
});

const mapDispatchToProps = dispatch => bindActionCreators({ videoSearch, addToList, removeFromList, setAsNotViewed, setAsViewed }, dispatch);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AppHeader);
