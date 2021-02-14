import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ListProducts } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';

function OrderListOfSeller() {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const productList = useSelector(state => state.productList);
    const { loading: loadingList, error: errorList, products } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ListProducts({ seller: userInfo._id }))
    }, [dispatch, userInfo])

    return (
        <div className="container">

            {loadingList
                ? <LoadingBox />
                : errorList
                    ? <MessageBox error={true}>{errorList}</MessageBox>
                    : <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>USER</th>
                                <th>SELLER</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 &&
                                <tr><td colSpan="8"><MessageBox>No order</MessageBox></td></tr>
                            }
                           

                        </tbody>


                    </table>}
        </div>
    )
}

export default OrderListOfSeller
