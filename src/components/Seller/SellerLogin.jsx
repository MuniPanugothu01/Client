import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContect";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Handle login
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });

      if (data.success) {
        Cookies.set("isSeller", "true", { expires: 1 }); // expires in 1 day
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Sync isSeller state from cookie
  useEffect(() => {
    const sellerCookie = Cookies.get("isSeller");
    if (sellerCookie === "true") {
      setIsSeller(true);
    }
  }, []);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900"
      >
        <div className="flex flex-col gap-5 p-8 py-12 w-full max-w-sm rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-medium text-gray-800 dark:text-white">
            <span className="text-blue-600">Seller</span> Login
          </p>

          <div className="w-full">
            <label className="mb-1 text-gray-700 dark:text-gray-300 block">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded w-full p-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-full">
            <label className="mb-1 text-gray-700 dark:text-gray-300 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded w-full p-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-full transition duration-150"
          >
            Login
          </button>
        </div>
      </form>
    )
  );  
};

export default SellerLogin;
