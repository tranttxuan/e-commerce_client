import React, { Fragment, useEffect } from 'react';
import Product from '../Product/Product';
import { NavLink } from 'react-router-dom';
import { Skeleton, Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { ListProducts } from "../../actions/productActions";
import "./ProductsGrid.scss"
import { CircularProgress, Grid } from '@material-ui/core';

function ProductsGrid() {
     const dispatch = useDispatch();
     const productList = useSelector(state => state.productList)
     const { loading, error, products } = productList;

     useEffect(() => {
          dispatch(ListProducts({ feaured: true }))
     }, [dispatch]);

     return (

          <Fragment>
               {
                    loading ?
                         <div>
                              <CircularProgress />
                              <Skeleton animation="wave" width="100%" height="100%" />
                         </div>

                         : error ?
                              <Alert variant="filled" severity="error">{error}</Alert>
                              :
                              <Grid className="grid--container"
                                   container
                                   // spacing={3} 
                                   // direction="row"
                                   justify="space-around"
                                   alignItems="center"
                              >
                                   {products.map(({ _id, name, image, price, rating, numReviews }) => (

                                        <Product
                                             item
                                             xs={12}
                                             key={_id}
                                             id={_id}
                                             name={name}
                                             rating={rating}
                                             price={price}
                                             image={image}
                                             numReviews={numReviews}
                                        />


                                   ))
                                   }
                              </Grid>
               }
          </Fragment>
     )
}

export default ProductsGrid;
