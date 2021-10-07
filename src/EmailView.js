import React from "react"
import {Card, Button} from "react-bootstrap"

const EmailView = ({email, composeFunc}) => {
    return(
        <Card>
            <Card.Header>From: {email.sender}</Card.Header>
            <Card.Body>
                <Card.Title>{email.subject}</Card.Title>
                <Card.Text>
                    {email.message}
                </Card.Text>
                <Button onClick={()=>composeFunc(true)} variant="outline-dark">Reply</Button>
            </Card.Body>
            <Card.Footer className="text-muted">{email.date}</Card.Footer>
        </Card>
    );
}

export default EmailView