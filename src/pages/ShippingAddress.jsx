import { TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartAction';
import CheckOutSteps from '../components/CheckOutSteps/CheckOutSteps'

function ShippingAddress(props) {
    //user need to sign in to go this page
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    if(!userInfo){
        props.history.push("/signin");
    }

    //call address info in redux store
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [city, setCity] = useState(shippingAddress.city);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch()

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(saveShippingAddress({fullName, address, postalCode, city, country}));
        props.history.push("/payment");
    }

    

    return (
        <div className="container">
            <CheckOutSteps steps={1} />
            <form onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>

                    <TextField
                        label="Full Name"
                        variant="filled"
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                    />


                    <TextField
                        label="Address"
                        variant="filled"
                        type="text"
                        required
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />


                    <TextField
                        label="Postal Code"
                        variant="filled"
                        type="text"
                        required
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                    />
                    <TextField
                        label="City"
                        variant="filled"
                        type="text"
                        required
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />

                    <TextField
                        label="Country"
                        variant="filled"
                        type="text"
                        required
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </div>
                <div>
                    <button className="btn" onSubmit={submitHandler}>Continue</ button>
                </div>

            </form>
        </div>
    )
}

export default ShippingAddress
