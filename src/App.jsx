import React from "react";
import Navbar from "./components/Navbar";
import MainBanner from "./components/MainBanner";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContect";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./components/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/Seller/SellerLogin";
import SellerLayout from "./pages/SellerLayout";
function App() {
  // seller bath
  const isSellerPath = useLocation().pathname.includes("seller");

  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {/* this navbar can display normal user not seller */}
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout/> : <SellerLogin />}></Route>
        </Routes>
        {!isSellerPath && <Footer />}
      </div>
    </div>
  );
}

export default App;
