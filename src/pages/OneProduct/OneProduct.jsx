import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./OneProduct.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { DetailsProduct } from "../../actions/productActions";
import { Rating } from "@material-ui/lab";
import { Button, Grid } from "@material-ui/core";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";

function OneProduct(props) {
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const userSignin = useSelector(state => state.userSignin);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(DetailsProduct(productId));
    }, [dispatch, productId]);

    const changeImage = (image) => {
        setSelectedImage(image);
    };

    const handleAddToCart = (event) => {
        props.history.push(`/cart/${productId}?quantity=${quantity}`);
    };

    const submitHandler = (event) => {
        event.preventDefault();
    };

    return (
        <Fragment>

            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox error={true}>{error}</MessageBox>
            ) : (
                        //INFO
                        <div className="one-product container" >
                            <Grid container justify="space-between">
                                <Grid item>
                                    <Button className="btn btn-extra" onClick={e => props.history.goBack()}>
                                        <ArrowBackIcon />
                                        Back
                                </Button>
                                </Grid>
                                {userSignin && userSignin.userInfo?._id === product.seller &&
                                    <Grid item>
                                        <Button className="btn btn-extra" onClick={e => props.history.push(`/product/edit/${productId}`)}>
                                            Edit
                                        <ArrowForwardIcon />
                                        </Button>
                                    </Grid>}
                            </Grid>


                            <Grid spacing={3} container justify={"space-around"} className="one-product__wrapper">
                                <Grid item xs={12} sm={6} >
                                    <div className="one-product__img-prod">
                                        <img
                                            src={selectedImage || product.image}
                                            alt={product.name}
                                        />
                                    </div>

                                </Grid>

                                <Grid item xs={12} sm={6} md={3} >
                                    <ul className="one-product__info">
                                        <li>
                                            <h3>{product.name}</h3>
                                        </li>

                                        <li>
                                            <Link to="#reviews"  >
                                                <Rating
                                                    name="half-rating-read"
                                                    value={product.rating}
                                                    precision={0.5}
                                                    readOnly
                                                />
                                                {product.numReviews} reviews
                                            </Link>
                                        </li>

                                        <li>
                                            <strong>Price: </strong>${product.price}
                                        </li>

                                        <li>
                                            <strong>Description: </strong>
                                            <p>{product.description}</p>
                                        </li>

                                        <li>
                                            <strong>Images:</strong>
                                            <ul className="one-product__images">
                                                {[product.image, ...product.images].map((prod, id) => (
                                                    <li key={id}>
                                                        <button
                                                            type="button"
                                                            onClick={() => changeImage(prod)}
                                                        >
                                                            <img
                                                                src={prod || ""}
                                                                alt="product"
                                                                className="small"
                                                            />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </Grid>

                                {/* ORDER  */}
                                <Grid item xs={12} sm={6} md={3} className="one-product__seller">
                                    <div className="box">
                                        <ul>
                                            <li>
                                                Seller
                                                <h2>
                                                    <Link to={`/seller/${product.seller}`}>
                                                        {product.seller.seller?.name}
                                                    </Link>
                                                </h2>
                                                <div className="rating">
                                                    <Rating
                                                        name="half-rating-read"
                                                        value={product?.seller?.seller?.rating}
                                                        precision={0.5}
                                                        readOnly
                                                    />
                                                    {product?.seller?.seller?.numReviews} reviews
                                                </div>

                                            </li>

                                            <li>
                                                <Grid container justify={"space-between"}>
                                                    <div>Price</div>
                                                    <div>
                                                        <div className="price">${product.price}</div>
                                                    </div>
                                                </Grid>
                                            </li>

                                            <li>
                                                <Grid container justify={"space-between"}>
                                                    <div>Status</div>
                                                    <div>
                                                        {product.countInStock > 0 ? (
                                                            <span className="success">In Stock</span>
                                                        ) : (
                                                                <span className="danger">Unavailable</span>
                                                            )}
                                                    </div>
                                                </Grid>
                                            </li>

                                            {product.countInStock > 0 && (
                                                <Fragment>
                                                    <li>
                                                        <Grid container justify={"space-between"}>
                                                            <div>Quantity: </div>
                                                            <div>
                                                                <select
                                                                    value={quantity}
                                                                    onChange={(e) => {
                                                                        setQuantity(e.target.value);
                                                                    }}
                                                                >
                                                                    {[
                                                                        ...Array(
                                                                            product.countInStock
                                                                        ).keys(),
                                                                    ].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </Grid>
                                                    </li>

                                                    <li>
                                                        <Button
                                                            className="btn"
                                                            type="button"
                                                            onClick={handleAddToCart}
                                                        >
                                                            Add to Cart
                                                </Button>
                                                    </li>
                                                </Fragment>
                                            )}
                                        </ul>
                                    </div>
                                </Grid>
                            </Grid>

                            {/* REVIEWS */}
                            <div id="reviews" className="container add-reviews">
                                <h2 >Reviews</h2>

                                {!product.reviews.length && (
                                    <MessageBox>No review</MessageBox>
                                )}

                                <ul>
                                    {product.reviews.map((review) => (
                                        <li key={review._id}>
                                            <strong>{review.name}</strong>

                                            <Rating value={review.rating} />

                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </li>
                                    ))}
                                </ul>
                                {/* {userInfo?  */}
                                <form onSubmit={submitHandler} className="form-medium">
                                    <div>
                                        <h2>Write a customer review</h2>
                                    </div>
                                    <div>
                                        <label htmlFor="rating">Rating</label>
                                        <select
                                            id="rating"
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value="1">1- Poor</option>
                                            <option value="2">2- Fair</option>
                                            <option value="3">3- Good</option>
                                            <option value="4">4- Very Good</option>
                                            <option value="5">5- Excelent</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="comment">Comment</label>
                                        <textarea
                                            rows="5"
                                            id="comment"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Button className="btn" type="submit">
                                            Submit
                                    </Button>
                                    </div>



                                </form>

                                {/* if not sign in, go to sign in  */}

                            </div>
                        </div>
                    )}
        </Fragment>
    );
}

export default OneProduct;
