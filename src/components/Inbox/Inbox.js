import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import "./inbox.css";

class Inbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { emails, onRouteChange } = this.props;
    return emails.map((email) => {
      return (
        <Container key={email.id}>
          <ListGroup key={email.id} as="ul">
            <ListGroup.Item
              action={email.isRead ? false : true}
              variant={email.isRead ? "dark" : false}
              as="li"
              className="d-flex justify-content-between align-items-start pointer"
              onClick={() => onRouteChange(`message/${email.id}`)}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{email.subject}</div>
                {email.content.substring(1, 10)}...
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Container>
      );
    });
  }
}

export default Inbox;
