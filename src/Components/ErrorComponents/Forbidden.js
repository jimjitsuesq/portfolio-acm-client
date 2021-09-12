import React from "react";
/**
 *
 * @returns A page if a logged in user attempts to visit a page they are not
 * allowed to access
 */
function Forbidden() {
  return (
    <div className="wrap">
      <h2>Forbidden</h2>
      <p>Oh oh! You can't access this page.</p>
    </div>
  );
}

export default Forbidden;
