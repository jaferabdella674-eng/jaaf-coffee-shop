import React from "react";
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cartItems = [],
    addToCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  // 🧮 Subtotal calculation
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  // Total items sum
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Empty Cart View
  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-24 px-4">
        <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiShoppingBag size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added any coffee to your cart yet.
        </p>
        <Link
          to="/menu"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
        >
          Explore Menu ☕
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-orange-600">
        Shopping Cart 🛒
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ITEMS LIST */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl flex-shrink-0"
                />

                <div>
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-orange-500 font-semibold text-sm">
                    ${(item.price || 0).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">
                    Item Total: ${((item.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* QUANTITY & DELETE */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(item.id, -1);
                      } else {
                        removeFromCart(item.id);
                      }
                    }}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-700 hover:bg-orange-500 hover:text-white transition shadow-sm"
                    title="Decrease quantity"
                  >
                    <FiMinus size={14} />
                  </button>

                  <span className="w-8 text-center font-bold text-gray-800">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-700 hover:bg-orange-500 hover:text-white transition shadow-sm"
                    title="Increase quantity"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition"
                  title="Remove item"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY CARD */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm h-fit space-y-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-3">
            Order Summary
          </h2>

          <div className="flex justify-between text-gray-600">
            <span>Items ({totalItems})</span>
            <span className="font-semibold text-gray-800">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-bold">Free</span>
          </div>

          <div className="border-t border-gray-100 pt-3" />

          <div className="flex justify-between text-xl font-bold text-gray-800">
            <span>Total</span>
            <span className="text-orange-600">${subtotal.toFixed(2)}</span>
          </div>

          <div className="pt-2 space-y-3">
            <Link
              to="/checkout"
              className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/menu"
              className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.0 py-3 rounded-xl transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;