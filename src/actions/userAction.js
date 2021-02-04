import apiHandler from "../api/apiHandler"
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants"

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

export const detailsUser = (id) => (dispatch) => {
    dispatch({
        type: USER_DETAILS_REQUEST,
        payload:id
    })

    apiHandler.detailsUser(id)
        .then(data => {
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload: err.message
            })
        })
}

export const updateUserProfile = (user) => (dispatch, getState)  =>{
    dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload:user})
    apiHandler.updateUserProfile(user)
    .then(data => {
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: err.message
        })
    })
}