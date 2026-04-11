import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = { email, password };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      // 🔥 force app re-render
      window.dispatchEvent(new Event("storage"));

      alert("Signup successful 🎉 Welcome to KrishiRoute!");

      navigate("/", { replace: true });
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Create Account 🌱
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Start optimizing your market profits today
        </p>

        <input
          type="text"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded-xl focus:ring-2 focus:ring-green-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-6 rounded-xl focus:ring-2 focus:ring-green-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
        >
          {loading ? "Creating account..." : "Signup"}
        </button>

        <p className="text-center mt-5 text-sm">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 ml-2 cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}