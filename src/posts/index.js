import { websiteRedesignPost } from './WebsiteRedesignPost';
import { websiteUpdatesPost } from './WebsiteUpdatesPost';
import { smallBusinessHomepagePost } from './SmallBusinessHomepagePost';
import { yearEndWebsiteAuditPost } from './YearEndWebsiteAuditPost';
import { pageMeta } from '../routes';

export const blogPosts = [
  smallBusinessHomepagePost,
  websiteUpdatesPost,
  websiteRedesignPost,
  yearEndWebsiteAuditPost,
];

export function getNewestBlogPosts(posts = blogPosts) {
  return [...posts].sort((postA, postB) =>
    pageMeta[postB.page].articleSchema.datePublished.localeCompare(
      pageMeta[postA.page].articleSchema.datePublished,
    ),
  );
}
