import apiHandler from "../api/apiHandler"
import { CART_EMPTY } from "../constants/cartConstants"
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstants"

export const createOrder = (order) => (dispatch, getState) => {
    dispatch({
        type: ORDER_CREATE_REQUEST,
        payload: order
    })

    apiHandler.createOrder(order)
        .then(data => {
            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data
            })

            //reset cart 
            dispatch({
                type: CART_EMPTY
            })
            localStorage.removeItem('cartItems')
        })
        .catch(error => {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload: error.message
            })
        })
}

export const detailsOrder = (orderId) => (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });

    apiHandler.detailsOrder(orderId)
        .then(data => {
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data
            })
        })
        .catch(error => {
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload: error.message
            })
        })
}