import React from "react";
import Grid from "../containers/GridContainer";
import Filters from "../containers/FiltersContainer";

const ItemsSection = ( props ) =>
        <main role="main">
            <div className="py-5 bg-light">
                <div className="container">
                    { props.pageTitle && <h1>{ props.pageTitle }</h1> }
                    <Filters screen={ props.screen } {...props}/>
                    <Grid section={ props.screen } screen={ props.screen } {...props} />
                </div>
            </div>
        </main>

export default ItemsSection;
