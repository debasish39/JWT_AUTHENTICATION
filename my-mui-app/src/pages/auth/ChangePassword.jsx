// src/pages/ChangePassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast, { Toaster } from "react-hot-toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: ""});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form,[e.target.name]:e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("changepassword/", form);
      alert(res.data.msg || "Password changed successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(
        err.response?.data?.errors?.[0] ||
        err.response?.data?.errors.password?.[0] ||
        err.response?.data?.errors.password2?.[0] ||
        "Error changing password"
      );
      toast.error(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md  shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Change Password
        </h2>
        <Toaster position="top-center" reverseOrder={false} />

       

        <form onSubmit={handleSubmit} className="space-y-5"noValidate>
          {/* New Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-purple-600 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
              {error && (
          <p className="text-red-500 text-sm ">{error}</p>
        )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={form.password2}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-purple-600 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
              {error && (
          <p className="text-red-500  text-sm ">{error}</p>
        )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-semibold transition duration-200 ease-in-out shadow-md hover:shadow-lg cursor-pointer"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
