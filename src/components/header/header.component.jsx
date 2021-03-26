import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { auth } from "../../firebase/firebase.utils";
import {
  selectCurrentUser,
  selectUserType,
} from "../../redux/user/user.selectors";

import "./header.style.scss";

const Header = ({ location, currentUser, userType, history }) => {
  if (location.pathname.includes("admin")) return null;

  return (
    <div className="header">
      <div className="header__row">
        <div className="header__logo" onClick={() => history.push("/")}>
          Minding
        </div>
        <div className="header__menu">
          <Link className="header__link header__link--active" to="/">
            Home
          </Link>
          <Link className="header__link" to="/about">
            About
          </Link>
          {currentUser ? (
            <a
              href="#"
              className="header__link"
              onClick={(e) => {
                e.preventDefault();
                auth.signOut();
              }}
            >
              Log Out
            </a>
          ) : (
            <Link className="header__link" to="/login">
              Log In
            </Link>
          )}

          {userType === "admin" || userType === "moderator" ? (
            <Link className="header__link" to="/admin">
              Admin
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userType: selectUserType,
});

export default withRouter(connect(mapStateToProps)(Header));
