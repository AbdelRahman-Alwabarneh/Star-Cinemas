import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config/firebase";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import user from "./assets/user.png";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const Navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    const userSession = sessionStorage.getItem("user");
    if (userSession) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    return unsubscribe;
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setLogin(false);
    Navigate("/");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
  };

  return (
    <nav className="bg-gray-900 p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-white text-2xl md:text-3xl lg:text-4xl font-bold"
            style={{ fontFamily: "Caveat" }}
          >
            StarCinemas
          </Link>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-white hover:text-gray-300 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`md:flex ${
            isOpen ? "block" : "hidden"
          } mt-4 md:mt-0 w-full md:w-auto md:space-x-4`}
        >
          <div className="flex flex-col md:flex-row md:space-x-4">
            <Link
              to="/"
              className="text-white hover:text-blue-700 py-2 px-4 block md:inline"
            >
              Home
            </Link>
            <Link
              to="/homePage/catalogandDitales/Catalog"
              className="text-white hover:text-blue-700 py-2 px-4 block md:inline"
            >
              Catalog
            </Link>

            <Link
              to="/GetinTouch/contact"
              className="text-white hover:text-blue-700 py-2 px-4 block md:inline"
            >
              GetinTouch
            </Link>
          </div>
        </div>

        {/* Login and Register Buttons */}
        <div
          className={`md:flex items-center mt-4 md:mt-0 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link to="/homePage/userPage">
            {isLogin && <img src={user} className="h-10 w-10 mx-0 rounded-full" />}
          </Link>

          {!isLogin ? (
            <Link
              to="/components/Login"
              className="w-20 text-white bg-gray-700 hover:bg-blue-900 px-3 py-1 rounded-md mb-2 md:mb-0 md:ml-4  md:flex text-sm flex flex-row items-center"
            >
              <FiLogIn className="mr-2" /> Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white bg-gray-700 hover:bg-blue-900 px-3 py-1 rounded-md mb-2 md:mb-0 md:ml-4 block md:inline-block text-sm"
            >
              LogOut
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
