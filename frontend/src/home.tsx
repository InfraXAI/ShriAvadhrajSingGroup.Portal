import React from "react";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    onLogout(); // notify App
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome Home!</h1>
      <button onClick={handleLogout} className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all">
        Logout
      </button>
    </div>
  );
};

export default Home;
