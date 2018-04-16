import { connect } from 'react-redux'
import Detail from "../components/Detail";
import { compose, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { fetchCredits, resetCredits, addToList, removeFromList, setAsNotViewed, setAsViewed } from '../actions'

const mapStateToProps = state => ({
  ...state.peliculas,
  ...state.series,
  ...state.credits,
  milista: state.milista.milista,
  viewed: state.viewed.viewed,
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchCredits, resetCredits, addToList, removeFromList, setAsNotViewed, setAsViewed }, dispatch);

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
