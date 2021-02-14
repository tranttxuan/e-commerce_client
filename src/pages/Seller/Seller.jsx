import { Grid } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsUser } from '../../actions/userAction';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import EmailIcon from '@material-ui/icons/Email';
import "./Seller.scss"


function Seller(props) {
    const idSeller = props.match.params.idSeller;
    const userDetail = useSelector(state => state.userDetail);
    const { loading, user, error } = userDetail;


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsUser(idSeller));

    }, [idSeller, dispatch]);

    console.log(user?.name)

    return (
        <div className="sellerPage container">
            <Grid container>
                <Grid item xs={12} sm={4} md={3}>
                    {loading ? <LoadingBox />
                        : error ? <MessageBox error={true}>{error}</MessageBox>
                            :
                            <div className="box">
                                <div>
                                    {user.seller.logo && <img src={user.seller.logo} alt={user.seller.name} />}
                                    <p> Seller</p>
                                </div>

                                <h3>
                                    <Link to={`/seller/${idSeller}`}>
                                        {user.seller.name}
                                    </Link>
                                </h3>
                                <div>
                                    <h4>Description</h4>
                                    <p>{user.seller.description}</p>
                                </div>
                                <div >
                                    <a href={`mailto:${user.email}?cc=someoneelse@gmail.com&body=Your-contact:`}
                                        className="contact">
                                        <EmailIcon /> Contact seller
                                </a>

                                </div>

                                <div className="rating">
                                    <Rating
                                        name="half-rating-read"
                                        value={user.seller.rating}
                                        precision={0.5}
                                        readOnly
                                    />
                                    {user.seller.numReviews} reviews
                                </div>
                            </div>
                    }
                </Grid>

                <Grid item xs={12} sm={8} md={9} container direction="row" className="grid-container box">
                    <ProductsGrid searchQuery={{ seller: idSeller }} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Seller
