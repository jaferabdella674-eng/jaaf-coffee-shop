import React from "react";
import { Link } from "react-router-dom";
import { FiCoffee, FiHome } from "react-icons/fi";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      
      {/* Coffee icon */}
      <div className="text-coffee-orange mb-4">
        <FiCoffee size={64} />
      </div>

      {/* 404 */}
      <h1 className="text-6xl font-bold text-coffee-orange mb-4">
        404
      </h1>

      {/* Message */}
      <h2 className="text-3xl font-bold text-coffee-orange mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-800 mb-6">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Back Home */}
      <Link
        to="/"
        className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition font-semibold flex items-center gap-2"
      >
        <FiHome />
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;