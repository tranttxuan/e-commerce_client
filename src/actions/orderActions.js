import apiHandler from "../api/apiHandler"
import { CART_EMPTY } from "../constants/cartConstants"
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants"

export const createOrder = (order) => (dispatch, getState) => {
    console.log("check order in reducer", order)
    dispatch({
        type: ORDER_CREATE_REQUEST,
        payload: order
    })

    apiHandler.createOrder(order)
        .then(data => {
            console.log("check here")
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
            console.log("check error", error.message)
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
            console.log("check details of orders", data)
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

export const payOrder = (order, paymentResult) => (dispatch, getState) => {
    dispatch({
        type: ORDER_PAY_REQUEST,
        payload: { order, paymentResult }
    })

    apiHandler.payOrder(order._id, paymentResult)
        .then(data => {
            dispatch({
                type: ORDER_PAY_SUCCESS,
                payload: data
            })
        })
        .catch(error => {
            dispatch({
                type: ORDER_PAY_FAIL,
                payload: error.message
            })
        })
}

export const listOrderMine = () => (dispatch, getState) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST });

    apiHandler.getListOrders()
    .then(data => {
        console.log("go here", data)
        dispatch({
            type: ORDER_MINE_LIST_SUCCESS,
            payload:data
        })
    })
    .catch(error => {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.message
        })
    })
}