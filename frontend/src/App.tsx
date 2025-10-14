import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Home from "./home";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check login status on mount
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Home onLogout={() => setIsLoggedIn(false)} /> : <Navigate to="/login" replace />}
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
  );
};

export default App;
