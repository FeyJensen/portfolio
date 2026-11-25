import { pageRoutes } from '../routes';

export const yearEndWebsiteAuditPost = {
  page: 'blog-post-year-end-website-audit',
  readingTime: '6 min read',
  image: '/assets/photos/year-end-website-audit.jpg',
  deck: 'Use this year-end website audit checklist to review your content, links, SEO, accessibility, analytics, and client experience before 2027.',
  Content: YearEndWebsiteAuditContent,
};

function YearEndWebsiteAuditContent({ onContactNavigate, onNavigate }) {
  return (
    <>
      <p>
        December is a great time to redesign or update your website. For some
        websites, traffic dips, giving you a quieter window to make changes
        without disruption. Once completed, you&apos;re ready for the January
        pickup!
      </p>
      <p>
        As you&apos;re writing your personal goals, write your business goals
        alongside them. This will help you keep your goals in mind when updating
        or redesigning your website. Even small improvements can help attract
        more clients in 2027.
      </p>
      <p>
        Not sure whether your website needs a few updates or a complete
        redesign? Check out my article on{' '}
        <a
          href={pageRoutes['blog-post-website-redesign']}
          onClick={(event) => onNavigate(event, 'blog-post-website-redesign')}
        >
          7 Signs Your Small Business Needs a Website Redesign Before 2027
        </a>
        .
      </p>
      <p>
        Use this year-end website audit checklist to make sure your small
        business website is ready for the new year.
      </p>

      <section>
        <h2>1. Review Your Website&apos;s Content</h2>
        <p>
          Are your photos, prices, and contact information current? Do you have
          more recent testimonials to add to your site? When was the last time
          you updated your portfolio?
        </p>
        <p>
          Keeping your website up to date helps build trust and credibility
          with potential clients. According to{' '}
          <a href="https://credibility.stanford.edu/guidelines/" target="_blank" rel="noreferrer">
            Stanford University&apos;s Web Credibility Guidelines
          </a>
          , visitors find websites more credible when their content has been
          recently updated or reviewed.
        </p>
        <p>
          Regular content updates should be part of your small business website
          maintenance routine.
        </p>
      </section>

      <section>
        <h2>2. Check for Broken Links and Functionality</h2>
        <p>
          If there&apos;s a button on the page, click it! Make sure it&apos;s
          going where it&apos;s supposed to go. Contact forms? Submit one to
          yourself. And don&apos;t forget to check those easy-to-miss social
          media links!
        </p>
        <p>
          A great free tool for identifying broken links is{' '}
          <a href="https://www.brokenlinkcheck.com/" target="_blank" rel="noreferrer">
            Broken Link Checker
          </a>
          . It scans your website and helps you identify links that are no
          longer working.
        </p>
      </section>

      <section>
        <h2>3. Review Your Website&apos;s SEO</h2>
        <p>
          What is SEO? Don&apos;t worry, I&apos;ve got you! SEO stands for
          Search Engine Optimization. It&apos;s the process of improving your
          website&apos;s visibility in search engines like Google.
        </p>
        <p>
          Start with page titles and meta descriptions. Make sure they are
          using keywords naturally. Don&apos;t force them in if they feel
          unnatural. A great tool for finding keywords is{' '}
          <a href="https://ads.google.com/home/tools/keyword-planner/" target="_blank" rel="noreferrer">
            Google Keyword Planner
          </a>
          .
        </p>
        <p>
          Add descriptive alt text to informative images. And most
          importantly, check whether your pages are indexed by Google. If a
          page isn&apos;t indexed, it won&apos;t appear in Google&apos;s
          regular search results, making it harder for potential clients to
          discover your business.
        </p>
        <p>
          You can use{' '}
          <a href="https://search.google.com/search-console/about" target="_blank" rel="noreferrer">
            Google Search Console
          </a>{' '}
          to check your indexed pages and identify potential small business
          SEO issues. For more website optimization tips, check out{' '}
          <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" target="_blank" rel="noreferrer">
            Google&apos;s SEO Starter Guide
          </a>
          .
        </p>
      </section>

      <section>
        <h2>4. Check Website Accessibility</h2>
        <p>
          Web accessibility is important because it ensures that people with
          disabilities can navigate, understand, and interact with your
          website.
        </p>
        <p>
          It&apos;s important to all visitors because accessible websites can
          also improve readability, navigation, and the overall user
          experience. According to the{' '}
          <a href="https://www.w3.org/WAI/fundamentals/accessibility-intro/" target="_blank" rel="noreferrer">
            World Wide Web Consortium (W3C)
          </a>
          , accessibility also benefits older individuals, people with
          temporary disabilities, and those experiencing situational
          limitations.
        </p>
        <p>
          As part of your website audit checklist, review your color contrast,
          font sizes, image alt text, and keyboard navigation. A great free
          tool for identifying potential accessibility issues is the{' '}
          <a href="https://wave.webaim.org/" target="_blank" rel="noreferrer">
            WAVE Web Accessibility Evaluation Tool
          </a>
          .
        </p>
      </section>

      <section>
        <h2>5. Review Your Website Analytics</h2>
        <p>
          Analytics are a great tool for setting measurable goals for your
          business. They allow you to find which pages are most popular and
          build future content around them.
        </p>
        <p>
          You can also see where these visits are coming from, allowing you to
          identify which marketing channels are driving traffic to your
          website and make more informed decisions about where to invest your
          time and marketing budget.
        </p>
        <p>
          <a href="https://analytics.google.com/" target="_blank" rel="noreferrer">
            Google Analytics
          </a>{' '}
          offers a{' '}
          <a href="https://support.google.com/analytics/answer/12923437" target="_blank" rel="noreferrer">
            Traffic Acquisition Report
          </a>{' '}
          that helps you understand whether visitors are discovering your
          website through organic searches, social media, paid advertising, or
          other sources.
        </p>
      </section>

      <section>
        <h2>6. Evaluate Your Website From a Client&apos;s Perspective</h2>
        <p>
          When creating your site, you have to put yourself in the
          reader&apos;s shoes. Is it immediately clear who you serve and what
          you offer? Does the layout and branding of your site reflect the
          quality of your services?
        </p>
        <p>
          If not, you could be losing out on potential clients. And most
          importantly, is your contact information easy to find?
        </p>
        <p>
          I recommend having your contact information in your website&apos;s
          footer, along with a dedicated contact page that&apos;s easily
          accessible from your navigation menu.{' '}
          <a href="https://sitesuserguide.stanford.edu/build/best-practices/best-practices-providing-contact-information" target="_blank" rel="noreferrer">
            Stanford University&apos;s website best practices
          </a>{' '}
          also recommend placing contact information in the footer so
          it&apos;s accessible from every page.
        </p>
        <p>
          Your homepage is often the first impression potential clients have
          of your business. For more tips on making that first impression
          count, check out{' '}
          <a
            href={pageRoutes['blog-post-small-business-homepage']}
            onClick={(event) => onNavigate(event, 'blog-post-small-business-homepage')}
          >
            5 Things Every Small Business Homepage Needs to Attract More Clients
          </a>
          .
        </p>
      </section>

      <section className="blog-conclusion">
        <h2>Get Your Small Business Website Ready for 2027</h2>
        <p>
          Updating your site doesn&apos;t mean you have to do everything at
          once. Small improvements add up, and quick fixes can bring results
          in the long run.
        </p>
        <p>
          Running quarterly website audits is important because trends, search
          behaviors, and keywords are always changing. Regular website health
          checks can help you identify issues early and ensure your website
          continues to support your business goals.
        </p>
        <p>
          Still not sure where to start? Whether you need a few website
          updates or a complete website redesign, I can help you create a
          website that reflects your brand, supports your business goals, and
          attracts your ideal clients.
        </p>
        <p>
          Let&apos;s get your website ready for 2027!
        </p>
        <a className="primary-btn" href="/#contact" onClick={onContactNavigate}>
          Get in touch
        </a>
      </section>
    </>
  );
}
