import React from "react";
import "../styles/About.css"; 

function About() {
  return (
    <div className="about-container">
      <h1>About TravelSphereAI</h1>
      <p className="intro">
        Welcome to <strong>TravelSphereAI</strong> 🌍 — your AI-powered travel
        companion. We make trip planning smarter, faster, and stress-free by
        bringing intelligent recommendations and simple tools right to your
        fingertips.
      </p>

      <section className="about-section">
        <h2>✨ Our Mission</h2>
        <p>
          Travel should be exciting, not overwhelming. Our mission is to help
          travelers explore new destinations, create personalized itineraries,
          and manage their journeys with ease. Whether you’re planning a weekend
          getaway or a month-long adventure, TravelMateAI is here to guide you.
        </p>
      </section>

      <section className="about-section">
        <h2>⚙️ What We Offer</h2>
        <ul>
          <li>
            <strong>Personalized Recommendations:</strong> AI-driven suggestions
            for destinations, stays, and activities.
          </li>
          <li>
            <strong>Easy Planning:</strong> Save your favorite spots and build
            itineraries in <em>My Lists</em>.
          </li>
          <li>
            <strong>Secure Login:</strong> Your account and travel data stay
            safe with modern authentication.
          </li>
          <li>
            <strong>Future Integrations:</strong> Real-time flights, hotels, and
            maps to make your planning seamless.
          </li>
        </ul>
      </section>

      <section className="about-section">
        <h2>🚀 Looking Ahead</h2>
        <p>
          We’re constantly working to bring you new features like an
          AI-powered chatbot, multilingual support, and direct booking options.
          Our vision is to make TravelMateAI the go-to assistant for every
          traveler around the world.
        </p>
      </section>

      <p className="closing">
        Start your journey today with <strong>TravelMateAI</strong> — explore
        more, stress less, and travel smarter.
      </p>
    </div>
  );
}

export default About;
