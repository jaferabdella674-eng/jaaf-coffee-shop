import React, { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCoffee,
} from "react-icons/fi";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Check all fields
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setStatus("error");
      return;
    }

    // Success
    setStatus("success");

    // Clear form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-cream to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-coffee-orange text-white flex items-center justify-center">
              <FiCoffee size={32} />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-coffee-orange-500 mb-3">
            Contact Us
          </h1>

          <p className="text-gray-700">
            Send us a message and we will get back to you soon.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-coffee-orange mb-6">
              Get In Touch
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <FiMail className="text-coffee-orange" size={24} />

                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-700">
                    Jaferabdella674@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FiPhone className="text-coffee-orange" size={24} />

                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">
                    +252 63 721 9188
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FiMapPin className="text-coffee-orange-500" size={24} />

                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">
                    Hargeisa, Somaliland.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FiClock className="text-coffee-orange" size={24} />

                <div>
                  <h3 className="font-semibold">Opening Hours</h3>
                  <p className="text-gray-600">
                    Monday - Sunday: 7:00 AM - 9:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-coffee-orange-500 mb-6">
              Send Us a Message
            </h2>

            {/* Success Message */}
            {status === "success" && (
              <div className="mb-5 bg-green-500 text-white px-4 py-3 rounded-lg">
                ✅ Your message has been sent successfully!
              </div>
            )}

            {/* Error Message */}
            {status === "error" && (
              <div className="mb-5 bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded-lg">
                Please fill in all fields before submitting.
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-coffee-orange"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-coffee-orange"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-coffee-orange"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-coffee-orange resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition cursor-pointer"
              >
                <FiSend />
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;