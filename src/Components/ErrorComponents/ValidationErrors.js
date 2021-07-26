import React from 'react';

const ValidationErrors = (props) => {
    const allErrors = props.validationErrors
    let errors = allErrors.map((error, index) => <li key={index}>{error}</li>)
    return (
        <>
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    {errors}
                </ul>
            </div>
        </>
    );
}

export default ValidationErrors;