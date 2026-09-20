import { resumeExperience, resumeSkills } from '../data/portfolioData';

export default function ResumePage() {
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
