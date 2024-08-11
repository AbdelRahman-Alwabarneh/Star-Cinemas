import React from "react";

const CinemaWebsite = () => {
  const movies = [
    {
      id: 1,
      title: "Gravity",
      director: "Alfonso Cuarón",
      description:
        "Gravity is the force by which a planet or other body draws objects toward its center",
      posterUrl:
        "https://i.pinimg.com/564x/9a/74/05/9a74052a3d08565b21d5bdff8d7acbca.jpg",
    },
    {
      id: 2,
      title: "The Dark Knight",
      director: "Christopher Nolan",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham...",
      posterUrl:
        "https://www.reeldeals.com/images/items/darkknightadvabrickwall.jpg",
    },
    {
      id: 3,
      title: "Interstellar",
      director: "Christopher Nolan",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival...",
      posterUrl:
        "https://www.indiewire.com/wp-content/uploads/2014/12/interstellar-tesseract.jpg",
    },
  ];

  const showtimes = [
    { id: 1, movieId: 1, theaterId: 1, time: "12:00 PM" },
    { id: 2, movieId: 2, theaterId: 2, time: "2:30 PM" },
    { id: 3, movieId: 3, theaterId: 3, time: "3:00 PM" },
  ];

  const theaters = [
    {
      id: 1,
      name: "Cineplex Central",
      location: "Central Square, 123 Avenue St",
      imageUrl:
        "https://th.bing.com/th/id/R.249cb6aa80ef96d1e9517961deb5f02d?rik=kDxw%2fSaozUDpqw&pid=ImgRaw&r=0",
    },
    {
      id: 2,
      name: "Metro Cinemas",
      location: "Metro Mall, 456 Main St",
      imageUrl:
        "https://th.bing.com/th/id/OIP.s3NEZuueauFRGJ3ue3EqAwHaE8?rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      name: "Starlight Cinema",
      location: "Starlight Street, 789 Park Ave",
      imageUrl:
        "https://i2.wp.com/www.aholeinmyshoe.com/wp-content/uploads/2017/11/MajesticPrincess128-Copy.jpg?w=1024&ssl=1",
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
      <div className="container mx-auto p-4">
        <h1
          className="text-5xl font-bold  mb-4 text-center"
          style={{
            fontFamily: "Caveat",
            textShadow: "8px 7px 6px rgba(0, 0, 255, 0.5)",
          }}
        >
          Welcome to StarCinema
        </h1>

        {/* Movies Section */}
        <section className="mb-8">
          <h2
            className="text-2xl font-semibold mb-6 text-center"
            style={{
              textShadow: "4px 4px 6px rgba(0, 0, 255, 0.5)",
            }}
          >
            Now Showing
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center ">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="border rounded overflow-hidden text-center transform transition-transform duration-300 motion-safe:hover:scale-105"
                style={{
                  boxShadow: "2px 2px 4px rgba(0, 0, 255, 0.5)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-64 object-fill"
                />
                <div className="p-4">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{
                      textShadow: "4px 4px 6px rgba(0, 0, 255, 0.5)",
                    }}
                  >
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">{movie.director}</p>
                  <p className="text-sm">{movie.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Showtimes Section */}
        <section className="mb-8">
          <h2
            className="text-2xl font-semibold mb-8 text-center"
            style={{
              textShadow: "4px 4px 6px rgba(0, 0, 255, 0.5)",
            }}
          >
            Showtimes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center ">
            {showtimes.map((showtime) => {
              const movie = movies.find((m) => m.id === showtime.movieId);
              const theater = theaters.find((t) => t.id === showtime.theaterId);
              return (
                <div
                  key={showtime.id}
                  className="border rounded p-2 text-center transform transition-transform duration-300 motion-safe:hover:scale-105"
                  style={{
                    boxShadow: "2px 2px 4px rgba(0, 0, 255, 0.5)",
                    transition: "box-shadow 0.3s ease",
                  }}
                >
                  <h3
                    className="text-xl font-semibold"
                    style={{
                      textShadow: "4px 4px 6px rgba(0, 0, 255, 0.5)",
                    }}
                  >
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    <img
                      src={theater.imageUrl}
                      alt={theater.name}
                      className="w-16 h-16 rounded-full inline-block mr-2"
                    />
                    {theater.name} - {theater.location}
                  </p>
                  <p className="text-sm">{showtime.time}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Theaters Section */}
        <section>
          <h2
            className="text-2xl font-semibold mb-8 text-center"
            style={{
              textShadow: "4px 4px 6px rgba(0, 0, 255, 0.5)",
            }}
          >
            Our Theaters
          </h2>
          <ul className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center">
            {theaters.map((theater) => (
              <li
                key={theater.id}
                className="border rounded pb-4 text-center transform transition-transform duration-300 motion-safe:hover:scale-105"
                style={{
                  boxShadow: "2px 2px 4px rgba(0, 0, 255, 0.5)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <img
                  src={theater.imageUrl}
                  alt={theater.name}
                  className="w-full h-48 object-cover mb-2 rounded-lg"
                />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    textShadow: "4px 4px 6px rgba(0, 0, 255, 0.5)",
                  }}
                >
                  {theater.name}
                </h3>
                <p className="text-sm">{theater.location}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CinemaWebsite;
