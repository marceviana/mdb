import React from "react";
import PropTypes from "prop-types";

import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import { NavLink, withRouter } from 'react-router-dom'

import styled from 'styled-components'
import ListItem from "./ListItem";
import Button from "./Buttons";

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
`

const StyledResults = styled.div`
    position: absolute;
    top: 56px;
    width: 400px;
    z-index: 10000;
    right: 0;
    background: #efefef;
    padding-top: 15px;
    overflow-y: auto;
    max-height: calc(100vh - 56px);
`

const Results = ({ search_term, peliculas, series, ...props }) => {

    let items = peliculas.concat(series)
    .filter((item) => item.title && item.title.toLowerCase().indexOf(search_term.toLowerCase())>=0 )
    .map((item) => {

        let itemProps = {
            context: 'search',
            imgSrc: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
            date: item.release_date,
            key: item.id,
            toggleList: (props.milista.indexOf(item.id) >= 0 ? props.removeFromList :  props.addToList),
            toggleViewed: (props.viewed.indexOf(item.id) >= 0 ? props.setAsNotViewed :  props.setAsViewed),
            inList: props.milista.indexOf(item.id) >= 0,
            isViewed: props.viewed.indexOf(item.id) >= 0,
            ...item
        }

        return <ListItem { ...itemProps } />
    })

    // console.log(items);
    
    return (
        <StyledResults>
            { items.length ? items : <h4 style={ {padding: '40px'} } >Oops, nada por aqui!</h4> }
        </StyledResults>
    )
}
const MenuNav = ({ milista }) => {
  // - activeClassName
  // - activeStyle
  // - exact
  // - strict
  // - isActive
  // - location

    return (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink  className="nav-link" activeClassName="active" activeStyle={{color:'#fff'}} exact to='/'> Home </NavLink>
            </li>
            <li className="nav-item">
                <NavLink  className="nav-link" activeClassName="active" activeStyle={{color:'#fff'}} to='/peliculas'> Películas </NavLink>
            </li>
            <li className="nav-item">
                <NavLink  className="nav-link" activeClassName="active" activeStyle={{color:'#fff'}} to='/series'> Series </NavLink>
            </li>
            <li className="nav-item">
                <NavLink  className="nav-link" activeClassName="active" activeStyle={{color:'#fff'}} to='/milista'>
                    Mi Lista
                    &nbsp; { milista.length > 0 && <span className="badge badge-danger">{ milista.length }</span> }
                </NavLink>
            </li>
        </ul>
    )
};

const Header = ( props ) => {

    // console.log('----------------------');
    // console.log('Header - props', props);
    // console.log('----------------------');

    return (
      <StyledHeader>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container">
                  <NavLink  className="navbar-brand" exact to='/'> <i className="mdi mdi-react"></i> Movie DB APP </NavLink>
                  <button className="navbar-toggler" type="button">
                      <span className="navbar-toggler-icon" />
                  </button>

                  <div className="collapse navbar-collapse" id="navbarsExample07">
                      <MenuNav {...props} />
                      <form className="form-inline my-2 my-md-0" action="busqueda-peliculas-grid.html">
                          <input ref={input => input && props.location.pathname === '/' && input.focus() } value={ props.search_term } onChange={ (e) => props.videoSearch(e.target.value) } className="form-control" type="text" placeholder="Buscar Película o Serie" />
                      </form>
                      {
                          props.search_term && <Results {...props}/>
                      }
                  </div>
              </div>
          </nav>
      </StyledHeader>
    )

};


Header.propTypes = {
	screen: PropTypes.string,
	search_term: PropTypes.string,
    series: PropTypes.array,
    peliculas: PropTypes.array,
}

Header.defaultProps = {
	screen: "",
	search_term: "",
	series: [],
	peliculas: [],
}

export default withRouter(connect(null, { replace, push })(Header));
