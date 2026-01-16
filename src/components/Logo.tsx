import './Logo.css';

/**
 * Logo component for the app header
 */
export function Logo() {
  return (
    <div className="logo">
      <img src="/favicon.svg" alt="AI Explore Logo" className="logo-icon" />
      <span className="logo-text">AI Explore</span>
    </div>
  );
}
