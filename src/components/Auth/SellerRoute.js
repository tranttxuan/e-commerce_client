import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

function SellerRoute({ component: Component, ...rest }) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, signout } = userSignin;
    return (
        <Route {...rest} render={(props) => userInfo && userInfo.isSeller === true
            ? <Component {...props} />
            : <Redirect to={signout
                ? "/signin?message=You signed out successfully"
                : "/signin?message=Error.Please sign in as seller to go this page"}
            />
        }
        />
    )
}

export default SellerRoute
