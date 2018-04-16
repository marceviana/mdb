import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import { withRouter } from 'react-router-dom'

import Grid from "../containers/GridContainer";
import Button from "./Buttons";

const EmptyDetail = styled.div`
    padding: 4em 0;
    text-align: center;
    font-size: 45px;
`
const DetailSection = styled.section`
    min-height: 640px;
    background: #343a40;
    padding: 40px;
    color: #fff;
`
const Detail = ({ match, ...props }) => {

    // console.log('----------------------');
    // console.log('Detail - props', props);
    // console.log('----------------------');

    let id = parseInt(match.params.id, 0);
    let peliculas = props.peliculas;
    let series = props.series;

    let peli = peliculas.concat(series).find(function(a){ return a.id===id})
    let cat = (peli && peli.cat) || '';

    let toggleList = (peli && props.milista.indexOf(peli.id) >= 0 ? props.removeFromList :  props.addToList);
    let toggleViewed = (peli && props.viewed.indexOf(peli.id) >= 0 ? props.setAsNotViewed :  props.setAsViewed);
    let inList = peli && props.milista.indexOf(peli.id) >= 0;
    let isViewed = peli && props.viewed.indexOf(peli.id) >= 0;

    // peli && console.log(peli);
    // peli && console.log(props.credits);
    // peli && console.log(peli.credits);
    // peli && console.log(peli.cat);
    return (
        <div className="py-5 bg-light">
            <div className="container">
                <DetailSection className="detail-section">
                    {

                        (!peliculas || !peli) ?
                        <div className="row">
                            <div className="col-md-12">
                                {props.isFetching && <EmptyDetail><div className="loading"><i className="mdi mdi-loading"></i></div> Cargando...</EmptyDetail> }
                                {!props.isFetching && props.error && <EmptyDetail>Ops, nada por aqui!</EmptyDetail>}
                            </div>
                        </div>
                        :
                        (
                        <div className="row">
                            <div className="col-md-4">
                                <div className="item-img-wrapper" style={{ position: 'relative' }}>
                                    <div className="grid-item-body">
                                        <div className="grid-item-actions">
                                            <Button btnType={ inList ? 'remove' : 'add' } onClick={ (e) => toggleList(peli.id) } />
                                            <Button btnType={ isViewed ? 'viewed' : 'not-viewed' } onClick={ (e) => toggleViewed(peli.id) } />
                                        </div>
                                    </div>
                                    <img src={`https://image.tmdb.org/t/p/w500/${peli.poster_path}`} alt="Movie" className="img-fluid" />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h1>
                                  { peli.title } <span>{ peli.release_date && `(${new Date(peli.release_date).getFullYear()})` }</span>
                                </h1>
                                <div>
                                  <h3>Overview</h3>
                                  <p>
                                    { peli.overview }
                                  </p>
                                </div>
                                <br />
                                <br />
                                <br />
                                {
                                props.credits.crew &&
                                <div>
                                  <h3>Featured Crew</h3>
                                  <div className="row">
                                      {
                                        props.credits.crew.filter((item,i) => {
                                           return item.job && item.job.toLowerCase().indexOf('director')>=0
                                        }).map((item,i) => {
                                            return i > 5 ? '' : <div className="col-md-4" key={i}>
                                              <h5>{ item.name }</h5>
                                              <p>{ item.job }</p>
                                            </div>
                                        })
                                      }
                                  </div>
                              </div>
                              }
                            </div>
                        </div>
                        )
                    }
                </DetailSection>
                <Grid title="Recomendaciones" screen="detail" section={ cat }  {...props} />
            </div>
        </div>
    )
};

export default withRouter(connect(null, { replace, push })(Detail));
