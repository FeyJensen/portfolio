const services = [
  {
    title: 'Full-stack website builds',
    description:
      'From concept to launch, I craft custom websites that are visually compelling, technically reliable, and ready to grow with you.',
  },
  {
    title: 'Landing pages & funnels',
    description:
      'I design conversion-focused landing pages that guide visitors toward a clear next step, whether that is booking, buying, or contacting you.',
  },
  {
    title: 'UI/UX design systems',
    description:
      'I shape intuitive user experiences with clean interfaces, thoughtful flows, and design systems that keep your brand consistent across every screen.',
  },
  {
    title: 'Website optimization & maintenance',
    description:
      'I refine existing sites for speed, clarity, and performance, helping your brand stay modern, user-friendly, and easy to manage over time.',
  },
];

const stats = [
  { value: '2+', label: 'Years building digital experiences' },
  { value: '35+', label: 'Projects designed and developed' },
  { value: '100%', label: 'Custom, user-focused work from concept to launch' },
];

const highlights = [
  'Design-first thinking paired with clean, scalable front-end and back-end implementation',
  'Responsive experiences built to perform beautifully across devices and audiences',
  'Strategy, branding, and development working together to turn visitors into customers',
];

export default function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">F</div>
          <div>
            <p className="brand-name">Fey Jensen</p>
          </div>
        </div>

        <nav className="nav">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

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
                <div className="icon-circle">✦</div>
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

        <a href="mailto:feyviolin@gmail.com" className="primary-btn">
          feyviolin@gmail.com
        </a>
      </footer>
    </div>
  );
}
