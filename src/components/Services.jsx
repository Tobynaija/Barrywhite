
const services = [
  {
    icon: "✈️",
    title: "Flight Bookings",
    description:
      "Get assistance finding flight options for your destination and budget.",
  },
  {
    icon: "🏨",
    title: "Hotel Reservations",
    description:
      "Find suitable accommodation for business trips, holidays, and family travel.",
  },
  {
    icon: "🌍",
    title: "Holiday Packages",
    description:
      "Explore travel experiences and get help planning your next getaway.",
  },
  {
    icon: "🧳",
    title: "Travel Consultation",
    description:
      "Get guidance on travel planning, trip preparation, and itinerary options.",
  },
];

function Services() {
  return (
    <section className="section services" id="services">
      <div className="section-heading">
        <p className="eyebrow">OUR SERVICES</p>
        <h2>Everything you need for your journey.</h2>
        <p>Travel planning made simpler, from start to finish.</p>
      </div>

      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <span className="service-icon">{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
