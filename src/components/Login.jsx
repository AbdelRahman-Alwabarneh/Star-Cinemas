import { Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase-config/firebase";
import ContainerImage from "../assets/Container1.png";
// لاحظ من ال import تبعها انو هي شو بتعمل على ادارة التنقل بين الصفحات
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiGoogleFill } from "react-icons/ri";

const Login = () => {
  // هاي عشان صفحة booking
  sessionStorage.setItem("issuccess", false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      // الفكرة هون استخراج بيانات المستخدم وعرضها لحتى اذا كنت بدي استخدمها
      const user = userCredential.user;
      const userData = {
        email: user.email,
        password: loginPassword,
        name: user.displayName,
      };

      const UserSession = sessionStorage.setItem(
        "user",
        JSON.stringify(loginEmail)
      );
      sessionStorage.setItem("issuccess", true);
      navigate("/");

      console.log(UserSession);
      setLoginEmail("");
      setLoginPassword("");

      console.log("Login successful:", userCredential.user);
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        alert("Invalid email or password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format. Please enter a valid email address.");
      } else {
        console.error("Login error:", error.message);
      }
    }
  };

  const signInWithGoogle = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user session data in sessionStorage
      const userData = {
        email: user.email,
        name: user.displayName,
      };
      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("issuccess", true);

      // Save user data to database
      await axios.post(
        "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/users.json",
        {
          name: user.displayName,
          email: user.email,
          isDeleted: false,
        }
      );

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-zinc-900/80 flex items-center justify-center">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={ContainerImage}
        alt="/"
      />

      <form className="max-w-[400px] w-full bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
        <h2
          className="text-4xl font-bold text-center text-white pb-4"
          style={{ fontFamily: "Caveat" }}
        >
          Cinema
        </h2>
        <div className="flex flex-col mb-4">
          <input
            placeholder="Email..."
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
            className="border-b-2 border-white bg-transparent text-white p-3 mb-6 focus:outline-none focus:border-blue-900"
            type="text"
          />
        </div>
        <div className="flex flex-col mb-6">
          <input
            placeholder="Password..."
            type="password"
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
            className="border-b-2 border-white bg-transparent text-white p-3 mb-6 focus:outline-none focus:border-blue-900"
          />
        </div>
        <Link to="/">
          <button
            onClick={login}
            className="w-full py-3 mb-6 bg-gray-700 hover:bg-blue-900 text-white rounded-lg transition duration-300"
          >
            Sign In
          </button>
        </Link>

        <Link to="/">
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center w-full py-3 mb-4 bg-gray-700 hover:bg-blue-900 text-white rounded-lg transition duration-300"
          >
            <RiGoogleFill size={30} color="#fff" className="mr-2" />
            <span className="ml-2">Sign In with Google</span>
          </button>
        </Link>

        <p className="text-center mt-6 text-white">
          Not a member? {"    "}
          <Link to="/components/Register">
            <span className="text-gray-700 font-bold text-xl hover:text-blue-900 hover:underline">
              Sign up now
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
