import React from "react";
import { Route, Redirect } from 'react-router-dom'
import { Header } from "../components";

function PrivateRoute({ component, isAdmin, ...rest }) {
    const user = localStorage.getItem('burger:userData')

    if (!user) {
        return <Redirect to="/login" />
    }
    if (isAdmin && !JSON.parse(user).admin) {
        return <Redirect to="/" />
    }

    return (
        <>
            {!isAdmin && <Header />}
            <Route {...rest} component={component} />
        </>
    )
}

export default PrivateRoute