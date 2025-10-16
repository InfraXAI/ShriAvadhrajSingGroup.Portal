import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import Header from "./Header";
// import Footer from "./Footer"; // ← footer import (agar bana hai)

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Header />
      </header>

      <main className="flex-grow pt-[80px] pb-[60px]">
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
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
          />
        </Routes>
      </main>

      <footer className="bg-white shadow-inner w-full fixed bottom-0 left-0 z-40">
        {/* <Footer /> */}
      </footer>
    </div>
  );
};

export default App;
