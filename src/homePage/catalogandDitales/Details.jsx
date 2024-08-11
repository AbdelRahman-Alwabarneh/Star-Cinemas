import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../nav";
import Footer from "../../footer";

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/movies/${
          id - 1
        }.json`
      )
      .then((response) => setMovie(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleBookTicket = () => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      // Redirect to login page if not authenticated
      navigate("/components/Login");
    } else {
      // Proceed to booking page if authenticated
      navigate(`/details/${id}/book`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex-1 container mx-auto py-8">
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex">
          <img
            className="w-1/3 h-auto object-cover"
            src={movie.image}
            alt={`${movie.title} Poster`}
          />
          <div className="w-2/3 p-4">
            <h1
              className="text-5xl font-bold text-white text-center mb-4"
              style={{
                fontFamily: "Caveat",
                textShadow: "8px 7px 6px rgba(0, 0, 255, 0.5)",
              }}
            >
              {movie.title}
            </h1>
            <h2 className="text-xl text-white mb-2">
              <span
                style={{
                  textShadow: "6px 6px 8px rgba(0, 0, 255, 0.5)",
                }}
              >
                Author by:{" "}
              </span>
              <span className="text-gray-400 mb-2">{movie.author}</span>
            </h2>
            <p className="text-lg text-white mb-4">
              <span
                style={{
                  textShadow: "6px 6px 8px rgba(0, 0, 255, 0.5)",
                }}
              >
                Description:{" "}
              </span>
              <span className="text-gray-400 mb-2">{movie.description}</span>
            </p>
            <p className="text-lg text-white mb-4">
              <span
                style={{
                  textShadow: "6px 6px 8px rgba(0, 0, 255, 0.5)",
                }}
              >
                Rating:{" "}
              </span>
              <span className="text-gray-400 mb-2">{movie.rating}</span>
            </p>
            <p className="text-lg text-white mb-4">
              <span
                style={{
                  textShadow: "6px 6px 8px rgba(0, 0, 255, 0.5)",
                }}
              >
                Release Year:{" "}
              </span>
              <span className="text-gray-400 mb-2">{movie.release_year}</span>
            </p>
            <p className="text-lg text-white mb-4">
              <span
                style={{
                  textShadow: "6px 6px 8px rgba(0, 0, 255, 0.5)",
                }}
              >
                Number Of Tickets:{" "}
              </span>
              <span className="text-gray-400 mb-2">
                {movie.numberOfTickets}
              </span>
            </p>
            <p className="text-lg text-white mb-4">
              <span
                style={{
                  textShadow: "6px 6px 8px rgba(0, 0, 255, 0.5)",
                }}
              >
                Number Of VIP Tickets:{" "}
              </span>
              <span className="text-gray-400 mb-2">{movie.vipTicketPrice}</span>
            </p>

            {/* Google Maps iframe */}
            {movie.location && (
              <div className="mb-4">
                <iframe
                  width="100%"
                  height="200"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    movie.location
                  )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                  title="Movie Location"
                >
                  <a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(
                      movie.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps
                  </a>
                </iframe>
              </div>
            )}

            <div className="mt-4">
              <button
                onClick={handleBookTicket}
                className="block w-full mb-4 md:w-96 m-auto mt-2 text-center bg-gray-700 hover:bg-blue-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Book a Ticket
              </button>
              <Link
                to="/homePage/catalogandDitales/Catalog"
                className="block w-full md:w-96 m-auto mt-2 text-center bg-gray-700 hover:bg-blue-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Back to Catalog Page
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Details;
