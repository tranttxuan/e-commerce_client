import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductCategories } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import Product from '../components/Product/Product';
import ProductsGrid from '../components/ProductsGrid/ProductsGrid';
import "./SearchResults.scss"

function SearchResults() {
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;

    const productCategoryList = useSelector(state => state.productCategoryList);
    const { categories, error: errorCategories, loading: loadingCategories } = productCategoryList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProductCategories())
    }, [dispatch])

    return (
        <div className="container search-page">

            <div className="search-page__header">
                {loading ? <LoadingBox />
                    : error ? <MessageBox error={true}>{error}</MessageBox>
                        : <div>
                            <h3>{ProductsGrid.length} Results</h3>
                        </div>
                }

                <div>
                    <FormControl>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Sort by
                         </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            displayEmpty
                        //    value={}
                        // onChange={e=>{}}
                        >
                            <MenuItem value="newest">Newest Arrivals</MenuItem>
                            <MenuItem value="lowest">Price: Low to High</MenuItem>
                            <MenuItem value="highest">Price: High to Low</MenuItem>
                            <MenuItem value="toprated">Avg. Customer Reviews</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="search-page__main">
                <Grid container justify={'space-between'}>
                    <Grid container xs={12} sm={3}>
                        <h3>Search</h3>
                        <div>
                            <h4>Category</h4>
                            <ul>
                                <li>Any</li>

                            </ul>
                        </div>
                        <div>
                            <h3>Price</h3>

                        </div>
                        <div>
                            <h3>Average Customer Review</h3>

                        </div>
                    </Grid>

                    <Grid container xs={12} sm={9} justify={'space-around'}>
                        {loading ? <LoadingBox />
                            : error ? <MessageBox error={true}>{error}</MessageBox>
                                : (
                                    <>
                                        {products.length === 0 &&
                                            <MessageBox>No Product Found</MessageBox>}
                                    </>
                                )}
                        {products.map(({ name, image, price, rating, numReviews }, id) => (
                            <Grid item xs={12} sm={4} key={id}>
                                <Product
                                    name={name}
                                    image={image}
                                    price={price}
                                    rating={rating}
                                    numReviews={numReviews} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default SearchResults
