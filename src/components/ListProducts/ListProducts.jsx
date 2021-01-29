import React from 'react'
import Product from '../Product/Product'
import "./ListProducts.scss"
import data from "../../data"

function ListProducts() {
     console.log(data.products)
     return (
          <div className="grid--container">
               {data.products.map(({ _id, name, image, price, rating }) => (
                    <Product
                         key={_id}
                         name={name}
                         rating={rating}
                         price={price}
                         image={image}
                    />
               ))}
          </div>
     )
}

export default ListProducts
