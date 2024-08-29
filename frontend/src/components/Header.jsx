import React from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector, userLogout } from "../features/auth/loginSlice";

const Header = () => {
  const { userInfo } = useSelector(loginSelector);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
  };

  const customToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      className="menu-opt d-none d-md-flex"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  ));

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
            <Link to="/">
              <img src="./images/logo.png" alt="App Logo" />
            </Link>
          </Col>
          <Col>
            <div className="d-flex justify-content-end">
              <div className="menu-opt d-none d-md-flex">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <>
                {!userInfo ? (
                  <Link to={"/login"}>
                    <div className="menu-opt d-none d-md-flex mx-2">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                  </Link>
                ) : (
                  <Dropdown className="mx-2">
                    <Dropdown.Toggle as={customToggle} id="dropdown-basic">
                      <FontAwesomeIcon icon={faUser} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        User: {userInfo.name}
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <div onClick={handleLogout}>
                          <span>Logout</span>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </>
              <Dropdown>
                <Dropdown.Toggle as={customToggle} id="dropdown-basic">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
