import { apiCapabilities } from '../data/portfolioData';

export default function ApiPage() {
  return (
    <div className="api-page">
      <div className="api-shell">
        <header className="api-header">
          <span className="eyebrow">API</span>
          <h1>Building reliable interfaces for modern products.</h1>
          <p>
            I design and build APIs that connect data, workflows, and user experiences in ways that are secure,
            maintainable, and easy for teams to extend over time.
          </p>
        </header>

        <section className="api-grid">
          <div className="api-card">
            <h2>What I build</h2>
            <ul className="api-list">
              {apiCapabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </div>

          <div className="api-card accent-card">
            <h2>Typical stack</h2>
            <div className="tag-row">
              <span>Node.js</span>
              <span>Express</span>
              <span>REST</span>
              <span>Auth</span>
              <span>PostgreSQL</span>
              <span>AWS</span>
            </div>
            <p>
              I focus on clean routing, secure integrations, logical validation, and scalable structures that keep
              product teams productive as the application grows.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
