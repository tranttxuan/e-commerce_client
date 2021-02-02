import { Button, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import CheckOutSteps from '../components/CheckOutSteps/CheckOutSteps'
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';

function Order(props) {
    const orderId = props.match.params.id;

 const  = useSelector(state => state.state)()
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(detailsOrder(orderId))
    }, [dispatch])
    return (
        <div className="container">
            <CheckOutSteps steps={3} />
            <Grid container direction="row" justify="space-evenly">
                <Grid item >
                    <div>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{cart.shippingAddress.fullName}</p>
                        <p><strong>Address: </strong> {cart.shippingAddress.address},
                            {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                            {cart.shippingAddress.country} </p>

                    </div>

                    <div>
                        <h2>Payment</h2>
                        <p><strong>Method: </strong> {cart.paymentMethod}</p>
                    </div>

                    <div>
                        <h2>Order Items</h2>
                        <table>
                            <tbody>
                                {cart.cartItems.map((item, i) => (
                                    <tr key={i}>
                                        <td>
                                            <img src={item.image} alt={item.name} width={50} />
                                        </td>
                                        <td>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td>{item.quantity} x ${item.price} = ${item.quantity * item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Grid>

                <Grid item>
                    <div>
                        <h2>Order summary</h2>
                        <div>
                            <div>Items</div>
                            <div>${cart.itemsPrice.toFixed(2)}</div>
                        </div>

                        <div>
                            <div>Shipping price</div>
                            <div>${cart.shippingPrice.toFixed(2)}</div>
                        </div>

                        <div>
                            <div>Tax</div>
                            <div>${cart.taxPrice.toFixed(2)}</div>
                        </div>

                        <div>
                            <div>Order Total</div>
                            <div>${cart.totalPrice.toFixed(2)}</div>
                        </div>
                        {loading && <LoadingBox />}
                        {error && <MessageBox error={true}>{error}</MessageBox>}

                        <Button
                            type="button"
                            onClick={placeOrderHandler}
                            className="btn"
                            disabled={cart.cartItems.length === 0}
                        >
                            Place Order
                        </Button>
                    </div>

                </Grid>
            </Grid>
        </div>
    )
}

export default PlaceOrder
