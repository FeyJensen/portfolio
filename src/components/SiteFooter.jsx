export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <span className="site-footer-name" role="img" aria-label="Fey Jensen Web Developer" />
          <p>
            Thoughtful design and full-stack development for brands ready to
            stand out online.
          </p>
        </div>

        <div className="site-footer-contact">
          <h2>Contact me</h2>
          <a href="mailto:FeyViolin@gmail.com">FeyViolin@gmail.com</a>
          <span>Clackamas, Oregon</span>
          <a href="tel:+15039019256">+1 (503) 901-9256</a>
        </div>

        <div className="site-footer-social">
          <h2>Follow me</h2>
          <a
            className="site-footer-social-link"
            href="https://github.com/FeyJensen"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Fey Jensen. All rights reserved.</span>
      </div>
    </footer>
  );
}
