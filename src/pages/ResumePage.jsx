import { resumeExperience, resumeProjects, resumeSkills } from '../data/portfolioData';

export default function ResumePage() {
  return (
    <div className="resume-page">
      <div className="resume-shell">
        <header className="resume-header">
          <div>
            <h1>Maria "Fey" Jensen</h1>
            <p className="resume-location">
              Portland, OR | 503-901-9256 | <a href="mailto:FeyViolin@gmail.com">FeyViolin@gmail.com</a> |{' '}
              <a href="https://www.FeyJensen.com">www.FeyJensen.com</a> |{' '}
              <a href="https://drive.google.com/drive/folders/1MOYHVhkJRhElFp0lalS2YnjZdmehzPmW?usp=drive_link">Graphic Design Portfolio</a>
            </p>
          </div>
        </header>

        <section className="resume-section">
          <h2>Professional Summary</h2>
          <p>
            Software engineer and web developer in Portland, Oregon, with experience maintaining production applications
            across full-stack environments. Experienced with JavaScript, TypeScript, C#, React, REST APIs, and automated
            testing, with hands-on experience in AWS, Terraform, Auth0, Keycloak, and CI/CD pipelines. Previous roles focused
            on API integration, authentication, and automated testing.
          </p>
        </section>

        <section className="resume-section">
          <h2>Technical Skills</h2>
          <div className="resume-skill-groups">
            {resumeSkills.map(({ category, items }) => (
              <p key={category} className="resume-skill-group">
                <strong>{category}:</strong> {items.join(', ')}
              </p>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>Projects</h2>
          <ul>
            {resumeProjects.map((project) => (
              <li key={project}>{project}</li>
            ))}
          </ul>
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
