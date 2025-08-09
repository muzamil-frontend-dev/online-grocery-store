import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faHeart,
  // faAddressCard,
  // faCreditCard,
  // faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

const NavIcons = [
  { icon: faHeart, to: "/wishlist" },
  { icon: faUser, to: "/user" },
  { icon: faCartShopping, to: "/cart" },
];

const Header = () => {
  return (
    <header className="d-flex align-items-center px-3 py-2 bg-light shadow-sm border-bottom">
      <NavLink to="/" className="text-decoration-none text-dark">
        <img src="/images/logo.png" alt="App Logo" width={120} />
      </NavLink>
      <section className="ms-auto d-flex align-items-center">
        {NavIcons.map((navIcon, index) => (
          <NavLink
            key={index}
            as={NavLink}
            to={navIcon.to}
            className="nav-icon-size border rounded-circle mx-1 d-flex align-items-center justify-content-center text-primary"
          >
            <FontAwesomeIcon icon={navIcon.icon} />
          </NavLink>
        ))}
      </section>
    </header>
  );
};

export default Header;
