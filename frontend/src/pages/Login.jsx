import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form } from "react-bootstrap";
// import Loader from "../components/Loader";
// import Message from "../components/Message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {};

  return (
    <FormContainer title={"Sign In"}>
      {/* {error ? <Message>{error}</Message> : null}
      {loading ? <Loader /> : null} */}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-2">
          <Form.Control
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid">
          <button type="submit" className="btn btn-success mt-3">
            Sign In
          </button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default Login;
