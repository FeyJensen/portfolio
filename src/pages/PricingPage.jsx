import { pricingPackages } from '../data/pricing';

export default function PricingPage({ onContactNavigate }) {
  return (
    <main className="pricing-page">
      <header className="pricing-page-header">
        <span className="eyebrow">Small-business-friendly pricing</span>
        <h1>Website design that fits your next step.</h1>
        <p>
          Thoughtful design, practical SEO foundations, and clear project
          scopes—without the agency-sized price tag.
        </p>
      </header>

      <div className="pricing-grid">
        {pricingPackages.map((pricingPackage) => (
          <article className="pricing-card" key={pricingPackage.name}>
            <span className="pricing-card-label">{pricingPackage.name}</span>
            <p className="pricing-card-price">
              <span>Starting at</span>
              <strong>${pricingPackage.price.toLocaleString('en-US')}</strong>
            </p>
            <p className="pricing-card-description">{pricingPackage.description}</p>
            <ul>
              {pricingPackage.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a
              className="pricing-card-link"
              href="/#contact"
              onClick={onContactNavigate}
            >
              Ask about this package
            </a>
          </article>
        ))}
      </div>

      <p className="pricing-note">
        Prices are starting points; your final quote depends on the project
        scope. You provide final copy and imagery unless content creation is
        included in your proposal. Domain, hosting, platform subscriptions,
        paid image/font licenses, e-commerce, and complex integrations are
        separate. SEO covers foundational on-page setup, not ongoing SEO or
        ranking guarantees.
      </p>

      <section className="pricing-process" aria-labelledby="pricing-process-heading">
        <h2 id="pricing-process-heading">Not sure which package fits?</h2>
        <p>
          Tell me a little about your business and what you need your website to
          do. I&apos;ll recommend a scope and confirm the price with you before
          any work begins.
        </p>
        <a className="primary-btn" href="/#contact" onClick={onContactNavigate}>
          Let&apos;s talk about your project
        </a>
      </section>
    </main>
  );
}
