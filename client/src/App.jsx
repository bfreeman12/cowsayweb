import Navbar from "./components/Navbar";
import "./app.css";
import Cowsay from "./components/Cowsay";

function App() {
  return (
    <>
      <Navbar />
      <div className="content">
        <Cowsay />
      </div>
    </>
  );
}

export default App;
