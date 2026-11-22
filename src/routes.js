export const SITE_URL = 'https://www.feyjensen.com';

const blogPostCategory = 'Web Design & Development';
const blogPostTags = [
  'Small Business',
  'Website Redesign',
  'SEO',
  'Web Development',
  'Website Maintenance',
  'Digital Marketing',
  '2027 Business Planning',
];
const blogPostFocusKeyword = 'Small business website redesign';

export const pageRoutes = {
  home: '/',
  blog: '/blog/',
  'blog-post-website-redesign': '/blog/small-business-website-redesign/',
  resume: '/resume',
  shop: '/projects/shop-demo',
  videogamedemo: '/projects/videogamedemo',
  'auth-demo': '/projects/auth-demo',
  'client-work': '/client-work',
};

export const pageMeta = {
  home: {
    title: 'Fey Jensen | Web Developer & Web Designer in Portland, OR',
    description:
      'Portland web developer, web designer, custom websites, and small business web design without sounding overly keyword-heavy.'
  },
  blog: {
    title: 'Blog | Web Design & Small Business Growth | Fey Jensen',
    description:
      'Practical articles on web design, website performance, SEO and building an online presence that supports small business growth.',
  },
  'blog-post-website-redesign': {
    title: '7 Signs Your Small Business Needs a Website Redesign in 2027',
    description:
      'Is your website holding your business back? Discover 7 signs you need a website redesign and how to improve your small business website before 2027.',
    ogTitle: 'Is Your Small Business Website Ready for 2027?',
    ogDescription:
      "From outdated branding to slow loading speeds, discover seven signs it's time to upgrade your website and set your small business up for success in 2027.",
    category: blogPostCategory,
    tags: blogPostTags,
    focusKeyword: blogPostFocusKeyword,
    articleSchema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: '7 Signs Your Small Business Needs a Website Redesign Before 2027',
      description:
        'Is your website holding your business back? Discover 7 signs you need a website redesign and how to improve your small business website before 2027.',
      articleSection: blogPostCategory,
      keywords: [blogPostFocusKeyword, ...blogPostTags],
      datePublished: '2026-11-20',
      dateModified: '2026-11-20',
      author: {
        '@type': 'Person',
        name: 'Fey Jensen',
        url: 'https://www.feyjensen.com/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Fey Jensen Web Dev',
        url: 'https://www.feyjensen.com/',
      },
      mainEntityOfPage:
        'https://www.feyjensen.com/blog/small-business-website-redesign/',
    },
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
  const route = Object.entries(pageRoutes).find(
    ([, path]) => (path.length > 1 ? path.replace(/\/+$/, '') : path) === normalized,
  );
  if (route) return route[0];

  const legacyArticlePath =
    '/blog/7-signs-your-small-business-needs-a-website-redesign-before-2027';
  return normalized === legacyArticlePath ? 'blog-post-website-redesign' : 'home';
}

export function canonicalUrl(page) {
  const path = pageRoutes[page];
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
