import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContect";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  // Get current product
  const product = products.find((item) => item._id === id);

  // Set related products
  useEffect(() => {
    if (products.length > 0 && product) {
      const filtered = products.filter(
        (item) => item.category === product.category && item._id !== product._id
      );
      setRelatedProducts(filtered.slice(0, 5));
    }
  }, [products, product]);

  // Set thumbnail
  useEffect(() => {
    if (Array.isArray(product?.image) && product.image.length > 0) {
      setThumbnail(product.image[0]);
    } else {
      setThumbnail("/default-image.jpg"); // fallback image
    }
  }, [product]);

  // Handle loading and errors
  if (!products || products.length === 0) {
    return (
      <div className="mt-20 text-center text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mt-20 text-center text-red-500">
        Product not found.{" "}
        <Link to="/products" className="text-blue-500 underline">
          Go back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-12">
      {/* Breadcrumb */}
      <p>
        <Link to="/home">Home</Link> /<Link to="/products"> Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`}>
          {" "}
          {product.category}
        </Link>{" "}
        /<span className="text-indigo-500"> {product.name}</span>
      </p>

      {/* Product View */}
      <div className="flex flex-col md:flex-row gap-16 mt-4">
        <div className="flex gap-3">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {Array.isArray(product.image) &&
              product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
          </div>

          {/* Main Image */}
          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img src={thumbnail} alt="Selected product" />
          </div>
        </div>

        {/* Product Info */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                  className="md:w-4 w-3.5"
                />
              ))}
            <p className="text-base ml-2">(4)</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP: {currency}
              {product.price}
            </p>
            <p className="text-2xl font-medium">
              MRP: {currency}
              {Number(product.offerPrice).toFixed(2)}
            </p>

            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {Array.isArray(product.description) &&
              product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center">
          <p className="text-3xl font-medium uppercase">Related Products</p>
          <div className="w-24 h-0.5 bg-blue-300 rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
          {relatedProducts
            .filter((item) => item.inStock)
            .map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
        </div>

        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border border-gray-300 rounded text-white bg-blue-500 hover:bg-blue-600 transition"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
