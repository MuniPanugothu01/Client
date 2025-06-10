import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContect";
import ProductCard from "../components/ProductCard";
const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  // define state to filter the all products

  const [filteredProducts, setFilteredProducts] = useState([]);

  // UseEffect()
  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col">
      {/* Title All Products */}
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products!</p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 to-gray-300 rounded-full"></div>
      </div>

      {/* diaply the product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {filteredProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};
export default AllProducts;
