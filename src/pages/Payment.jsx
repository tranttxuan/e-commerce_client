import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartAction';
import CheckOutSteps from '../components/CheckOutSteps/CheckOutSteps'

function Payment(props) {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart;
    if(!shippingAddress.address){
        props.history.push("/signin");
    }
    // const 
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push("/placeorder")
    }

    return (
        <div>
            <CheckOutSteps steps={2} />
            <form className="form-auth" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>

                <div>
                    <FormControl component='fieldset'>
                        <FormLabel component='legend'>Payment</FormLabel>
                        <RadioGroup value={paymentMethod}>
                            <FormControlLabel
                                value="PayPal"
                                control={<Radio />}
                                label="PayPal"
                                name="PayPalMedthod"
                                onChange={e => setPaymentMethod(e.target.value)}
                            />

                            <FormControlLabel
                                value="Stripe"
                                control={<Radio />}
                                label="Stripe"
                                name="StripeMethod"
                                onChange={e => setPaymentMethod(e.target.value)}
                            />
                        </RadioGroup>
                        <Button type="submit" >Payment</Button>
                    </FormControl>
                </div>

            </form>
        </div>
    )
}

export default Payment
