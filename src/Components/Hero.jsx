import React from "react";
import heroImage from "./../assets/hero.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-b from-orange-50 via-amber-50/30 to-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">

        {/* LEFT TEXT */}
        <div className="flex-1 text-center md:text-left">

          {/* BADGE */}
          <span className="bg-orange-200 text-gray-700 inline-flex items-center font-bold text-sm px-4 py-2 rounded-full gap-2 shadow-sm">
            ☕ Fresh coffee, fast delivery
          </span>

          {/* HEADING */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-amber-950 leading-tight mt-6">
            Fresh Coffee From{" "}
            <span className="text-orange-500 block sm:inline">
              Jafer
            </span>{" "}
            Coffee-shop
          </h1>

          {/* PARAGRAPH */}
          <p className="mt-4 text-gray-700 text-lg leading-relaxed max-w-xl">
            Order your favorite coffee and snacks online with a simple
            menu and quick checkout. Smooth ordering experience with our
            user-friendly interface and secure payment options.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap mt-8 gap-4 items-center justify-center md:justify-start">
            <Link
              to="/menu"
              className="bg-orange-400 hover:bg-gray-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-orange-200 cursor-pointer"
            >
              Explore Our Menu
            </Link>

            <Link
              to="/cart"
              className="border-2 border-gray-600 text-orange-500 hover:bg-orange-400 hover:text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 cursor-pointer"
            >
              View Cart
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 w-full flex justify-center">
          <img
            src={heroImage}
            alt="Jafer Coffee Hero"
            className="w-full max-w-md md:max-w-lg object-contain drop-shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;