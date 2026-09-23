import { useEffect, useState } from 'react';

const modes = [
  {
    id: 'motion',
    label: 'Theme 1',
    title: 'Make interfaces feel alive.',
    description: 'Timed state changes and layered transitions turn a static component into a living system.',
    accent: 'coral',
  },
  {
    id: 'state',
    label: 'Theme 2',
    title: 'State that stays understandable.',
    description: 'Interactive controls keep the UI honest, responsive, and easy to explore.',
    accent: 'teal',
  },
  {
    id: 'systems',
    label: 'Theme 3',
    title: 'Small pieces, composed well.',
    description: 'Reusable patterns create a consistent experience without flattening its personality.',
    accent: 'gold',
  },
];

function UseEffectCounter() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('Waiting for a number change');

  useEffect(() => {
    setStatus(`Effect noticed the count is ${count}`);
  }, [count]);

  return (
    <div className="react-lab-counter">
      <div className="react-lab-counter-heading">
        <span className="react-lab-effect-label">Counter</span>
        <strong>{status}</strong>
      </div>
      <div className="react-lab-counter-controls">
        <button type="button" onClick={() => setCount((value) => value - 1)} aria-label="Decrease number">
          -
        </button>
        <span>{count}</span>
        <button type="button" onClick={() => setCount((value) => value + 1)} aria-label="Increase number">
          +
        </button>
      </div>
    </div>
  );
}


export default function ReactShowcasePage() {
  const [activeMode, setActiveMode] = useState('motion');
  const [selectedChip, setSelectedChip] = useState('Grid');

  const currentMode = modes.find((mode) => mode.id === activeMode);


  return (
    <main className={`react-lab-page react-lab-${currentMode.accent}`}>
      <section className="react-lab-hero" aria-label="React interface showcase">
        <div className="react-lab-intro">
          <span className="react-lab-eyebrow">UI Management Demo</span>
          <h1>Thoughtful interfaces, built in pieces.</h1>
          <p>
            A small collection of responsive patterns showing how React keeps a product clear, flexible, and expressive.
          </p>

          <div className="react-lab-live-status">
            <span className="react-lab-status-dot" aria-hidden="true" />
            <span>Three patterns, one system</span>
            <span className="react-lab-status-value">03 / explore</span>
          </div>
        </div>

        <div className="react-lab-craft-board" aria-label="React interface building blocks">
          <div className="react-lab-craft-board-header">
            <span>component / 03</span>
            <span className="react-lab-craft-dot" aria-hidden="true" />
          </div>
          <div className="react-lab-craft-board-title">Build with intention.</div>
          <div className="react-lab-craft-board-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="react-lab-craft-board-footer">
            <span>stateful</span>
            <span>responsive</span>
            <span>composable</span>
          </div>
        </div>
      </section>

      <section className="react-lab-workbench" aria-label="Interactive React demonstrations">
        <div className="react-lab-mode-tabs" role="tablist" aria-label="Showcase modes">
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              role="tab"
              aria-selected={activeMode === mode.id}
              className={activeMode === mode.id ? 'is-selected' : ''}
              onClick={() => setActiveMode(mode.id)}
            >
              <span>0{modes.indexOf(mode) + 1}</span>
              {mode.label}
            </button>
          ))}
        </div>

        <div className="react-lab-demo-grid">
          <article className="react-lab-story-panel">
            <span className="react-lab-panel-kicker">Active experiment</span>
            <h2>{currentMode.title}</h2>
            <p>{currentMode.description}</p>
          </article>

          <div className={`react-lab-feature-grid react-lab-feature-grid-${selectedChip.toLowerCase()}`}>
            <span className="react-lab-hint react-lab-card-hint">Try hovering the cards</span>
            <article className="react-lab-feature-card react-lab-feature-card-main">
              <div className="react-lab-card-topline">
                <span className="react-lab-card-index">01</span>
                <span className="react-lab-card-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="react-lab-metric-ring">
                <span>100</span>
                <small>%</small>
              </div>
              <h3>Responsive by default</h3>
              <p>Fluid layout, clear states, and motion that never gets in the way.</p>
            </article>

            <article className="react-lab-feature-card react-lab-feature-card-chip">
              <div className="react-lab-card-topline">
                <span className="react-lab-card-index">02</span>
                <span className="react-lab-card-arrow" aria-hidden="true">↗</span>
              </div>
              <h3>Choose a layout</h3>
              <div className="react-lab-chip-row">
                {['Grid', 'Stack'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className={selectedChip === chip ? 'is-selected' : ''}
                    onClick={() => setSelectedChip(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
              <p>{selectedChip} layout selected. The composition adapts instantly.</p>
            </article>

            <article className="react-lab-feature-card react-lab-feature-card-wide">
              <div>
                <span className="react-lab-card-index">03 / COMPOSITION</span>
                <h3>Responsive Composition</h3>
              </div>
              <UseEffectCounter />
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}