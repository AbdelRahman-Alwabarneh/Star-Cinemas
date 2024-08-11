import React, { useState, useEffect } from "react";
import Navbar from "../nav";
import Footer from "../footer";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config/firebase";
import user from "../assets/user.png";

const Profile = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      // الفائدة من  ||  هو انو في حال ما كان في قيمة لل key المطلوب حط مكان قيمته قيمة افتراضية الي هي فراغ
      setDisplayName(currentUser.displayName || "");
      setEmail(currentUser.email || "");
      const storedPassword = sessionStorage.getItem("password") || "";
      setPassword(storedPassword);
    } else {
      navigate("/login");
    }
    //خارج useEffect، قد يتم استدعاء navigate عدة مرات في تشغيل المكون.
    // باستخدام navigate داخل useEffect، يتم التأكد من أن الانتقال إلى صفحة أخرى يحدث فقط مرة واحدة عند تحميل المكون أو تحديثه.
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      displayName,
      email,
      password,
    };

    sessionStorage.setItem("user", JSON.stringify(userData));
    // sessionStorage.setItem("password", password);

    alert("Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 mb-20">
        <div className="flex justify-center mt-20">
          <div className="w-full md:w-1/4 bg-gray-800 shadow-lg rounded-lg border border-gray-400">
            <div className="flex flex-col items-center py-8 px-6">
              <div className="mb-4 mt-14">
                <img
                  src={user}
                  alt="User Image"
                  className="rounded-full h-24 w-24 mb-2 mx-12"
                />
                <p className="text-white text-center text-lg font-bold mb-4">
                  {displayName}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:max-w-lg bg-gray-800 shadow-lg rounded-lg border border-gray-400 ml-4">
            <div className="flex flex-col items-center py-8 px-6">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4 w-full">
                  <label
                    htmlFor="full-name"
                    className="block text-white text-lg mb-2"
                  >
                    Full Name:
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="block w-full px-3 py-2 border bg-transparent mt-3 border-gray-200 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900"
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    htmlFor="email"
                    className="block text-white text-lg mb-2"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 border bg-transparent mt-3 border-gray-200 rounded-md shadow-sm text-gray-400 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <button
                  type="submit"
                  className="text-white bg-gray-700 hover:bg-blue-900 px-6 py-2 rounded-md shadow-md hover:bg-red2 focus:outline-none focus:ring-2 focus:ring-white mt-2"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
