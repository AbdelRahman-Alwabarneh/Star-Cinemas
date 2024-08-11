import React, { useState } from "react";

const CinemaFacilities = () => {
  const [showFacility, setShowFacility] = useState("all");

  const handleFacility = (category) => {
    setShowFacility(category);
  };

  return (
    <>
      <section className=" pb-12 lg:pb-[90px] bg-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[510px] text-center">
                <span className="text-white mb-2 block text-lg font-semibold">
                  {/* Our Cinema Facilities */}
                </span>
                <h2
                  className="text-white mb-4 font-bold sm:text-5xl md:text-5xl"
                  style={{
                    fontFamily: "Caveat",
                    textShadow: "8px 7px 6px rgba(0, 0, 255, 0.5)",
                  }}
                >
                  Explore Our Amenities
                </h2>
                <p className="text-body-color text-base text-white">
                  Discover the range of amenities we offer for your comfort and
                  enjoyment.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mb-12">
            <ul className="flex space-x-1">
              <li className="mb-1"></li>
              <li className="mb-1"></li>
              <li className="mb-1"></li>
              <li className="mb-1"></li>
            </ul>
          </div>

          <div className="flex flex-wrap justify-center -mx-4">
            <CinemaFacilityCard
              ImageHref="https://www.icetheaters.com/sites/default/files/styles/lame_exp_media_image/public/2020-03/image.jpg?itok=RZ_TM4gf" // Replace with actual image URL for theaters
              category="Theaters"
              title="3D Theaters"
              button="View Details"
              buttonHref="#"
              showFacility={showFacility}
            />
            <CinemaFacilityCard
              ImageHref="https://www.flintandgenesee.org/wp-content/uploads/2016/09/DSC_0119-small-768x514.jpg" // Replace with actual image URL for snacks & drinks
              category="Snacks & Drinks"
              title="Delicious Snacks & Drinks"
              button="View Details"
              buttonHref="#"
              showFacility={showFacility}
            />
            <CinemaFacilityCard
              ImageHref="https://static.boredpanda.com/blog/wp-content/uploads/2019/05/cinema-replaces-seats-with-double-beds-switzerland-4-5cd91d9aaf61f__700.jpg" // Replace with actual image URL for VIP experience
              category="VIP Experience"
              title="Luxury VIP Experience"
              button="View Details"
              buttonHref="#"
              showFacility={showFacility}
            />
          </div>
        </div>
      </section>
    </>
  );
};

const CinemaFacilityCard = ({
  showFacility,
  category,
  ImageHref,
  title,
  button,
  buttonHref,
}) => {
  return (
    <div
      className={`w-full px-4 md:w-1/2 xl:w-1/3 ${
        showFacility === "all" || showFacility === category.toLowerCase()
          ? "block"
          : "hidden"
      }`}
      style={{ minHeight: "500px" }} // Adjust the height as needed for uniform size
    >
      <div className="mb-12 h-full ">
        <div className="transform transition-transform duration-300 motion-safe:hover:scale-105 overflow-hidden rounded-[10px] h-[250px] md:h-[300px]"
        >
          
          <img
            src={ImageHref}
            alt={category}
            className="w-full h-full object-cover"
            style={{ minHeight: "300px" }}
          />
        </div>
        <div className=" mx-7 -mt-20 rounded-lg bg-gray-900 dark:bg-dark-2 py-[34px] px-3 text-center shadow-portfolio dark:shadow-box-dark">
          <span className="text-primary mb-2 block text-sm font-medium">
            {category}
          </span>
          <h3
            className="text-dark pt-20 text-white mb-5 text-xl font-bold"
            style={{
              textShadow: "4px 4px 6px rgba(0, 0, 255, 0.5)",
            }}
          >
            {title}
          </h3>
          <a
            href={buttonHref}
            className="text-white   rounded-md  bg-gray-700 hover:bg-blue-700 py-[10px] px-7 text-sm font-medium transition "
          >
            {button}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CinemaFacilities;
