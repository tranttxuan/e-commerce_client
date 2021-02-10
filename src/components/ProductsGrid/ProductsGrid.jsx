import React, { Fragment, useEffect } from 'react';
import Product from '../Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { ListProducts } from "../../actions/productActions";
import "./ProductsGrid.scss"
import { Grid } from '@material-ui/core';
import MessageBox from '../MessageBox/MessageBox';
import LoadingBox from '../LoadingBox/LoadingBox';

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
                         <LoadingBox />

                         : error ?
                              <MessageBox filled={true} error={true}>{error}</MessageBox>
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
