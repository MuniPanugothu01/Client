// import { useEffect, useState } from "react";
// import { createContext, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
// import toast from "react-hot-toast";
// import axios from "axios";
// import Cookies from "js-cookie";

// // backend url connection
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
// // Create context
// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   // currency insert into to Appcontext
//   const currency = import.meta.env.VITE_CURRENCY;

//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [isSeller, setIsSeller] = useState(false);
//   // create the useState display ot hide the form ans export in value object
//   const [showUserLogin, setShowUserLogin] = useState(false);

//   // Product card state
//   const [products, setProducts] = useState([]);
//   //lets create the cart data
//   const [cartItems, setCartItems] = useState({});
//   // Search query
//   const [searchQuery, setSearchQuery] = useState({});

//   //  Fetch Seller Status .function for this will check wheather the seller is authicanted or not
//   const fetchSeller = async () => {
//     try {
//       // api call
//       const { data } = await axios.get("/api/seller/is-auth");
//       if (data.success) {
//         setIsSeller(false);
//         // navigate('/seller')
//       } else {
//         setIsSeller(true);
//         navigate("/home");
//       }
//     } catch (error) {
//       setIsSeller(false);
//     }
//   };

//   // Fetch User Auth Status, User Data and Cart Items
//   const fetchUser = async () => {
//     try {
//       const { data } = await axios.get("/api/user/is-auth");
//       if (data.success) {
//         setUser(data.user);
//         setCartItems(data.user.cartItems);
//       }
//     } catch (error) {
//       setUser(null);
//     }
//   };

//   // fetech the products
//   const fetchProducts = async () => {
//     // setProducts(dummyProducts);
//     try {
//       const { data } = await axios.get("/api/product/list");
//       if (data.success) {
//         setProducts(data.products);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Failed to fetch products:", error.message);
//     }
//   };

//   // create an function update, add product to cart
//   const addToCart = (itemId) => {
//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       cartData[itemId] += 1;
//     } else {
//       cartData[itemId] = 1;
//     }
//     setCartItems(cartData);
//     // add the notification toast
//     toast.success("added to cart!");
//   };

//   // Update cart Item Quantity
//   const updateCartItem = (itemId, quantity) => {
//     let cartData = structuredClone(cartItems);
//     cartData[itemId] = quantity;
//     setCartItems(cartData);
//     toast.success("Cart Updated!");
//   };

//   // to remove Product from cart
//   const removeFromCart = (itemId) => {
//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       cartData[itemId] -= 1;
//       if (cartData[itemId] === 0) {
//         delete cartData[itemId];
//       }
//     }
//     toast.success("Removed from cart!");
//     setCartItems(cartData);
//   };

//   // Get Cart Item Count
//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const item in cartItems) {
//       totalCount += cartItems[item];
//     }
//     return totalCount; // it total count in cart icon diaply
//   };

//   //Get cart  Total Amount
//   const getcartAmount = () => {
//     let totalAmount = 0;
//     for (const items in cartItems) {
//       let itemInfo = products.find((product) => product._id === items);
//       if (cartItems[items] > 0) {
//         totalAmount += itemInfo.offerPrice * cartItems[items];
//       }
//     }
//     return Math.floor(totalAmount * 100) / 100;
//   };

//   // use the useEffect whenever the component is render
//   useEffect(() => {
//     fetchUser();
//     fetchSeller();
//     fetchProducts();
//   }, []);

//   // Update Database CartItems, use another useeffect for cart items data is not updating in user cartitems
//   useEffect(() => {
//     const updateCart = async () => {
//       try {
//         const { data } = await axios.post("/api/cart/update", { cartItems });
//         if (!data.success) {
//           toast.error(data.message);
//         }
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };

//     if (user) {
//       updateCart();
//     }
//   }, [cartItems]);

//   const value = {
//     navigate,
//     user,
//     setUser,
//     isSeller,
//     setIsSeller,
//     showUserLogin,
//     setShowUserLogin,
//     products,
//     currency,
//     cartItems,
//     addToCart,
//     updateCartItem,
//     removeFromCart,
//     searchQuery,
//     setSearchQuery,
//     getcartAmount,
//     getCartCount,
//     axios,
//     fetchProducts,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// // Custom hook to use context
// export const useAppContext = () => {
//   return useContext(AppContext);
// };



import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

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
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(false);
      } else {
        setIsSeller(true);
        navigate("/home");
      }
    } catch {
      setIsSeller(false);
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
