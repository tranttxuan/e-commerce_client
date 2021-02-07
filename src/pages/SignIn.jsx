import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { signin } from '../actions/userAction'
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';

function SignIn(props) {
    const [email, setEmail] = useState('xuan@gmail.com')
    const [password, setPassword] = useState('Tran123')
    const dispatch = useDispatch();

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo, loading, error } = userSignin;

    const submitHandler = (e) => {
        e.preventDefault();
        //    console.log(email, password)
        dispatch(signin(email, password));
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [redirect,props.history, userInfo])

    return (
        <div className="form-medium">
            <form  onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox />}
                {error && <MessageBox error={true}>{error}</MessageBox>}
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

                    onChange={(e) => setPassword(e.target.value)}
                />


                <button className="btn" onSubmit={submitHandler}>Sign in</ button>

                <div>
                    New customer?{' '} <Link to={redirect === '/' ? 'register' : `register?redirect=${redirect}`} >
                        <strong><em>Create your account</em></strong>
                    </Link>
                </div>

            </form>

        </div>
    )
}

export default SignIn
