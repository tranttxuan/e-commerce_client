import apiHandler from "../api/apiHandler";
import { PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

export const ListProducts = ({category='', name='', order='', min=0, max=0, rating=0}) => (dispatch) => {
     dispatch({ type: PRODUCT_LIST_REQUEST })

     apiHandler.fetchProductsData({category, name, order, min, max, rating})
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
          type: PRODUCT_DETAILS_REQUEST,
          payload: productId
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

export const listProductCategories = () => (dispatch) => {
     dispatch({ type: PRODUCT_CATEGORY_LIST_REQUEST, loading: true })
     apiHandler.categoryList()
     .then(data => {
          dispatch({
               type: PRODUCT_CATEGORY_LIST_SUCCESS,
               payload: data
          })
     })
     .catch(err => {
          console.log("error here >>>", err)
          dispatch({
               type: PRODUCT_CATEGORY_LIST_FAIL,
               payload: err.message
          })
     })
}