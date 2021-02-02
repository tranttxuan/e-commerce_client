import apiHandler from "../api/apiHandler"
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userConstants"

export const signin = (email, password) => (dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: { email, password }
    })
    // console.log(email, password)
    apiHandler.signin({ email, password })
        .then(data => {
            dispatch({
                type: USER_SIGNIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
        })
        .catch(err => {
            dispatch({
                type: USER_SIGNIN_FAIL,
                payload: err.message
            })
        })

}


export const register = (name, email, password) => (dispatch) => {
    dispatch({
        type: USER_SIGNUP_REQUEST,
        payload: { name, email, password }
    })
    apiHandler.signup({ name, email, password })
        .then(data => {
            dispatch({
                type: USER_SIGNUP_SUCCESS,
                payload: data
            })
            dispatch({
                type: USER_SIGNIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
        })
        .catch(err => {
            dispatch({
                type: USER_SIGNUP_FAIL,
                payload: err.message
            })
        })

}

export const signout = () => (dispatch) => {
    apiHandler.logout()
        .then(data => {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('cartItems');
            localStorage.removeItem('shippingAddress');
            dispatch({ type: USER_SIGNOUT });
        })
        .catch(err => console.log(err))

}