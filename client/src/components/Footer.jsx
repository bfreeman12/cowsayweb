import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <a className="link">About</a>
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
      <a className="link">Contact us</a>
    </div>
  );
};

export default Footer;
