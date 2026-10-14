
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("packages");
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [packageForm, setPackageForm] = useState({
    title: "",
    country: "",
    price: "",
    duration: "",
    description: "",
    image_url: "",
  });

  const [destinationForm, setDestinationForm] = useState({
    name: "",
    country: "",
    description: "",
    image_url: "",
  });

  async function loadData() {
    setLoading(true);
    setMessage("");

    const [p, d, i] = await Promise.all([
      supabase
        .from("packages")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("destinations")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    const errors = [p.error, d.error, i.error].filter(Boolean);

    if (errors.length) {
      setMessage(errors.map((e) => e.message).join(" | "));
    } else {
      setPackages(p.data || []);
      setDestinations(d.data || []);
      setInquiries(i.data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addPackage(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const priceValue = packageForm.price.trim();

    const { error } = await supabase.from("packages").insert({
      ...packageForm,
      price:
        priceValue === ""
          ? null
          : Number(priceValue),
    });

    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setPackageForm({
      title: "",
      country: "",
      price: "",
      duration: "",
      description: "",
      image_url: "",
    });

    setMessage("Travel package added successfully.");
    await loadData();
  }

  async function deletePackage(id) {
    if (!window.confirm("Delete this travel package?")) return;

    const { error } = await supabase
      .from("packages")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Package deleted.");
    await loadData();
  }

  async function addDestination(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("destinations")
      .insert(destinationForm);

    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setDestinationForm({
      name: "",
      country: "",
      description: "",
      image_url: "",
    });

    setMessage("Destination added successfully.");
    await loadData();
  }

  async function deleteDestination(id) {
    if (!window.confirm("Delete this destination?")) return;

    const { error } = await supabase
      .from("destinations")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Destination deleted.");
    await loadData();
  }

  async function updateInquiryStatus(id, status) {
    const { error } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Inquiry status updated.");
    await loadData();
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setMessage(error.message);
      return;
    }

    navigate("/admin/login");
  }

  function displayPrice(price) {
    if (price === null || price === undefined || price === "") {
      return "Request a quote";
    }

    return `₦${Number(price).toLocaleString("en-NG")}`;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>Barrywhite Travel Agency</h1>
          <p>Administration Dashboard</p>
        </div>
        <button onClick={logout}>Log Out</button>
      </header>

      <div className="admin-stats">
        <article>
          <h3>Packages</h3>
          <strong>{packages.length}</strong>
        </article>

        <article>
          <h3>Destinations</h3>
          <strong>{destinations.length}</strong>
        </article>

        <article>
          <h3>Inquiries</h3>
          <strong>{inquiries.length}</strong>
        </article>

        <article>
          <h3>New Inquiries</h3>
          <strong>
            {inquiries.filter((i) => i.status === "new").length}
          </strong>
        </article>
      </div>

      <nav className="admin-tabs">
        <button onClick={() => setTab("packages")}>
          Packages
        </button>
        <button onClick={() => setTab("destinations")}>
          Destinations
        </button>
        <button onClick={() => setTab("inquiries")}>
          Customer Inquiries
        </button>
      </nav>

      {message && (
        <p className="admin-message" role="status">
          {message}
        </p>
      )}

      {loading ? (
        <p>Loading dashboard data...</p>
      ) : (
        <>
          {tab === "packages" && (
            <section className="admin-panel">
              <h2>Add Travel Package</h2>

              <form className="admin-form" onSubmit={addPackage}>
                <input
                  placeholder="Package title"
                  value={packageForm.title}
                  onChange={(e) =>
                    setPackageForm({
                      ...packageForm,
                      title: e.target.value,
                    })
                  }
                  required
                />

                <input
                  placeholder="Country"
                  value={packageForm.country}
                  onChange={(e) =>
                    setPackageForm({
                      ...packageForm,
                      country: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Price (NGN) — optional"
                  value={packageForm.price}
                  onChange={(e) =>
                    setPackageForm({
                      ...packageForm,
                      price: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Duration (e.g. 7 days)"
                  value={packageForm.duration}
                  onChange={(e) =>
                    setPackageForm({
                      ...packageForm,
                      duration: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Image URL (optional)"
                  type="url"
                  value={packageForm.image_url}
                  onChange={(e) =>
                    setPackageForm({
                      ...packageForm,
                      image_url: e.target.value,
                    })
                  }
                />

                <textarea
                  placeholder="Package description"
                  value={packageForm.description}
                  onChange={(e) =>
                    setPackageForm({
                      ...packageForm,
                      description: e.target.value,
                    })
                  }
                  rows="4"
                />

                <button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Add Package"}
                </button>
              </form>

              <h2>Existing Packages ({packages.length})</h2>

              {packages.length === 0 && (
                <p>No packages have been added yet.</p>
              )}

              <div className="admin-list">
                {packages.map((p) => (
                  <article key={p.id}>
                    <div>
                      <h3>{p.title}</h3>
                      <p>
                        {p.country} · {displayPrice(p.price)}
                      </p>
                      <p>{p.duration}</p>
                    </div>

                    <button onClick={() => deletePackage(p.id)}>
                      Delete
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}

          {tab === "destinations" && (
            <section className="admin-panel">
              <h2>Add Destination</h2>

              <form
                className="admin-form"
                onSubmit={addDestination}
              >
                <input
                  placeholder="Destination name (e.g. Paris)"
                  value={destinationForm.name}
                  onChange={(e) =>
                    setDestinationForm({
                      ...destinationForm,
                      name: e.target.value,
                    })
                  }
                  required
                />

                <input
                  placeholder="Country (e.g. France)"
                  value={destinationForm.country}
                  onChange={(e) =>
                    setDestinationForm({
                      ...destinationForm,
                      country: e.target.value,
                    })
                  }
                  required
                />

                <input
                  placeholder="Image URL (optional)"
                  type="url"
                  value={destinationForm.image_url}
                  onChange={(e) =>
                    setDestinationForm({
                      ...destinationForm,
                      image_url: e.target.value,
                    })
                  }
                />

                <textarea
                  placeholder="Destination description"
                  rows="4"
                  value={destinationForm.description}
                  onChange={(e) =>
                    setDestinationForm({
                      ...destinationForm,
                      description: e.target.value,
                    })
                  }
                />

                <button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Add Destination"}
                </button>
              </form>

              <h2>Existing Destinations ({destinations.length})</h2>

              {destinations.length === 0 && (
                <p>No destinations have been added yet.</p>
              )}

              <div className="admin-list">
                {destinations.map((d) => (
                  <article key={d.id}>
                    <div>
                      <h3>{d.name}</h3>
                      <p>{d.country}</p>
                    </div>

                    <button
                      onClick={() => deleteDestination(d.id)}
                    >
                      Delete
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}

          {tab === "inquiries" && (
            <section className="admin-panel">
              <h2>Customer Inquiries ({inquiries.length})</h2>

              {inquiries.length === 0 && (
                <p>
                  No inquiries yet. Customer form submissions will
                  appear here after the contact form is connected
                  to Supabase.
                </p>
              )}

              <div className="admin-list">
                {inquiries.map((i) => (
                  <article key={i.id} className="inquiry-card">
                    <div>
                      <h3>{i.name}</h3>
                      <p>Email: {i.email}</p>
                      <p>
                        Destination: {i.destination || "Not specified"}
                      </p>
                      <p>
                        Travel date: {i.travel_date || "Not specified"}
                      </p>
                      <p>Travellers: {i.travellers || 1}</p>
                      <p>Message: {i.message || "No message"}</p>
                      <p>
                        Received:{" "}
                        {new Date(i.created_at).toLocaleString()}
                      </p>
                    </div>

                    <label>
                      Status
                      <select
                        value={i.status || "new"}
                        onChange={(e) =>
                          updateInquiryStatus(i.id, e.target.value)
                        }
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                    </label>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <button
        className="admin-public-link"
        onClick={() => navigate("/")}
      >
        View Public Website
      </button>
    </div>
  );
}
