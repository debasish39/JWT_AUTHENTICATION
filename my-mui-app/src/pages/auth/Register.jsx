import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    tc: false,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear old errors

    try {
      const response = await api.post("/register/", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
        tc: formData.tc,
      });
      console.log(response)
      toast.success(`Registration Successful!\nWelcome, ${formData.name}!`);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        password2: "",
        tc: false,
      });

      // Redirect to login page
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (error.response?.data) {
        const backendErrors = {};
        for (const key in error.response.data.errors) {
          backendErrors[key] = error.response.data.errors[key][0]; 
          console.log(backendErrors)
        }
        setErrors(backendErrors);
        console.log(error.response.data.errors)
        // Show first error in toast
        const firstError = Object.values(backendErrors)[0];
        console.log(backendErrors)
        console.log(firstError)
        if (firstError) toast.error(firstError);
   
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
 
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        noValidate
        id="Register-form"
        className="max-w-6xl mx-auto rounded-md"
      >
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Register
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.password2 && <p className="text-red-600 text-sm">{errors.password2}</p>}
        </div>

        {/* Terms */}
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="tc"
            name="tc"
            checked={formData.tc}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="tc" className="text-sm text-gray-700">
            I agree to the terms and conditions
          </label>
        </div>
        {errors.tc && <p className="text-red-600 text-sm mb-2">{errors.tc}</p>}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-purple-700 transition cursor-pointer"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
