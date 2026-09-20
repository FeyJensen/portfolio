import { highlights, services, stats } from '../data/portfolioData';

export default function HomePage() {
  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Full-Stack Web Designer & Developer</span>
            <h1>Designing and building websites that move businesses forward.</h1>
            <p>
              I create modern, high-converting digital experiences that blend strong
              visual design with clean, functional development. From strategy to launch,
              I help brands look polished and perform with purpose.
            </p>

            <div className="cta-row">
              <a href="#contact" className="primary-btn">Book a consultation</a>
              <a href="#services" className="secondary-btn">View services</a>
            </div>

            <div className="mini-trust">
              <span>Design • Development • Growth</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="photo-frame">
              <img src="/assets/photos/headshot.png" alt="Fey Jensen headshot" />
              <div className="floating-badge">
                <span>Available for projects</span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats" aria-label="Business summary">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section id="services" className="services section-block">
          <div className="section-heading">
            <span className="eyebrow">What I do</span>
            <h2>Full-stack solutions built to elevate your brand.</h2>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <div className="icon-circle">✎</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about section-block">
          <div className="section-heading left">
            <span className="eyebrow">Why choose me</span>
            <h2>Web design with clarity and conversion in mind.</h2>
          </div>

          <div className="about-grid">
            <div className="about-copy">
              <p>
                I help turn ideas into digital experiences that feel premium,
                work smoothly, and support real growth. My process connects design,
                user experience, and functional development so your website does more than
                look good — it performs.
              </p>
              <ul>
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="about-panel">
              <p className="panel-label">Working style</p>
              <h3>Strategy, design, and development in one process.</h3>
              <p>
                Every project is shaped around your audience, your message, and your goals,
                creating a site that is both beautiful and built to convert.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div>
          <span className="eyebrow">Let's build something great</span>
          <h2>Ready for a website that looks sharp and works hard?</h2>
        </div>

        <div className="footer-actions">
          <a href="mailto:feyviolin@gmail.com" className="primary-btn">
            feyviolin@gmail.com
          </a>
          <a href="https://github.com/FeyJensen" target="_blank" rel="noreferrer" className="secondary-btn">
            GitHub
          </a>
        </div>
      </footer>
    </>
  );
}
