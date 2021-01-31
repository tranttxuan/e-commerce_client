import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
     switch (action.type) {
          case CART_ADD_ITEM:
               console.log("reducer, payload", action.payload)
               const item = action.payload;
               const existItem = state.cartItems
                    .find(itemInCart => itemInCart.product === item.product);

               if (existItem) {
                    return {
                         ...state,
                         cartItems: state.cartItems.map(itemInCart =>
                              itemInCart.product === existItem.product ? item : itemInCart)
                    };
               } else {
                    return {
                         ...state,
                         cartItems: [...state.cartItems, item]
                    };
               }
          default:
               return state
     }
}