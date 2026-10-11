export const SITE_URL = 'https://www.feyjensen.com';

export const pageRoutes = {
  home: '/',
  resume: '/resume',
  shop: '/projects/shop-demo',
  videogamedemo: '/projects/videogamedemo',
  'auth-demo': '/projects/auth-demo',
  'client-work': '/client-work',
};

export const pageMeta = {
  home: {
    title: 'Fey Jensen | Web Designer & Full-Stack Developer',
    description:
      'Fey Jensen creates polished websites and digital experiences for businesses that want to stand out. Full-stack web design and development in Clackamas, Oregon.',
  },
  resume: {
    title: 'Resume | Fey Jensen, Software Engineer',
    description:
      'Resume of Maria "Fey" Jensen: a software engineer experienced in JavaScript, TypeScript, C#, React, REST APIs, AWS and CI/CD.',
  },
  'client-work': {
    title: 'Client Work | Fey Jensen',
    description:
      'Websites Fey Jensen has designed and built for real businesses, including Harmony Adult Care Home and Bonanza Cleaning.',
  },
  shop: {
    title: 'Shop Demo: Full-Stack CRUD App | Fey Jensen',
    description:
      'A shop listings dashboard demonstrating a React frontend connected to a Node.js API and PostgreSQL-ready data layer.',
  },
  videogamedemo: {
    title: 'Skye Dog Game Demo | Fey Jensen',
    description:
      'Skye Dog is a playful browser game built to be explored, played and shared. See the project in action.',
  },
  'auth-demo': {
    title: 'Auth Demo: Sign Up and Log In | Fey Jensen',
    description:
      'A working authentication demo: create an account, log in and unlock a photo of Skye the dog.',
  },
};

export function pageFromPath(pathname) {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const route = Object.entries(pageRoutes).find(([, path]) => path === normalized);
  return route ? route[0] : 'home';
}

export function canonicalUrl(page) {
  const path = pageRoutes[page];
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
