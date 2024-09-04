import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { GoBook } from "react-icons/go";
import { useSelector } from "react-redux";
import { selectEnrollmentCount } from "../../redux/enrollmentSlice";

function Header(props) {
  const enrollmentCount = useSelector(selectEnrollmentCount);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand>Student Dashboard</Navbar.Brand>
        </Link>
        <Link to="/enrollment-cart" className="d-flex align-items-center">
          <GoBook style={{ color: "white", fontSize: "24px" }} />
          {enrollmentCount > 0 && (
            <span
              style={{
                marginLeft: "8px",
                backgroundColor: "#f00",
                color: "#fff",
                borderRadius: "50%",
                padding: "2px 8px",
                fontSize: "14px",
              }}
            >
              {enrollmentCount}
            </span>
          )}
        </Link>
        {enrollmentCount > 0 && (
          <span className="enrollment-count">{enrollmentCount}</span>
        )}
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
