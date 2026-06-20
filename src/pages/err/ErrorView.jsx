import React from 'react';
import { Link } from 'react-router-dom';

const ErrorView = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-[#73BFA1]">404</h1>
      <h2 className="mb-2 text-2xl font-semibold text-gray-800">
        Oops! Page not found.
      </h2>
      <p className="mb-6 text-gray-600">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="rounded-lg bg-[#73BFA1] px-5 py-2 text-white transition-all duration-200 hover:bg-[#428170]"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorView;
