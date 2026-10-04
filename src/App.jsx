import { useEffect, useRef, useState } from 'react';

import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import ReactShowcasePage from './pages/ReactShowcasePage';
import SkyeDogPage from './pages/SkyeDogPage';
import ShopDemoPage from './pages/ShopDemoPage';
import AuthDemoPage from './pages/AuthDemoPage';
import ClientWorkPage from './pages/ClientWorkPage';

const pageRoutes = {
  home: '/',
  resume: '/resume',
  shop: '/projects/shop-demo',
  videogamedemo: '/projects/videogamedemo',
  'auth-demo': '/projects/auth-demo',
  'react-showcase': '/projects/react-lab',
  'client-work': '/client-work',
};

const starImages = [
  '/assets/photos/blackStar.png',
  '/assets/photos/darkStar.png',
  '/assets/photos/PastelPurpleStar.png',
  '/assets/photos/PeachStar.png',
  '/assets/photos/PinkStar.png',
  '/assets/photos/PurpleStar.png',
  '/assets/photos/WhiteStar.png',
];

function pageFromPath(pathname) {
  const route = Object.entries(pageRoutes).find(([, path]) => path === pathname);
  return route ? route[0] : 'home';
}

function NavDropdown({ onSelect, currentPage }) {
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
    { label: 'React Lab', value: 'react-showcase' },
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
            <button
              key={item.value}
              type="button"
              className={`nav-button ${currentPage === item.value ? 'is-selected' : ''}`}
              onClick={() => {
                onSelect(item.value);
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
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

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => pageFromPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setCurrentPage(pageFromPath(window.location.pathname));

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', pageRoutes[page]);
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <button type="button" className="brand-button" onClick={() => setCurrentPage('home')}>
          <div className="brand-wrap">
            <div className="brand-mark">F</div>
            <div>
              <p className="brand-name">Fey Jensen</p>
            </div>
          </div>
        </button>

        <nav className="nav">
          {currentPage === 'home' ? (
            <>
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </>
          ) : (
            <button type="button" className="nav-button" onClick={() => handlePageChange('home')}>
              Home
            </button>
          )}

          <NavDropdown onSelect={handlePageChange} currentPage={currentPage} />
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
      ) : currentPage === 'react-showcase' ? (
        <ReactShowcasePage />
      ) : currentPage === 'client-work' ? (
        <ClientWorkPage />
      ) : (
        <HomePage />
      )}
      <ClickStarBursts />
    </div>
  );
}
