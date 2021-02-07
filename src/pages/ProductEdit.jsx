import { Button, FormLabel, TextField } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import "./ProductEdit.scss";

function ProductEdit() {
    // const uploadedImage = useRef(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState("");
    const [countInStock, setCountInStock] = useState('');
    const [showedImage, setShowedImage] = useState('')
    const [image, setImage] = useState('');
    const [images, setImages] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const productCreate = useSelector(state => state.productCreate);
    const { success: successCreate, error: errorCreate, product: createdProduct } = productCreate;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
        }
    },[dispatch, successCreate])
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createProduct({ name, price, image, images, brand, category, countInStock, description }))
    }


    return (
        <div className="container product-edit">
            <form onSubmit={handleSubmit}>
                <h1>Add new product</h1>
                <TextField
                    label="Name"
                    variant="filled"
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <TextField
                    label="Price"
                    variant="filled"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />


                <TextField
                    label="Count in stock"
                    variant="filled"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    required
                    value={countInStock}
                    onChange={e => setCountInStock(e.target.value)}
                />

                <TextField
                    label="Brand"
                    variant="filled"
                    type="text"
                    required
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                />

                <TextField
                    label="Category"
                    variant="filled"
                    type="text"
                    required
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />

                <TextField
                    label="Description"
                    variant="filled"
                    type="text"
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                {/* IMAGES  */}

                <img src={showedImage
                    ? showedImage
                    : "https://uploads-ssl.webflow.com/5b51027ab42492b481d39425/5ba289e09f24ea6d65fc8a70_noimage.jpg"}
                    // ref={uploadedImage}
                    alt="dummy" className="product__image" />

                <TextField
                    label="Image Url"
                    variant="filled"
                    type="text"
                    value={image}
                    onChange={e => {
                        setImage(e.target.value)
                        setShowedImage(e.target.value)
                    }}
                />

                <FormLabel>Image File</FormLabel>
                <input
                    label="Image File"
                    name="image"
                    variant="filled"
                    type="file"
                    onChange={e => {
                        setShowedImage(URL.createObjectURL(e.target.files[0]))
                        setImage(e.target.files[0]);
                    }}
                    disabled
                />

                <FormLabel>Additional images</FormLabel>
                {images.length === 0 ? <em>No image</em> :
                    images.map((img, id) => <img src={img} key={id} alt={`img-${id}`} />)}
                <input
                    placeholder="not yet finished"
                    name="image"
                    variant="filled"
                    type="file"
                    onChange={e => {
                        // setShowedImage(URL.createObjectURL(e.target.files[0]))
                        // setImage(e.target.files[0]);
                    }}
                    disabled
                />
                <div>
                    <Button className="btn" type="submit">ADD</Button>
                </div>




            </form>
        </div>
    )
}

export default ProductEdit
