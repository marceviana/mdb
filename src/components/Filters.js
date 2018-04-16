import React from "react";
import PropTypes from "prop-types";

import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

const Select = ({ children, name, onChange, filters, ...props }) => {

    let selectedOptions = {}
    filters.filter((a) => a.value ).map((a) => { selectedOptions[a.name] = a.value; return true} )

    return <select
        defaultValue={((name in selectedOptions) && selectedOptions[name]) || ''}
        onChange={onChange} name={name} id={name} className="form-control"
        ref={input => (input && input.name===props.focus.name && input.focus())} >
        { children }
    </select>

}

const ViewedFilters = ( props ) => {
    return (
        <div className="filters-bar-left">
            <Select name="filter-viewed" {...props}>
                <option value="0">No Vistas</option>
                <option value="1">Vistas</option>
            </Select>
        </div>
    )
}

const GenericFilters = ({ data, ...props }) => {
    return (
        <div className="filters-bar-left">
            <Select name="filter-year" {...props}>
                <option value="">Año</option>
                {
                    data.anios.length && data.anios.map((item, i) => {
                        return (
                            !item ? '' :
                            <option value={item} key={i}>
                                { item }
                            </option>
                        )
                    })
                }
            </Select>
            <Select name="filter-genre" {...props}>
                <option value="">Géneros</option>
                {
                    data.genres && data.genres.map((item, i) => {
                         return (
                             !item ? '' :
                             <option value={item.id} key={i}>
                                 { item.name }
                             </option>
                         )
                    })
                }
            </Select>
            <Select name="filter-sort" {...props}>
                <option value="">Ordenar por</option>
                <option value="title">Título</option>
                <option value="year">Año</option>
                <option value="genre">Género</option>
            </Select>
        </div>
    )
}

const listaAnios = ({ peliculas, series, ...props }) => {

    let items = [];
    let aniosArr = [];

    switch (props.screen) {
        case 'series':
            items = series
            break;
        default:
        items = peliculas
    }

    items.length && items.map((item, i) => {
        let y = new Date(item.release_date).getFullYear();
        aniosArr.indexOf(y) < 0 && aniosArr.push(y)
        return aniosArr
    })

    // console.log("aniosArr", aniosArr);

    return aniosArr.sort()
}

const listaGeneros = ( {series, peliculas, generos, ...props} ) => {


    let items = [];
    let genresArr = [];

    switch (props.screen) {
        case 'series':
            items = series
            break;
        default:
        items = peliculas
    }

    if (!generos.length || !items.length) {
        return [];
    }

    let genresIds = items.reduce(function(a,b) {
        return a.genre_ids || a.concat(b.genre_ids);
    });

    genresIds = [...(new Set(genresIds))];

    genresArr = genresIds.map((id, i) => {
        return generos.find(function(a){ return a.id===id; });
    });

    genresArr = [...(new Set(genresArr))];
    // genresArr = [...(new Set(genresArr.map(({ id }) => id )))];

    // console.log("genresArr", genresArr);
    return genresArr.sort(function(a,b) {
      return a.name < b.name ? -1 : 1
    });
};

const Filters = ( props ) => {

    // console.log("-----------------------");
    // console.log("Filters - Props", props);
    // console.log("-----------------------");

    props.history.listen(location => {
        props.removeFilters()
    })

    let filterProps = {
        onChange: (e) => props.setFilters(e.target),
        ...props
    }

    return (
        <div className="filters-bar">
            <Switch>
                <Route path="/milista" component={ () => <ViewedFilters {...filterProps} /> } />
                <Route path="/" component={ () => <GenericFilters data={{ anios: listaAnios( props ), genres: listaGeneros( props ) }} {...filterProps} /> } />
            </Switch>
            <div className="filters-bar-right">
                <span className={`btn btn-light ${props.view === 'grid' && 'active'}`} onClick={(e) => props.changeView('grid') }>
                    <i className="mdi mdi-view-grid"></i>
                </span>
                <span className={`btn btn-light ${props.view === 'list' && 'active'}`} onClick={(e) => props.changeView('list') }>
                    <i className="mdi mdi-view-list"></i>
                </span>
            </div>
        </div>
    )
}


Filters.propTypes = {
    view: PropTypes.string,
	screen: PropTypes.string,
    filters: PropTypes.array,
    series: PropTypes.array,
    peliculas: PropTypes.array,
    generos: PropTypes.array,
}

Filters.defaultProps = {
    view: "grid",
	screen: "",
	filters: [],
	series: [],
	peliculas: [],
	generos: [],
}


// export default Filters;
export default withRouter(connect(null, { replace, push })(Filters));
