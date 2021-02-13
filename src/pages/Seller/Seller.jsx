import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ListProducts } from '../../actions/productActions';
import { detailsUser } from '../../actions/userAction';

function Seller(props) {
    const idSeller = props.history.params.idSeller;
    const userDetail = useSelector(state => state.userDetail)
    const { loading, user, error } = userDetail;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsUser(idSeller));
        dispatch(ListProducts({ seller: idSeller }))

    }, [idSeller, dispatch,])

    return (
        <div className="container">
            <Grid container>
                <Grid item>

                </Grid>
            </Grid>
        </div>
    )
}

export default Seller
