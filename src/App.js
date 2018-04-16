import React from "react";
import "./App.css";

import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { withRouter, Switch, Route } from 'react-router-dom'

import styled from "styled-components";

import Header from "./containers/HeaderContainer";
import Home from "./components/Home";
import ItemsSection from "./components/ItemsSection";
import Detail from "./containers/DetailContainer";
// import Error404 from "./components/Error404";

export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = '578661be4435063249b3519dc1016ad4';

const StyledApp = styled.div`
    padding-top: 56px;
`
const App  = ( props ) => {

    // console.log('----------------------');
    // console.log('App - props', props);
    // console.log('----------------------');

    props.history.listen(location => {
        typeof window === 'object' &&
        location.pathname.indexOf('detail') === -1 &&
        window.scrollTo({top: 0})
    })

    return (
        <StyledApp className="App">
          <Header {...props}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/peliculas" component={(props) => <ItemsSection screen="peliculas" pageTitle="Peliculas" {...props}/>} />
            <Route path="/series" component={(props) => <ItemsSection screen="series" pageTitle="Series" {...props}/>} />
            <Route path="/milista" component={(props) => <ItemsSection screen="milista" pageTitle="Mi Lista" {...props}/>} />
            {/*
            <Route component={Error404} />
            */}
            <Route path="/detail/:id" component={(props) => <Detail screen="detail" pageTitle="Detalle" {...props}/>} />
          </Switch>
      </StyledApp>
    )
}

export default withRouter(connect(null, { replace })(App));
