import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import { register } from '../actions/userAction'


function Signup(props) {
    const [password, setPassword] = useState('Tran123');
    const [confirmPassword, setConfirmPassword] = useState('Tran123');
    const [email, setEmail] = useState("xuan@gmail.com");
    const [name, setName] = useState('TXuan')

    const dispatch = useDispatch();
    const userSignup = useSelector((state) => state.userSignup);
    const { userInfo, loading, error } = userSignup;
    // *******************************************************************
    // ****************************************************
    // 5:30 why use redirect 
    // *******************************************************************
    // ****************************************************
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            return alert('Password and confirm password are not the same');
        }
        dispatch(register(name, email, password))
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history,redirect, userInfo])
    return (
        <div className="form-medium" >
            <form onSubmit={submitHandler}>
                <div>
                    <h1>Sign Up</h1>
                </div>

                {loading && <LoadingBox />}
                {error && <MessageBox error={true}>{error}</MessageBox>}

                <TextField
                    label="Name"
                    variant="filled"
                    type="name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="filled"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <TextField
                    label="Confirm password"
                    variant="filled"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />

                <button className="btn" onSubmit={submitHandler}>Register</ button>

                <div>
                    Already have an account? <Link to="/signin" >
                        <strong><em>Sign-in</em></strong>
                    </Link>
                </div>

            </form>
        </div>
    )
}

export default Signup
