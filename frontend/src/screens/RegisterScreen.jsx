import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  registerSelector,
  registerUser,
  resetRegister,
} from "../features/auth/registerSlice";
import Message from "../components/Message";
import Loader from "../components/Loading";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [query] = useSearchParams();
  const redirect = query.get("redirect") === null ? "/" : query.get("redirect");

  const navigate = useNavigate();

  const { loading, error, success } = useSelector(registerSelector);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password not match");
    } else {
      setMessage(null);
      // Dispatch register
      dispatch(registerUser(name, email, password));
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(resetRegister());
      navigate(redirect);
    }
  }, [success, navigate, redirect]);

  return (
    <FormContainer title="Register">
      {error ? <Message>{error}</Message> : null}
      {message ? <Message>{message}</Message> : null}
      {loading ? <Loader /> : null}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value !== confirmPassword) {
                setMessage("Password not match");
              } else {
                setMessage(null);
              }
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Enter confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (e.target.value !== password) {
                setMessage("Password not match");
              } else {
                setMessage(null);
              }
            }}
          ></Form.Control>
        </Form.Group>
        <div className="d-grid">
          <Button type="submit" className="btn btn-primary mt-3">
            Register
          </Button>
        </div>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link
            to={redirect !== "/" ? `/login?redirect=${redirect}` : "/login"}
          >
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
