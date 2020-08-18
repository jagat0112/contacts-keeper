import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import ContactContext from "../context/contact/contactContext";

function Navbar({ title, icon }) {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout } = authContext;

  const onLogout = () => {
    logout();
    contactContext.clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/about">About</Link>
      </li>{" "}
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      {" "}
      <li>
        <Link to="/register"> Register </Link>
      </li>
      <li>
        <Link to="/login"> Log In </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon} />
        <Link to="/">{title}</Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
