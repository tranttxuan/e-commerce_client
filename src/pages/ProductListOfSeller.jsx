import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, ListProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import { Button } from '@material-ui/core';

function ProductListOfSeller(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo: { _id } } = userSignin;
    
    const productDelete = useSelector(state => state.productDelete);
    const { success: successDelete } = productDelete;

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList;
    

    const dispatch = useDispatch();
    const handleEditProduct = (e, id) => {
        props.history.push(`/product/edit/${id}`)
    }

    const handleDeleteProduct = (e, id) => {
        dispatch(deleteProduct(id))
        if (successDelete) {
            dispatch(productList({ seller: _id }))
        }
    }

    useEffect(() => {
        dispatch(ListProducts({ seller: _id }));
    }, [dispatch, _id, successDelete])

    return (
        <div className="container container-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>NAME</th>
                        <th>BRAND</th>
                        <th>CATEGORY</th>
                        <th>ACTIONS</th>

                    </tr>
                </thead>
                <tbody>
                    {loading
                        ? <LoadingBox />
                        : error
                            ? <MessageBox error={true}>{error}</MessageBox>
                            : <>{products?.map((prod, i) => (
                                <tr key={i}>
                                    <td>{prod._id}</td>
                                    <td>{prod.updatedAt.substring(0, 10)}</td>
                                    <td>{prod.name}</td>
                                    <td>{prod.brand}</td>
                                    <td>{prod.category}</td>
                                    <td className="btn-grid">
                                        <Button className="btn" onClick={e => handleEditProduct(e, prod._id)}> Edit</Button>
                                        <Button className="btn" onClick={e => handleDeleteProduct(e, prod._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                            </>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductListOfSeller
