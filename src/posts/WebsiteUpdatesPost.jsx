import { pageRoutes } from '../routes';

export const websiteUpdatesPost = {
  page: 'blog-post-website-updates-2027',
  readingTime: '4 min read',
  image: '/assets/photos/small-business-website-updates-2027.jpg',
  deck: "December is the perfect time to review what's working on your small business website before the new year. Small website updates now can help your business start 2027 with a stronger online presence.",
  Content: WebsiteUpdatesContent,
};

function WebsiteUpdatesContent({ onNavigate, onContactNavigate }) {
  return (
    <>
      <section>
        <h2>1. Refresh Your Website's Content and Branding</h2>
        <p>
          A super easy way to update your website is by simply replacing outdated
          photos and reviews. Make sure your website's prices and services are up
          to date. Remove outdated seasonal content. You don't need a full
          redesign to make your small business website feel refreshed and up to date.
        </p>
        <p>
          However, if your website no longer reflects your brand or business
          goals, it might be time for something bigger. Check out my article,{' '}
          <a
            href={pageRoutes['blog-post-website-redesign']}
            onClick={(event) => onNavigate(event, 'blog-post-website-redesign')}
          >
            7 Signs Your Small Business Needs a Website Redesign Before 2027
          </a>
          , to see if a redesign is the right next step.
        </p>
      </section>

      <section>
        <h2>2. Make Sure Your Website Is Mobile-Friendly</h2>
        <p>
          The best way to test if your website looks great on all devices is to
          simply visit it from your phone and tablet. Look for awkward spacing and
          oddly sized text.
        </p>
        <p>
          Google uses mobile-first indexing, meaning it primarily uses the mobile
          version of your website's content for indexing and ranking. Making sure
          your small business website is mobile-friendly is an important part of
          improving your online presence.
        </p>
        <p>
          <a href="https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing" target="_blank" rel="noreferrer">
            Source: Google Search Central – Mobile-First Indexing
          </a>
        </p>
      </section>

      <section>
        <h2>3. Give Your Website's SEO a Refresh</h2>
        <p>
          Update your pages with relevant keywords. A great place to research
          keywords is{' '}
          <a href="https://ads.google.com/home/tools/keyword-planner/" target="_blank" rel="noreferrer">Google Keyword Planner</a>,
          which helps you discover keywords related to your business.
        </p>
        <p>
          Make sure photos have descriptive alt text. Don't add keywords unless
          they are relevant to the photo. Make sure all links work, and add
          internal links between related pages and blog posts.
        </p>
        <p>
          According to Google Search Central, descriptive anchor text helps both
          users and search engines understand the content of linked pages.
        </p>
        <p>
          <a href="https://developers.google.com/search/docs/crawling-indexing/links-crawlable" target="_blank" rel="noreferrer">
            Source: Google Search Central – Link Best Practices
          </a>
        </p>
      </section>

      <section>
        <h2>4. Improve Your Calls to Action</h2>
        <p>
          Make it obvious what you want your visitors to think and do next.
          Buttons need to be specific. Change generic text like "Learn More" to
          something more actionable, such as "Book a Consultation."
        </p>
        <p>
          A small business website should help turn visitors into customers.
          Clear calls to action can make it easier for potential clients to take
          the next step, whether that's booking a service, submitting an inquiry,
          or making a purchase.
        </p>
      </section>

      <section>
        <h2>5. Test Your Website's Loading Speed and Accessibility</h2>
        <p>
          Compress images to make sure they load quickly. A great resource is{' '}
          <a href="https://pagespeed.web.dev/" target="_blank" rel="noreferrer">Google PageSpeed Insights</a>,
          which analyzes your website's performance and provides suggestions for
          improvement.
        </p>
        <p>
          Make sure your text is easy to read with sufficient contrast between
          the text and background. According to the Web Content Accessibility
          Guidelines (WCAG), normal-sized text should generally have a contrast
          ratio of at least 4.5:1 to meet Level AA requirements.
        </p>
        <p>
          <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" target="_blank" rel="noreferrer">
            Source: W3C – Understanding Contrast (Minimum)
          </a>
        </p>
        <p>
          Your website should grow alongside your business. Whether you're making
          a few small updates or planning a complete redesign, now is the perfect
          time to make sure your online presence is ready for everything 2027 has
          in store.
        </p>
      </section>

      <section className="blog-conclusion">
        <h2>Ready to refresh your website?</h2>
        <p>
          Whether you need a few updates or a bigger redesign, I can help you
          create a website that supports your business.
        </p>
        <a className="primary-btn" href="/#contact" onClick={onContactNavigate}>
          Book a free website consultation
        </a>
      </section>
    </>
  );
}
