import { connect } from 'react-redux'
import Filters from "../components/Filters";
import { compose, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { fetchGenres, removeFilters, setFilters, changeView } from '../actions'

const mapStateToProps = state => ({
  ...state.milista,
  ...state.peliculas,
  ...state.series,
  ...state.generos,
  ...state.filters,
  ...state,
  milista: state.milista.milista,
  peliculas: state.peliculas.peliculas,
  series: state.series.series,
  generos: state.generos.generos,
  filters: state.filters.filters,
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchGenres, removeFilters, setFilters, changeView }, dispatch);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
      shouldComponentUpdate(nextProps, nextState) {
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
        // console.log('componentDidMount');
      this.props.fetchGenres();
    },
    componentDidUpdate(prevProps, prevState, prevContext) {
      // console.log('componentDidUpdate');
      // console.log(this.props.focus);
      // console.log('nodeName', this.props.focus.nodeName);
      // this.props.focus.nodeName !== 'BODY' && this.props.focus.focus();
    }
  })
)(Filters);
