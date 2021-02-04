import { Button } from "@material-ui/core";
import React from "react";
import "./Product.scss";
import Rating from "@material-ui/lab/Rating";

function Product({ name, image, price, rating, numReviews }) {
    return (
        <div className="product">
            <img src={image} alt={name} />

            <div className="product__info">
                {name.length > name.substring(0, 100).length ? (
                    <p>{name.substring(0, 80)}... </p>
                ) : (
                    <p className="product__info--name"> {name} </p>
                )}
                <p className="product__price">
                    <span>$</span> <strong>{price}</strong>
                </p>

                <div className="product__rating">
                    <Rating className="rating" name="half-rating-read" value={rating}  precision={0.5} readOnly /> 
                    <small>{numReviews} reviews</small>
                </div>
            </div>

            <Button className="btn">Add to Basket</Button>
        </div>
    );
}

export default Product;
