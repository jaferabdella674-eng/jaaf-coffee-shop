import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import AddToCart from "../Components/AddToCart";
import products from "../data/Products";

function Menu() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <section className="bg-orange-50/50 py-10 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500">
            Our Menu ☕
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Discover our delicious coffee and tasty drinks
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xl mx-auto mb-12">
          <FiSearch
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search your favorite coffee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-orange-200 focus:outline-none focus:border-orange-500 bg-white shadow-sm transition"
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image with Link */}
                  <Link to={`/product/${product.id}`} className="block overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover hover:scale-105 transition duration-500"
                    />
                  </Link>

                  <div className="p-5 pb-0">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                        {product.name}
                      </h3>

                      <span className="text-orange-500 font-bold whitespace-nowrap">
                        ${product.price ? product.price.toFixed(2) : "0.00"}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="p-5 pt-0 space-y-3 mt-4">
                  <Link
                    to={`/product/${product.id}`}
                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-xl transition duration-300 shadow-sm"
                  >
                    View Details
                  </Link>

                  <AddToCart product={product} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-orange-100 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-700">
              No coffee found ☕
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching with another name.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

export default Menu;