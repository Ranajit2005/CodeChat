import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      let result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      },{withCredentials: true});

      setIsLoading(false);

      if (result.data.success) {
        toast(result?.data?.message, {
          icon: "✅",
          style: {
            background: "#4ade80",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast(error?.response?.data?.message, {
        icon: "❌",
        style: {
          background: "#f87171",
          color: "#fff",
        },
      });

      setIsLoading(false);

      // now redirect to home page

    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-indigo-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Form */}
        <div className="p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Log In Your Account
              </h2>
            </div>

            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition duration-200"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="w-5 h-5" />
                    ) : (
                      <AiOutlineEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? "loading..." : "Log In"}
              </button>
            </div>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                If you have no account, then go for{" "}
                <a
                  href="/signup"
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition duration-200">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image (Hidden on mobile) */}
        <div className="hidden lg:block relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700">
            <div className="flex items-center justify-center h-full p-12">
              <div className="text-center text-white">
                <div className="mb-8">
                  <div className="w-32 h-32 mx-auto  bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <img
                      src="/chaticon.png"
                      alt="Chat Icon"
                      className="w-32 h-32"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Welcome to{" "}
                  <span className="text-3xl  text-yellow-500">ChatCode</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
