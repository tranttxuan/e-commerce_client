import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction';
import { Button, Grid } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import "./Cart.scss";
import MessageBox from '../components/MessageBox/MessageBox';


function Cart(props) {
     const productId = props.match.params.id;
     const quantity = props.location.search
          ? Number(props.location.search.split("=")[1])
          : 1;
     const dispatch = useDispatch();

     //get data from redux
     const cart = useSelector((state) => state.cart)
     const { cartItems } = cart;

     useEffect(() => {
          if (productId) {
               dispatch(addToCart(productId, quantity))
          }
     }, [dispatch, productId, quantity])

     const removeFromCartHandler = (id) => {
          //delete action
          dispatch(removeFromCart(id))
     }

     const checkOutHandler = (params) => {
          props.history.push("/signin?redirect=shipping");
     }

     console.log(cartItems)
     return (
          <div className="container cart-page">
               <h1>Shopping Cart</h1>

               <Grid sx={12} spacing={5} container justify={"space-around"} >
                    <Grid item xs={12} md={9}>
                         <table>
                              <tbody>
                                   {cartItems.length === 0 ?
                                        <tr>
                                             <td colSpan="4">
                                                  <MessageBox>Cart empty. {" "}
                                                       <Link to="/" className="go-shopping"> Go Shopping</Link>
                                                  </MessageBox>
                                             </td>
                                        </tr>

                                        :
                                        (
                                             <Fragment>
                                                  {cartItems.map((item, i) => (
                                                       <tr key={i}>
                                                            <td>
                                                                 <img src={item.image} alt={item.name} />
                                                            </td>
                                                            <td>
                                                                 <Link to={`/product/${item.product}`}>
                                                                      {item.name}
                                                                 </Link>
                                                            </td>
                                                            <td>
                                                                 <select
                                                                      value={item.quantity}
                                                                      onChange={(e) =>
                                                                           dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                                      {[...Array(item.countInStock)
                                                                           .keys()].map((x) => (
                                                                                <option key={x + 1} value={x + 1}>
                                                                                     {x + 1}
                                                                                </option>
                                                                           ))}
                                                                 </select>
                                                            </td>
                                                            <td >$ {item.price}</td>
                                                            <td>
                                                                 <Button
                                                                      onClick={() => removeFromCartHandler(item.product)}
                                                                      className="btn btn-extra">
                                                                      Delete
                                                                 </Button>
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </Fragment>
                                        )
                                   }
                              </tbody>
                         </table>
                    </Grid>

                    <Grid item xs={12} md={3}>
                         <div className="box">
                              <ul>
                                   <li>
                                        <h4>
                                             Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}  items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                        </h4>
                                   </li>
                                   <li>
                                        <Button
                                             className="btn"
                                             disabled={cartItems.length === 0}
                                             onClick={checkOutHandler}>
                                             Proceed to checkout
                                        </Button>
                                   </li>
                              </ul>
                         </div>
                    </Grid>
               </Grid>
          </div>
     )
}

export default Cart
