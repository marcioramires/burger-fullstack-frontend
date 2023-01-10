import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { Login, Register, Home, Products, Cart, Admin, Orders } from '../containers'
import PrivateRoute from "./private-route";
import paths from "../constants/paths";

function Routes() {

    return (
        <Router>
            <Switch>
                <Route component={Login} path={paths.Login} />
                <Route component={Register} path={paths.Register} />
                <PrivateRoute exact component={Home} path={paths.Home} />
                <PrivateRoute component={Products} path={paths.Products} />
                <PrivateRoute component={Orders} path={paths.Orders} />
                <PrivateRoute component={Cart} path={paths.Cart} />
                <PrivateRoute component={Admin} path={paths.Order} isAdmin />
                <PrivateRoute component={Admin} path={paths.ShowProducts} isAdmin />
                <PrivateRoute component={Admin} path={paths.ShowUsers} isAdmin />
                <PrivateRoute component={Admin} path={paths.NewProduct} isAdmin />
            </Switch>
        </Router>
    )
}

export default Routes