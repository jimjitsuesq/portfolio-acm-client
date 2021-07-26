import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

const PrivateRoute = ({component: Component, props, ...rest}) => {
    let history = useHistory()
    if (document.cookie.includes('user')) {
        return (
            <Route {...rest}>
                <Component {...props}/>
            </Route>
        )
    } else {
        return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
            <Redirect to={{ pathname: '/signin', state: {from: history.location} }} /> 
        )
    }
}

export default PrivateRoute;