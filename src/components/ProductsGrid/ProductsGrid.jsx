import React, { Fragment, useEffect } from 'react';
import Product from '../Product/Product';
import { NavLink } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { ListProducts } from "../../actions/productActions";
import "./ProductsGrid.scss"

function ProductsGrid() {
     const dispatch = useDispatch();
     const productList = useSelector(state => state.productList)
     const { loading, error, products } = productList;

     useEffect(() => {
          dispatch(ListProducts())
     }, []);

     return (

          <Fragment>
               {
                    loading ?
                         <Skeleton animation="wave" width="100%" height="100%" />
                         : error ?
                              <Alert variant="filled" severity="error">{error}</Alert>
                              :
                              <div className="grid--container">
                                   {products.map(({ _id, name, image, price, rating, numReviews }) => (
                                        <NavLink to={`/product/${_id}`} key={_id}>
                                             <Product
                                                  name={name}
                                                  rating={rating}
                                                  price={price}
                                                  image={image}
                                                  numReviews={numReviews}
                                             />
                                        </NavLink>

                                   ))
                                   }
                              </div >
               }
          </Fragment>
     )
}

export default ProductsGrid;
