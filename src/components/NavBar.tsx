import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold text-green-600">
          🚜 KrishiRoute
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-green-600">
            Home
          </Link>
          <Link to="/optimizer" className="hover:text-green-600">
            Optimizer
          </Link>
          <Link to="/about" className="hover:text-green-600">
            About
          </Link>
          <Link to="/contact" className="hover:text-green-600">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="mt-4 flex flex-col space-y-3 md:hidden">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/optimizer" onClick={() => setOpen(false)}>
            Optimizer
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}