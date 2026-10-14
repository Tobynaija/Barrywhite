
const destinations = [
  {
    country: "United Arab Emirates",
    city: "Dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    description: "Luxury shopping, desert adventures and iconic skylines.",
  },
  {
    country: "France",
    city: "Paris",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    description: "Romantic streets, famous landmarks and French cuisine.",
  },
  {
    country: "Maldives",
    city: "Malé",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
    description: "Beautiful beaches, turquoise waters and island resorts.",
  },
  {
    country: "United Kingdom",
    city: "London",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
    description: "Historic attractions, shopping and exciting city life.",
  },
  {
    country: "United States",
    city: "New York",
  image:
  "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800",
    description: "Discover famous landmarks and vibrant city experiences.",
  },
  {
    country: "Canada",
    city: "Toronto",
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800",
    description: "Modern cities, beautiful lakes and outdoor adventures.",
  },
  {
    country: "Turkey",
    city: "Istanbul",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
    description: "Explore historic mosques, bazaars and cultural treasures.",
  },
  {
    country: "South Africa",
    city: "Cape Town",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800",
    description: "Mountain views, beaches and unforgettable wildlife trips.",
  },
  {
    country: "Singapore",
    city: "Singapore",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
    description: "Futuristic gardens, great food and modern attractions.",
  },
  {
    country: "Italy",
    city: "Rome",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
    description: "Ancient history, beautiful architecture and Italian food.",
  },
];

function Destinations() {
  return (
    <section className="section destinations" id="destinations">
      <div className="section-heading">
        <p className="eyebrow">EXPLORE THE WORLD</p>
        <h2>Popular Travel Destinations</h2>
        <p>
          Discover amazing places and let Barrywhite Travel Agency
          help plan your next adventure.
        </p>
      </div>

      <div className="destination-grid">
        {destinations.map((destination) => (
          <article className="destination-card" key={destination.country}>
            <img
              src={destination.image}
              alt={`${destination.city}, ${destination.country}`}
              loading="lazy"
            />

            <div className="destination-content">
              <p className="destination-country">
                {destination.country}
              </p>
              <h3>{destination.city}</h3>
              <p>{destination.description}</p>
              <a href="#contact" className="text-link">
                Plan your trip →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Destinations;
