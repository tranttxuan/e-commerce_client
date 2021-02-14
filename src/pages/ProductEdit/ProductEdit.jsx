import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, DetailsProduct, editProduct } from '../../actions/productActions';
import apiHandler from '../../api/apiHandler';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DETAILS_RESET, PRODUCT_EDIT_RESET } from '../../constants/productConstants';
import "./ProductEdit.scss";

function ProductEdit(props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState("");
    const [countInStock, setCountInStock] = useState('');
    const [showImage, setShowImage] = useState('')
    const [showAdditionalImage, setShowAdditionalImage] = useState('')
    const [image, setImage] = useState("");
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('url');

    //this component used for create or edit product
    //route for create a new product is /product/create
    //route for edit a specific product if product/edit/:idProd
    const idProduct = props.match.params.idProd;


    const productCreate = useSelector(state => state.productCreate);
    const { success: successCreate, error: errorCreate, product: createdProduct } = productCreate;

    const productEdit = useSelector(state => state.productEdit);
    const { success: successEdit, error: errorEdit } = productEdit;

    //details of product
    const productDetails = useSelector(state => state.productDetails);
    const { loading,  product } = productDetails;

    const dispatch = useDispatch();

    //component did mount
    useEffect(() => {
        dispatch({ type: PRODUCT_DETAILS_RESET });
    }, []);

    useEffect(() => {
        //complete product details in input fields if this route is used for editing product
        if (idProduct) {
            if (!product?.name) {
                dispatch(DetailsProduct(idProduct));
            } else {
                setName(product.name);
                setPrice(product.price);
                setCountInStock(product.countInStock);
                setBrand(product.brand);
                setImage(product.image);
                setShowImage(product.image)
                setImages(product.images || []);
                setDescription(product.description);
                setCategory(product.category);
            }
        }

        //for editing a product
        if (successEdit) {
            dispatch({ type: PRODUCT_EDIT_RESET });
            props.history.push(`/product/${idProduct}`);

        }
        //for creating new product
        if (successCreate) {
            const link = createdProduct._id
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${link}`);
        }


    }, [product, dispatch, successCreate, idProduct, successEdit,])

    const uploadFileHandler = (event, forImages) => {
        const file = event.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);

        //convert uploaded file to url
        apiHandler.uploadFile(bodyFormData)
            .then(imageUrl => {
                setUploading(false);
                if (forImages) {
                    setImages([...images, imageUrl]);
                    setShowAdditionalImage(URL.createObjectURL(event.target.files[0]));
                } else {
                    setImage(imageUrl);
                    setShowImage(URL.createObjectURL(event.target.files[0]));
                }
            })
            .catch(err => {
                console.log(err)
                setErrorUpload(err)
                setUploading(false);
            })
    }

    const handleChangeRadio = (event) => {
        setSelectedRadio(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!image) {
            setErrorUpload("Please upload an image for your product under main image section");
            setTimeout(() => {
                setErrorUpload("")
            }, 3000);
            return;
        }

        if (idProduct) {
            dispatch(editProduct({ name, price, image, images, brand, category, countInStock, description }, idProduct))
        } else {
            dispatch(createProduct({ name, price, image, images, brand, category, countInStock, description }))
        }

    }



    return (
        <div className="container product-edit">
            <form onSubmit={handleSubmit}>
                <h2>Add new product</h2>
                {loading && <LoadingBox />}
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
                <div>
                    <br></br>
                    <FormLabel className="label">Image*</FormLabel>
                    <RadioGroup className="radio" value={selectedRadio} onChange={handleChangeRadio}>
                        <FormControlLabel value="url" name="url" control={<Radio />} label="Add image URL" />
                        <FormControlLabel value="file" name="file" control={<Radio />} label="Upload image file" />
                    </RadioGroup>
                </div>

                <img src={showImage
                    ? showImage
                    : "https://uploads-ssl.webflow.com/5b51027ab42492b481d39425/5ba289e09f24ea6d65fc8a70_noimage.jpg"}
                    alt="dummy" className="product__image" />
                {uploading && <LoadingBox />}

                {selectedRadio === "url" ?
                    <div>
                        <FormLabel className="label">Upload main image</FormLabel>
                        <TextField
                            label="Main image"
                            variant="filled"
                            type="text"
                            value={image}
                            onChange={e => {
                                setImage(e.target.value)
                                setShowImage(e.target.value)
                            }}
                        />
                    </div>
                    :
                    <div>
                        <FormLabel className="label">Upload main image</FormLabel>
                        <input
                            label="Image File"
                            name="image"
                            variant="filled"
                            type="file"
                            onChange={uploadFileHandler}
                        />
                        <hr></hr>
                    </div>
                }

                <img src={showAdditionalImage
                    ? showAdditionalImage
                    : "https://uploads-ssl.webflow.com/5b51027ab42492b481d39425/5ba289e09f24ea6d65fc8a70_noimage.jpg"}
                    alt="dummy" className="product__image--additional product__image" />

                {uploading && <LoadingBox />}

                {selectedRadio === "url"
                    ? <TextField
                        label="Add more images"
                        variant="filled"
                        type="text"
                        value=""
                        onChange={e => {
                            setImages(pre => pre ? [...pre, e.target.value] : [e.target.value])
                            setShowAdditionalImage(e.target.value)
                        }}
                    />
                    :
                    <div>

                        <FormLabel className="label">Add more images</FormLabel>
                        <input
                            label="Image File"
                            name="images"
                            variant="filled"
                            type="file"
                            onChange={e => uploadFileHandler(e, true)}
                        />
                        <hr></hr>
                    </div>
                }


                <br></br>
                <FormLabel className="label">List of additional images</FormLabel>
                <div className="product__image--additional">
                    {images.length === 0 ? <em>No image</em> :
                        images.map((img, id) =>
                            <img src={img} key={id} alt={`img-${id}`}
                                className="product__image"
                                onError={(e) => { e.target.onerror = null; e.target.src = { showAdditionalImage } }}
                            />)}
                </div>



                <div>
                    <Button className="btn" type="submit">{idProduct ? "UPDATE" : "ADD"}</Button>
                </div>
                {errorUpload && <MessageBox error={true} filled={true}>{errorUpload}</MessageBox>}
                {errorCreate && <MessageBox error={true} filled={true}>{errorCreate}</MessageBox>}
                {errorEdit && <MessageBox error={true} filled={true}>{errorEdit}</MessageBox>}
            </form>
        </div>
    )
}

export default ProductEdit
