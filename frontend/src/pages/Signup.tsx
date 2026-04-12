import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password: string) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(password);

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!isStrongPassword(password)) {
      newErrors.password =
        "Password must be 8+ chars, with a letter, number, and special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await API.post("/auth/signup", { email, password });

      alert("Signup successful 🎉");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
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
          type="email"
          placeholder="Email"
          value={email}
          className={`w-full border p-3 mb-1 rounded-xl focus:ring-2 focus:ring-green-400 ${
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

        <input
          type="password"
          placeholder="Password"
          value={password}
          className={`w-full border p-3 mb-1 rounded-xl focus:ring-2 focus:ring-green-400 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password}</p>
        )}

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