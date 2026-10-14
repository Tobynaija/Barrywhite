
function Footer() {
  return (
    <footer className="footer">
      <a href="#home" className="logo">
        Barrywhite<span> Travel Agency.</span>
      </a>

      <p>Your journey, our priority.</p>

      <p>
        © {new Date().getFullYear()} Barrywhite Travel Agency.
        All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
