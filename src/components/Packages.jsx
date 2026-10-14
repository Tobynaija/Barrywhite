
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPackages() {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading packages:", error.message);
        setError("Unable to load packages. Please try again later.");
      } else {
        setPackages(data || []);
      }

      setLoading(false);
    }

    fetchPackages();
  }, []);

  // Show your original packages if Supabase has no packages yet.
  const defaultPackages = [
    {
      id: "dubai",
      title: "Dubai Getaway",
      country: "Dubai, UAE",
      duration: "5 days / 4 nights",
      price: null,
      description: "Discover the excitement of Dubai.",
      image_url:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "paris",
      title: "Paris Escape",
      country: "Paris, France",
      duration: "6 days / 5 nights",
      price: null,
      description: "Experience the beauty and romance of Paris.",
      image_url:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "maldives",
      title: "Maldives Retreat",
      country: "Maldives",
      duration: "5 days / 4 nights",
      price: null,
      description: "Relax and enjoy a tropical island escape.",
      image_url:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const displayedPackages =
    packages.length > 0 ? packages : defaultPackages;

  return (
    <section className="section packages" id="packages">
      <div className="section-heading">
        <p className="eyebrow">HOLIDAY EXPERIENCES</p>
        <h2>Find your perfect getaway.</h2>
        <p>Tell us what you have in mind, and we'll help you plan it.</p>
      </div>

      {loading && <p>Loading travel packages...</p>}

      {error && (
        <p role="alert">
          {error} Showing sample packages instead.
        </p>
      )}

      <div className="package-grid">
        {displayedPackages.map((pkg) => {
          const name = pkg.title || pkg.name || "Travel Package";
          const location = pkg.country || pkg.location || "";
          const image = pkg.image_url || pkg.image;

          return (
            <article className="package-card" key={pkg.id}>
              {image && (
                <img src={image} alt={name} loading="lazy" />
              )}

              <div className="package-content">
                <p className="package-location">{location}</p>
                <h3>{name}</h3>

                {pkg.duration && (
                  <p className="package-duration">{pkg.duration}</p>
                )}

                {pkg.description && <p>{pkg.description}</p>}

                <div className="package-bottom">
                  <strong>
                    {pkg.price !== null &&
                    pkg.price !== undefined &&
                    pkg.price !== ""
                      ? `₦${Number(pkg.price).toLocaleString("en-NG")}`
                      : "Request a quote"}
                  </strong>

                  <a
                    href={`https://wa.me/2348034702800?text=${encodeURIComponent(
                      `Hello Barrywhite Travel Agency, I am interested in the ${name} package. Please provide more information.`
                    )}`}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Inquire
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Packages;
