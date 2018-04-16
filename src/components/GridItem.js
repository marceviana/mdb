import React from "react";
import PropTypes from "prop-types";

import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Button from "./Buttons";
import styled from 'styled-components'

const StyledDiv = styled.div`
    max-height: 210px;
    overflow: hidden;
`;

const GridItem = ( props ) => {
    return (
        <article className="col-md-2">
            <StyledDiv className="grid-item">
                <img src={ props.imgSrc } alt="Movie" className="img-fluid" />
                <span className="grid-item-body">
                    <NavLink  to={`/detail/${ props.id }`}>
                        <span className="grid-item-title">{ props.title }</span><br />
                        <span className="grid-item-date">{ props.date && new Date(props.date).toLocaleString().split(' ')[0] }</span>
                    </NavLink>
                    <div className="grid-item-actions">
                        <Button btnType={ props.inList ? 'remove' : 'add' } onClick={ (e) => props.toggleList(props.id) } />
                        <Button btnType={ props.isViewed ? 'viewed' : 'not-viewed' } onClick={ (e) => props.toggleViewed(props.id) } />
                    </div>
                </span>
            </StyledDiv>
        </article>
    )
}

GridItem.propTypes = {
	title: PropTypes.string,
    date: PropTypes.string,
}

GridItem.defaultProps = {
	title: "Sin título",
	date: '',
}

// export default GridItem;
export default withRouter(connect(null, { replace, push })(GridItem));
