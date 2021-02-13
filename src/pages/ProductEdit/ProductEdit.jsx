import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../actions/productActions';
import apiHandler from '../../api/apiHandler';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';
import "./ProductEdit.scss";

function ProductEdit(props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState("");
    const [countInStock, setCountInStock] = useState('');
    const [showImage, setShowImage] = useState('')
    const [showAdditionalImage, setShowAdditionalImage] = useState('')
    const [image, setImage] = useState('');
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('url');


    const productCreate = useSelector(state => state.productCreate);
    const { success: successCreate, error: errorCreate, product: createdProduct } = productCreate;


    // const productUpdate = useSelector(state => state.productUpdate);
    // const { success: successUpdate, error: errorUpdate, product: createdUpdate } = productUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/`);
        }
    }, [dispatch, successCreate, image])

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
        dispatch(createProduct({ name, price, image, images, brand, category, countInStock, description }))
    }



    return (
        <div className="container product-edit">
            <form onSubmit={handleSubmit}>
                <h2>Add new product</h2>

                {errorUpload && <MessageBox error={true} filled={true}>{errorUpload}</MessageBox>}
                {errorCreate && <MessageBox error={true} filled={true}>{errorCreate}</MessageBox>}
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
                <div >
                    <br></br>
                    <FormLabel className="label">Upload main image</FormLabel>
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

                {selectedRadio === "url" ? <TextField
                    label="Image Url"
                    variant="filled"
                    type="text"
                    value={image}
                    onChange={e => {
                        setImage(e.target.value)
                        setShowImage(e.target.value)
                    }}
                />
                    : <input
                        label="Image File"
                        name="image"
                        variant="filled"
                        type="file"
                        onChange={uploadFileHandler}
                    />
                }

                <img src={showAdditionalImage
                    ? showAdditionalImage
                    : "https://uploads-ssl.webflow.com/5b51027ab42492b481d39425/5ba289e09f24ea6d65fc8a70_noimage.jpg"}
                    alt="dummy" className="product__image--additional product__image" />

                {uploading && <LoadingBox />}

                {selectedRadio === "url"
                    ? <TextField
                        label="Add more image"
                        variant="filled"
                        type="text"
                        value=""
                        onChange={e => {
                            setImages(pre => pre ? [...pre, e.target.value] : [e.target.value])
                            setShowAdditionalImage(e.target.value)
                        }}
                    />
                    : <input
                        label="Image File"
                        name="images"
                        variant="filled"
                        type="file"
                        onChange={e => uploadFileHandler(e, true)}
                    />
                }
                <br></br>
                <FormLabel className="label">List of additional images</FormLabel>
                <div  className="product__image--additional">
                    {images.length === 0 ? <em>No image</em> :
                        images.map((img, id) =>
                            <img src={img} key={id} alt={`img-${id}`}
                                className="product__image"
                                onError={(e) => { e.target.onerror = null; e.target.src = { showAdditionalImage } }}
                            />)}
                </div>



                <div>
                    <Button className="btn" type="submit">ADD</Button>
                </div>




            </form>
        </div>
    )
}

export default ProductEdit
