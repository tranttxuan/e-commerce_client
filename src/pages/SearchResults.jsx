import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductCategories, ListProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import Product from '../components/Product/Product';
import "./SearchResults.scss";
import { Link, NavLink, useParams } from "react-router-dom";
import { Fragment } from 'react';
import { Rating } from '@material-ui/lab';
import { prices, ratings } from '../utils';

function SearchResults(props) {
    const productCategoryList = useSelector(state => state.productCategoryList);
    const { categories, error: errorCategories, loading: loadingCategories } = productCategoryList;

    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;


    //check params
    const { name = 'all', category = 'all', order = 'newest', min = 0, max = 100000, rating = 0 } = useParams();
    // console.log("check params", useParams(), name, category)

    const dispatch = useDispatch();

    //show category list
    useEffect(() => {
        dispatch(listProductCategories())
    }, [dispatch])

    //load the data for the first time in componentDidMount()
    //when one dependency changes, component re-renders to show new filtered list
    useEffect(() => {
        dispatch(ListProducts({
            category: category !== "all" ? category : '',
            name: name !== "all" ? name : '',
            order, min, max, rating
        }))
    }, [category, order, min, max, rating, dispatch, name])

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max || max;
        const filterRating = filter.rating || rating;
        return `/search/category/${filterCategory}/name/${filterName}/order/${filterOrder}/min/${filterMin}/max/${filterMax}/rating/${filterRating}`;
    }

    return (
        <div className="container search-page">

            <div className="search-page__header">
                {loading ? <LoadingBox />
                    : error ? <MessageBox error={true}>{error}</MessageBox>
                        : <div>
                            <h3>{products.length} Results</h3>
                            <p>Filter Commands:{" "}
                                <small>
                                    {category !== 'all' && ` : ${category}`}
                                    {name !== 'all' && ` : ${name}`}
                                    {rating > 0 && ` : ${rating} Stars & Up`}
                                    {min !== 0 && ` : $${min} to $${max}`}
                                    {" "}
                                    {category !== 'all' || name !== "all" || rating > 0 || min ?
                                        <>
                                            <Button
                                                className="btn btn-extra"
                                                onClick={() => props.history.push("/search")}
                                            >Remove Filter</Button>
                                        </>
                                        : null
                                    }
                                </small></p>
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
                            value={order}
                            onChange={e => { props.history.push(getFilterUrl({ order: e.target.value })) }}
                        >
                            <MenuItem value="newest">Newest Arrivals</MenuItem>
                            <MenuItem value="lowest">Price: Low to High</MenuItem>
                            <MenuItem value="highest">Price: High to Low</MenuItem>
                            <MenuItem value="toprated">Avg. Customer Reviews</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>


            <Grid container justify={'space-between'} className="search-page__main">
                <Grid item xs={12} sm={3} className="filters ">
                    <div className="filter">
                        <h3>Category</h3>
                        <ul>
                            <li>
                                <Link to={getFilterUrl({ category: 'all' })}
                                    className={category === "all" ? "active" : ""}
                                >Any</Link>
                            </li>
                            {loadingCategories ? <LoadingBox />
                                : errorCategories ? <MessageBox error={true}>{errorCategories}</MessageBox>
                                    : categories.map((c, i) =>
                                        <li key={i}>
                                            <Link to={getFilterUrl({ category: c })}
                                                className={c === category ? "active" : ''}
                                            >{c}</Link>
                                        </li>)
                            }
                        </ul>
                    </div>
                    <div className="filter">
                        <h3>Price</h3>
                        <ul>
                            {prices.map((cat, i) => (
                                <li key={i}>
                                    <Link to={getFilterUrl({ min: cat.min, max: cat.max })}
                                        className={`$${min} to $${max}` === cat.name ? "active" : Number(min) === Number(cat.min) ? "active" : ''}
                                    >

                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="filter">
                        <h3>Average Customer Review</h3>
                        <div>
                            {ratings.map((cat, i) => (

                                <Link key={i} to={getFilterUrl({ rating: cat.rating })} className="filter__rating">
                                    <Rating className="rating"
                                        name="half-rating-read"
                                        value={cat.rating}
                                        precision={0.5} readOnly />
                                    <p className={`${cat.rating}` === rating ? 'active' : ""}>
                                        & Up</p>
                                </Link>

                            ))}
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} sm={9} container justify="space-around" className="products--grid">
                    {loading
                        ? <LoadingBox />
                        : error
                            ? <Grid item xs={12}>
                                <MessageBox error={true}>{error}</MessageBox>
                            </Grid>
                            : (
                                <Fragment>
                                    {products.length === 0 &&
                                        <Grid item xs={12}>
                                            <MessageBox>No Product Found</MessageBox>
                                        </Grid>
                                    }

                                    {products.map(({ name, image, price, rating, numReviews, _id }, id) => (

                                        <NavLink to={`/product/${_id}`} key={id}>
                                            <Product
                                                name={name}
                                                image={image}
                                                price={price}
                                                rating={rating}
                                                numReviews={numReviews} />
                                        </NavLink>

                                    ))}
                                </Fragment>
                            )
                    }
                </Grid>
            </Grid>
        </div>

    )
}

export default SearchResults
