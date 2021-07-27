import React from 'react';
/**
 * 
 * @returns A user friendly 404 error page if a page does not exist
 */
function NotFound () {
    return (
        <div className="wrap">
            <h2>Not Found</h2>
            <p>Sorry! We couldn't find the page you're looking for.</p>
        </div>  
    )
}

export default NotFound;