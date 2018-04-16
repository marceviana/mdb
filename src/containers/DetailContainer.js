import { connect } from 'react-redux'
import Detail from "../components/Detail";
import { compose, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { fetchCredits, resetCredits } from '../actions'

const mapStateToProps = state => ({
  ...state.peliculas,
  ...state.series,
  ...state.credits
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchCredits, resetCredits }, dispatch);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
        this.props.resetCredits();
    },
    componentDidMount() {
        let id = parseInt(this.props.match.params.id, 0);
        this.props.fetchCredits(id);
    }
  })
)(Detail);
