import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >
          Student Dashboard
        </Navbar.Brand>
        <Button variant="outline-light" className="ms-3">
          Course List
        </Button>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
}

export default Header;
