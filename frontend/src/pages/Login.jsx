import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector, loginUser } from "../features/auth/loginSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();
  const [query] = useSearchParams();
  const redirect = query.get("redirect") === null ? "/" : query.get("redirect");
  const { loading, userInfo, error } = useSelector(loginSelector);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigation(redirect);
    }
  }, [userInfo, navigation, redirect]);

  return (
    <FormContainer title={"Sign In"}>
      {error ? <Message>{error}</Message> : null}
      {loading ? <Loader /> : null}
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
      <Row className="py-3">
        <Col>
          Not have an account?
          <Link
            to={
              redirect !== "/" ? `/register?redirect=${redirect}` : "/register"
            }
          >
            &nbsp;Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
