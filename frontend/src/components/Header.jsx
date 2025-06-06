import React from "react";
import { Navbar, Container, Nav, Badge, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../features/cart/cartSlice";
import { loginSelector, logoutUser } from "../features/auth/loginSlice";

const Header = () => {
  const { cartItems } = useSelector(cartSelector);
  const { userInfo } = useSelector(loginSelector);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <FontAwesomeIcon icon={faBasketShopping} /> Basket
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/cart">
              <FontAwesomeIcon icon={faCartShopping} /> Cart &nbsp;
              <Badge pill bg="secondary">
                {cartItems.length}
              </Badge>
            </Nav.Link>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/profile">
                  Profile
                </NavDropdown.Item>
                {userInfo.isAdmin && (
                  <NavDropdown.Item as={NavLink} to="/admin">
                    Admin
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                <FontAwesomeIcon icon={faUser} /> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
