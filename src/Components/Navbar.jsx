import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX, FiUser } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../Context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, signout } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-orange-500 font-semibold"
      : "text-gray-700 hover:text-orange-500 transition";

  function handleSignOut() {
    signout();
    setOpen(false);
    navigate("/");
  }

  return (
    <header className="bg-orange-50 border-b border-gray-200 top-0 z-50 sticky">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-800">
              ☕ Jafer <span className="text-orange-500">Coffee</span>-shop
            </h1>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/menu" className={linkClass}>Menu</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-6">
            
            {/* CART */}
            <Link
              to="/cart"
              className="relative text-gray-800 hover:text-orange-500 transition cursor-pointer"
            >
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* USER PROFILE AVATAR (If Logged In) */}
            {user && (
              <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-orange-500 text-gray-700 font-bold">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : user.name ? (
                  user.name[0].toUpperCase()
                ) : (
                  <FiUser size={24} />
                )}
              </Link>
            )}

            {/* DESKTOP AUTH BUTTONS */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="border border-orange-500 text-orange-500 hover:bg-orange-100 px-4 py-2 rounded-xl transition cursor-pointer font-medium"
                >
                  Sign Out
                </button>
              ) : (
                <Link to="/signin">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition cursor-pointer font-medium">
                    Sign In
                  </button>
                </Link>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-gray-900 cursor-pointer"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
            >
              {open ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden mt-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col gap-4">
              <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
              <NavLink to="/menu" className={linkClass} onClick={() => setOpen(false)}>Menu</NavLink>
              <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>About</NavLink>
              <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Contact</NavLink>

              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="w-full border border-orange-500 text-orange-500 hover:bg-orange-100 py-2 rounded-xl transition cursor-pointer font-medium"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link to="/signin" onClick={() => setOpen(false)}>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl transition cursor-pointer font-medium">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;