import apiHandler from "../api/apiHandler"
import { CART_ADD_ITEM } from "../constants/cartConstants"

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
               localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
          })
          .catch(err => console.log(err))
}