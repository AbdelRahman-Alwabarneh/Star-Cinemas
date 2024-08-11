import React, { useState, useEffect } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Coming = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
        );
        if (response.data) {
          // Convert object to array of movies
          const moviesArray = Object.keys(response.data).map((key) => ({
            id: key,
            title: response.data[key].title,
            description: response.data[key].plot,
            imageUrl: response.data[key].image,
            rating: response.data[key].rating,
            releaseYear: response.data[key].release_year,
            director: response.data[key].director,
          }));

          // Ensure moviesArray length is a multiple of 8
          const remainder = moviesArray.length % 8;
          if (remainder !== 0) {
            moviesArray.splice(moviesArray.length - remainder);
          }

          setMovies(moviesArray);
        } else {
          console.error("No data received from API");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Slider settings
  const settings = {
    dots: false, // Disable dots for pagination
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-900 text-white ">
      <h1
        className="text-5xl text-center py-8 mb-4"
        style={{
          fontFamily: "Caveat",
          textShadow: "8px 7px 6px rgba(0, 0, 255, 0.5)",
        }}
      >
        Coming Soon ⌛
      </h1>
      <div className="container mx-auto px-4">
        <Slider {...settings} className="-mx-4 mb-12">
          {movies.map((movie) => (
            <div key={movie.id} className="px-4">
              <div className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-md">
                {movie.imageUrl ? (
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="h-64 w-full object-cover"
                  />
                ) : (
                  <div className="h-64 w-full bg-gray-700 flex items-center justify-center">
                    Image not available
                  </div>
                )}
                <div
                  className="pt-4"
                  style={{
                    textShadow: "4px 4px 6px rgba(0, 0, 255, 0.5)",
                  }}
                >
                  <h2 className="text-xl text-center font-semibold">
                    {movie.title}
                  </h2>
                  <p className="text-gray-400 mb-4">{movie.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {/* <button className="w-2.5 h-2.5 rounded-full focus:outline-none bg-purple-900" /> */}
        </div>
      </div>
      {/* <footer className="text-center text-gray-400 py-4">
        &copy; 2024 Cinema Website
      </footer> */}
    </div>
  );
};

export default Coming;
