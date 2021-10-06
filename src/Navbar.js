import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  NavDropdown,
} from "react-bootstrap";

const NavBar = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">g-Mail</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"style={{ maxHeight: "100px" }}navbarScroll>

            <Button className="mx-1" onClick={() => {props.composeFunc(false)}} variant="light">Inbox</Button>
            <Button className="mx-1" onClick={() => {props.composeFunc(true)}} variant="light">Compose</Button>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={element => props.app.setState({ searchBoxValue: element.target.value })}
            />
            <Button onClick={() => {props.searchFunc()}} variant="outline-dark">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
