export default function SkyeDogPage() {
  return (
    <main className="skye-dog-page">
      <section className="skye-dog-shell">
        <div className="skye-dog-copy">
          <span className="eyebrow">Interactive game</span>
          <h1>Meet Skye Dog.</h1>
          <p>
            A playful browser game built to be explored, played, and shared. Step into
            Skye&apos;s world and see the project in action.
          </p>
          <div className="cta-row">
            <a
              href="https://skye-dog.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="primary-btn"
            >
              Play Skye Dog <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="skye-dog-visual">
          <img src="/assets/photos/Skye-DogMenu.png" alt="Skye Dog game main menu" />
        </div>
      </section>

      <section className="skye-dog-controls" aria-labelledby="skye-dog-controls-title">
        <div className="skye-dog-controls-heading">
          <span className="eyebrow">How to play</span>
          <h2 id="skye-dog-controls-title">Simple controls, happy dog.</h2>
        </div>

        <div className="skye-dog-controls-list">
          <div className="skye-dog-control">
            <div className="skye-dog-key-group" aria-label="Arrow keys">
              <kbd>↑</kbd>
              <div>
                <kbd>←</kbd>
                <kbd>↓</kbd>
                <kbd>→</kbd>
              </div>
            </div>
            <div>
              <h3>Move Skye</h3>
              <p>Use the arrow keys to move in every direction.</p>
            </div>
          </div>

          <div className="skye-dog-control">
            <kbd className="skye-dog-space-key">Space</kbd>
            <div>
              <h3>Remove hydrants</h3>
              <p>Press the space bar to clear hydrants from Skye&apos;s path.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}