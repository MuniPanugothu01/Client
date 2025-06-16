  import { useEffect, useState, createContext, useContext } from "react";
  import { useNavigate } from "react-router-dom";
  import { dummyProducts } from "../assets/assets";
  import toast from "react-hot-toast";
  import axios from "axios";
  import Cookies from "js-cookie";
import { use } from "react";

  // Axios setup
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

  // Create Context
  export const AppContext = createContext();
  export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    // ✅ Fetch Seller Auth Status
    // const fetchSeller = async () => {
    //   try {
    //     const { data } = await axios.get("/api/seller/is-auth");
    //     if (data.success) {
    //       setIsSeller(false);
    //     } else {
    //       setIsSeller(true);
    //       navigate("/");
    //     }
    //   } catch {
    //     setIsSeller(false);
    //   }
    // };


console.log(user,'user id');

    l
    const fetchSeller = async () => {
      const isSellerCookie = Cookies.get("isSeller");
      try {
        const { data } = await axios.get("/api/seller/is-auth");
        if (data.success || isSellerCookie === "true") {
          setIsSeller(true);
        } else {
          setIsSeller(false);
          Cookies.remove("isSeller");
        }
      } catch {
        if (isSellerCookie === "true") {
          setIsSeller(true);
        } else {
          setIsSeller(false);
        }
      }
    };

    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/user/is-auth");

        if (data.success) {
          const cookieCart = Cookies.get("cartItems");
          let mergedCart = { ...data.user.cartItems };

          if (cookieCart) {
            try {
              const localCart = JSON.parse(cookieCart);
              for (const key in localCart) {
                mergedCart[key] = (mergedCart[key] || 0) + localCart[key];
              }
            } catch (err) {
              console.error("Invalid cookie cart:", err);
            }
          }

          setUser(data.user);
          setCartItems(mergedCart);

          // ✅ Immediately update DB with the merged cart
          await axios.post("/api/cart/update", { cartItems: mergedCart });
        }
      } catch {
        setUser(null);
      }
    };

    // ✅ Fetch Products
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/product/list");
        if (data.success) {
          setProducts(data.products);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };

    // ✅ Cart Actions
    const addToCart = (itemId) => {
      const cartData = { ...cartItems };
      cartData[itemId] = (cartData[itemId] || 0) + 1;
      setCartItems(cartData);
      toast.success("Added to cart!");
    };

    const updateCartItem = (itemId, quantity) => {
      const cartData = { ...cartItems };
      cartData[itemId] = quantity;
      setCartItems(cartData);
      toast.success("Cart Updated!");
    };

    const removeFromCart = (itemId) => {
      const cartData = { ...cartItems };
      if (cartData[itemId]) {
        cartData[itemId] -= 1;
        if (cartData[itemId] <= 0) delete cartData[itemId];
      }
      setCartItems(cartData);
      toast.success("Removed from cart!");
    };

    const getCartCount = () => {
      return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    };

    const getcartAmount = () => {
      let total = 0;
      for (const id in cartItems) {
        const item = products.find((p) => p._id === id);
        if (item) total += item.offerPrice * cartItems[id];
      }
      return Math.floor(total * 100) / 100;
    };

    // ✅ Load cart from cookies on mount (only for guests)
    useEffect(() => {
      if (!user) {
        const cookieCart = Cookies.get("cartItems");
        if (cookieCart) {
          try {
            setCartItems(JSON.parse(cookieCart));
          } catch (err) {
            console.error("Failed to parse cookie cart", err);
          }
        }
      }
    }, [user]);

    // ✅ Save to cookies when cart changes
    useEffect(() => {
      Cookies.set("cartItems", JSON.stringify(cartItems), {
        expires: 7,
        sameSite: "Lax",
      });
    }, [cartItems]);

    // ✅ Initial fetch
    useEffect(() => {
      fetchUser();
      fetchSeller();
      fetchProducts();
    }, []);

    const value = {
      navigate,
      user,
      setUser,
      isSeller,
      setIsSeller,
      showUserLogin,
      setShowUserLogin,
      products,
      currency,
      cartItems,
      addToCart,
      updateCartItem,
      removeFromCart,
      searchQuery,
      setSearchQuery,
      getcartAmount,
      getCartCount,
      axios,
      fetchProducts,
      setCartItems,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  };

  export const useAppContext = () => useContext(AppContext);
