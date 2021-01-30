import apiHandler from "../api/apiHandler";
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

export const ListProducts = () => (dispatch) => {
     dispatch({
          type: PRODUCT_LIST_REQUEST
     })
     apiHandler.fetchProductsData()
          .then(data => {
               dispatch({
                    type: PRODUCT_LIST_SUCCESS,
                    payload: data
               })
          })
          .catch(err => {
               dispatch({
                    type: PRODUCT_LIST_FAIL,
                    payload: err.message
               })
          })
};

export const DetailsProduct = (productId) => (dispatch) => {
     dispatch({
          type: PRODUCT_DETAILS_REQUEST
     })
     apiHandler.fetchOneProductDetail(productId)
          .then(data => {
               dispatch({
                    type: PRODUCT_DETAILS_SUCCESS,
                    payload: data
               })
          })
          .catch(err => {
               console.log("error here >>>", err)
               dispatch({
                    type: PRODUCT_DETAILS_FAIL,
                    payload: err.message
               })
          })
}