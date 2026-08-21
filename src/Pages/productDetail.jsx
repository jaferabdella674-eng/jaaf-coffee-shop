import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaStar,
  FaMinus,
  FaPlus,
  FaShoppingCart,
} from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import products from "../Data/Products";
import AddToCart from "../Components/AddToCart";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (id) => item.id === Number(id)
  );

  if (!product) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Product Not Found
          </h1>

          <Link
            to="/menu"
            className="mt-6 inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition"
          >
            <FiArrowLeft />
            Back to Menu
          </Link>
        </div>
      </section>
    );
  }

  const handleAdd = () => {
    // Pass quantity directly to your cart handler (or loop if your context requires it)
    addToCart(product, quantity);
  };

  return (
    <section className="bg-orange-50 min-h-screen flex items-center py-10 px-4">

      <div className="max-w-6xl w-full mx-auto bg-white rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* LEFT */}
        <div className="flex justify-center items-center bg-orange-50 p-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-sm h-80 object-cover rounded-3xl shadow-xl hover:scale-105 transition duration-500"
          />
        </div>

        {/* RIGHT */}
        <div className="p-10 flex flex-col justify-center">

          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full w-fit font-semibold">
            Premium Coffee
          </span>

          <h1 className="text-5xl font-bold mt-5">
            {product.name}
          </h1>

          <div className="flex items-center mt-5 gap-2">
            <div className="flex text-yellow-400 text-xl">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <span className="text-gray-500">
              5.0 (120 Reviews)
            </span>
          </div>

          <p className="text-gray-600 leading-8 mt-6">
            {product.description}
          </p>

          <h2 className="text-5xl font-bold text-orange-500 mt-8">
            ${product.price ? product.price.toFixed(2) : "0.00"}
          </h2>

        

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-5 mt-10">
            <button
              onClick={handleAdd}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-semibold transition cursor-pointer shadow-lg hover:shadow-orange-200"
            >
              
              Add to Cart
            </button>

            <Link
              to="/menu"
              className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-2xl flex items-center gap-2 transition cursor-pointer font-semibold"
            >
              <FiArrowLeft />
              Back
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-5 mt-10">
            <div className="bg-orange-50 rounded-xl p-4">
              <h3 className="font-bold">
                Fresh Beans
              </h3>
              <p className="text-sm text-gray-700">
                100% Arabica Coffee
              </p>
            </div>

            <div className="bg-orange-300 rounded-xl p-4">
              <h3 className="font-bold">
                Fast Delivery
              </h3>
              <p className="text-sm text-gray-700">
                30 Minutes Delivery
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductDetail;