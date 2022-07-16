import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const Message = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  useEffect(() => {
    getFullEmail();
  }, []);
  const getFullEmail = () => {
    fetch(`${process.env.REACT_APP_BASEURL}messages/${id}`, {
      method: "get",
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((emails) => {
        setContent(emails[0].content);
        setSubject(emails[0].subject);
      });
  };

  return (
    <Container fluid="md">
      <Card className="text-center mt-2">
        <Card.Header>{subject}</Card.Header>
        <Card.Body>
          <Card.Subtitle>{content}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Message;
