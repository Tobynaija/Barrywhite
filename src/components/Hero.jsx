
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow">WELCOME TO BARRyWHITE TRAVEL AGENCY</p>

        <h1>
          Explore the world.
          <br />
          <span>Travel with confidence.</span>
        </h1>

        <p className="hero-description">
          From flights and accommodation to unforgettable holidays,
          we help you plan your next journey with ease.
        </p>

        <div className="hero-buttons">
          <a href="#packages" className="btn btn-primary">
            Explore Packages
          </a>

          <a href="#contact" className="btn btn-outline">
            Plan Your Trip
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
