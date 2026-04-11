import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (storedUser.email !== email || storedUser.password !== password) {
      alert("Invalid credentials");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");

      // 🔥 force app re-render
      window.dispatchEvent(new Event("storage"));

      alert("Login successful 🎉");

      navigate("/", { replace: true });
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Welcome Back 🌿
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to continue optimizing your routes
        </p>

        <input
          type="text"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-5">
          New here?
          <span
            onClick={() => navigate("/signup")}
            className="text-green-600 ml-2 cursor-pointer font-semibold"
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}