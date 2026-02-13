function About() {
  return (
    <div className="page about-page">

      {/* Top Section */}
      <div className="about-intro">
        <h1>About Journey Log</h1>
        <p>
          We help travelers capture meaningful moments and turn experiences
          into timeless stories.
        </p>
      </div>

      {/* Center Section */}
      <div className="about-middle">
        <div className="about-split">

          <div className="about-text">
            <h2>
              We are here to help you keep your journeys{" "}
              <span className="highlight">alive</span>.
            </h2>

            <p>
              Journey Log isn’t just about saving places - it’s about preserving
              memories. Whether it’s a spontaneous weekend getaway, a world-famous
              landmark, or a hidden cafe, every story deserves a place.
            </p>

            <p>
              We believe travel experiences shape who you are. With Journey Log,
              your memories stay organized, visual, and meaningful - long after
              the trip ends.
            </p>
          </div>

          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1600&auto=format&fit=crop"
              alt="Travel adventure"
            />
          </div>

        </div>
      </div>

    </div>
  );
}

export default About;
