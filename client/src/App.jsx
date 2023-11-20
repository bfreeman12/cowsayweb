import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./app.css";
import Cowsay from "./pages/Cowsay";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import About from "./pages/About";
import Request from "./pages/Request";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Cowsay />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-fortune" element={<Request />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
