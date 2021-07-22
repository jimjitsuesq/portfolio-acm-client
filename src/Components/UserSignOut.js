import React from 'react';
import axios from 'axios';

function UserSignOut () {
    axios.get(`http://localhost:5000/api/signout`)
    .then(() => console.log('User Signed Out'))
    .then(() => {(window.location=`/`)})
    .catch(err => {
        console.error(err);
    })
    return (null)
}

export default UserSignOut;