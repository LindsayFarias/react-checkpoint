import React from "react";
import {Button, Container, Col, Form, Row} from "react-bootstrap";

const Compose = (props) => {
    return(
        <Container fluid>
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">To:</Form.Label>
                <Col sm="10">
                    <Form.Control type="email" placeholder="name@example.com" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">CC:</Form.Label>
                <Col sm="10">
                    <Form.Control type="email" placeholder="name@example.com" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Subject:</Form.Label>
                <Col sm="10">
                    <Form.Control type="email"/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Compose:</Form.Label>
                <Form.Control as="textarea" rows={6} />
            </Form.Group>
            <Button className="mx-1" onClick={() => {props.composeFunc(false)}} variant="light">Send</Button>
        </Form>
        </Container>
    )
}

export default Compose