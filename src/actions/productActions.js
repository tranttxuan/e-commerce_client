import apiHandler from "../api/apiHandler";
import { PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

export const ListProducts = ({ category = '', name = '', order = '', min = 0, max = 0, rating = 0, seller = '' }) => (dispatch) => {
     dispatch({ type: PRODUCT_LIST_REQUEST })

     apiHandler.fetchProductsData({ category, name, order, min, max, rating, seller })
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
               dispatch({
                    type: PRODUCT_CATEGORY_LIST_FAIL,
                    payload: err.message
               })
          })
}

export const createProduct = (data) => (dispatch, getState) => {
     dispatch({ type: PRODUCT_CREATE_REQUEST });
     const { userSignin: { userInfo } } = getState();
     data.seller = userInfo._id;

     apiHandler.createProduct(data)
          .then(data => {
               dispatch({
                    type: PRODUCT_CREATE_SUCCESS,
                    payload: data
               })
          })
          .catch(err => {
               dispatch({
                    type: PRODUCT_CREATE_FAIL,
                    payload: err.message
               })
          })

}

export const editProduct = (data, id) => (dispatch, getState) => {
     dispatch({ type: PRODUCT_EDIT_REQUEST });
     const { userSignin: { userInfo } } = getState();
     data.seller = userInfo._id;
     apiHandler.updateProduct(data, id)
          .then(data => {
               dispatch({
                    type: PRODUCT_EDIT_SUCCESS,
                    payload: data
               })
          })
          .catch(err => {
               dispatch({
                    type: PRODUCT_EDIT_FAIL,
                    payload: err.message
               })
          })
}

export const deleteProduct = (id) => (dispatch, getState) => {
     dispatch({ type: PRODUCT_DELETE_REQUEST, payload: id })
     apiHandler.deleteProduct(id)
          .then(data => {
               dispatch({
                    type: PRODUCT_DELETE_SUCCESS,
                    payload: data,
                    success: true
               })
          })
          .catch(err => {
               dispatch({
                    type: PRODUCT_DELETE_FAIL,
                    payload: err.message
               })
          })
}

