import { useEffect, useRef, useState } from 'react';

import { canonicalUrl, pageFromPath, pageMeta, pageRoutes } from './routes';

import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import SkyeDogPage from './pages/SkyeDogPage';
import ShopDemoPage from './pages/ShopDemoPage';
import AuthDemoPage from './pages/AuthDemoPage';
import ClientWorkPage from './pages/ClientWorkPage';

const starImages = [
  '/assets/photos/blackStar.png',
  '/assets/photos/darkStar.png',
  '/assets/photos/PastelPurpleStar.png',
  '/assets/photos/PeachStar.png',
  '/assets/photos/PinkStar.png',
  '/assets/photos/PurpleStar.png',
  '/assets/photos/WhiteStar.png',
];

function isPlainLeftClick(event) {
  return !(event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);
}

function NavDropdown({ onNavigate, currentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const projectItems = [
    { label: 'Resume', value: 'resume' },
    { label: 'Shop Demo', value: 'shop' },
    { label: 'Video Game Demo', value: 'videogamedemo' },
    { label: 'Auth Demo', value: 'auth-demo' },
    { label: 'Client Work', value: 'client-work' },
  ];

  return (
    <div className="nav-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="nav-button nav-dropdown-toggle"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        Projects <span aria-hidden="true">▾</span>
      </button>

      {isOpen && (
        <div className="nav-dropdown-menu" role="menu" aria-label="Project navigation">
          {projectItems.map((item) => (
            <a
              key={item.value}
              href={pageRoutes[item.value]}
              className={`nav-button ${currentPage === item.value ? 'is-selected' : ''}`}
              onClick={(event) => {
                onNavigate(event, item.value);
                setIsOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function ClickStarBursts() {
  const [bursts, setBursts] = useState([]);
  const nextBurstId = useRef(0);

  useEffect(() => {
    const timers = new Set();

    function handleClick(event) {
      const id = nextBurstId.current++;
      const stars = starImages.map((src, index) => {
        const angle = (index / starImages.length) * Math.PI * 2 + (id % 2) * 0.12;
        const distance = 78 + ((index + id) % 3) * 16;
        const size = 30 + ((index + id) % 3) * 6;
        const duration = 700;

        return {
          src,
          x: Math.cos(angle) * distance * 1.25,
          y: Math.sin(angle) * distance * 0.85,
          rotation: Math.round((angle * 180) / Math.PI + 260 + ((index + id) % 3) * 100),
          size,
          duration,
          delay: 0,
        };
      });

      setBursts((current) => [...current, { id, x: event.clientX, y: event.clientY, stars }]);

      let timerId;
      timerId = window.setTimeout(() => {
        setBursts((current) => current.filter((burst) => burst.id !== id));
        timers.delete(timerId);
      }, Math.max(...stars.map((star) => star.duration + star.delay)) + 80);
      timers.add(timerId);
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      timers.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  return (
    <div className="click-star-layer" aria-hidden="true">
      {bursts.flatMap((burst) =>
        burst.stars.map((star, index) => (
          <img
            key={`${burst.id}-${index}`}
            className="click-star"
            src={star.src}
            alt=""
            style={{
              left: `${burst.x}px`,
              top: `${burst.y}px`,
              '--burst-x': `${star.x}px`,
              '--burst-y': `${star.y}px`,
              '--burst-rotation': `${star.rotation}deg`,
              '--burst-size': `${star.size}px`,
              '--burst-duration': `${star.duration}ms`,
              '--burst-delay': `${star.delay}ms`,
            }}
          />
        )),
      )}
    </div>
  );
}

export default function App({ initialPath = '/' }) {
  const [currentPage, setCurrentPage] = useState(() => pageFromPath(initialPath));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => setCurrentPage(pageFromPath(window.location.pathname));

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const meta = pageMeta[currentPage];
    const setMeta = (selector, attr, value) => {
      document.head.querySelector(selector)?.setAttribute(attr, value);
    };
    const url = canonicalUrl(currentPage);

    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.history.pushState({}, '', pageRoutes[page]);
  };

  const handleNavigate = (event, page) => {
    if (!isPlainLeftClick(event)) return;
    event.preventDefault();
    handlePageChange(page);
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <a href={pageRoutes.home} className="brand-button" onClick={(event) => handleNavigate(event, 'home')}>
          <div className="brand-wrap">
            <span className="brand-logo" role="img" aria-label="Fey Jensen" />
          </div>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="site-nav"
          className={`nav ${menuOpen ? 'is-open' : ''}`}
          onClick={(event) => {
            if (event.target.closest('a')) setMenuOpen(false);
          }}
        >
          {currentPage === 'home' ? (
            <>
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </>
          ) : (
            <a href={pageRoutes.home} className="nav-button" onClick={(event) => handleNavigate(event, 'home')}>
              Home
            </a>
          )}

          <NavDropdown onNavigate={handleNavigate} currentPage={currentPage} />
        </nav>
      </header>

      {currentPage === 'resume' ? (
        <ResumePage />
      ) : currentPage === 'shop' ? (
        <ShopDemoPage />
      ) : currentPage === 'videogamedemo' ? (
        <SkyeDogPage />
      ) : currentPage === 'auth-demo' ? (
        <AuthDemoPage />
      ) : currentPage === 'client-work' ? (
        <ClientWorkPage />
      ) : (
        <HomePage />
      )}
      <ClickStarBursts />
    </div>
  );
}
