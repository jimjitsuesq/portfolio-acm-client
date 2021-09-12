import React from "react";
/**
 *
 * @returns An error page if an unhandled server error occurs
 */
function UnhandledError() {
  return (
    <div className="wrap">
      <h2>Error</h2>
      <p>Sorry! We just encountered an unexpected error.</p>
    </div>
  );
}

export default UnhandledError;
