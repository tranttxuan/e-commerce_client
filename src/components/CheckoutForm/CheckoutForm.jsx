import { Button } from '@material-ui/core';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { payOrder } from '../../actions/orderActions';
import apiHandler from '../../api/apiHandler';
import MessageBox from '../MessageBox/MessageBox';

function CheckoutForm(props) {

    const stripe = useStripe();
    const elements = useElements();


    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);


    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        const payload = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (payload.error) {
            // console.log('[error]', payload.error);
            setError(payload.error.message)
        } else {
            // console.log('[PaymentMethod]', payload.paymentMethod, props.totalPrice);
            const id = payload.paymentMethod.id
            const amount = Math.round(Number(props.totalPrice) * 100);
            // console.log(typeof amount)
            try {
                const data = await apiHandler.getPayPalScript({ id, amount })
                if (data.status === "succeeded") {
                    const paymentResult = {};
                    paymentResult.id = id;
                    paymentResult.status = data.status;
                    paymentResult.client_secret = data.client_secret;
                    console.log(paymentResult)
                    dispatch(payOrder(props.order, paymentResult))

                    setSucceeded(true)
                    setError(null)
                    setProcessing(false)

                }

            } catch (err) {
                // console.log(err.message)
                setError(err.message)
            }
        }

    }

    const handleChange = (event) => {
        console.log(event)
        setDisabled(event.empty)
        setError(event.error ? event.error.message : '');
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="checkoutForm">
                <CardElement
                    onChange={handleChange}
                />
                <Button type="submit" disabled={!stripe || processing || succeeded || disabled}>
                    <span>{processing ? "Processing" : "Buy now"}</span>
                </Button>
                {error && <MessageBox error={true}>{error}</MessageBox>}
            </form>
        </div>
    )
}

export default CheckoutForm
