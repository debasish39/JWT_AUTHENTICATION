import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-[10rem] font-extrabold text-purple-600 animate-bounce">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">Page Not Found</h2>
      <p className="mt-2 text-gray-600 text-lg">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
