import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faAddressCard,
  faCreditCard,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <Navbar expand="lg" variant="dark" className="p-0">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          <img src="/images/logo.png" alt="App Logo" width={120} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/cart">
              <FontAwesomeIcon icon={faCartShopping} /> Cart &nbsp;
              {/* <Badge pill bg="secondary">
                {cartItems.length}
              </Badge> */}
            </Nav.Link>

            {/* {userInfo ? (
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
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
