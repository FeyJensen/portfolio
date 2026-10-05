import { useEffect, useRef, useState } from 'react';
import { stats } from '../data/portfolioData';
import polaroidGirl from '/assets/photos/PolaroidPhoneGirl.png';
import purplePurse from '/assets/photos/purplepurse.jpg';

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

const serviceStars = ['PastelPurpleStar.png', 'PeachStar.png', 'PinkStar.png', 'PurpleStar.png'];

function StarRow({ repetitions = 3 }) {
  const stars = Array.from({ length: repetitions }, () => summaryStars).flat();

  return (
    <div
      className="stats-star-row"
      aria-hidden="true"
      style={{ '--star-count': stars.length }}
    >
      {stars.map((star, index) => (
        <img key={`${star}-${index}`} src={`/assets/photos/${star}`} alt="" />
      ))}
    </div>
  );
}

function ServicesStarCluster({ position = 'bottom-left' }) {
  return (
    <div className={`services-star-cluster services-star-cluster--${position}`} aria-hidden="true">
      {serviceStars.map((star) => (
        <img key={star} src={`/assets/photos/${star}`} alt="" />
      ))}
    </div>
  );
}

function HeroStarCluster({ position }) {
  return (
    <div className={`hero-star-cluster hero-star-cluster--${position}`} aria-hidden="true">
      {serviceStars.map((star) => (
        <img key={star} src={`/assets/photos/${star}`} alt="" />
      ))}
    </div>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const [activePortrait, setActivePortrait] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);

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

  useEffect(() => {
    const statsSection = statsRef.current;

    if (!statsSection) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setStatsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStatsVisible(true);
        observer.unobserve(statsSection);
      }
    }, { threshold: 0.15 });

    observer.observe(statsSection);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main>
        <section className="hero" ref={heroRef}>
          <img className="hero-background" src="/assets/photos/purpleCheckerboard.png" alt="" />
          <div className="hero-copy">
            <span className="eyebrow">Full-stack web designer & developer</span>
            <h1>Websites with personality. Built to perform.</h1>
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

          <div className="hero-portrait-stage">
            <HeroStarCluster position="upper-left" />
            <HeroStarCluster position="upper-right" />
            <HeroStarCluster position="lower-left" />
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
          </div>
        </section>

        <section
          className={`stats${statsVisible ? ' is-visible' : ''}`}
          aria-label="Business summary"
          ref={statsRef}
        >
          <StarRow />
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
          <StarRow />
        </section>

        <section id="services" className="services section-block">
          <div className="section-heading">
            <span className="eyebrow">What I do</span>
            <h2>Full-stack solutions built to elevate your brand.</h2>
          </div>

          <div className="services-grid">
            <article className="service-card">
              <ul className="service-list">
                <li>Full-stack website builds</li>
                <li>Landing pages &amp; funnels</li>
                <li>UI/UX design systems</li>
                <li>Website optimization &amp; maintenance</li>
              </ul>
            </article>
            <div className="services-photo-wrap">
              <ServicesStarCluster />
              <ServicesStarCluster position="top-right" />
              <img
                className="services-photo"
                src={polaroidGirl}
                alt="Polaroid of a girl holding a phone"
                width="400"
              />
            </div>

          </div>
        </section>

        <section id="about" className="about section-block">
          <div className="about-grid">
            <div className="about-copy-column">
              <div className="section-heading left">
                <span className="eyebrow">Why choose me</span>
              </div>
              <div className="about-copy">       
                <h2>Web design with clarity and conversion in mind.</h2>
                <p>
                  I help turn ideas into digital experiences that feel customized,
                  work smoothly, and support your business. My process connects personal design,
                  user experience, and functional development so your website does more than
                  look good, it performs.
                </p>
              </div>
            </div>

            <div className="about-photo-frame">
              <img
                src={purplePurse}
                alt="A purple purse, purple iPhone and purple sunglasses"
              />
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div className="footer-inner">
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
        </div>
      </footer>
    </>
  );
}
