
function About() {
  return (
    <section className="section about" id="about">
      <div className="about-image">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80"
          alt="Travel planning essentials"
        />
      </div>

      <div className="about-content">
        <p className="eyebrow">ABOUT OUR AGENCY</p>

        <h2>Making your travel dreams a reality.</h2>

        <p>
          Barrywhite Travel Agency helps travelers discover
          destinations, organize holidays, explore flight options,
          and plan memorable journeys.
        </p>

        <p>
          Whether you're planning a relaxing getaway, a family
          vacation, or an international adventure, we're here
          to help you get started.
        </p>

        <a href="#contact" className="text-link">
          Start planning your trip →
        </a>
      </div>
    </section>
  );
}

export default About;
