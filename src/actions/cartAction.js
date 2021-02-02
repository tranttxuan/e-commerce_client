import apiHandler from "../api/apiHandler"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants"

export const addToCart = (productId, newQuantity) => (dispatch, getState) => {
     apiHandler.fetchOneProductDetail(productId)
          .then(data => {
               console.log(data)
               const { _id, name, image, price, countInStock} = data
               dispatch({
                    type: CART_ADD_ITEM,
                    payload: {
                         name: name,
                         image: image,
                         price: price,
                         countInStock: countInStock,
                         product: _id,
                         quantity: newQuantity,

                    }
               })
               console.log("getState", getState())
               localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
          })
          .catch(err => console.log(err))
}

export const removeFromCart = (productId) => (dispatch, getState) => {
     dispatch({
          type: CART_REMOVE_ITEM,
          payload: productId
     })
     localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (data) => (dispatch) =>{
     dispatch({
          type: CART_SAVE_SHIPPING_ADDRESS,
          payload:data
     })
     localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (method) => (dispatch) =>{
     dispatch({
          type: CART_SAVE_PAYMENT_METHOD,
          payload:method
     })
}