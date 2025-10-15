import React, { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import School from "./assets/school.jpg"; // Your college image

const API_URL = "http://localhost:5000/api/auth";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isAccountCreated, setIsAccountCreated] = useState<boolean>(false);
  const [role, setRole] = useState<"admin" | "user">("user");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleCreateAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        role,
      });
      toast.success(res.data.message, { position: "top-right" });
      setName("");
      setEmail("");
      setPassword("");
      setIsAccountCreated(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || "Something went wrong!", {
          position: "bottom-right",
        });
      } else if (err instanceof Error) {
        toast.error(err.message, { position: "bottom-right" });
      } else {
        toast.error("Something went wrong!", { position: "bottom-right" });
      }
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
        role,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      localStorage.setItem("isLoggedIn", "true");

      onLogin();
      toast.success(res.data.message, { position: "top-right" });
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || "Invalid credentials!", {
          position: "bottom-right",
        });
      } else if (err instanceof Error) {
        toast.error(err.message, { position: "bottom-right" });
      } else {
        toast.error("Invalid credentials!", { position: "bottom-right" });
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Background with school image and an overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={School}
          alt="College"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-200 opacity-60"></div>
      </div>
      
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl rounded-lg overflow-hidden flex flex-col md:flex-row shadow-lg">
        
        {/* Left Side: College Info */}
        <div className="w-full md:w-1/2 p-8 md:p-12 text-white flex flex-col justify-center text-center relative">
          <div className="absolute inset-0 bg-red-300 opacity-30"></div>
          <div className="relative z-20">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-md">
              SHRI AVADH RAJ SING
            </h1>
            <p className="text-xl font-semibold drop-shadow-md">
              College Management System
            </p>
          </div>
        </div>


        <div className="w-full md:w-1/2 p-8 md:p-12absolute inset-0 bg-white opacity-80 flex flex-col justify-center">
          <div className="p-6 ">
            
            <div className="flex justify-center mb-6 gap-2">
              <button
                onClick={() => setRole("user")}
                className={`py-2 px-6 rounded-full font-bold transition-colors ${
                  role === "user" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                User
              </button>
              <button
                onClick={() => setRole("admin")}
                className={`py-2 px-6 rounded-full font-bold transition-colors ${
                  role === "admin" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                Admin
              </button>
            </div>

            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-red-600">
                {isAccountCreated ? "LOG IN" : "CREATE ACCOUNT"}
              </h1>
            </div>

            {isAccountCreated ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="flex justify-end text-sm text-gray-600">
                  <span className="hover:underline cursor-pointer">
                    Forgot Password?
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full h-12 bg-red-600 text-white font-bold rounded-lg hover:bg-red-800 transition-colors"
                >
                  Log In
                </button>
                <div className="text-center mt-4 text-sm">
                  <span className="text-gray-600">Don't have an account?</span>
                  <span
                    className="text-red-600 cursor-pointer hover:underline font-bold ml-1"
                    onClick={() => setIsAccountCreated(false)}
                  >
                    Sign up
                  </span>
                </div>
              </form>
            ) : (
              <form onSubmit={handleCreateAccount} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full h-12 bg-red-600 text-white font-bold rounded-lg hover:bg-red-800 transition-colors"
                >
                  Create Account
                </button>
                <div className="text-center mt-4 text-sm">
                  <span className="text-gray-600">Already have an account?</span>
                  <span
                    className="text-red-600 cursor-pointer hover:underline font-bold ml-1"
                    onClick={() => setIsAccountCreated(true)}
                  >
                    Log in
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;