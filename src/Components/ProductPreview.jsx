import React from "react";
import { Link } from "react-router-dom";
import products from "../Data/Products";
import AddToCart from "./AddToCart";

function ProductPreview() {
  return (
    <section className="py-14 md:py-20 bg-orange-50/50">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-orange-500">
            Popular Picks
          </h2>
          <p className="text-gray-700 mt-2">
            Discover our best-selling coffee blends and beverages.
          </p>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 flex flex-col justify-between"
            >
              <div>
                {/* IMAGE */}
                <Link to={`/product/${product.id}`}>
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-74 object-cover hover:scale-110 transition transform duration-300"
                    />
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-700 line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* BOTTOM ACTIONS */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-orange-400">
                    ${product.price ? product.price.toFixed(2) : "0.00"}
                  </span>

                  <AddToCart product={product} />
                </div>

                {/* DETAILS BUTTON */}
                <Link
                  to={`/product/${product.id}`}
                  className="w-full bg-orange-400 hover:bg-gray-400 block text-center py-2 px-3 rounded-xl text-sm font-medium text-white transition duration-300 shadow-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProductPreview;