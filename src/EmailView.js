import React from "react"
import {Button, Card, Container} from "react-bootstrap"

const EmailView = (props) => {
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{queryObj.subject}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">From: {queryObj.sender}</Card.Subtitle>
                <Card.Text>{queryObj.message}</Card.Text>
                <Button className="mx-1" onClick={() => {props.composeFunc(true)}} variant="light">Compose</Button>
            </Card.Body>
        </Card>
    );
}

export default EmailView