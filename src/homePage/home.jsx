import React from "react";
import Footer from "../footer"; // Adjust the path as per your project structure
import Navbar from "../nav";
import Hero from "../header";
import Coming from "./cardsCollection/comingsoon";
import Discount from "./cardsCollection/discount";
import CinemaWebsite from "./cardsCollection/blog";
import About1 from "./cardsCollection/about";
import CinemaAbout from "./cardsCollection/about";
import Testimonial from "./cardsCollection/testimonials";
import Portfolio from "./cardsCollection/testimonials";
function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      
      <CinemaWebsite />
      <Coming />
      <Discount />

      <Portfolio />
      <Footer />
    </div>
  );
}

export default Home;
