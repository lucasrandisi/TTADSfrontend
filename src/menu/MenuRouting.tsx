import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";


const Menu = React.lazy(() => import("./items-by-category-list/Menu"));
const ItemDetails = React.lazy(() => import("./item-details/ItemDetails"));

export default function MenuRouting() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={Menu} />
            <Route path={`${path}/items/new`} component={ItemDetails} />
            <Route path={`${path}/items/:itemId`} component={ItemDetails} />
        </Switch>
    );
}