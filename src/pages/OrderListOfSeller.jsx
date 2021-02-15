import { Button } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrderSeller } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';

function OrderListOfSeller(props) {
    const orderSellerList = useSelector(state => state.orderSellerList);
    const { loading, error, orders } = orderSellerList;

    const orderDelete = useSelector(state => state.orderDelete);
    const { success } = orderDelete;
    const dispatch = useDispatch();

    const handleDeleteOrder = (event, id) => {
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        dispatch(listOrderSeller())
    }, [dispatch, success])

    return (
        <div className="container container-table">

            {loading
                ? <LoadingBox />
                : error
                    ? <MessageBox error={true}>{error}</MessageBox>
                    : <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>USER</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 &&
                                <tr><td colSpan="8"><MessageBox>No order</MessageBox></td></tr>
                            }
                            {orders.map(({ _id, createdAt, totalPrice, user, paidAt, deliveredAt }, i) => (
                                <tr key={i}>
                                    <td>{_id}</td>
                                    <td>{createdAt.substring(0, 10)}</td>
                                    <td>{totalPrice.toFixed(2)}</td>
                                    <td>{user.name}</td>
                                    <td>{paidAt ? paidAt.substring(0, 10) : "No"}</td>
                                    <td>{deliveredAt ? deliveredAt.substring(1, 10) : "No"}</td>
                                    <td className="btn-grid">
                                        <Button className="btn"
                                            onClick={e => props.history.push(`/order/${_id}`)}>
                                            Details
                                        </Button>
                                        <Button className="btn"
                                            onClick={e => handleDeleteOrder(e, _id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>


                    </table>}
        </div>
    )
}

export default OrderListOfSeller
