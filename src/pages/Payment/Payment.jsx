import { Button, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../actions/cartAction';
import CheckOutSteps from '../../components/CheckOutSteps/CheckOutSteps'
import "./Payment.scss"

function Payment(props) {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push("/shipping");
    }
    // const 
    const [paymentMethod, setPaymentMethod] = useState('Stripe')
    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push("/placeorder")
    }

    return (
        <div className="container payment">
            <CheckOutSteps steps={2} />
            
                <form onSubmit={submitHandler}>
                    <div>
                        <h1>Payment Method</h1>
                    </div>

                    <RadioGroup value={paymentMethod} className="radio">
                        <FormControlLabel
                            value="PayPal"
                            control={<Radio />}
                            label="PayPal"
                            name="PayPalMedthod"
                            onChange={e => setPaymentMethod(e.target.value)}
                            disabled
                        />

                        <FormControlLabel
                            value="Stripe"
                            control={<Radio />}
                            label="Credit Card"
                            name="StripeMethod"
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                    </RadioGroup>

                    <Button type="submit" className="btn">Payment</Button>

                </form>
            
        </div>
    )
}

export default Payment
