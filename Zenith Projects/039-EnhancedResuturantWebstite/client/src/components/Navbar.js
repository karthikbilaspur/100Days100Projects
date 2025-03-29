// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function Navbar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Restaurant Website</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#menu">Menu</Nav.Link>
                    <Nav.Link href="#orders">Orders</Nav.Link>
                    <Nav.Link href="#reviews">Reviews</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navbar;