import Button from "react-bootstrap/Button";
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { emails, unreadEmails, onRouteChange } = this.props;
    return (
      <Container fluid="md">
        <Card className="text-center mt-2">
          <Card.Body>
            <Card.Subtitle className="mb-2 mt-2">
              Hi {localStorage.getItem("name")}
            </Card.Subtitle>
            <Card.Text>
              You have{" "}
              <span style={{ fontWeight: "bolder" }}>
                {unreadEmails.length}
              </span>{" "}
              unread messages out of{" "}
              <span style={{ fontWeight: "bolder" }}>{emails.length} </span>
              totals
            </Card.Text>
            <Button variant="primary" onClick={() => onRouteChange("inbox")}>
              View Messages
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Home;
