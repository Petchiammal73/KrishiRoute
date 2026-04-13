import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

// ✅ Email validation
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const navigate = useNavigate();

  // ✅ Validation
  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Enter valid email (example@gmail.com)";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Minimum 8 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ API LOGIN
  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // ✅ Store auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("isLoggedIn", "true");

      alert("Login successful 🎉");

      navigate("/", { replace: true });
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          className={`w-full border p-3 mb-1 rounded-xl ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-3">{errors.email}</p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          className={`w-full border p-3 mb-1 rounded-xl ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-3">
            {errors.password}
          </p>
        )}

        {/* BUTTON */}
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