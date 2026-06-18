export default function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h2>Essentials, Curated.</h2>
        <p>Discover our minimalist collection of high-quality products designed to elevate your everyday lifestyle.</p>
        <button className="btn-primary hero-btn" onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}>
          Shop Now
        </button>
      </div>
    </div>
  );
}
