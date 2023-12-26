import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./app.css";
import Cowsay from "./pages/Cowsay";
import ContactUs from "./pages/Contact";
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
          <Route path="/email-us" element={<ContactUs />} />
          <Route path="/request-fortune" element={<Request />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
