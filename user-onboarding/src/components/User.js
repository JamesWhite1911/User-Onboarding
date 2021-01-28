import React from 'react';

export default function User({ currentUser }) {
    if (!currentUser) {
        return <h3>Fetching User..</h3>
    }

    return (
        <div class="bordered">
            <p>Name: {currentUser.name}</p>
            <p>Email: {currentUser.email}</p>
        </div>
    )
}