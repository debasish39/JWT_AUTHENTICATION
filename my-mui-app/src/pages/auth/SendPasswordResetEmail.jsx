import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import api from "../../services/api"; // Your axios instance with baseURL

const SendPasswordResetEmail = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await api.post("send-reset-password-email/", {
          email: formData.email,
        });

        // Backend response message
        toast.success(res.data?.msg || "Password reset link sent!");
        setFormData({ email: "" });
      } catch (err) {
        console.error(err.response?.data || err.message);
        toast.error(
          err.response?.data?.errors?.email?.[0] ||
            err.response?.data?.msg ||
            "Failed to send reset link"
        );
      }
    } else {
      toast.error("Please fix the errors before submitting.");
    }
  };

  return (
    <div className="flex justify-center items-center  px-4">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="w-full max-w-6xl p-8 rounded-lg ">
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1 pl-1">{errors.email}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition cursor-pointer"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendPasswordResetEmail;
