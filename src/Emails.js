import React from "react";
import { Card, Container, Button } from "react-bootstrap";

const Emails = ({props}) => {
    let mappedEmails = props.map((email) => {
    return(
    <Card>
      <Card.Header>Sender: {email.sender}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0"></blockquote>
        <p>Subject: {email.subject}</p>
        <Button variant="outline-dark">View e-mail</Button>
      </Card.Body>
    </Card>
    )
  });
  return <Container>{mappedEmails}</Container>
};

export default Emails;
