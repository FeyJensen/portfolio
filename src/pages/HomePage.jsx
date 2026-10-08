import { useEffect, useRef, useState } from 'react';
import { stats } from '../data/portfolioData';
import polaroidGirl from '/assets/photos/PolaroidPhoneGirl.png';
import purplePurse from '/assets/photos/purplepurse.jpg';

const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

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

const inspirationPhotos = [
  {
    src: '/assets/photos/CupcakeGirl.png',
    alt: 'Blonde girl in a colorful Y2K outfit',
    caption: 'Playful style',
  },
  {
    src: '/assets/photos/kawaiiGirl.jpg',
    alt: 'Cozy laptop setup with a cat and purple flowers',
    caption: 'Cozy creative breaks',
  },
  {
    src: '/assets/photos/purpleCat.png',
    alt: 'Woman enjoying a cupcake',
    caption: 'Sweet moments',
  },
  {
    src: '/assets/photos/ComputerCoffee.jpg',
    alt: 'White cat wearing purple heart-shaped sunglasses',
    caption: 'Purple daydreams',
  },
];

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

export default function HomePage() {
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [contactStatus, setContactStatus] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  async function handleContactSubmit(event) {
    event.preventDefault();
    setIsSubmittingContact(true);
    setContactStatus('Sending your message…');

    try {
      if (!web3FormsAccessKey) {
        throw new Error('Contact form is not configured yet. Please try again later.');
      }

      const form = event.currentTarget;
      const formData = new FormData(form);
      formData.append('access_key', web3FormsAccessKey);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (!response.ok || result?.success !== true) {
        throw new Error(
          typeof result?.message === 'string' && result.message
            ? result.message
            : 'Unable to send your message. Please try again.',
        );
      }

      form.reset();
      setContactStatus('Thanks! Your message has been sent.');
    } catch (error) {
      setContactStatus(
        error instanceof Error && error.message
          ? error.message
          : 'Unable to send your message. Please try again.',
      );
    } finally {
      setIsSubmittingContact(false);
    }
  }

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
        <section className="hero">
          <div className="hero-card">
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
              <img
                className="hero-portrait"
                src="/assets/photos/PortraitWavyBorder.png"
                alt="Portrait of Fey in a wavy purple frame"
              />
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

        <section className="inspiration section-block" aria-labelledby="inspiration-heading">
          <div className="section-heading inspiration-heading">
            <span className="eyebrow">A little inspiration</span>
            <h2 id="inspiration-heading">Little things that spark big ideas.</h2>
            <p>Color, character, and cozy details bring a little personality to every project.</p>
          </div>

          <div className="inspiration-grid">
            {inspirationPhotos.map((photo) => (
              <figure className="inspiration-card" key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
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

      <footer id="contact" className="contact-section" aria-labelledby="contact-heading">
        <div className="contact-inner">
          <div className="contact-visual">
            <div className="contact-copy">
              <span className="eyebrow">We're here to talk</span>
              <h2 id="contact-heading">Let's make something worth talking about.</h2>
              <p>
                Have an idea, a project, or a question? Tell me a little about what
                you're looking for, and we'll take it from there.
              </p>
            </div>
          </div>

          <div className="contact-form-card">
            <h3 className="contact-form-heading">Start a conversation</h3>
            <p className="contact-form-intro">
              Share a few details and I'll be in touch.
            </p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-form-field">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  required
                />
              </div>
              <div className="contact-form-row">
                <div className="contact-form-field">
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    maxLength={254}
                    required
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="contact-phone">Phone (optional)</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(000) 000-0000"
                    maxLength={32}
                  />
                </div>
              </div>
              <div className="contact-form-field">
                <label htmlFor="contact-message">How can I help?</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell me what you're looking for..."
                  maxLength={2000}
                  required
                />
              </div>
              <button type="submit" className="primary-btn" disabled={isSubmittingContact}>
                {isSubmittingContact ? 'Sending…' : 'Send your message'}
              </button>
            </form>
            <p className="contact-form-note" role="status" aria-live="polite">
              {contactStatus || 'Your message will be sent directly to my inbox.'}
            </p>
            <a
              href="https://github.com/FeyJensen"
              target="_blank"
              rel="noreferrer"
              className="contact-github-link"
            >
              Or visit my GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
