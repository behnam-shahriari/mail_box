import React, { Component, useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";
import Home from "./components/Home/Home";
import Inbox from "./components/Inbox/Inbox";
import Message from "./components/Message/Message";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoutes";

const App = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState("");
  const [emails, seteEmails] = useState([]);
  const [unreadEmails, setUnreadEmails] = useState([]);
  const [route, setRoute] = useState(
    localStorage.getItem("email") ? "home" : "signin"
  );
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("email") ? true : false
  );

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("email")) {
      getTotalEmails();
    }
  });

  const loadUser = (data) => {
    setId(data.id);
    setName(data.name);
    setEmail(data.email);
    setJoined(data.joined);
    localStorage.setItem("id", data.id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("email", data.email);
    getTotalEmails();
  };

  const OnRouteChange = (route) => {
    return navigate(`/${route}`);
  };

  const getTotalEmails = () => {
    fetch(
      `${process.env.REACT_APP_BASEURL}totalEmails/${localStorage.getItem(
        "id"
      )}`,
      {
        method: "get",
        headers: { "content-type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((emails) => {
        seteEmails(emails.data);
        const unread = emails.data.filter((email) => {
          return !email.isRead;
        });
        setUnreadEmails(unread);
        return emails;
      });
  };

  return (
    <div className="App">
      <Navigation
        unreadEmails={unreadEmails}
        isSignedIn={isSignedIn}
        onRouteChange={OnRouteChange}
      />

      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("id") ? (
              <Home
                emails={emails}
                unreadEmails={unreadEmails}
                onRouteChange={OnRouteChange}
              />
            ) : (
              <Signin loadUser={loadUser} onRouteChange={OnRouteChange} />
            )
          }
        ></Route>
        <Route
          path="/signin"
          element={<Signin loadUser={loadUser} onRouteChange={OnRouteChange} />}
        ></Route>
        <Route
          path="/register"
          element={
            <Register loadUser={loadUser} onRouteChange={OnRouteChange} />
          }
        ></Route>

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home
                emails={emails}
                unreadEmails={unreadEmails}
                onRouteChange={OnRouteChange}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <Inbox emails={emails} onRouteChange={OnRouteChange} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/message/:id"
          element={
            <ProtectedRoute>
              <Message emails={emails} onRouteChange={OnRouteChange} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
