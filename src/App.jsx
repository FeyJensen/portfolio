import { useEffect, useRef, useState } from 'react';

import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import ReactShowcasePage from './pages/ReactShowcasePage';
import SkyeDogPage from './pages/SkyeDogPage';
import ShopDemoPage from './pages/ShopDemoPage';
import AuthDemoPage from './pages/AuthDemoPage';

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
    { label: 'Skye Dog', value: 'skye-dog' },
    { label: 'Auth Demo', value: 'auth-demo' },
    { label: 'React Lab', value: 'react-showcase' },
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

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      ) : currentPage === 'skye-dog' ? (
        <SkyeDogPage />
      ) : currentPage === 'auth-demo' ? (
        <AuthDemoPage />
      ) : currentPage === 'react-showcase' ? (
        <ReactShowcasePage />
      ) : (
        <HomePage />
      )}
    </div>
  );
}
