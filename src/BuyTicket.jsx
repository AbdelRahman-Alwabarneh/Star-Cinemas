import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "./nav";
import Footer from "./footer";
import jsPDF from "jspdf";
// لحتى استخدم paypal انا بحاجة اعمله import بعد ما نزلته عندي
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

function BuyTicket() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [ticketsCount, setTicketsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  // VIP Ticket States
  const [vipTicketsCount, setVipTicketsCount] = useState(0);
  const [vipTotalPrice, setVipTotalPrice] = useState(0);
  const [vipCouponCode, setVipCouponCode] = useState("");
  const [vipDiscountedPrice, setVipDiscountedPrice] = useState(0);
 
  //  هاي خاصة ب payapl والهدف منها تحديد القيم ل payapl
  
  const initialOptions = {
    "client-id":
      "AWrR0dEDBlc9AVYB7E-RbYM8HyZMGiRs_ibLN1lcJXBnv8DhZc1BuvhagRX5ycmsDSNQ3B5TxKya81_v",
    "enable-funding": "card",
    "disable-funding": "",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };


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

  const incrementTickets = () => {
    if (ticketsCount < movie.numberOfTickets) {
      setTicketsCount(ticketsCount + 1);
      setTotalPrice((ticketsCount + 1) * movie.price);
    }
  };

  const decrementTickets = () => {
    if (ticketsCount > 0) {
      setTicketsCount(ticketsCount - 1);
      setTotalPrice((ticketsCount - 1) * movie.price);
    }
  };

  const incrementVipTickets = () => {
    if (vipTicketsCount < movie.vipTicketNumberOfTickets) {
      setVipTicketsCount(vipTicketsCount + 1);
      setVipTotalPrice((vipTicketsCount + 1) * movie.vipTicketPrice);
    }
  };

  const decrementVipTickets = () => {
    if (vipTicketsCount > 0) {
      setVipTicketsCount(vipTicketsCount - 1);
      setVipTotalPrice((vipTicketsCount - 1) * movie.vipTicketPrice);
    }
  };

  const applyDiscount = () => {
    if (!movie.couponCode) {
      alert("This movie does not have a regular coupon code.");
      return;
    }

    if (couponCode === movie.couponCode) {
      if (!movie.discountPercentage) {
        alert("This movie does not have a discount percentage.");
        return;
      }
      const discountPercentage = movie.discountPercentage;
      const discountedPrice = totalPrice * (1 - discountPercentage);
      setDiscountedPrice(discountedPrice);
    } else {
      alert("Invalid regular coupon code. Please try again.");
    }
  };

  const applyVipDiscount = () => {
    if (!movie.vipTicketCouponCode) {
      alert("This movie does not have a VIP coupon code.");
      return;
    }

    if (vipCouponCode === movie.vipTicketCouponCode) {
      if (!movie.discountPercentage) {
        alert("This movie does not have a discount percentage.");
        return;
      }
      const discountPercentage = movie.discountPercentage;
      const discountedPrice = vipTotalPrice * (1 - discountPercentage);
      setVipDiscountedPrice(discountedPrice);
    } else {
      alert("Invalid VIP coupon code. Please try again.");
    }
  };

  const handleProceedToOrder = () => {
    setShowOrderForm(true);
  };
  // هون البداية انشأنا ملف pdf
  const generateTicketPDF = () => {
    // باستخدام مكتبة jsPDF انشأنا ال pdf
    const doc = new jsPDF();

    // Background Color
    // هون دخلنا داخل ال pdf بدأنا نعطيه تنسيق
    doc.setFillColor(245, 245, 245);
    // rect هو الامر الي بيرسم مستطيل والارقام هي احداثيات المستطيل
    doc.rect(
      0,
      0,
      // هون بحدد عرض وارتفاع ال pdf  بشكل افتراضي
      doc.internal.pageSize.width,
      doc.internal.pageSize.height,
      // يقصد فيها الشاشة تكون full
      "F"
    );

    // Title
    // بعد ما خلصنا من pdf وشكله صار وقت شكل النص وحجمه وموقعه احدده
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(20);
    // text, x, y, flags, angle, align;
    doc.text(`Ticket Order Details`, 105, 15, null, null, "center");

    // Customer Information
    // رتبت ال pdf ورتبت النص صار وقت ازد بالبيانات تبعتي نبدأ ببيانات المستخدم
    doc.setFontSize(12);
    //  هلأ doc.text هاي الباب لحتى ادخل النص تبعي
    // بناي ع ال pdf من اسمه وبعدها الي هو doc وبعدها بخبره بالاضافة الي بدي اعملها عن طريق text
    // هلأ هاي القيم هي عبارة عن الوضع الافقي والعمودي لنص
    doc.text(`Customer Name: ${name}`, 10, 30);
    doc.text(`Email: ${email}`, 10, 40);
    doc.text(`Address: ${address}`, 10, 50);
    doc.text(`Country: ${country}`, 10, 60);
    // Order Details
    doc.text(`Movie Title: ${movie.title}`, 10, 80);
    doc.text(`Number of Regular Tickets: ${ticketsCount}`, 10, 90);
    doc.text(
      // القصة الي صارت هون انو بدي اشوف في خصم او لأ لحتى اطبعه مع ال order
      // بسأل هل قيمة الخصم اكبر من 0 لحظتها يعني في خصم روح جيب قيمة الخصم وقصده بال fixed انو خد بس اول رقمين عشرين
      //   اذا لأ ما في خصم طلع قيمة السعر الحقيقية
      `Total Price: ${
        discountedPrice > 0 ? discountedPrice.toFixed(2) : totalPrice.toFixed(2)
      } $`,
      10,
      100
    );

    doc.text(`Number of VIP Tickets: ${vipTicketsCount}`, 10, 120);
    doc.text(
      `Total Price: ${
        vipDiscountedPrice > 0
          ? vipDiscountedPrice.toFixed(2)
          : vipTotalPrice.toFixed(2)
      } $`,
      10,
      130
    );

    // Website Information
    doc.text(`Website: StarCinemas`, 10, 150);

    // Footer
    doc.setLineWidth(0.5);
    doc.line(10, 270, 200, 270);
    doc.setFontSize(10);
    doc.text(
      `Thank you for choosing StarCinemas`,
      105,
      275,
      null,
      null,
      "center"
    );

    // Save the PDF with a specific name
    doc.save(`order_details_${name.replace(/\s/g, "_")}.pdf`);

    // Store order details in Firebase
    const orderData = {
      name,
      email,
      address,
      country,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      ticketsCount,
      vipTicketsCount,
      totalPrice,
      vipTotalPrice,
      movieTitle: movie.title,
      createdAt: new Date().toISOString(),
    };

    axios
      .post(
        "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        orderData
      )
      .then((response) => {
        console.log("Order stored successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error storing order:", error);
      });

    // Reset form and state after submission
    setName("");
    setEmail("");
    setAddress("");
    setCountry("");
    setCardNumber("");
    setExpiryMonth("");
    setExpiryYear("");
    setCvv("");
    setTicketsCount(0);
    setTotalPrice(0);
    setDiscountedPrice(0);
    setVipTicketsCount(0);
    setVipTotalPrice(0);
    setVipDiscountedPrice(0);
    setCouponCode("");
    setVipCouponCode("");
    setShowOrderForm(false);

    // Redirect or show success message to the user
    alert("Order placed successfully!");
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // Generate single PDF with all order details
    generateTicketPDF();

    // Reset form and state after submission
    setName("");
    setEmail("");
    setAddress("");
    setCountry("");
    setCardNumber("");
    setExpiryMonth("");
    setExpiryYear("");
    setCvv("");
    setTicketsCount(0);
    setTotalPrice(0);
    setDiscountedPrice(0);
    setVipTicketsCount(0);
    setVipTotalPrice(0);
    setVipDiscountedPrice(0);
    setCouponCode("");
    setVipCouponCode("");
    setShowOrderForm(false);

    // Redirect or show success message to the user
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  if (showOrderForm) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex-1 container mx-auto py-8 w-auto">
          <form
            onSubmit={handleSubmitOrder}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden p-4"
            style={{
              boxShadow: "10px 10px 40px rgba(30, 58, 138, 0.5)",
            }}
          >
            <h1
              className="text-5xl text-white text-center font-bold mb-4"
              style={{
                fontFamily: "Caveat",
                textShadow: "8px 7px 6px rgba(0, 0, 255, 0.5)",
              }}
            >
              Enter Your Information
            </h1>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border bg-transparent mt-3 border-gray-200 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900 px-4 py-2 w-full md:w-96"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border bg-transparent mt-3 border-gray-200 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900 px-4 py-2 w-full md:w-96"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-white"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border bg-transparent mt-3 border-gray-200 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900 px-4 py-2 w-full md:w-96"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-white"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="border bg-transparent mt-3 border-gray-200 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900 px-4 py-2 w-full md:w-96"
                required
              />
            </div>
            <h2 className="text-xl mt-4 mb-2 text-white">
              Credit Card Information
            </h2>
            <div className="mb-4">
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-white"
              ></label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="border bg-transparent mt-3 border-gray-200 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900 px-4 py-2 w-full md:w-96"
              />
            </div>
            <div className="flex m-auto justify-center items-center">
              <div className="w-1/2  ">
                <label
                  htmlFor="ExpiryMonth"
                  className="block text-sm font-medium text-white"
                >
                  Expiry Month
                </label>
                <input
                  type="text"
                  id="expiryMonth"
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  className="border bg-transparent mt-3 border-gray-200 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900 px-4 py-2 w-full md:w-44"
                />
              </div>
              <div className="w-1/2 ml-2">
                <label
                  htmlFor="expiryYear"
                  className="block text-sm font-medium text-white"
                >
                  Expiry Year
                </label>
                <input
                  type="text"
                  id="expiryYear"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  className="border bg-transparent mt-3 border-gray-200 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900 px-4 py-2 w-full md:w-44"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-white"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="border bg-transparent mt-3 border-gray-200 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900 px-4 py-2 w-full md:w-96"
              />
            </div>
            {/* بداية انا بحاجة انزل paypal عندي */}
            {/* npm install @paypal/react-paypal-js */}
            {/* لحتى اخلي paypal موجود بالتطبيق بكل بساطة بحط PayPalScriptProvider */}
            {/* متل ما عملت بداية ل firebase هلأ كمان بعمل بداية لل paypal */}
            {/* هلأ هاي ال initialOptions بقدر احط فيها كمان فيم محددة للبداية  */}
            {/* client-id currency intent components */}
            {/* وهدول بكون موقعهم قبل ال return */}
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                style={{ layout: "horizontal", shape: "rect" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        description: "",
                        amount: {
                          currency_code: "USD",
                          value: 200,
                        },
                      },
                    ],
                  });
                }}
              />
            </PayPalScriptProvider>
            <h2 className="text-xl mt-4 mb-2 text-white">Ticket Details</h2>
            <p className=" text-white">
              Number of Regular Tickets: {ticketsCount}
            </p>
            <p className=" text-white">
              Total Price for Regular Tickets:{" "}
              {discountedPrice > 0 ? discountedPrice + "$" : totalPrice + "$"}
            </p>
            <p className=" text-white">
              Number of VIP Tickets: {vipTicketsCount}
            </p>
            <p className=" text-white">
              Total Price for VIP Tickets:{" "}
              {vipDiscountedPrice > 0
                ? vipDiscountedPrice + "$"
                : vipTotalPrice + "$"}
            </p>
            <button
              type="submit"
              className="block w-full mt-4 text-center bg-gray-700 hover:bg-blue-900  text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Confirm Order
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex-1 container mx-auto py-8">
        <div className=" bg-gray-800 rounded-lg shadow-md overflow-hidden flex">
          <img
            className="w-1/3 h-auto object-cover"
            src={movie.image}
            alt={`${movie.title} Poster`}
          />
          <div className="w-2/3 p-4">
            <h1
              className="text-5xl font-bold mb-2 text-white text-center"
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
                Author by :{" "}
              </span>
              <span className=" text-gray-400 mb-2">{movie.author}</span>
            </h2>
            <p className="text-lg text-white mb-4">
              <span
                style={{
                  textShadow: "6px 6px 8px rgba(0, 0, 255, 0.5)",
                }}
              >
                Description :{" "}
              </span>
              <span className=" text-gray-400 mb-2">{movie.description}</span>
            </p>
            <p className="text-lg text-white mb-4">
              <span
                style={{
                  textShadow: "6px 6px 8px rgba(0, 0, 255, 0.5)",
                }}
              >
                Rating :{" "}
              </span>
              <span className=" text-gray-400 mb-2">{movie.rating}</span>
            </p>
            <p className="text-lg text-white mb-4">
              <span
                style={{
                  textShadow: "6px 6px 8px rgba(0, 0, 255, 0.5)",
                }}
              >
                Release Year :{" "}
              </span>
              <span className=" text-gray-400 mb-2">{movie.release_year}</span>
            </p>

            <p className="text-lg text-white mb-4">
              <span
                style={{
                  textShadow: "6px 6px 8px rgba(0, 0, 255, 0.5)",
                }}
              >
                Number Of Regular Tickets :{" "}
              </span>
              <span className=" text-gray-400 mb-2">
                {movie.numberOfTickets}
              </span>
            </p>

            <p className="text-lg text-white mb-4">
              <span
                style={{
                  textShadow: "6px 6px 8px rgba(0, 0, 255, 0.5)",
                }}
              >
                Number Of Vip Tickets :{" "}
              </span>
              <span className=" text-gray-400 mb-2">
                {movie.vipTicketNumberOfTickets}
              </span>
            </p>
            <table className="w-auto m-auto border-collapse border border-gray-200">
              <tbody>
                <tr className="border  text-white border-gray-200">
                  <td className="border border-gray-200 px-4 py-2">
                    Ticket Price
                  </td>
                  <td className="border text-center border-gray-200 px-4 py-2">
                    {movie.price + "$"}
                  </td>
                </tr>
                <tr className="border  text-white border-gray-200">
                  <td className="border border-gray-200 px-4 py-2">
                    Selected Regular Tickets
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={decrementTickets}
                        className="bg-gray-700 hover:bg-blue-900 text-white text-xl font-bold py-2 px-4 rounded"
                      >
                        -
                      </button>
                      <span className="text-xl  text-white">
                        {ticketsCount}
                      </span>
                      <button
                        onClick={incrementTickets}
                        className=" font-bold py-2 px-4 bg-gray-700 hover:bg-blue-900  text-white text-xl rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border border-gray-200">
                  <td className="border text-white border-gray-200 px-4 py-2">
                    Total Regular Ticket Price
                  </td>
                  <td className="border  text-white text-center border-gray-200 px-4 py-2">
                    {totalPrice + "$"}
                  </td>
                </tr>
                <tr className="border border-gray-200">
                  <td className="border  text-white border-gray-200 px-4 py-2">
                    Coupon Code
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <input
                      placeholder="Write your code"
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="border bg-transparent border-gray-600 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900 px-4 py-2 md:w-64"
                    />
                    <button
                      onClick={applyDiscount}
                      className="bg-gray-700 hover:bg-blue-900 text-white px-2 py-2 rounded ml-2"
                    >
                      Apply
                    </button>
                  </td>
                </tr>
                {discountedPrice > 0 && (
                  <tr className="border border-gray-200 ">
                    <td className="border border-gray-200 px-4 py-2">
                      Discounted Price
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {discountedPrice + "$"}
                    </td>
                  </tr>
                )}

                {/* VIP Ticket Section */}
                <tr className="border border-gray-200 text-white">
                  <td className="border border-gray-200 px-4 py-2">
                    VIP Ticket Price
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {movie.vipTicketPrice + "$"}
                  </td>
                </tr>
                <tr className="border border-gray-200">
                  <td className="border text-white border-gray-200 px-4 py-2">
                    Selected VIP Tickets
                  </td>
                  <td className="border border-gray-200 px-4 py-2 ">
                    <div className="flex space-x-4 items-center justify-center">
                      <button
                        onClick={decrementVipTickets}
                        className="bg-gray-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                      >
                        -
                      </button>
                      <span className="text-xl text-white">
                        {vipTicketsCount}
                      </span>
                      <button
                        onClick={incrementVipTickets}
                        className="bg-gray-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border border-gray-200">
                  <td className="border border-gray-200 px-4 py-2 text-white">
                    Total VIP Ticket Price
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-white text-center">
                    {vipTotalPrice + "$"}
                  </td>
                </tr>
                <tr className="border border-gray-200">
                  <td className="border border-gray-200 px-4 py-2 text-white">
                    VIP Coupon Code
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <input
                      placeholder="Write your code"
                      type="text"
                      value={vipCouponCode}
                      onChange={(e) => setVipCouponCode(e.target.value)}
                      className="border bg-transparent border-gray-600 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900  px-4 py-2 w-full  md:w-64"
                    />
                    <button
                      onClick={applyVipDiscount}
                      className="bg-gray-700 hover:bg-blue-900 text-white px-2 py-2 rounded ml-2"
                    >
                      Apply
                    </button>
                  </td>
                </tr>
                {vipDiscountedPrice > 0 && (
                  <tr className="border border-gray-200">
                    <td className="border border-gray-200 px-4 py-2">
                      Discounted VIP Price
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {vipDiscountedPrice + "$"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <button
              onClick={handleProceedToOrder}
              className="block w-full md:w-96 m-auto mt-7 text-center bg-gray-700 hover:bg-blue-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Proceed to Order
            </button>
            <Link
              to={`/details/${id}`}
              className="block w-full md:w-96 m-auto mt-5 text-center bg-gray-700 hover:bg-blue-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Back To Details page
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BuyTicket;
