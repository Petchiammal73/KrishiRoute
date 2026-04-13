import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.email) {
      setUsername(user.email.split("@")[0]);
    } else {
      setUsername("");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    setOpen(false);
    navigate("/login", { replace: true });
  };

  const navLink = (path: string) =>
    `relative ${
      location.pathname === path
        ? "text-green-600 font-semibold"
        : "text-gray-700 hover:text-green-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-green-600">
          🚜 KrishiRoute
        </Link>

        {/* CENTER NAV */}
        {isLoggedIn && (
          <div className="hidden md:flex gap-8 text-sm">
            <Link to="/optimizer" className={navLink("/optimizer")}>
              Optimizer
            </Link>

            <Link to="/dashboard" className={navLink("/dashboard")}>
              Dashboard
            </Link>
          </div>
        )}

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* PROFILE */}
          {isLoggedIn && (
            <button
              onClick={() => navigate("/profile")}
              className="w-9 h-9 bg-green-600 text-white rounded-full flex items-center justify-center"
            >
              {username?.[0]?.toUpperCase() || "U"}
            </button>
          )}

          {/* MENU */}
          <button onClick={() => setOpen(!open)}>☰</button>
        </div>
      </div>

      {/* DROPDOWN */}
      <div
        className={`absolute right-6 top-16 w-64 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-5 space-y-4 border transform transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-black"
          >
            ✕
          </button>
        </div>

        <Link to="/" onClick={() => setOpen(false)} className="block hover:text-green-600">
          Home
        </Link>

        <Link to="/about" onClick={() => setOpen(false)} className="block hover:text-green-600">
          About
        </Link>

        <Link to="/contact" onClick={() => setOpen(false)} className="block hover:text-green-600">
          Contact
        </Link>

        {isLoggedIn ? (
          <>
            <hr />

            <Link to="/profile" onClick={() => setOpen(false)} className="block hover:text-green-600">
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="w-full text-left text-red-500 hover:opacity-80"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <hr />

            <Link to="/login" onClick={() => setOpen(false)} className="block hover:text-green-600">
              Login
            </Link>

            <Link to="/signup" onClick={() => setOpen(false)} className="block hover:text-green-600">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}