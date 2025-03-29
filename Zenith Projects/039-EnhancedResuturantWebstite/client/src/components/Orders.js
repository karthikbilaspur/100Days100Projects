import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Orders</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Order Items</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order.customerName}</td>
                                    <td>{order.orderItems.join(', ')}</td>
                                    <td>{order.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default Orders;