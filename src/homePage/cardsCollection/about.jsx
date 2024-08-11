import React from "react";

const CinemaAbout = () => {
  return (
    <>
      <section className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] bg-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://variety.com/wp-content/uploads/2020/11/ODEON-Leicester-Square-London.jpg?w=1000"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://entrepreneurship.babson.edu/wp-content/uploads/2020/10/Movie-1200-630.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <img
                      src="https://westchestermagazine.com/wp-content/uploads/2023/10/movie-theater-adobe-stock-1068x712.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                    <span className="absolute -right-7 -bottom-7 z-[-1]">
                      <svg
                        width={134}
                        height={106}
                        viewBox="0 0 134 106"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG circles omitted for brevity */}
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <span className="block mb-4 text-lg font-semibold text-white">
                  Discover the Magic of Cinema
                </span>
                <h2 className="mb-5 text-3xl font-bold text-white sm:text-[40px]/[48px]">
                  Bringing Stories to Life
                </h2>
                <p className="mb-5 text-base text-gray-300">
                  Dive into a world where imagination meets reality. Whether
                  you're a fan of classic films or the latest blockbusters, our
                  cinema experience will leave you mesmerized.
                </p>
                <p className="mb-8 text-base text-gray-300">
                  Explore our state-of-the-art theaters and indulge in premium
                  amenities. Join us for an unforgettable cinematic adventure.
                </p>
                <a
                  href="javascript:void(0)"
                  className="inline-flex items-center bg-purple-900 justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90"
                >
                  Book Tickets
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CinemaAbout;
