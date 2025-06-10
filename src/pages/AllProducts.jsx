import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContect";
const AllProducts = () => {
  const { produproducts,searchQuery } = useAppContext();
// define state to filter the all products

const [filteredProducts, setFilteredProducts] = useState([]);

// UseEffect()
useEffect(()=>{

},[])


  return (
    <div className="mt-16 flex flex-col">
        {/* Title All Products */}
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products!</p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 to-gray-300 rounded-full"></div>
      </div>

{/* diaply the product list */}
<div className="">

</div>
    </div>
  );
};
export default AllProducts;
