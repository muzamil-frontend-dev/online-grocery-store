import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header>
      <Container fluid>
        <Row className="justify-content-end align-items-center">
          <Col md={6}>
            <img src="./images/logo.png" alt="App Logo" />
          </Col>
          <Col className="text-end">
            <div className="header-opt">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
