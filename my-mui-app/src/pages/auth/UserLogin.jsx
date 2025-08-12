import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast, Toaster } from 'react-hot-toast';
import api from '../../services/api';

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/login/', {
        email: formData.email,
        password: formData.password,
      });
      console.log("Login Response:",res.data)

      //Remove existing tokens if any 
      
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.clear();
      // Save JWT tokens
      localStorage.setItem('access_token', res.data.token.access);
      localStorage.setItem('refresh_token', res.data.token.refresh);

      toast.success('Login successful!',{style:{fontSize:'12px'}});
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data?.errors );
      // toast.error(err.response?.data?.errors.detail,{style:{fontSize:'12px'}})
      const backendErrors = {};
      const errorData = err.response?.data?.errors.detail;

      if (errorData) {
        for (let key in errorData) {
          backendErrors[key] = errorData[key][0];
        }
        setErrors(backendErrors);
        console.log(backendErrors)
        
      } else {
        toast.error(err.response?.data?.detail || 'Invalid email or password',{style:{fontSize:'12px'}});
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        noValidate
        id="login-form"
        onSubmit={handleSubmit}
        className="max-w-full mx-auto mt-8 rounded-md"
      >
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-sm text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium text-sm text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end text-sm mb-4">
          <Link to="/sendpasswordemail" className="text-purple-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default UserLogin;
