import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Header(props) {
  console.log(props.buttonLink);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Student Dashboard</Navbar.Brand>
        <Link to={props.buttonLink}>
          <Button variant="outline-light" className="ms-3">
            {props.buttonText}
          </Button>
        </Link>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
}

export default Header;
