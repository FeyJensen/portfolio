import { useState } from 'react';

const services = [
  {
    title: 'Full-stack website builds',
    description:
      'From concept to launch, I craft custom websites that are visually compelling, technically reliable, and ready to grow with you.',
  },
  {
    title: 'Landing pages & funnels',
    description:
      'I design conversion-focused landing pages that guide visitors toward a clear next step, whether that is booking, buying, or contacting you.',
  },
  {
    title: 'UI/UX design systems',
    description:
      'I shape intuitive user experiences with clean interfaces, thoughtful flows, and design systems that keep your brand consistent across every screen.',
  },
  {
    title: 'Website optimization & maintenance',
    description:
      'I refine existing sites for speed, clarity, and performance, helping your brand stay modern, user-friendly, and easy to manage over time.',
  },
];

const stats = [
  { value: '2+', label: 'Years building digital experiences' },
  { value: '50+', label: 'Projects designed and developed' },
  { value: '100%', label: 'Custom, user-focused work from concept to launch' },
];

const highlights = [
  'Design-first thinking paired with clean, scalable front-end and back-end implementation',
  'Responsive experiences built to perform beautifully across devices and audiences',
  'Strategy, branding, and development working together to turn visitors into customers',
];

const resumeExperience = [
  {
    company: 'NAVEX',
    dates: 'April 2026 – August 2026',
    role: 'Software Engineer',
    bullets: [
      'Developed and maintained features across the NAVEX One Admin and Tenant platforms for enterprise customers.',
      'Implemented authentication and authorization using Keycloak and Auth0 across production applications.',
      'Automated Auth0 provisioning with Terraform to create a repeatable infrastructure-as-code setup.',
      'Built and integrated REST APIs and third-party services to support secure application workflows.',
      'Created and maintained Playwright and Selenium automated tests across multiple environments.',
      'Worked with AWS Lambda, S3, CloudWatch, CodePipeline, and CodeBuild to support deployment and monitoring workflows.',
    ],
  },
  {
    company: 'Balanx-Bio',
    dates: 'October 2025 – May 2026',
    role: 'Software Engineer',
    bullets: [
      'Built the majority of the company website from the ground up using responsive, accessible front-end components.',
      'Collaborated closely with designers to implement polished UI/UX and maintain visual consistency.',
      'Led front-end development while the team scaled and helped establish technical direction and standards.',
      'Managed development tickets, reviewed pull requests, and mentored interns on best practices.',
    ],
  },
  {
    company: 'NAVEX',
    dates: 'April 2024 – October 2024',
    role: 'Jr. Software Engineer Intern',
    bullets: [
      'Developed automated end-to-end tests using Playwright and TypeScript to improve test coverage and reliability.',
      'Migrated legacy test suites from C# and Selenium to modern TypeScript-based frameworks.',
      'Participated in Agile ceremonies and updated internal documentation for team processes.',
      'Used Git and GitHub for version control, collaboration, and peer code reviews.',
    ],
  },
  {
    company: 'Media272',
    dates: 'August 2016 – August 2022',
    role: 'Video Producer',
    bullets: [
      'Produced video testimonials and product content for marketing campaigns.',
      'Wrote scripts for product video voice-overs and edited footage using Adobe Suite tools.',
    ],
  },
];

const resumeSkills = [
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
  'C#',
  'React',
  'Node.js',
  '.NET',
  'Express',
  'REST APIs',
  'AWS',
  'Terraform',
  'Auth0',
  'Keycloak',
  'PostgreSQL',
  'Playwright',
  'Jest',
  'GitHub',
  'CI/CD',
  'Agile/Scrum',
  'Adobe Suite',
  'Canva',
  'Bilingual (English/Spanish)',
];

function ResumePage() {
  return (
    <div className="resume-page">
      <div className="resume-shell">
        <header className="resume-header">
          <div>
            <h1>Maria "Fey" Jensen</h1>
            <p className="resume-location">Clackamas, OR | 503-901-9256 | FeyViolin@gmail.com | github.com/FeyJensen</p>
          </div>
        </header>

        <section className="resume-section">
          <h2>Professional Summary</h2>
          <p>
            Software Engineer with experience developing and maintaining production applications across full-stack environments.
            Skilled in JavaScript, TypeScript, C#, React, REST APIs, and automated testing, with hands-on experience with AWS,
            Terraform, Auth0, Keycloak, CI/CD pipelines, and AI-assisted development using Claude Code. Experienced in API
            integration, authentication, cloud-based application development, and deploying and validating applications across
            multiple environments. Strong collaborator with experience working in Agile/Scrum teams, leading development efforts,
            and contributing to code reviews and technical solutions.
          </p>
        </section>

        <section className="resume-section">
          <h2>Technical Skills</h2>
          <div className="resume-skill-list">
            {resumeSkills.map((skill) => (
              <span key={skill} className="resume-skill">{skill}</span>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>Experience</h2>
          {resumeExperience.map((job) => (
            <div key={`${job.company}-${job.role}`} className="resume-job">
              <div className="resume-job-header">
                <h3>{job.company}</h3>
                <span>{job.dates}</span>
              </div>
              <p className="resume-role">{job.role}</p>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2>Education</h2>
          <div className="resume-education">
            <p><strong>Portland State University</strong> — BA, Film</p>
            <p><strong>Clackamas Community College</strong> — AAS, Digital Media Communications</p>
            <p><strong>Relevant Coursework:</strong> CS161 Computer Science I, CS162 Computer Science II, CS260 Data Structures, C++ Certification</p>
          </div>
        </section>
      </div>
    </div>
  );
}

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
        </nav>
      </header>

      {currentPage === 'resume' ? (
        <ResumePage />
      ) : (
        <>
          <main>
            <section className="hero">
              <div className="hero-copy">
                <span className="eyebrow">Full-Stack Web Designer & Developer</span>
                <h1>Designing and building websites that move businesses forward.</h1>
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

              <div className="hero-card">
                <div className="photo-frame">
                  <img src="/assets/photos/headshot.png" alt="Fey Jensen headshot" />
                  <div className="floating-badge">
                    <span>Available for projects</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="stats" aria-label="Business summary">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </section>

            <section id="services" className="services section-block">
              <div className="section-heading">
                <span className="eyebrow">What I do</span>
                <h2>Full-stack solutions built to elevate your brand.</h2>
              </div>

              <div className="services-grid">
                {services.map((service) => (
                  <article key={service.title} className="service-card">
                    <div className="icon-circle">✦</div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="about" className="about section-block">
              <div className="section-heading left">
                <span className="eyebrow">Why choose me</span>
                <h2>Web design with clarity and conversion in mind.</h2>
              </div>

              <div className="about-grid">
                <div className="about-copy">
                  <p>
                    I help turn ideas into digital experiences that feel premium,
                    work smoothly, and support real growth. My process connects design,
                    user experience, and functional development so your website does more than
                    look good — it performs.
                  </p>
                  <ul>
                    {highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="about-panel">
                  <p className="panel-label">Working style</p>
                  <h3>Strategy, design, and development in one process.</h3>
                  <p>
                    Every project is shaped around your audience, your message, and your goals,
                    creating a site that is both beautiful and built to convert.
                  </p>
                </div>
              </div>
            </section>
          </main>

          <footer id="contact" className="footer">
            <div>
              <span className="eyebrow">Let's build something great</span>
              <h2>Ready for a website that looks sharp and works hard?</h2>
            </div>

            <div className="footer-actions">
              <a href="mailto:feyviolin@gmail.com" className="primary-btn">
                feyviolin@gmail.com
              </a>
              <a href="https://github.com/FeyJensen" target="_blank" rel="noreferrer" className="secondary-btn">
                GitHub
              </a>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
