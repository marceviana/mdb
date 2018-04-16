import React from "react";
import PropTypes from "prop-types";

import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import { NavLink, withRouter } from 'react-router-dom'

import styled from 'styled-components'

import GridItem from "./GridItem";
import ListItem from "./ListItem";

const TitleStyled = styled.h5`
    padding: 15px;
    font-size: 1.2em;
    font-weight: 600;
    background: #343a40;
    color: #fff;
`
const DivStyled = styled.div`
    display: block;
`
const EmptyItemsStyled = styled.article`
    display: block;
    text-align: center;
    padding: 6em 0;
    background: #efefef;
`

let sectionReducer = ( {series, peliculas, location, milista, ...props} ) => {

    switch (props.section) {
        case 'milista':
            return peliculas.concat(series).filter((item,i) => milista.indexOf(item.id) >= 0 )
        case 'series':
            return series
        default:
            return peliculas
    }

}

let screenReducer = (items, filterName, filterValue) => {

    // console.log(filterName,filterValue);
    
    let generos = (localStorage.generos && JSON.parse(localStorage.generos)) || [];
    let viewed = (localStorage.viewed && JSON.parse(localStorage.viewed)) || [];

    switch (filterName) {
        case "filter-viewed":
            return items.filter((item,i) => parseInt(filterValue,0)===1 ? viewed.indexOf(item.id) >= 0 : viewed.indexOf(item.id) < 0  )
        case "filter-year":
            return items.filter((item,i) => item.release_date && new Date(item.release_date).getFullYear() === parseInt(filterValue,0))
        case "filter-genre":
            return items.filter((item,i) => item.genre_ids && item.genre_ids.indexOf(parseInt(filterValue,0))!==-1)
        case "filter-sort":
            return items.sort((a,b) => {
                switch (filterValue) {
                    case 'title':
                        return a.title > b.title ? 1 : -1
                    case 'year':
                        a.year = (a.release_date && new Date(a.release_date).getFullYear()) || 0;
                        b.year = (b.release_date && new Date(b.release_date).getFullYear()) || 0;
                        return a.year > b.year ? 1 : -1
                    case 'genre':
                        a.genreId = a.genre_ids && a.genre_ids[0];
                        a.genre = a.genreId && generos.find(function(g){ return g.id===a.genreId; });
                        a.genre = (a.genre && a.genre.name) || '';
                        b.genreId = b.genre_ids && b.genre_ids[0];
                        b.genre = b.genreId && generos.find(function(g){ return g.id===b.genreId; });
                        b.genre = (b.genre && b.genre.name) || '';
                        return a.genre > b.genre ? 1 : -1
                    default:
                        return 0

                }
            })
        case "detail":
            return items.filter((item,i) => i < 6)
        case "home":
            return items.filter((item,i) => i < 6)
        default:
            return items

    }
}

let EmptyGrid = ({ children }) =>
        <div className="col-md-12">
            <EmptyItemsStyled>
                <h2>{ children }</h2>
            </EmptyItemsStyled>
        </div>

let filtersByScreen = {
    milista: ["filter-viewed"],
    peliculas: ["filter-year","filter-genre","filter-sort"],
    series: ["filter-year","filter-genre","filter-sort"],
}

let lista = ( {location, ...props} ) => {

    let { filters } = props;
    let items = screenReducer(sectionReducer(props), props.screen);

    filtersByScreen[props.screen] && filters.filter((f)=> f.value).map((f) => {
        filtersByScreen[props.screen].indexOf(f.name)>=0 && (
            items = screenReducer(items, f.name, f.value)
        )
        return true
    })

    // console.log(props.filter);
    items = items.map((item, i) => {

        let itemProps = {
            imgSrc: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
            date: item.release_date,
            key: i,
            toggleList: (props.milista.indexOf(item.id) >= 0 ? props.removeFromList :  props.addToList),
            toggleViewed: (props.viewed.indexOf(item.id) >= 0 ? props.setAsNotViewed :  props.setAsViewed),
            inList: props.milista.indexOf(item.id) >= 0,
            isViewed: props.viewed.indexOf(item.id) >= 0,
            ...item
        }

        return (
            props.screen !== 'home'
            && props.screen !== 'detail'
            && props.view === 'list' ? <ListItem { ...itemProps } /> : <GridItem { ...itemProps } />
        )

    });

    return items.length ? items :
    props.isFetching ? <EmptyGrid><div className="loading"><i className="mdi mdi-loading"></i></div></EmptyGrid> :
    props.error ? <EmptyGrid>{props.error}</EmptyGrid> :
    <EmptyGrid>Ops, nada por aqui!</EmptyGrid>
}

const Grid = ( props ) => {
 // console.log('----------------------');
 // console.log('Grid - props', props);
 // console.log('----------------------');
  return (
    <section className="items-section">
        {
            props.title && (
            <TitleStyled className="items-section-title">
                {props.title} &nbsp; {props.linkto && <NavLink to={props.linkto}>Ver todas</NavLink>}
            </TitleStyled>
            )
        }

        <DivStyled className="items-section-body">
            <div className="row">{ lista( props ) }</div>
        </DivStyled>
    </section>
  )
};

Grid.propTypes = {
	title: PropTypes.string,
	screen: PropTypes.string,
    filters: PropTypes.array,
    series: PropTypes.array,
    peliculas: PropTypes.array,
}

Grid.defaultProps = {
	title: "",
	screen: "",
	filters: [],
	series: [],
	peliculas: [],
}

export default withRouter(connect(null, { replace, push })(Grid));
