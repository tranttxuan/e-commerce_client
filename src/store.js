import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from "redux-thunk"
import { cartReducer } from './reducers/cartReducer';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';

//INITIAL STATE
const initialState = {
     cart:{
          cartItems:localStorage.getItem('cartItems') 
          ? JSON.parse(localStorage.getItem('cartItems'))
          :[]
     }
};

// REDUCER 
const reducer = combineReducers({
     productList: productListReducer,
     productDetails: productDetailsReducer,
     cart: cartReducer
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