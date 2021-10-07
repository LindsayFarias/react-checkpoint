import React from "react"
import {Button, Card, Container} from "react-bootstrap"

const EmailQuery = (props) => {
    let queryArray = props.queryObj

    let mappedQuery = queryArray.map((email) => {
        return(
            <Card>
                <Card.Header>Sender: {email.sender}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0"></blockquote>
                    <p>Subject: {email.subject}</p>
                    <Button onClick={()=>props.selectorFunc(email.id)}variant="outline-dark">View e-mail</Button>
                </Card.Body>
            </Card>
        )
    });

    return(
        <Container>
            {mappedQuery}
        </Container>
    );
}

export default EmailQuery