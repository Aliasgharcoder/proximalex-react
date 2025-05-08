import React from 'react';
import { useNavigate } from 'react-router-dom';

function UnAuthorized() {
  const navigate = useNavigate();
  const onLoginClick = () => {
    navigate('/auth/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center flex flex-col items-center ">
        <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
        <p className="mb-6">You do not have permission to view this page.</p>
        <button
          onClick={onLoginClick}
          className="flex items-center gap-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          <span className="text-lg font-semibold">Sign In</span>
        </button>
      </div>
    </div>
  );
}

export default UnAuthorized;