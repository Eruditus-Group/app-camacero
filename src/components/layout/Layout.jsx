import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <main>
        {children ? children : <Outlet />}
      </main>
    </div>
  );
};

export default PublicLayout;