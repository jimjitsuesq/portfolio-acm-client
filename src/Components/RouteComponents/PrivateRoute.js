import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
/**
 *
 * @param {varies} param0
 * @returns A private route using React Router for certain pages
 */
const PrivateRoute = ({ component: Component, props, ...rest }) => {
  let history = useHistory();
  if (document.cookie.includes("user")) {
    return (
      <Route {...rest}>
        <Component {...props} />
      </Route>
    );
  } else {
    return (
      <Redirect
        to={{ pathname: "/signin", state: { from: history.location } }}
      />
    );
  }
};

export default PrivateRoute;
