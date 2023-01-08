import React from "react";
import { Route, Redirect } from 'react-router-dom'
import { Header } from "../components";

function PrivateRoute({ component, ...rest }) {
    const user = localStorage.getItem('burger:userData')

    if (!user) {
        return <Redirect to="/login" />
    }

    return (
        <>
            <Header />
            <Route {...rest} component={component} />
        </>
    )
}

export default PrivateRoute