import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router
// import Cinemas from "../src/assets/Cinemas.mp4.mp4";
const Hero = () => {
  return (
    <div
      className="hero bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(20, 20, 20, 0.5), rgba(39, 39, 90, 0.2)), url(https://i.imgur.com/rqPtoBa_d.webp?maxwidth=760&fidelity=grand)",
        minHeight: "50vh", // Adjust the height as needed, e.g., "50vh" for half the viewport height
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md mx-auto">
          <img
            src="https://t3.ftcdn.net/jpg/07/79/26/72/360_F_779267253_ZHJxnMOfRKYFVkUXPDqWtHr6x3deHbup.jpg"
            alt="Hero Background"
            className="hidden"
            aria-hidden="true"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          {/* video section start */}
          {/* <div className="absolute inset-0">
        <video
          src={Cinemas}
          autoPlay
          muted
          loop
          preload="auto"
          className="object-cover object-center w-full h-screen aspect-w-16 aspect-h-9 transition-all duration-1000 ease-in-out"
        />
        <div className="absolute inset-0"></div>
      </div> */}
          {/* video section start */}

          <h1
            className="mb-5 text-5xl pt-8 font-bold text-white"
            style={{ fontFamily: "Caveat" }}
          >
            Welcome to Cinema Paradise
          </h1>
          <p className="mb-5 text-white">
            Explore a world of cinematic wonders right at your fingertips. From
            classic masterpieces to the latest blockbusters, immerse yourself in
            the magic of movies.
          </p>
          <Link to="/homePage/catalogandDitales/Catalog">
            <button className="text-white bg-gray-700 hover:bg-blue-900 px-4 py-2 rounded-md">
              Explore Movies
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
