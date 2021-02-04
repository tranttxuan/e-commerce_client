import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import apiHandler from '../api/apiHandler';
import CheckOutSteps from '../components/CheckOutSteps/CheckOutSteps'
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from '../constants/orderConstants';

function Order(props) {
    const orderId = props.match.params.orderId;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay)
    const { error: errorPay, success: successPay, loading: loadingPay } = orderPay;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(detailsOrder(orderId))
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    //get client id in PAYPAL
                    apiHandler.getPayPalScript()
                        .then(data => {
                            const script = document.createElement('script');
                            script.type = "text/javascript";
                            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
                            script.async = true;
                            script.onload = () => {
                                setSdkReady(true)
                            }
                            document.body.appendChild(script)
                        })
                        .catch(err => console.log(err))
                } else {
                    setSdkReady(true)
                }
            }
        }

    }, [order, orderId,successPay , dispatch])


    const successPaymentHandler = (paymentResults) => {
        dispatch(payOrder(order, paymentResults))
    }

    return (
        loading ? <LoadingBox /> : error
            ? <MessageBox error={true}>{error}</MessageBox>
            : <div className="container">
                <CheckOutSteps steps={3} />
                <div>
                    <h1>Order {order._id}</h1>

                    <Grid container direction="row" justify="space-evenly">
                        <Grid item >
                            <div>
                                <h2>Shipping</h2>
                                <p><strong>Name: </strong>{order.shippingAddress.fullName}</p>
                                <p><strong>Address: </strong> {order.shippingAddress.address},
                            {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                            {order.shippingAddress.country} </p>
                                {order.isDelivered
                                    ? <MessageBox>Delivered at {order.deliveredAt}</MessageBox>
                                    : <MessageBox error={true}>Not Delivered</MessageBox>}
                            </div>

                            <div>
                                <h2>Payment</h2>
                                <p><strong>Method: </strong> {order.paymentMethod}</p>
                                {order.isPaid
                                    ? <MessageBox>Payment at {order.paidAt}</MessageBox>
                                    : <MessageBox error={true}>Not Paid</MessageBox>}
                            </div>

                            <div>
                                <h2>Order Items</h2>
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

                        <Grid item>
                            <div>
                                <h2>Order summary</h2>
                                <div>
                                    <div>Items</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>

                                <div>
                                    <div>Shipping price</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>

                                <div>
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>

                                <div>
                                    <div>Order Total</div>
                                    <div>${order.totalPrice.toFixed(2)}</div>
                                </div>
                                {!order.isPaid &&
                                    <div>
                                        {!sdkReady ? <LoadingBox /> :
                                            <>
                                                {errorPay &&
                                                    <MessageBox error={true}>{errorPay}</MessageBox>
                                                }
                                                {loadingPay && <LoadingBox />}
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler} />
                                            </>}
                                    </div>
                                }

                            </div>

                        </Grid>
                    </Grid>
                </div>
            </div>
    )
}

export default Order
