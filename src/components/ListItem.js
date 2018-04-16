import React from "react";
import PropTypes from "prop-types";

import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Button from "./Buttons";

const ListItem = ( props ) => {

    // console.log('-----------------------');
    // console.log(props);
    // console.log('-----------------------');

    let isSearch = props.context==='search';

    return (
        <article className={ isSearch ? "col-md-12" : "col-md-6" }>
            <div className={ isSearch ? "search-item list-item" : "list-item" }>
                <div className="list-item-img">
                    <NavLink  className="" to={`/detail/${ props.id }`}>
                        <img src={ props.imgSrc } alt="Movie" className="img-fluid" />
                    </NavLink>
                </div>
                <div className="list-item-body">
                    <h3 className="list-item-title">{ props.title }</h3>
                    <div className="list-item-description">
                        <p>{ ! isSearch && ((props.overview && `${props.overview.substr(0,150)}...`) || props.nodescription) }</p>
                    </div>
                    <div className="list-item-actions">
                        <Button btnType={ props.inList ? 'remove' : 'add' } onClick={ (e) => props.toggleList(props.id) }>{props.inList ? 'Quitar' : 'Agregar'}</Button>
                        <Button btnType={ props.isViewed ? 'viewed' : 'not-viewed' } onClick={ (e) => props.toggleViewed(props.id) }>{ isSearch ?  '' : (props.isViewed ? 'Marcar como no vista' : 'Marcar como vista')}</Button>
                    </div>
                </div>
            </div>
        </article>
    )
}

ListItem.propTypes = {
	title: PropTypes.string,
    nodescription: PropTypes.string,
    context: PropTypes.string,
}

ListItem.defaultProps = {
	title: "Sin título",
    nodescription: 'Ops, todavía no hay una descripción para este item',
    context: '',
}

// export default ListItem;
export default withRouter(connect(null, { replace, push })(ListItem));
