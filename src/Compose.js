import React from "react";
import {Button, Container, Col, Form, Row} from "react-bootstrap";
import {useState} from 'react';

const Compose = (props) => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const [data, appendData] = useState({sender: 'lindsay.farias@spaceforce.mil', recipient: '', message: '', subject: '', date: date, id: (props.length + 1)})

    return(
        <Container fluid>
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">To:</Form.Label>
                <Col sm="10">
                    <Form.Control onChange={(e) => appendData({...data, recipient: e.target.value})} type="email" placeholder="name@example.com" />
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
                    <Form.Control onChange={(e) => appendData({...data, subject: e.target.value})} type="email"/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Compose:</Form.Label>
                <Form.Control onChange={(e) => appendData({...data, message: e.target.value})} as="textarea" rows={6} />
            </Form.Group>
            <Button className="mx-1" onClick={()=>{props.postDataFunc(data)}} variant="light">Send</Button>
        </Form>
        </Container>
    )
}

export default Compose