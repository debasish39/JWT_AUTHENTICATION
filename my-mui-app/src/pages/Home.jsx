import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 flex justify-center mx-auto p-6  pr-9 sm:pr-0 ">
      <div className="w-full mx-auto max-w-6xl">
        {/* Header */}
        <h1 className="text-[18px] text-nowrap  sm:text-4xl font-extrabold text-purple-700 mb-3 mt-3 text-center sm:text-left">
          Secure Authentication with JWT
        </h1>
        <hr className="mb-6 border-gray-300" />

        {/* Content */}
        <p className="text-gray-700 leading-relaxed text-justify mb-6">
          This application demonstrates a complete authentication system built with{" "}
          <span className="font-semibold">React</span> for the frontend,
          <span className="font-semibold"> Django</span> &{" "}
          <span className="font-semibold">Django REST Framework</span> for the backend,
          and <span className="font-semibold">JWT (JSON Web Tokens)</span> for secure
          authentication and authorization. It includes features such as:
        </p>

        {/* Feature List */}
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>User Registration & Login</li>
          <li>Access & Refresh Tokens with JWT</li>
          <li>Protected Routes & Role-Based Access</li>
          <li>Change Password & Password Reset via Email</li>
          <li>Fully responsive UI with TailwindCSS</li>
        </ul>

        <p className="text-gray-700 leading-relaxed  mb-6">
          Whether you are building a new project or learning how to implement authentication,
          this template provides a solid starting point for secure, modern web applications.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <Link
            to="/login"
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg font-medium shadow-md transition text-center"
          >
            Login
          </Link>
     
        </div>
      </div>
    </div>
  );
};

export default Home;
