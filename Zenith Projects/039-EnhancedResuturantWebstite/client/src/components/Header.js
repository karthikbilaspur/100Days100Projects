import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Restaurant Website</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#menu">Menu</Nav.Link>
                        <Nav.Link href="#orders">Orders</Nav.Link>
                        <Nav.Link href="#reviews">Reviews</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;