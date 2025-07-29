import React from 'react';

export default function Profile({ userData }) {
  if (!userData) {
    return (
      <div className="text-center py-5">
        <h4 className="text-muted">Loading profile...</h4>
      </div>
    );
  }

  return (
    <div className="p-4 bg-light rounded shadow-sm mt-4 text-center">
      <h3 className="mb-3 text-success">Welcome, {userData.name || 'Guest'} 👋</h3>
      <p><strong>Email:</strong> {userData.email || 'No email available'}</p>
    </div>
  );
}
