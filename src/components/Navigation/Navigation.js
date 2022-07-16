import React, { useEffect } from "react";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { isSignedIn, onRouteChange, unreadEmails } = this.props;
    if (localStorage.getItem("id") && localStorage.getItem("email")) {
      return (
        <nav
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
          }}
        >
          <p className="f3  black pa3">
            Welcome {localStorage.getItem("name")}
          </p>
          <p className="f3 black pa3 ">
            <strong style={{ color: "#ffffff" }}>{unreadEmails.length}</strong>{" "}
            unread messages
          </p>
          <p
            onClick={() => {
              localStorage.removeItem("id");
              localStorage.removeItem("name");
              localStorage.removeItem("email");
              onRouteChange("");
            }}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign Out
          </p>
        </nav>
      );
    } else {
      return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => onRouteChange("signin")}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign In
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="f3 link dim black underline pa3 pointer"
          >
            Register
          </p>
        </nav>
      );
    }
  }
}

export default Navigation;
