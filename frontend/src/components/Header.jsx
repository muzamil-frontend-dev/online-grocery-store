import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header>
      <Container fluid>
        <Row className="align-items-center">
          <Col className="d-md-none">
            <div className="menu-opt">
              <FontAwesomeIcon icon={faBars} />
            </div>
          </Col>
          <Col>
            <img src="./images/logo.png" alt="App Logo" />
          </Col>
          <Col>
            <div className="d-flex justify-content-end">
              <div className="menu-opt d-none d-md-flex">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="menu-opt d-none d-md-flex">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="menu-opt">
                <FontAwesomeIcon icon={faCartShopping} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
