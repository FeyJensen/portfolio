import { useEffect, useRef, useState } from 'react';
import { highlights, services, stats } from '../data/portfolioData';

const portraits = [
  '/assets/photos/fey1.png',
  '/assets/photos/fey2.png',
  '/assets/photos/fey3.png',
];

const summaryStars = [
  'blackStar.png',
  'darkStar.png',
  'PastelPurpleStar.png',
  'PeachStar.png',
  'PinkStar.png',
  'PurpleStar.png',
  'WhiteStar.png'
];

export default function HomePage() {
  const heroRef = useRef(null);
  const [activePortrait, setActivePortrait] = useState(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let intervalId = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && intervalId === null) {
        intervalId = window.setInterval(() => {
          setActivePortrait((current) => (current + 1) % portraits.length);
        }, 500);
      } else if (!entry.isIntersecting && intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    }, { threshold: 0.15 });

    observer.observe(hero);
    return () => {
      observer.disconnect();
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <main>
        <section className="hero" ref={heroRef}>
          <img className="hero-background" src="/assets/photos/PurpleCheckerboard.jpg" alt="" />
          <div className="hero-copy">
            <span className="eyebrow">Full-stack web designer & developer</span>
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

          <div className="hero-portrait-rotator" role="group" aria-label="Portraits of Fey">
            {portraits.map((portrait, index) => (
              <img
                key={portrait}
                className={`hero-portrait${activePortrait === index ? ' is-active' : ''}`}
                src={portrait}
                alt="Portrait of Fey"
                aria-hidden={activePortrait !== index}
              />
            ))}
          </div>
        </section>

        <section className="stats" aria-label="Business summary">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
          <div className="stats-star-row" aria-hidden="true">
            {summaryStars.map((star) => (
              <img key={star} src={`/assets/photos/${star}`} alt="" />
            ))}
          </div>
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
