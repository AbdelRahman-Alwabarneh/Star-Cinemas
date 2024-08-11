import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../nav";
import Footer from "../../footer";
const Catalog = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    axios
      .get(
        "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
      )
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data.filter((e) => e.delete === false)); // Initialize filteredData with all movies
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);

  useEffect(() => {
    filterMovies(searchTerm, minRating);
  }, [searchTerm, minRating]);

  // Function to handle input change in search field
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
  };

  // Function to handle input change in minimum rating field
  const handleRatingChange = (event) => {
    const rating = parseFloat(event.target.value);
    setMinRating(rating);
  };

  // Function to filter movies based on search term and minimum rating
  const filterMovies = (query, minRating) => {
    let filteredResults = data;

    // Filter by search term
    if (query.trim() !== "") {
      filteredResults = filteredResults.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by minimum rating
    filteredResults = filteredResults.filter(
      (item) => item.rating >= minRating
    );

    setFilteredData(filteredResults);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Pagination - Calculate current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Array of page numbers for pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="Container bg-gray-900">
      <Navbar />
      <div className="container bg-gray-900 mx-auto px-4 py-8">
        <h2
          className="text-6xl text-white font-semibold mb-14 text-center"
          style={{
            fontFamily: "Caveat",
            textShadow: "8px 7px 6px rgba(0, 0, 255, 0.5)",
          }}
        >
          Catalog
        </h2>

        {/* Search input */}
        <div className="flex justify-center">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full ml-14 md:w-72 px-4 py-2 mb-8 mr-2 border bg-transparent border-gray-300 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {/* Minimum rating input */}
          <input
            type="number"
            placeholder="Minimum rating..."
            className="w-full md:w-72 mx-10 px-4 py-2 mb-8 border bg-transparent border-gray-300 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900"
            value={minRating}
            onChange={handleRatingChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className=" bg-gray-800 text-white text-center rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-100 object-cover object-center"
              />
              <div className="p-4">
                <h3
                  className="text-xl font-semibold mb-1"
                  style={{
                    textShadow: "4px 4px 6px rgba(0, 0, 255, 0.5)",
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-400 mb-2">Author: {item.author}</p>
                <Link to={`/details/${item.id}`}>
                  <button className=" bg-gray-700 hover:bg-blue-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 mx-4 rounded-md text-white  hover:bg-blue-900 mt-4 ${
                currentPage === number
                  ? "bg-blue-900 text-white"
                  : "bg-gray-700"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
