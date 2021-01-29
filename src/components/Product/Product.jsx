import { Button } from "@material-ui/core";
import React from "react";
import "./Product.scss";
import Rating from "@material-ui/lab/Rating";

function Product({ name, image, price, rating }) {
    return (
        <div className="product">
            <img src={image} alt="image" />

            <div className="product__info">
                {name.length > name.substring(0, 100).length ? (
                    <p>{name.substring(0, 80)}... </p>
                ) : (
                    <p> {name} </p>
                )}
                <p className="product__price">
                    <small>$</small> <strong>{price}</strong>
                </p>

                <div className="product__rating">
                    <Rating name="read-only" value={rating} readOnly />
                </div>
            </div>

            <Button>Add to Basket</Button>
        </div>
    );
}

export default Product;
