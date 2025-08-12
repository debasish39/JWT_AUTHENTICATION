import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../../services/api"; // import axios instance

const ResetPassword = () => {
  const [formError, setFormError] = useState({});
  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = data.get("password");
    const password2 = data.get("password2");

    const errors = {};
    if (!password) errors.password = "Password is required";
    if (!password2) errors.password2 = "Confirm password is required";
    if (password && password2 && password !== password2) {
      errors.non_field_errors = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      toast.error(errors.non_field_errors || "Please fix the form errors");
      return;
    }

    try {
      // Call API
      const res = await api.post(`reset-password/${id}/${token}/`, {
        password,
        password2,
      });

      toast.success(res.data?.msg || "Password reset successful");
      e.target.reset();

      // Redirect to login
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      const backendError =
        err.response?.data?.errors?.non_field_errors?.[0] ||
        err.response?.data?.msg ||
        "Failed to reset password";
      toast.error(backendError);
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh] px-4">
      <div className="w-full max-w-6xl rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Reset Password
        </h1>
        <Toaster position="top-center" reverseOrder={false} />

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4"
          id="password-reset-form"
        >
          {/* Password */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            {formError.password && (
              <p className="text-sm text-red-600 mt-1">{formError.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            {formError.password2 && (
              <p className="text-sm text-red-600 mt-1">{formError.password2}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition cursor-pointer w-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
