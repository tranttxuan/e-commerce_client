import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { detailsOrder } from '../../actions/orderActions';
import CheckOutSteps from '../../components/CheckOutSteps/CheckOutSteps'
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
// import { PayPalButton } from "react-paypal-button-v2";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ORDER_PAY_RESET } from '../../constants/orderConstants';
import "./Order.scss"
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
const promise = loadStripe("pk_test_51IEL8FIUMVGuOdPc3QJNZFcfeoP3JBOgklSOEYZQ8oqOOR3eRCteCAlG0nXVSlBhr0LL4lTfoeq6zhvuiUMfawqL00hSBA57Ht")


function Order(props) {
    const orderId = props.match.params.orderId;
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails;
    console.log(orderDetails)

    const orderPay = useSelector(state => state.orderPay)
    const { success: successPay } = orderPay;

    // const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();

    //payment




    useEffect(() => {
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(detailsOrder(orderId))
        }

    }, [order, orderId, successPay, dispatch])



    // const successPaymentHandler = (paymentResults) => {
    //     dispatch(payOrder(order, paymentResults))
    // }

    return (
        loading ? <LoadingBox /> : error
            ?
            <MessageBox error={true}>{error}</MessageBox>
            :
            <div>
                <CheckOutSteps steps={3} />
                <div className="container">
                    <h2>Order {order._id}</h2>

                    <Grid container spacing={5} justify="space-evenly">
                        <Grid item xs={12} sm={6} md={9} >
                            <div className="box">
                                <h3>Shipping</h3>
                                <p><strong>Name: </strong>{order.shippingAddress.fullName}</p>
                                <p><strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country} </p>
                                {order.isDelivered
                                    ? <MessageBox>Delivered at {order.deliveredAt}</MessageBox>
                                    : <MessageBox error={true}>Not Delivered</MessageBox>}
                            </div>

                            <div className="box">
                                <h3>Payment</h3>
                                <p><strong>Method: </strong> {order.paymentMethod === "Stripe" && "Credit Card"} </p>
                                {order.isPaid
                                    ? <MessageBox>Payment at {order.paidAt.substring(0, 10)}</MessageBox>
                                    : <MessageBox error={true}>Not Paid</MessageBox>}
                            </div>

                            <div className="box">
                                <h3>Order Items</h3>
                                <table>
                                    <tbody>
                                        {order.orderItems.map((item, i) => (
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

                        <Grid item xs={12} sm={6} md={3}>
                            <div className="box">
                                <h2>Order summary</h2>
                                <div className="box--item">
                                    <div>Items</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>

                                <div className="box--item">
                                    <div>Shipping price</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>

                                <div className="box--item">
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                                <hr></hr>
                                <div className="box--item">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>

                                {!order.isPaid && <div className="payment">
                                    <div><strong>Payment</strong></div>
                                    <Elements stripe={promise}>
                                        <CheckoutForm
                                            totalPrice={order.totalPrice.toFixed(2)}
                                            order={order}

                                        />
                                    </Elements>

                                </div>}


                            </div>

                        </Grid>
                    </Grid>
                </div>

            </div >
    )
}

export default Order
