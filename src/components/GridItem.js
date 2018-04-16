import React from "react";
import PropTypes from "prop-types";

import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
                    <span className="grid-item-title">{ props.title }</span>
                    <span className="grid-item-date">{ props.date && new Date(props.date).toLocaleString().split(' ')[0] }</span>
                    <div className="grid-item-actions">
                        <span onClick={ (e) => props.onClick(props.id) } className="btn btn-primary">
                            {props.btnType === 'add' && <i className="mdi mdi-heart"></i>}
                            {props.btnType === 'remove' && <i className="mdi mdi-delete"></i>}
                        </span>
                        <NavLink  to={`/detail/${ props.id }`} className="btn btn-primary">
                            <i className="mdi mdi-eye-outline"></i>
                        </NavLink>
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
