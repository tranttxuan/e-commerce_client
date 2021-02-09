import { Button } from '@material-ui/core';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import MessageBox from '../MessageBox/MessageBox';

function CheckoutForm() {

    const stripe = useStripe();
    const elements = useElements();


    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

//6:16
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCartPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            console.log(paymentIntent)

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            // dispatch({
            //     type: "EMPTY_BASKET"
            // })
            // history.replace("/orders")
        })
    }

    const handleChange = (event) => {
        console.log(event)
        setDisabled(event.empty)
        setError(event.error ? event.error.message : '');
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />

                {/* <button disabled={processing || disabled || succeeded}>
                                                      <span>{processing ? "Processing" : "Buy now"}</span>
                                                </button> */}
                <Button >Buy now</Button>
                {error && <MessageBox error={true}>{error}</MessageBox>}
            </form>
        </div>
    )
}

export default CheckoutForm
