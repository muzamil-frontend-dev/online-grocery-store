import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loading";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { loginSelector, loginUser } from "../features/auth/loginSlice";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();
  const [query] = useSearchParams();
  const redirect = query.get("redirect") === null ? "/" : query.get("redirect");
  const { loading, error, userInfo } = useSelector(loginSelector);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch login
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      if (redirect.includes("admin") && userInfo.isAdmin) {
        navigation(redirect);
      } else if (!redirect.includes("admin")) {
        navigation(redirect);
      }
    }
  }, [userInfo, navigation, redirect]);

  return (
    <FormContainer title="Sign In">
      {error ? <Message>{error}</Message> : null}
      {loading ? <Loader /> : null}
      <Form onSubmit={submitHandler}>
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
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="d-grid">
          <Button type="submit" className="btn btn-primary mt-3">
            Sign In
          </Button>
        </div>
      </Form>
      <Row className="py-3">
        <Col>
          Not have an account?{" "}
          <Link
            to={
              redirect !== "/" ? `/register?redirect=${redirect}` : "/register"
            }
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
