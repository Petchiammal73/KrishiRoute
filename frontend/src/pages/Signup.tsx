import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
      newErrors.email = "Enter valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password required";
    } else if (!isStrongPassword(password)) {
      newErrors.password =
        "Min 8 chars, include letter, number, special char";
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
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create Account 🌱
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full border p-3 mb-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full border p-3 mb-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-2 rounded mt-2"
        >
          {loading ? "Creating..." : "Signup"}
        </button>
      </div>
    </div>
  );
}