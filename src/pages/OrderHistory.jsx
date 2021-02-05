import { Button } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';

function OrderHistory(props) {
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders } = orderMineList
    const dispatch = useDispatch();

    useEffect(() => {
       
        dispatch(listOrderMine())
    }, [dispatch])

    return (
        <div className="container min-height">
            <h1> Order History</h1>
            {loading ? <LoadingBox />
                : error ? < MessageBox error={true}>{error}</MessageBox>
                    : (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>

                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                                        <td>{order.isDelivered
                                            ? order.deliveredAt.substring(0, 10)
                                            : "No"
                                        }</td>
                                        <td>
                                            <Button type="button" className="btn btn-extra"
                                                onClick={() => { props.history.push(`/order/${order._id}`) }}
                                            >Details</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
            }
        </div >
    )
}

export default OrderHistory
