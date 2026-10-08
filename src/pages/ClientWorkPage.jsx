const projects = [
  {
    name: 'Harmony Adult Care Home',
    category: 'Website design & development',
    description:
      'A warm, welcoming website for Harmony Adult Care Home, centered on care that feels like home.',
    url: 'https://harmony-adult-care-home-02.vercel.app/',
  },
  {
    name: 'Bonanza Cleaning',
    category: 'Website design & development',
    description:
      'A welcoming online home for a local cleaning team, making it easy to explore services and request a free quote.',
    url: 'https://bonanza-cleaning.vercel.app/',
  },
];

export default function ClientWorkPage() {
  return (
    <main className="client-work-page">
      <header className="client-work-heading">
        <div>
          <span className="client-work-kicker">Selected projects</span>
          <h1>Client Work</h1>
          <p>Websites made to help real businesses show up with confidence.</p>
        </div>
        <span className="client-work-count">{String(projects.length).padStart(2, '0')} projects</span>
      </header>

      <section className="client-work-list" aria-label="Client projects">
        {projects.map((project, index) => (
          <article className="client-project" key={project.name}>
            <div className="client-project-details">
              <div className="client-project-title-row">
                <span className="client-project-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="client-project-category">{project.category}</span>
              </div>
              <div className="client-project-summary">
                <div>
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>
                </div>
                <a href={project.url} target="_blank" rel="noreferrer">
                  Visit live site <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

          </article>
        ))}
      </section>
    </main>
  );
}