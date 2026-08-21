import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";

function Checkout() {
  const { cartItems, clearCart } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    email: "",
    name: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate prices
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 50 ? 0 : 5;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  }

  function validateForm() {
    if (!formData.name.trim()) return "Name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      return "Please enter a valid phone number.";
    }

    if (!formData.address.trim()) return "Address is required.";

    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errorMessage = validateForm();

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      clearCart();
      setLoading(false);
      setOrderPlaced(true);
      setFormData({ address: "", email: "", name: "", phone: "" });
    }, 1000);
  }

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto py-20 px-4 text-center">
        <FiCheckCircle size={72} className="mx-auto text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-orange-500 mb-2">
          Order Placed Successfully
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order. Your order is on the way!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/menu"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition font-semibold"
          >
            Order More
          </Link>
          <Link
            to="/"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Your cart is empty</h2>
          <p className="mt-3 text-gray-500">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/menu"
            className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition font-semibold"
          >
            Go to Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f8f5f2] py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* LEFT SIDE - BILLING */}
        <div className="bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-orange-500 mb-6">
            Billing Details
          </h2>

          {error && (
            <div className="mb-5 bg-red-100 border border-red-300 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="flex items-center gap-2 mb-2 font-medium text-gray-700"
              >
                <FiUser /> Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full border border-gray-400 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="flex items-center gap-2 mb-2 font-medium text-gray-700"
              >
                <FiMail /> Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full border border-gray-400 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="flex items-center gap-2 mb-2 font-medium text-gray-700"
              >
                <FiPhone /> Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full border border-gray-400 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="flex items-center gap-2 mb-2 font-medium text-gray-700"
              >
                <FiMapPin /> Address
              </label>
              <textarea
                id="address"
                rows={4}
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className="w-full border border-gray-400 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            {/* Mobile Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="lg:hidden w-full bg-orange-500 text-white py-4 rounded-2xl transition font-semibold text-lg hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <FiLoader className="animate-spin" /> Placing Order...
                </span>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="bg-white rounded-3xl shadow-md p-8 h-fit">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Order Summary
          </h2>

          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 border-gray-300"
              >
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
                <p className="font-bold text-orange-500">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold text-orange-600">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold text-orange-600">
                ${tax.toFixed(2)}
              </span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span className="text-orange-500">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Desktop Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="hidden lg:block w-full mt-6 bg-orange-500 text-white py-4 rounded-2xl transition font-semibold text-lg hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <FiLoader className="animate-spin" /> Placing Order...
              </span>
            ) : (
              "Place Order"
            )}
          </button>

          <Link
            to="/menu"
            className="block w-full mt-6 text-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-2xl font-semibold text-lg transition"
          >
            Continue Shopping
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Checkout;