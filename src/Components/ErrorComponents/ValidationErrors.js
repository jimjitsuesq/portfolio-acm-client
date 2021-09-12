import React from "react";
/**
 *
 * @param {array} props An array containing all validation errors
 * @returns A page displaying all validation errors.
 */
const ValidationErrors = (props) => {
  const allErrors = props.validationErrors;
  let errors = allErrors.map((error, index) => <li key={index}>{error}</li>);
  return (
    <>
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>{errors}</ul>
      </div>
    </>
  );
};

export default ValidationErrors;
