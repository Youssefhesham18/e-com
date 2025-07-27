import React from 'react';

export default function Profile({ userData }) {
  if (!userData) {
    return <h2>Loading profile...</h2>;
  }

  return (
    <div>
      <h2>Hello {userData.name || 'Guest'}</h2><br />
      <h2>Your Email: {userData.email || 'No email available'}</h2>
    </div>
  );
}

