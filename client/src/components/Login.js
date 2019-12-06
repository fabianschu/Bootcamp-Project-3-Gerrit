import React, { Component, useState, useEffect } from "react";
import { login } from "../services/auth";
import { Alert, Form, Button } from "react-bootstrap";

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    login(credentials.username, credentials.password).then(data => {
      if (data.message) {
        setError(data.message);
        console.log(data.message);
      } else {
        // lift the data up to the App state
        props.setUser(data);
        //redirect
        props.history.push("/chat")
      }
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="username">Username: </Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="username"
            value={props.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password: </Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={props.password}
            onChange={handleChange}
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button type="submit">Log in</Button>
      </Form>
    </div>
  );
};
export default Login;