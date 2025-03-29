// src/components/Notification.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io('http://localhost:3001');
        setSocket(socket);

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('notification', (notification) => {
            setNotifications((prevNotifications) => [...prevNotifications, notification]);
        });
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    {notifications.map((notification, index) => (
                        <Alert key={index} variant="info">
                            {notification.message}
                        </Alert>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default Notification;