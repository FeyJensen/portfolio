import { useEffect, useRef, useState } from 'react';
import { stats } from '../data/portfolioData';
import { pricingPackages } from '../data/pricing';
import { pageRoutes } from '../routes';
import polaroidGirl from '/assets/photos/PolaroidPhoneGirl.webp';
import portrait from '/assets/photos/about-photo.jpg';

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
    src: '/assets/photos/CupcakeGirl.webp',
    alt: 'Woman in a mauve velvet top licking frosting from her finger while holding a cupcake',
    caption: 'Sweet moments',
  },
  {
    src: '/assets/photos/kawaiiGirl.webp',
    alt: 'Blonde girl in a colorful Y2K outfit with striped arm warmers and a heart necklace',
    caption: 'Playful style',
  },
  {
    src: '/assets/photos/purpleCat.webp',
    alt: 'Fluffy white cat wearing purple heart-shaped sunglasses and a satin bow',
    caption: 'Purple daydreams',
  },
  {
    src: '/assets/photos/ComputerCoffee.webp',
    alt: 'Cozy lavender living room with a laptop, a white cat, a drink and purple tulips',
    caption: 'Cozy creative breaks',
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

export default function HomePage({ onNavigate }) {
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
      <main className="home-page">
        <section className="hero">
          <div className="hero-card">
            <div className="hero-copy">
              <span className="eyebrow">Design-led. Built to perform.</span>
              <h1>Thoughtful websites for brands with something to say.</h1>
              <p>
                I combine expressive design with dependable development to build
                websites that feel unmistakably yours and make the next step easy
                for your customers.
              </p>

              <div className="cta-row">
                <a href="#contact" className="primary-btn">Book a consultation</a>
                <a href="#services" className="secondary-btn">View services</a>
              </div>

              <div className="mini-trust">
                <span>Strategy</span>
                <span>Design</span>
                <span>Development</span>
              </div>
            </div>

            <div className="hero-portrait-stage">
              <img
                className="hero-portrait"
                src="/assets/photos/PortraitWavyBorder.webp"
                width="1400"
                height="1410"
                fetchpriority="high"
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
            <span className="eyebrow">Ways we can work together</span>
            <h2>One Studio. Every Part of Your Website.</h2>
            <p>
              From the first idea to the final line of code, I create a connected
              experience that is easy to use, easy to grow, and true to your brand.
            </p>
          </div>

          <div className="services-grid">
            <article className="service-card">
              <ul className="service-list">
                <li>
                  <span>01</span>
                  <div>
                    <strong>Full-stack website builds</strong>
                    <p>Custom, responsive websites shaped around your business goals.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>Landing pages &amp; funnels</strong>
                    <p>Focused experiences designed to guide visitors toward action.</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>UI/UX design systems</strong>
                    <p>Cohesive visual foundations that keep every touchpoint consistent.</p>
                  </div>
                </li>
                <li>
                  <span>04</span>
                  <div>
                    <strong>Optimization &amp; care</strong>
                    <p>Ongoing improvements for speed, accessibility, and confidence.</p>
                  </div>
                </li>
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
                loading="lazy"
              />
            </div>

          </div>
        </section>

        <section className="pricing-teaser section-block" aria-labelledby="pricing-teaser-heading">
          <span className="eyebrow">Small-business-friendly pricing</span>
          <h2 id="pricing-teaser-heading">
            Websites Starting at ${pricingPackages[0].price}.
          </h2>
          <p>
            Explore simple website packages with thoughtful design, clear
            project scopes, and foundational SEO.
          </p>
          <a
            className="primary-btn"
            href={pageRoutes.pricing}
            onClick={(event) => onNavigate(event, 'pricing')}
          >
            View pricing
          </a>
        </section>

        <section className="inspiration section-block" aria-labelledby="inspiration-heading">
          <div className="section-heading inspiration-heading">
            <span className="eyebrow">A little inspiration</span>
            <h2 id="inspiration-heading">Little Things that Spark<br></br> BIG IDEAS.</h2>
            <p>Color, character, and cozy details bring a little personality to every project.</p>
          </div>

          <div className="inspiration-grid">
            {inspirationPhotos.map((photo) => (
              <figure className="inspiration-card" key={photo.src}>
                <div className="inspiration-photo">
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </div>
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
                <h2>Web Design with Clarity and Conversion in Mind.</h2>
                <p>
                  I help turn ideas into digital experiences that feel customized,
                  work smoothly, and support your business. My process connects personal design,
                  user experience, and functional development so your website does more than
                  look good, it performs.
                </p>
                <p className="about-note">
                  You get direct collaboration, a considered process, and a site
                  built to keep working after launch.
                </p>
                <nav className="about-social-links" aria-label="Social profiles">
                  <a
                    href="https://www.linkedin.com/in/fey-jensen-7bb826120/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/feyviolin"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                </nav>
              </div>
            </div>

            <div className="about-photo-frame">
              <img
                src={portrait}
                alt="Fey smiling in a Santa hat and red holiday sweater"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      <section id="contact" className="contact-section" aria-labelledby="contact-heading">
        <div className="contact-inner">
          <div className="contact-visual">
            <div className="contact-copy">
              <span className="eyebrow">We're here to talk</span>
              <h2 id="contact-heading">Let's Make Something Worth Talking About.</h2>
              <p>
                Have an idea, a project, or a question? Tell me a little about what
                you're looking for, and we'll take it from there.
              </p>
            </div>
          </div>

          <div className="contact-form-card">
            <h3 className="contact-form-heading">Start a Conversation</h3>
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
                  placeholder="Name"
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
      
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
