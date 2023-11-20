import { Link, useLocation } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  const location = useLocation();

  return (
    <footer className="footer">
      {location.pathname === "/about" ||
      location.pathname === "/contact" ||
      location.pathname === "/request-fortune" ? (
        <Link draggable="false" to="/" className="link">
          Home
        </Link>
      ) : (
        <>
          <Link draggable="false" to="/about" className="link">
            About
          </Link>
          <a
            href="https://ko-fi.com/I2I6R4BW4"
            className="kofi-image"
            target="_blank"
            draggable="false"
          >
            <img
              style={({ border: "0px" }, { height: "35px" })}
              src="https://storage.ko-fi.com/cdn/kofi5.png?v=3"
              alt="Support the development on Ko-fi"
              draggable="false"
            />
          </a>
          <Link draggable="false" to="/contact" className="link">
            Contact Us
          </Link>
        </>
      )}
    </footer>
  );
}

export default Footer;
