import React from "react";
import { useHistory, Link } from "react-router-dom";
/**
 *
 * @param {varies} props Properties sent by App component containing the
 * isLoggedIn status of the user and userData
 * @returns Sign in/up links or a logged in user's name and sign out link.
 */
function Header(props) {
  let history = useHistory();
  if (props.props.isLoggedIn === true) {
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <a href="/">Academic Curriculum Manager</a>
          </h1>
          <nav>
            <ul className="header--signedin">
              <li>Welcome, {props.props.userData.firstName}!</li>
              <li>
                <a href="/signout">Sign Out</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <a href="/">Academic Curriculum Manager</a>
          </h1>
          <nav>
            <ul className="header--signedout">
              <li>
                <a href="/signup">Sign Up</a>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/signin",
                    state: { from: history.location },
                  }}
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
