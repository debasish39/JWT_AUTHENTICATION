import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { BiSolidUser } from "react-icons/bi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", name: "" });

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!accessToken || !refreshToken) {
      navigate("/login");
      return;
    }

    const fetchProfile = async (token) => {
      try {
        const res = await api.get("profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          // Try refreshing the token
          try {
            const refreshRes = await api.post("token/refresh/", {
              refresh: refreshToken,
            });
            const newAccessToken = refreshRes.data.access;
            localStorage.setItem("access_token", newAccessToken);

            // Retry the profile request with the new access token
            const retryRes = await api.get("profile/", {
              headers: { Authorization: `Bearer ${newAccessToken}` },
            });
            setUserData(retryRes.data);
          } catch (refreshErr) {
            console.error("Refresh token expired:", refreshErr);
            navigate("/login");
          }
        } else {
          console.error("Profile fetch error:", err);
        }
      }
    };

    fetchProfile(accessToken);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const handleChangePwd = () => {
    navigate("/changepassword");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl shadow-2xl rounded-2xl p-6 sm:p-10 transition-all duration-300">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-center text-purple-700 mb-6 sm:mb-10">
          Welcome to Your Dashboard
        </h1>

        <div className="space-y-4 sm:space-y-6 mb-6">
          <div className="bg-purple-200 border border-gray-300 p-4 sm:p-6 rounded-lg shadow-sm">
            <p className="text-base sm:text-lg text-gray-800 flex items-center">
               <BiSolidUser className="mr-1  text-purple-600 text-2xl font-bold" />
              <span className="font-semibold text-purple-600">:</span>&nbsp;
              {userData.id}
            </p>
          </div>
          <div className="bg-purple-200 border border-gray-300 p-4 sm:p-6 rounded-lg shadow-sm">
            <p className="text-base sm:text-lg text-gray-800 flex items-center">
               <IoIosContact className="mr-1  text-purple-600 text-2xl font-bold" />
              <span className="font-semibold text-purple-600">:</span>&nbsp;
              {userData.name}
            </p>
          </div>
        <div className="bg-purple-200 border border-gray-300 p-4 sm:p-6 rounded-lg shadow-sm">
  <p className="text-base sm:text-lg text-gray-800 flex items-center">
    <MdOutlineEmail className="mr-1 mt-1 text-purple-600 text-2xl font-bold" />
    <span className="font-semibold text-purple-600">:</span>&nbsp;
    {userData.email}
  </p>
</div>

        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleChangePwd}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base font-semibold py-2 px-4 rounded-md transition cursor-pointer"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base font-semibold py-2 px-4 rounded-md transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
