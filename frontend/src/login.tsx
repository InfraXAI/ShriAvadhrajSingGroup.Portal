import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Man from "./assets/school.jpg";

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
      const res = await axios.post(`${API_URL}/register`, { name, email, password, role });
      toast.success(res.data.message, { position: "top-right" });
      setName(""); setEmail(""); setPassword("");
      setIsAccountCreated(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || "Something went wrong!", { position: "bottom-right" });
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
      const res = await axios.post(`${API_URL}/login`, { email, password, role });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      localStorage.setItem("isLoggedIn", "true");

      onLogin(); // notify App
      toast.success(res.data.message, { position: "top-right" });
      navigate("/"); // redirect to Home
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || "Invalid credentials!", { position: "bottom-right" });
      } else if (err instanceof Error) {
        toast.error(err.message, { position: "bottom-right" });
      } else {
        toast.error("Invalid credentials!", { position: "bottom-right" });
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-10 md:gap-20 min-h-screen bg-gray-50">
      <div className="w-full md:w-1/2 flex justify-center">
        <img src={Man} alt="School" className="max-w-xs md:max-w-md rounded-lg shadow-lg" />
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        {isAccountCreated ? (
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Log in</h1>
            <p className="text-sm text-gray-600 mt-2 font-semibold">Enter your details below</p>

            <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-6">
              <select value={role} onChange={(e) => setRole(e.target.value as "admin" | "user")} className="border border-gray-400 rounded-md p-2 text-gray-700">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-10 border-b border-gray-600 px-1" required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-10 border-b border-gray-600 px-1" required />

              <button type="submit" className="w-full h-12 bg-red-500 rounded-md text-white hover:bg-red-600 transition-all">Log In</button>
            </form>

            <div className="mt-4 flex justify-center gap-1">
              <span className="text-gray-600">Don't have an account?</span>
              <span className="text-red-500 cursor-pointer hover:underline" onClick={() => setIsAccountCreated(false)}>Sign up</span>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
            <p className="text-sm text-gray-600 mt-2 font-semibold">Enter your details below</p>

            <form onSubmit={handleCreateAccount} className="flex flex-col gap-5 mt-6">
              <select value={role} onChange={(e) => setRole(e.target.value as "admin" | "user")} className="border border-gray-400 rounded-md p-2 text-gray-700">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="h-10 border-b border-gray-600 px-1" required />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-10 border-b border-gray-600 px-1" required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-10 border-b border-gray-600 px-1" required />

              <button type="submit" className="h-12 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all">Create Account</button>
            </form>

            <div className="mt-4 flex justify-center gap-1">
              <span className="text-gray-600">Already have an account?</span>
              <span className="text-red-500 cursor-pointer hover:underline" onClick={() => setIsAccountCreated(true)}>Log in</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
