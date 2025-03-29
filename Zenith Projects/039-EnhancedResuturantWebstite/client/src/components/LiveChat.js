// src/components/LiveChat.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function LiveChat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io('http://localhost:3001');
        setSocket(socket);

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSendMessage}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                placeholder="Type a message"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Send
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {messages.map((message, index) => (
                        <div key={index}>
                            <p>{message}</p>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default LiveChat;