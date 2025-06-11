import React, { useState } from "react";
import { assets } from "../assets/assets";

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
    console.log(address);
    
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping
        <span className="font-semibold text-primary text-blue-500">
          {" "}
          Address
        </span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form className="space-y-4 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="Enter First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Enter Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Enter email Address"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Enter street Name"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="Enter city Name"
              />

              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="Enter state Name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipcode"
                type="number"
                placeholder="Enter zipcode"
              />

              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Enter country Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="number"
              placeholder="Enter phone number"
            />

            <button className="w-full mt-6 bg-blue-400 text-white py-3 rounded-[50px] hover:bg-blue-500 transition cursor-pointer uppercase">
              Save Address
            </button>
          </form>
        </div>
        <img
          className="md:mr-16 mb-16 md:mt-0"
          src={assets.add_address_iamge}
          alt="add address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
