export const stats = [
  { value: '2+', label: 'Years building digital experiences' },
  { value: '50+', label: 'Projects designed and developed' },
  { value: '100%', label: 'Custom, user-focused work from concept to launch' },
];


export const resumeExperience = [
  {
    company: 'NAVEX',
    dates: 'April 2026 – August 2026',
    role: 'Software Engineer (laid off)',
    bullets: [
      'Developed and maintained features across the NAVEX One Admin and customer platforms, with a focus on authentication and identity provider setup.',
      'Configured and tested Keycloak and Auth0 integrations across test, staging, and production environments.',
      'Configured Auth0 to support sign-in through both the NAVEX login platform and Salesforce.',
      'Used Terraform to create a repeatable process for authentication setup and configuration.',
      'Automated end-to-end testing with Playwright and Selenium, and monitored pipelines using CloudWatch, CodePipeline, and CodeBuild.',
      'Participated in live deployments, validating new features after release, and collaborated through Scrum ceremonies, demos, and code reviews.',
    ],
  },
  {
    company: 'Balanx-Bio',
    dates: 'October 2025 – May 2026',
    role: 'Software Engineer (end of contract)',
    bullets: [
      'Translated Figma designs into front-end web applications and collaborated with designers to align implementation with intended visuals.',
      'Communicated technical constraints and helped establish code standards and development workflows.',
      'Created and managed development tickets, and created, reviewed, and approved pull requests.',
    ],
  },
  {
    company: 'NAVEX',
    dates: 'April 2024 – October 2024',
    role: 'Jr. Software Engineer Intern',
    bullets: [
      'Used Playwright and TypeScript to migrate legacy automated tests from C# and Selenium to TypeScript-based frameworks.',
      'Participated in Agile/Scrum stand-ups, sprint planning, and retrospectives.',
      'Updated documentation and developed confidence using Git and GitHub in a collaborative engineering team.',
    ],
  },
  {
    company: 'Contract Work',
    dates: 'Ongoing',
    role: 'Web Developer & Designer',
    bullets: [
      'Work directly with clients to understand their needs and communicate technical processes in clear, accessible language.',
      'Use mood boards and presentations to gather client feedback and align on direction before development begins.',
    ],
  },
];

export const resumeSkills = [
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'C++', 'C#'] },
  { category: 'Web Development', items: ['React', 'Bootstrap', 'Node.js', '.NET', 'Express', 'WordPress', 'REST APIs'] },
  { category: 'Cloud & DevOps', items: ['AWS (Lambda, S3, CloudWatch, CodePipeline, CodeBuild)', 'Terraform', 'CI/CD'] },
  { category: 'Authentication & Integrations', items: ['Auth0', 'Keycloak', 'Salesforce Integrations', 'API Integration'] },
  { category: 'Databases', items: ['PostgreSQL'] },
  { category: 'Testing', items: ['Playwright', 'Jest', 'E2E Testing'] },
  { category: 'Tools & Workflow', items: ['Git', 'GitHub', 'Jira', 'ClickUp', 'Trello', 'Postman', 'VS Code'] },
  { category: 'Site Builders', items: ['WordPress', 'Showit', 'Wix', 'Squarespace', 'Shopify'] },
  { category: 'Creative', items: ['Adobe Suite', 'Graphic Design', 'Canva', 'MailChimp', 'eCommerce', 'Bilingual (English/Spanish)'] },
];

export const resumeProjects = [
  'Automated creation of mood boards and brand design presentations',
  'eCommerce page for sellers',
  'Client websites',
  'To-do list application',
];

export const initialShopListings = [
  {
    id: 1,
    name: 'Handmade Ceramic Mug',
    category: 'Home Goods',
    price: 24,
    stock: 18,
    description: 'A warm-toned ceramic mug with a matte finish and hand-painted glaze.',
  },
  {
    id: 2,
    name: 'Minimal Desk Lamp',
    category: 'Lighting',
    price: 64,
    stock: 9,
    description: 'Soft ambient lighting designed for focused work and cozy evenings.',
  },
  {
    id: 3,
    name: 'Leather Journal',
    category: 'Stationery',
    price: 32,
    stock: 12,
    description: 'Premium stitched journal with lined pages for notes, sketches, and planning.',
  },
];
