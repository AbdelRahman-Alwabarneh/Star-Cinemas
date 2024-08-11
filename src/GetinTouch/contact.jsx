import React, { useState } from "react";
import Navbar from "../nav";
import Footer from "../footer";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      // Firebase Realtime Database endpoint
      const firebaseEndpoint =
        "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/contacts.json";

      // Prepare data to be submitted
      const newContact = {
        name: name,
        email: email,
        message: message,
      };

      // Send POST request to Firebase Realtime Database
      const response = await axios.post(firebaseEndpoint, newContact);

      if (response.status === 200) {
        setSubmitSuccess(true);
        setName("");
        setEmail("");
        setMessage("");

        // SweetAlert
        Swal.fire({
          icon: "success",
          title: "Message submitted successfully!",
          showConfirmButton: false,
          timer: 2500, // Automatically close after 1.5 seconds
          customClass: {
            popup: "bg-blue-900", // Background color
            title: "text-white", // Title text color
            content: "text-white  ", // Content text color
          },
          width: "30rem", // Width of the alert
          padding: "2rem", // Padding inside the alert
        });
      } else {
        setSubmitError("Failed to submit. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting contact message:", error);
      setSubmitError("Failed to submit. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="hero bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20, 20, 20, 0.6), rgba(39, 39, 90, 0.2)), url(https://i.imgur.com/qLMP1Vm_d.webp?maxwidth=760&fidelity=grand)",
          minHeight: "50vh",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md mx-auto">
            <img
              src="https://www.irishtimes.com/resizer/v2/UKL4Y4U4RCPQNRHY2A7Z4JCV2Y.jpg?auth=b0717565b3fb659678860032d6db704cd6090c1c060aa39b6235c178748073c6&smart=true&width=1440&height=810"
              alt="Hero Background"
              className="hidden"
              aria-hidden="true"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1
            className="text-5xl font-bold text-center mb-8"
            style={{
              fontFamily: "Caveat",
              textShadow: "8px 7px 6px rgba(0, 0, 255, 0.5)",
            }}
          >
            About Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* About Us Section */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="mb-4">
                Cinema Paradise is dedicated to providing an exceptional
                cinematic experience to our audience. With a passion for movies,
                we curate a diverse selection of films ranging from classics to
                the latest blockbusters.
              </p>
              <p className="mb-4">
                Our team consists of film enthusiasts and professionals who
                strive to deliver outstanding customer service and an enjoyable
                movie-going atmosphere.
              </p>
              <p>
                Visit our locations across the country and immerse yourself in
                the magic of cinema.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="mb-4">
                <p className="text-lg font-semibold">Address:</p>
                <p>123 Movie Lane</p>
                <p>Hollywood, CA 90001</p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold">Phone:</p>
                <p>(123) 456-7890</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Email:</p>
                <p>info@starcinemas.com</p>
              </div>
            </div>
          </div>

          <h2
            className="text-5xl font-bold text-center mb-8 mt-8"
            style={{
              fontFamily: "Caveat",
              textShadow: "8px 7px 6px rgba(0, 0, 255, 0.5)",
            }}
          >
            FAQ
          </h2>

          {/* FAQ Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">
              How do I purchase tickets?
            </h3>
            <p className="mb-4">
              You can purchase tickets online through our website or visit our
              box office at any of our cinema locations.
            </p>

            <h3 className="text-xl font-bold mb-4">
              Do you offer discounts for seniors or students?
            </h3>
            <p className="mb-4">
              Yes, we offer discounts for seniors and students. Please present a
              valid ID at the box office to avail of these discounts.
            </p>

            <h3 className="text-xl font-bold mb-4">
              What are your operating hours?
            </h3>
            <p className="mb-4">
              Our cinema locations are open from 10:00 AM to 10:00 PM, seven
              days a week. Please check our website for any holiday hours or
              special events.
            </p>

            <h3 className="text-xl font-bold mb-4">
              Can I host a private event or screening at Cinema Paradise?
            </h3>
            <p className="mb-4">
              Yes, we offer facilities for private events and screenings. Please
              contact our events team at events@starcinemas.com for more
              information and bookings.
            </p>
          </div>
          <h2
            className="text-5xl font-bold text-center mb-8 mt-8"
            style={{
              fontFamily: "Caveat",
              textShadow: "8px 7px 6px rgba(0, 0, 255, 0.5)",
            }}
          >
            Contact Us
          </h2>

          {/* Contact Form */}
          <div className="bg-gray-800 p-6 rounded-lg mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Write Us A Message
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className=" block w-full px-3 py-2 border bg-transparent mt-3 border-gray-200 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" block w-full px-3 py-2 border bg-transparent mt-3 border-gray-200 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-lg font-semibold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className=" block w-full px-3 py-2 border bg-transparent mt-3 border-gray-200 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className=" bg-gray-700 hover:bg-blue-900 text-white px-4 py-2 rounded-md"
              >
                Send Message
              </button>
            </form>
            {submitting && <p className="text-white mt-2">Submitting...</p>}
            {submitError && <p className="text-red-900 mt-2">{submitError}</p>}
            {/* {submitSuccess && (
              <p className="text-green-900 mt-2">
                Message submitted successfully!
              </p>
            )} */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
