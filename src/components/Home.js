import React from "react";
import Grid from "../containers/GridContainer";

const Home = () =>
        <main role="main">
            <div className="py-5 bg-light">
                <div className="container">
                    <Grid title={ `Mi Lista` } linkto="/milista" screen="home" section="milista"/>
                    <Grid title={ `Películas más Populares` } linkto="/peliculas" screen="home" section="peliculas"/>
                    <Grid title={ `Series más Populares` } linkto="/series" screen="home" section="series"/>
                </div>
            </div>
        </main>

export default Home;
