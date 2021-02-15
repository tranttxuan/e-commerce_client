import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from "redux-thunk"
import { cartReducer } from './reducers/cartReducer';
import { orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer, orderSellerListReducer } from './reducers/orderReducer';
import { productEditReducer, productCreateReducer, productDeleteReducer, productDetailsReducer, productListCategoryReducer, productListReducer } from './reducers/productReducers';
import { userDetailsReducer, userSigninReducer, userSignupReducer, userUpdateProfileReducer } from './reducers/userReducer';

//INITIAL STATE
const initialState = {
     userSignin: {
          userInfo: localStorage.getItem("userInfo")
               ? JSON.parse(localStorage.getItem('userInfo'))
               : null
     },
     cart: {
          cartItems: localStorage.getItem('cartItems')
               ? JSON.parse(localStorage.getItem('cartItems'))
               : [],
          shippingAddress: localStorage.getItem('shippingAddress')
               ? JSON.parse(localStorage.getItem('shippingAddress'))
               : {},

     }
};

// REDUCER 
const reducer = combineReducers({
     productList: productListReducer,
     productDetails: productDetailsReducer,
     cart: cartReducer,
     userSignin: userSigninReducer,
     userSignup: userSignupReducer,
     orderCreate: orderCreateReducer,
     orderDelete: orderDeleteReducer,
     orderDetails: orderDetailsReducer,
     orderPay: orderPayReducer,
     orderMineList: orderMineListReducer,
     orderSellerList: orderSellerListReducer,
     userDetail: userDetailsReducer,
     userUpdateProfile: userUpdateProfileReducer,
     productCategoryList: productListCategoryReducer,
     productCreate: productCreateReducer,
     productDelete:productDeleteReducer,
     productEdit: productEditReducer,
})

//MIDDLEWARE
//enable Redux DevTools Extension
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//STORE
const store = createStore(
     reducer,
     initialState,
     composeEnhancer(applyMiddleware(thunk)));
export default store;