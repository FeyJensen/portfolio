import { useState } from 'react';

import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import ReactShowcasePage from './pages/ReactShowcasePage';
import SkyeDogPage from './pages/SkyeDogPage';
import ShopDemoPage from './pages/ShopDemoPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
            <button type="button" className="nav-button" onClick={() => setCurrentPage('home')}>Home</button>
          )}
          <button type="button" className="nav-button" onClick={() => setCurrentPage('resume')}>
            Resume
          </button>
          <button type="button" className="nav-button" onClick={() => setCurrentPage('shop')}>
            Shop Demo
          </button>
          <button type="button" className="nav-button" onClick={() => setCurrentPage('skye-dog')}>
            Skye Dog
          </button>
          <button type="button" className="nav-button" onClick={() => setCurrentPage('react-showcase')}>
            React Lab
          </button>
        </nav>
      </header>

      {currentPage === 'resume' ? (
        <ResumePage />
      ) : currentPage === 'shop' ? (
        <ShopDemoPage />
      ) : currentPage === 'skye-dog' ? (
        <SkyeDogPage />
      ) : currentPage === 'react-showcase' ? (
        <ReactShowcasePage />
      ) : (
        <HomePage />
      )}
    </div>
  );
}
