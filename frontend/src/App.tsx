import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Optimizer from "./pages/Optimizer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./pages/History";
import MapPage from "./pages/MapPage";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // 🔥 Auto update login state
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", checkLogin);

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-green-50">
        <Navbar />

        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* AUTH */}
          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />}
          />

          <Route
            path="/signup"
            element={!isLoggedIn ? <Signup /> : <Navigate to="/" replace />}
          />

          {/* PUBLIC */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* PROTECTED */}
          <Route
            path="/optimizer"
            element={
              <ProtectedRoute>
                <Optimizer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;