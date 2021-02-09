import { Button } from "@material-ui/core";
import React from "react";
import "./Product.scss";
import Rating from "@material-ui/lab/Rating";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartAction";


function Product({ id, name, image, price, rating, numReviews }) {
    const dispatch = useDispatch();

    const handleAddToCart = (event) => {
        dispatch(addToCart(id, 1))

    };

    return (
        <div className="product">
            <NavLink to={`/product/${id}`}>
                <img src={image} alt={name} />
            </NavLink>

            <div className="product__info">
                <NavLink to={`/product/${id}`}>
                    {name.length > name.substring(0, 100).length ? (
                        <p>{name.substring(0, 80)}... </p>
                    ) : (
                            <p className="product__info--name"> {name} </p>
                        )}
                    <p className="product__price">
                        <span>$</span> <strong>{price}</strong>
                    </p>

                    <div className="product__rating">
                        <Rating className="rating" name="half-rating-read" value={rating} precision={0.5} readOnly />
                        <small>{numReviews} reviews</small>
                    </div>
                </NavLink>
            </div>

            <Button className="btn" onClick={handleAddToCart}>Add to Basket</Button>
        </div>
    );
}

export default Product;
