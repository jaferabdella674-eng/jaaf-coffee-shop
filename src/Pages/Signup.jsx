import React, { useState } from "react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return setError("Please fill in all fields.");
    }

    if (formData.password.length < 8) {
      return setError(
        "Password must be at least 8 characters."
      );
    }

    if (
      formData.password !== formData.confirmPassword
    ) {
      return setError("Passwords do not match.");
    }

    const result = await signup(
      formData.name,
      formData.email,
      formData.phone,
      formData.password
    );

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Join Us ☕
          </h1>

          <p className="text-gray-500 mt-2">
            Create your coffee account
          </p>
        </div>

        {error && (
          <div className="mb-5 bg-red-100 text-red-600 border border-red-300 rounded-xl p-3">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}

          <div className="relative">
            <FiUser className="absolute left-3 top-4 text-gray-400" />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Email */}

          <div className="relative">
            <FiMail className="absolute left-3 top-4 text-gray-400" />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Phone */}

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full py-3 px-4 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
          />

          {/* Password */}

          <div className="relative">
            <FiLock className="absolute left-3 top-4 text-gray-400" />

            <input
              type={
                showPassword ? "text" : "password"
              }
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-4"
            >
              {showPassword ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </button>
          </div>

          {/* Confirm Password */}

          <div className="relative">
            <FiLock className="absolute left-3 top-4 text-gray-400" />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-3 top-4"
            >
              {showConfirmPassword ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading
              ? "Creating Account..."
              : "Sign Up"}
          </button>

        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>

    </section>
  );
}

export default Signup;