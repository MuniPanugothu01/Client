import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContect";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSeller(true);
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center text-sm text-gray-600 bg-white dark:bg-gray-900"
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-medium mm-auto text-gray-800 dark:text-white">
            <span className="text-blue-600">Seller</span> Login
          </p>

          <div className="w-full">
            <p className="mb-1 text-gray-700 dark:text-gray-300">Email</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded w-full p-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
              required
            />
          </div>

          <div className="w-full">
            <p className="mb-1 text-gray-700 dark:text-gray-300">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded w-full p-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
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
