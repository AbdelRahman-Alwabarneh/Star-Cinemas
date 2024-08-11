import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config/firebase";
import axios from "axios";
import ContainerImage from "../assets/Container1.png";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const user = userCredential.user;

      // Update user profile
      //  هاي خاصية بال firebase بمرر الها قيمتين الاولى ال doc الاساسية والتانية شو بدي اجيب منا
      // displayName هي صيغة ثابتة من firebase
      await updateProfile(user, {
        displayName: registerName,
      });

      // Store user in sessionStorage
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );

      // Save user details in the Firebase Realtime Database
      const customersData = await axios.get(
        "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );
      // هون بكل بساطة شو عملت ما بدي اخلي لما يروح ع real يعمل id على كيفه لأ بدي اخلي يبدأ عد من 0
      //  الفكرة شو اني امسك مفاتيح القيم الي عندي واحولهم لمصفوفة لحتى اعرف الطول تبعها 
      // شو عمل جملة شرطية بهاي الجملة الشرطية شيك في data او لأ اذا في اعطاها رقم حسب طول المصفوفة ما فيها اعطاها رقم 0
      const newUserId = customersData.data
        ? Object.keys(customersData.data).length
        : 0;
      await axios.put(
        `https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/users/${newUserId}.json`,
        {
          name: registerName,
          email: registerEmail,
          isDeleted: false,
          password: registerPassword,
          id: newUserId,
        }
      );

      console.log("Registration successful:", user);
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-zinc-900/90 flex items-center justify-center">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={ContainerImage}
        alt="/"
      />
      <form
        className="max-w-[400px] w-full bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg"
        onSubmit={register}
      >
        <h2
          className="text-4xl font-bold text-center text-white pb-4"
          style={{ fontFamily: "Caveat" }}
        >
          Cinema
        </h2>
        <div className="flex flex-col mb-4">
          <input
            placeholder="Name..."
            value={registerName}
            onChange={(event) => setRegisterName(event.target.value)}
            className="border-b-2 border-white bg-transparent text-white p-3 mb-6 focus:outline-none focus:border-blue-900"
            type="text"
            required
          />
          <input
            placeholder="Email..."
            value={registerEmail}
            onChange={(event) => setRegisterEmail(event.target.value)}
            className="border-b-2 border-white bg-transparent text-white p-3 mb-6 focus:outline-none focus:border-blue-900"
            type="email"
            required
          />
        </div>
        <div className="flex flex-col mb-6">
          <input
            placeholder="Password..."
            type="password"
            value={registerPassword}
            onChange={(event) => setRegisterPassword(event.target.value)}
            className="border-b-2 border-white bg-transparent text-white p-3 mb-6 focus:outline-none focus:border-blue-900"
            required
          />
        </div>
        <button
          type="submit" // Ensure this is a submit button
          className="w-full py-3 mb-2 bg-gray-700 hover:bg-blue-900 text-white rounded-lg transition duration-300"
        >
          Sign Up
        </button>
        <p className="text-center mt-4 text-white">
          already have an{" "}
          <Link to="/components/Login">
            <span className="text-gray-700 font-bold text-xl hover:text-blue-900 hover:underline">
              account
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
