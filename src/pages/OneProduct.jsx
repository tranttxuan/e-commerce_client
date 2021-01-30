import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./OneProduct.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { DetailsProduct } from "../actions/productActions";
import NavBar from "../components/NavBar/NavBar";
import { Alert, AlertTitle, Skeleton, Rating } from "@material-ui/lab";

function OneProduct(props) {
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(DetailsProduct(productId));
    }, []);

    const changeImage = (image) => {
        setSelectedImage(image);
    };

    const handleAddToCart = (event) => {
        props.history.push(`/cart/${productId}?quantity=${quantity}`);
    };

    const submitHandler = (event) => {
         event.preventDefault();
         
    }
    
    return (
        <Fragment>
            <NavBar />
            {loading ? (
                <Skeleton animation="wave" width="100%" height="100%" />
            ) : error ? (
                <Alert variant="filled" severity="error">
                    {error}
                </Alert>
            ) : (
                //INFO
                <div className="one-product">
                    <Link to="/" className="one-product__back">
                        <ArrowBackIcon />
                        Back to result
                    </Link>
                    <div className="row">
                        <div>
                            <img
                                className=""
                                src={product.image || selectedImage}
                                alt={product.name}
                            />
                        </div>

                        <div>
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>

                                <li>
                                    <a href="#reviews">
                                        <Rating
                                            name="half-rating-read"
                                            value={product.rating}
                                            precision={0.5}
                                            readOnly
                                        />
                                        {product.numReviews} reviews
                                    </a>
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
                                    <ul className="images">
                                        {[product.image, ...product.images].map((prod) => (
                                            <li key={prod}>
                                                <button
                                                    type="button"
                                                    //   className="light"
                                                    onClick={() => changeImage(prod)}
                                                >
                                                    <img
                                                        src={prod}
                                                        alt="product"
                                                        className="small"
                                                    />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        {/* ORDER  */}
                        <div>
                            <div>
                                <ul>
                                    <li>
                                        Seller
                                        <h2>
                                            <Link to={`/seller/${product.seller._id}`}>
                                                {product?.seller?.seller?.name}
                                            </Link>
                                        </h2>
                                        <Rating
                                            name="half-rating-read"
                                            value={product?.seller?.seller?.rating}
                                            precision={0.5}
                                            readOnly
                                        />
                                        {product?.seller?.seller?.numReviews} reviews
                                    </li>

                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div>
                                                <div className="price">${product.price}</div>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>
                                                {product.countInStock > 0 ? (
                                                    <span className="success">In Stock</span>
                                                ) : (
                                                    <span className="danger">Unavailable</span>
                                                )}
                                            </div>
                                        </div>
                                    </li>

                                    {product.countInStock > 0 && (
                                        <Fragment>
                                            <li>
                                                <div className="row">
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
                                                </div>
                                            </li>

                                            <li>
                                                <button
                                                    className="block primary"
                                                    type="button"
                                                    onClick={handleAddToCart}
                                                >
                                                    Add to Cart
                                                </button>
                                            </li>
                                        </Fragment>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* REVIEWS */}
                    <div>
                        <h2 id="reviews">Reviews</h2>

                        {!product.reviews.length && (
                            <Alert severity="info">
                                <AlertTitle>Info</AlertTitle>
                                No review
                            </Alert>
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

                            {/* {userInfo?  */}
                            <form onSubmit={submitHandler}>
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
                                        id="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div />
                                    <button className="primary" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
          
          {/* if not sign in, go to sign in  */}
                
                        </ul>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default OneProduct;
