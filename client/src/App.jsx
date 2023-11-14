import Navbar from "./components/Navbar";
import "./app.css";
import Cowsay from "./components/Cowsay";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="content">
        <Cowsay />
      </div>
      <Footer />
    </>
  );
}

export default App;
