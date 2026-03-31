import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Optimizer from "./pages/Optimizer";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-green-50">
        <Navbar />
        {/* <div className="min-h-screen bg-green-50 pt-4"></div> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/optimizer" element={<Optimizer />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;