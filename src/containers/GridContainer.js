import { connect } from 'react-redux'
import Grid from "../components/Grid";
import { compose, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { addToList, removeFromList, fetchMovies, fetchSeries, setAsNotViewed, setAsViewed } from '../actions'

const mapStateToProps = state => ({
  ...state.milista,
  ...state.viewed,
  ...state.peliculas,
  ...state.series,
  ...state.generos,
  ...state.filters,
  ...state,
  milista: state.milista.milista,
  viewed: state.viewed.viewed,
  peliculas: state.peliculas.peliculas,
  series: state.series.series,
  generos: state.generos.generos,
  filters: state.filters.filters,
});

const mapDispatchToProps = dispatch => bindActionCreators({ addToList, removeFromList, fetchMovies, fetchSeries, setAsNotViewed, setAsViewed }, dispatch);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
      shouldComponentUpdate(nextProps, nextState) {
          // console.log(nextProps);
          // console.log(this.props);
        // console.log('shouldComponentUpdate');
        return true;
    },
    componentWillUnmount() {
        // console.log('componentWillUnmount');
    },
    componentDidCatch() {
        // console.log('componentDidCatch');
    },
    componentWillUpdate() {
        // console.log('componentWillUpdate');
    },
    componentWillReceiveProps() {
        // console.log('componentWillReceiveProps');
    },
    componentWillMount() {
        // console.log('componentWillMount');
    },
    componentDidMount() {
      this.props.fetchMovies();
      this.props.fetchSeries();
    },
    componentDidUpdate(prevProps, prevState, prevContext) {
      // console.log('componentDidUpdate');
      // console.log(this.props.focus);
      // console.log('nodeName', this.props.focus.nodeName);
      // this.props.focus.nodeName !== 'BODY' && this.props.focus.focus();
    }
  })
)(Grid);
