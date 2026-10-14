
import { useState } from "react";
import { supabase } from "../lib/supabase";

function Contact() {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setStatus("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const inquiry = {
      name: formData.get("name"),
      email: formData.get("email"),
      destination: formData.get("destination"),
      travel_date: formData.get("travel_date"),
      travellers: Number(formData.get("travellers")),
      message: formData.get("message"),
      status: "new",
    };

    try {
      // 1. Save the inquiry to Supabase.
      const { error: dbError } = await supabase
        .from("inquiries")
        .insert([inquiry]);

      if (dbError) {
        console.error("Supabase error:", dbError.message);
        setStatus(
          "We could not save your inquiry. Please try again."
        );
        return;
      }

      // 2. Send the inquiry through FormSubmit.
      try {
        const response = await fetch(
          "https://formsubmit.co/ajax/barrywhitetravelsagency4@outlook.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              _subject:
                "New Travel Inquiry - Barrywhite Travel Agency",
              _template: "table",
              _captcha: "true",
              _replyto: inquiry.email,
              name: inquiry.name,
              email: inquiry.email,
              destination: inquiry.destination,
              "travel date": inquiry.travel_date,
              "number of travellers": inquiry.travellers,
              message: inquiry.message,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("FormSubmit request failed.");
        }

        const result = await response.json();

        if (
          result.success !== "true" &&
          result.success !== true
        ) {
          throw new Error("FormSubmit did not confirm the request.");
        }

        setStatus(
          "Thank you! Your inquiry has been saved and your email notification has been requested successfully."
        );
      } catch (emailError) {
        console.error("FormSubmit error:", emailError);
        setStatus(
          "Your inquiry is saved in our dashboard, but the email could not be sent."
        );
      }

      form.reset();
    } catch (error) {
      console.error("Inquiry error:", error);
      setStatus(
        "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="contact-content">
        <p className="eyebrow">LET'S PLAN YOUR JOURNEY</p>

        <h2>Where would you like to go next?</h2>

        <p>
          Contact Barrywhite Travel Agency to discuss your
          destination, travel dates, and holiday plans.
        </p>

        {/* Office addresses */}
        <div className="office-addresses">
          <div className="office-card">
            <h3>Head Office</h3>
            <p>
              BLK 361, Jakande Estate, Oke Afa,
              Isolo, Lagos, Nigeria.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=BLK+361+Jakande+Estate+Oke+Afa+Isolo+Lagos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions →
            </a>
          </div>

          <div className="office-card">
            <h3>Branch Office</h3>
            <p>
              Omolere Street, Yaba, Ondo, Nigeria.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Omolere+Street+Yaba+Ondo+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions →
            </a>
          </div>
        </div>

        {/* Customer inquiry form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          />

          <label htmlFor="destination">Destination</label>
          <input
            id="destination"
            type="text"
            name="destination"
            placeholder="Where would you like to go?"
            required
          />

          <label htmlFor="travel-date">
            Preferred Travel Date
          </label>
          <input
            id="travel-date"
            type="date"
            name="travel_date"
            min={new Date().toISOString().split("T")[0]}
            required
          />

          <label htmlFor="travellers">
            Number of Travellers
          </label>
          <input
            id="travellers"
            type="number"
            name="travellers"
            min="1"
            step="1"
            placeholder="e.g. 2"
            required
          />

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Tell us more about your trip..."
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Send Your Inquiry"}
          </button>

          {status && (
            <p role="status" aria-live="polite">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
