import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({component: Component, ...rest}) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, signout} = userSignin;
    return (
        <Route {...rest} render={(props) => userInfo
            ? <Component {...props} />
            : <Redirect to={signout
                ? "/signin?message=You signed out successfully"
                : "/signin?message=Error.Please sign in to go this page"}
            />
        }
        />
    )
}

export default PrivateRoute
