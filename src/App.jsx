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

function App() {
  // seller bath
  const isSellerPath = useLocation().pathname.includes("seller");

  const { showUserLogin } = useAppContext();

  return (
    <>
      {/* this navbar can display normal user not seller */}
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/products" element={<AllProducts />} /> */}
        </Routes>
        {!isSellerPath && <Footer />}
      </div>
    </>
  );
}

export default App;
