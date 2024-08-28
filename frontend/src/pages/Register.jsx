import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  registerSelector,
  registerUser,
  resetRegister,
} from "../features/auth/registerSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigation = useNavigate();
  const [query] = useSearchParams();
  const redirect = query.get("redirect") === null ? "/" : query.get("redirect");
  const { loading, success, error } = useSelector(registerSelector);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password Not Matched.");
    } else {
      setMessage(null);
      dispatch(registerUser(name, email, password));
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(resetRegister());
      navigation(redirect);
    }
  }, [success, navigation, redirect, dispatch]);

  return (
    <FormContainer title={"Register"}>
      {error ? (
        <Message>{error}</Message>
      ) : message ? (
        <Message>{message}</Message>
      ) : null}
      {loading ? <Loader /> : null}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value !== confirmPassword) {
                setMessage("Password Not Matched.");
              } else {
                setMessage(null);
              }
            }}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (e.target.value !== password) {
                setMessage("Password Not Matched.");
              } else {
                setMessage(null);
              }
            }}
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

export default Register;
