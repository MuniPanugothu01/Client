import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

// import assests folder
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContect";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();
  // create a function to logout the user, Checks the user login status.
  const Logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        // setTimeout(() => {
          navigate("/");
        // }, 200);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // UseEffect() for search bar
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);
  // SearchHandleFunction
  const SearchHandleFunction = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all z-50">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="dummyLogoColored" />
        <p>FRESH CART</p>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        {/* <NavLink to="/about">About</NavLink> */}
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={SearchHandleFunction}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search Icon" className="w-4 h-4" />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.cart_icon}
            alt="CartIcon"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -rig ht-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>
        {/* whenever user can not logged in */}
        {!user ? (
          <button
            onClick={() => {
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10" alt="" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("my-orders")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={Logout}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.cart_icon}
            alt="CartIcon"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -rig ht-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className=""
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="menu_icon" />
        </button>
      </div>

      {/* Mobile Menu */}
      {/* when ever open state is true then only open state can open */}
      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <NavLink
            to="/"
            onClick={() => {
              setOpen(false);
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => {
              setOpen(false);
            }}
          >
            About
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => {
              setOpen(false);
            }}
          >
            All Products
          </NavLink>
          {user && (
            <NavLink
              to="/products"
              onClick={() => {
                setOpen(false);
              }}
            >
              My Orders
            </NavLink>
          )}

          <NavLink
            to="/"
            onClick={() => {
              setOpen(false);
            }}
          >
            Contact
          </NavLink>

          {/* whenever user login then it show the logout button */}
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            // this button work as allow user to logout the form
            <button
              onClick={Logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
