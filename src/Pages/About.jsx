import React from "react";
import { Link } from "react-router-dom";
import {
  FiCoffee,
  FiHeart,
  FiUsers,
  FiStar,
} from "react-icons/fi";

import coffeeImage from "../assets/coffee4.jpg";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-cream to-white">
      
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-coffee-orange text-white flex items-center justify-center">
              <FiCoffee size={40} />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-coffee-orange-500 mb-4">
            About Our Coffee Shop
          </h1>

          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-8">
            Welcome to our coffee shop. We are passionate about serving
            delicious coffee and creating a warm and comfortable place
            for everyone.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={coffeeImage}
              alt="About Our Coffee Shop"
              className="w-full h-[350px] object-cover hover:scale-105 transition duration-500"
            />
          </div>

          {/* Story Text */}
          <div>
            <h2 className="text-3xl font-bold text-coffee-orange-500 mb-4">
              Our Story
            </h2>

            <p className="text-gray-700 leading-7 mb-4">
              Our coffee shop was created with a simple idea: great coffee,
              friendly service, and a welcoming atmosphere.
            </p>

            <p className="text-gray-700 leading-7 mb-6">
              We carefully select our coffee and prepare every cup with
              passion. Whether you are starting your morning, meeting
              friends, or simply relaxing, we want every visit to be special.
            </p>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-coffee-orange text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              <FiCoffee />
              Explore Our Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl font-bold text-center text-coffee-orange-500 mb-10">
            Why Choose Us?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Great Coffee */}
            <div className="p-6 rounded-2xl bg-coffee-cream text-center shadow-sm hover:shadow-lg transition">
              <FiCoffee
                size={35}
                className="mx-auto mb-4 text-coffee-orange-500"
              />

              <h3 className="text-xl font-bold text-coffee-orange-500 mb-2">
                Great Coffee
              </h3>

              <p className="text-gray-700">
                Fresh and delicious coffee prepared with care.
              </p>
            </div>

            {/* Made With Love */}
            <div className="p-6 rounded-2xl bg-coffee-cream text-center shadow-sm hover:shadow-lg transition">
              <FiHeart
                size={35}
                className="mx-auto mb-4 text-coffee-orange-500"
              />

              <h3 className="text-xl font-bold text-coffee-orange-500 mb-2">
                Made With Love
              </h3>

              <p className="text-gray-700">
                Every cup is prepared with passion and attention.
              </p>
            </div>

            {/* Friendly Service */}
            <div className="p-6 rounded-2xl bg-coffee-cream text-center shadow-sm hover:shadow-lg transition">
              <FiUsers
                size={35}
                className="mx-auto mb-4 text-coffee-orange-500"
              />

              <h3 className="text-xl font-bold text-coffee-orange-500 mb-2">
                Friendly Service
              </h3>

              <p className="text-gray-700">
                We want every customer to feel welcome.
              </p>
            </div>

            {/* Quality First */}
            <div className="p-6 rounded-2xl bg-coffee-cream text-center shadow-sm hover:shadow-lg transition">
              <FiStar
                size={35}
                className="mx-auto mb-4 text-coffee-orange"
              />

              <h3 className="text-xl font-bold text-coffee-orange mb-2">
                Quality First
              </h3>

              <p className="text-gray-700">
                Quality ingredients and excellent coffee are our priority.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-coffee-brown mb-4">
          Ready for a Great Cup of Coffee?
        </h2>

        <p className="text-gray-700 mb-6">
          Check out our menu and find your favorite coffee.
        </p>

        <Link
          to="/menu"
          className="inline-flex items-center gap-2 bg-coffee-orange text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          <FiCoffee />
          View Menu
        </Link>
      </section>

    </div>
  );
}

export default About;