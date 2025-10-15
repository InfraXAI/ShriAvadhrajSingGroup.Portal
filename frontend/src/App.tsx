import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import LiquidEther from "./LiquidEther";
// import Prism from './Prism';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={0}
          autoRampDuration={0.6}
        />
      </div>

      <div className="relative z-10 w-full h-full">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Home onLogout={() => setIsLoggedIn(false)} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
