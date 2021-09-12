import React, { useState } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
/**
 * Component that signs a user out by clearing local storage
 * @returns A redirect to the home page upon successful logout or an error page
 */
function UserSignOut() {
  const [error500Status, setError500Status] = useState(false);
  let history = useHistory();
  try {
    axios.get(`https://portfolio-acm-client.netlify.app/api/signout`);
    localStorage.clear();
    console.log("User Signed Out");
    history.push("/");
  } catch (error) {
    if (error.response.status === 500) {
      setError500Status(true);
    } else {
      console.log(error);
    }
  }
  if (error500Status === true) {
    return <Redirect to="/error" />;
  } else {
    return null;
  }
}

export default UserSignOut;
