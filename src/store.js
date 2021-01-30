import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from "redux-thunk"
import { productDetailsReducer, productListReducer } from './reducers/productReducers';

//INITIAL STATE
const initialState = {};

// REDUCER 
const reducer = combineReducers({
     productList: productListReducer,
     productDetails: productDetailsReducer
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