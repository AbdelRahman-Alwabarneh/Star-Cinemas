import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./homePage/home";
import ContactUs from "./GetinTouch/contact";
import Catalog from "./homePage/catalogandDitales/Catalog";
import Details from "./homePage/catalogandDitales/Details";
import BuyTicket from "./BuyTicket";
import Order from "./Order";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./homePage/userPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/GetinTouch/contact" element={<ContactUs />} />
        <Route
          path="/homePage/catalogandDitales/Catalog"
          element={<Catalog />}
        />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/details/:id/book" element={<BuyTicket />} />
        <Route path="/details/:id/book/order" element={<Order />} />
        <Route path="/components/Login" element={<Login />} />
        <Route path="/components/Register" element={<Register />} />
        <Route path="/homePage/userPage" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
