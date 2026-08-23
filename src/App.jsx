import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home.jsx";
import Menu from "./Pages/Menu.jsx";
import Cart from "./Pages/Cart.jsx";
import Checkout from "./Pages/Checkout.jsx";
import Signin from "./Pages/Signin.jsx";
import Signup from "./Pages/Signup.jsx";
import ProductDetail from "./Pages/ProductDetail";
import Profile from "./Pages/Profile.jsx";
import ProtectedRouter from "./Components/ProtectedRouter.jsx";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound.jsx";

function App() {
  return (
    <>
      <Navbar />
    
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/menu" element={<Menu />} />
  <Route path="/cart" element={<Cart />} />

  <Route
    path="/profile"
    element={
      <ProtectedRouter>
        <Profile />
      </ProtectedRouter>
    }
  />

  <Route
    path="/checkout"
    element={
      <ProtectedRouter>
        <Checkout />
      </ProtectedRouter>
    }
  />

  <Route path="/signin" element={<Signin />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/product/:id" element={<ProductDetail />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />

  <Route path="*" element={<NotFound />} />
</Routes>

      <Footer />
    </>
  );
}

export default App;