import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook } from "react-icons/fi";
import { FaTelegram, FaTiktok, FaWhatsapp } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-[#562F09] text-gray-400 mt-8">

            <div className="max-w-6xl mx-auto px-4 py-10 grid md:gap-8 grid-cols-4">

                {/* BRAND */}
                <div>
                    <h2 className="text-xl font-bold mb-3">☕ <span className="text-orange-500" >Jafer</span> Coffee-shop</h2>
                    <p className="text-gray-400 text-sm">
                        Enjoy the best coffee experience with premium beans.
                    </p>
                </div>

                {/* LINKS */}
                <div>
                    <h3 className="font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/menu" className="hover:text-white">Menu</Link></li>
                        <li><Link to="/about" className="hover:text-white">About</Link></li>
                        <li><Link to="/service" className="hover:text-white">Service</Link></li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <h3 className="font-semibold mb-3">Contact</h3>
                    <p className="text-gray-400 text-sm">📍Somaliland, Hargeisa.</p>
                    <p className="text-gray-400 text-sm">📧 jaferabdella674@gmail.com</p>
                    <p className="text-gray-400 text-sm">📞 +252 63 721 9188</p>
                </div>

                {/* SOCIAL */}
                <div>
                    <h3 className="font-semibold mb-3">Follow Us</h3>

                    <div className="flex gap-4 text-xl">

                        <a href="https://t.me/jaferabdella" target="_blank">
                            <FaTelegram className="cursor-pointer text-gray-400 hover:text-blue-500 transition" />
                        </a>

                        <a href="https://facebook.com" target="_blank">
                            <FiFacebook className="cursor-pointer text-gray-400 hover:text-blue-600 transition" />
                        </a>

                        <a href="https://tiktok.com" target="_blank">
                            <FaTiktok className="cursor-pointer text-gray-400 hover:text-white transition" />
                        </a>

                        <a href="https://wa.me/252637219188" target="_blank">
                            <FaWhatsapp className="cursor-pointer text-gray-400 hover:text-green-500 transition" />
                        </a>

                    </div>



                </div>

            </div>

            <div className="border-t border-white/20 text-center text-gray-300 py-4 text-sm">
                &copy; {new Date().getFullYear()} Jafer Coffee | All rights reserved.
            </div>

        </footer>
    );
}

export default Footer;