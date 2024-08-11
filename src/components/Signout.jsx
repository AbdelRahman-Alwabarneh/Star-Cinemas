import { signOut } from "firebase/auth";
import { auth } from "../firebase-config/firebase";
import { FaDoorOpen } from "react-icons/ri";

const Signout = () => {
  const Signout = async () => {
    try {
      await signOut(auth);
      console.log("Signout successful");
    } catch (error) {
      console.error("Signout error:", error.message);
    }
  };

  return (
    <div>
      <button
        onClick={Signout}
        className="w-28 py-3 bg-gray-700 hover:bg-blue-900 text-white rounded-lg transition duration-300"
      >
        <FaDoorOpen />
        Sign Out
      </button>
    </div>
  );
};

export default Signout;
