import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

function Profile(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;

    //get user information
    const userDetail = useSelector(state => state.userDetail);
    const { loading, error, user } = userDetail;

    //after updating profile
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdateProfile;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(detailsUser(userInfo._id))
        } else {
            console.log("go here")
            setName(user.name);
            setEmail(user.email);
        }

    }, [user, dispatch, userInfo._id])

    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and confirm password are not matched')
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }))
        }
    }
console.log("check value", email, name)
    return (
        <div>
            <form className="" onSubmit={submitHandler}>
                <h1>User Profile</h1>
                {loading ? <LoadingBox />
                    : error ? <MessageBox error={true}>{error}</MessageBox>
                        : <>
                            {loadingUpdate && <LoadingBox />}
                            {errorUpdate && <MessageBox error={true}>{errorUpdate}</MessageBox>}
                            {successUpdate && <MessageBox>Successfully updated your profile</MessageBox>}
                            <TextField
                                label="Name"
                                variant="filled"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <TextField
                                label="Email"
                                variant="filled"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                variant="filled"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <TextField
                                label="Confirm Password"
                                variant="filled"
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                            <div>
                                <Button type="submit" className="btn">Update</Button>
                            </div>

                        </>}

            </form>
        </div>
    )
}

export default Profile
