// src/pages/Contact.jsx
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../services/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({}); // per-field errors
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    console.log(form)
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email || !form.email.includes("@")) err.email = "Valid email required";
    if (!form.message.trim()) err.message = "Please write a message";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      toast.error("Please fix the form errors");
      return;
    }

    setLoading(true);
    try {
      // api.post will include Authorization header if interceptor exists
      const res = await api.post("contact/", form, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      });
      toast.success(res.data?.msg || "Message sent successfully");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact API error:", err.response?.data || err.message);

      // Try to extract backend errors (common DRF shape)
      const data = err.response?.data;
      if (data) {
        // If backend returns a dict of field errors
        if (typeof data === "object") {
          const newErrors = {};
          Object.keys(data).forEach(key => {
            // data[key] might be a list of messages or string
            newErrors[key] = Array.isArray(data[key]) ? data[key][0] : data[key];
          });
          setErrors(newErrors);
          const first = Object.values(newErrors)[0];
          if (first) toast.error(first);
        } else {
          toast.error(String(data));
        }
      } else {
        toast.error("Failed to send message. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 flex justify-center items-start mt-3 p-6 py-3">
      <Toaster position="top-center" />
      <div className="w-full max-w-6xl rounded-lg mr-3 ">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-3">Contact Us</h1>
        <p className="text-gray-700 mb-6">
          Questions about this project? Use the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your full name"
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Write your message here..."
            />
            {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          <p>📧 Email: <a className="text-purple-700" href="mailto:djproject963@gmail.com">djproject963@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
