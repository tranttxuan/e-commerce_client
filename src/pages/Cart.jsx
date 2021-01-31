import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartAction';

function Cart(props) {
     const productId = props.match.params.id;
     const quantity = props.location.search
          ? Number(props.location.search.split("=")[1])
          : 1;
     const dispatch = useDispatch();
console.log("find quantity>>>", props.location.search.split("=")[1])

   
     useEffect(() => {
          if (productId) {
               dispatch(addToCart(productId, quantity))
          }
     }, [dispatch, productId, quantity])
     return (
          <div>
               <h1></h1>
               <p>ADD TO CART :{ productId},{ quantity } </p>
          </div>
     )
}

export default Cart
