import { Button, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckOutSteps from '../components/CheckOutSteps/CheckOutSteps'
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

function PlaceOrder(props) {
    const cart = useSelector(state => state.cart);
    if (!cart.paymentMethod) {
        props.history.push("/payment")
    }

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
console.log("check success", success)
    //calculate total price
    const toPrice = (number) => Number(number.toFixed(2))
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
    }

    useEffect(() => {
        console.log("check success", success)
        if (success) {
            props.history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [props.history, dispatch, success])
    return (
        <div className="container">
            <CheckOutSteps steps={3} />
            <Grid container spacing={5} justify="space-evenly">
                <Grid item xs={12} sm={6} md={9}>
                    <div className="box">
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{cart.shippingAddress.fullName}</p>
                        <p><strong>Address: </strong> {cart.shippingAddress.address},
                            {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                            {cart.shippingAddress.country} </p>

                    </div>

                    <div className="box">
                        <h2>Payment</h2>
                        <p><strong>Method: </strong> {cart.paymentMethod}</p>
                    </div>

                    <div className="box">
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

                <Grid item xs={12} sm={6} md={3} >
                    <div className="box">
                        <h2>Order summary</h2>
                        <div className="box--item">
                            <div>Items</div>
                            <div>${cart.itemsPrice.toFixed(2)}</div>
                        </div>

                        <div className="box--item">
                            <div>Shipping price</div>
                            <div>${cart.shippingPrice.toFixed(2)}</div>
                        </div>

                        <div className="box--item">
                            <div>Tax</div>
                            <div>${cart.taxPrice.toFixed(2)}</div>
                        </div>

                        <div className="box--item">
                            <div><strong>Order Total</strong></div>
                            <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
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
