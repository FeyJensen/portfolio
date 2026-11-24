import { pageRoutes } from '../routes';

export const smallBusinessHomepagePost = {
  page: 'blog-post-small-business-homepage',
  readingTime: '5 min read',
  image: '/assets/photos/small-business-homepage.jpg',
  deck: 'Make a strong first impression with a clear headline, consistent branding, easy-to-find information, social proof, and a call to action that turns visitors into clients.',
  Content: SmallBusinessHomepageContent,
};

function SmallBusinessHomepageContent({ onContactNavigate, onNavigate }) {
  return (
    <>
      <p>
        When it comes to attracting clients, first impressions are everything.
        That includes your small business website&apos;s homepage. It not only
        needs to be beautiful but also functional.
      </p>
      <p>
        According to the{' '}
        <a href="https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/" target="_blank" rel="noreferrer">
          Nielsen Norman Group
        </a>
        , visitors often leave web pages within 10–20 seconds. That means you
        have very little time to communicate what your business has to offer.
        Make sure visitors know who you serve and how you can help.
      </p>

      <section>
        <h2>1. A Clear Headline</h2>
        <p>
          Your homepage should communicate exactly what you have to offer.
          Whimsical headlines are cute, but not if they only say something vague
          like “Bringing Dreams to Life.” Be more specific! Something like
          “Custom Wedding Planning for Modern Couples” immediately tells
          visitors what you do.
        </p>
        <p>
          Try to include relevant keywords in your homepage headlines.
          According to{' '}
          <a href="https://developers.google.com/search/docs/essentials" target="_blank" rel="noreferrer">
            Google Search Central
          </a>
          , using words people search for in prominent places, such as your page
          title and main heading, can help search engines understand your
          content.
        </p>
        <p>
          A great test is to show someone unfamiliar with your work your website.
          Give them five seconds to look at it, then ask them what you do. If
          they get it right, you&apos;re on the right track!
        </p>
      </section>

      <section>
        <h2>2. Professional Branding and High-Quality Images</h2>
        <p>
          Professional doesn&apos;t have to mean expensive. To elevate your small
          business website design, make sure your colors and fonts are
          consistent across every page.
        </p>
        <p>
          High-quality images can also make a big difference. Professional
          photography can be expensive, but websites like{' '}
          <a href="https://unsplash.com/" target="_blank" rel="noreferrer">Unsplash</a>
          {' '}and{' '}
          <a href="https://www.pexels.com/" target="_blank" rel="noreferrer">Pexels</a>
          {' '}offer free stock photos that can be used commercially under their
          respective licenses.
        </p>
        <p>
          Just make sure the photos you choose reflect your brand and the
          services you offer. You don&apos;t need a complete redesign to make your
          website feel more professional.
        </p>
        <p>
          If your website no longer reflects your business, check out my article
          on{' '}
          <a
            href={pageRoutes['blog-post-website-redesign']}
            onClick={(event) => onNavigate(event, 'blog-post-website-redesign')}
          >
            7 Signs Your Small Business Needs a Website Redesign Before 2027
          </a>
          .
        </p>
      </section>

      <section>
        <h2>3. Make Your Services and Information Easy to Find</h2>
        <p>
          Include an overview of your business and services early on your
          homepage. Link to your service pages and contact page so visitors can
          easily find more information.
        </p>
        <p>
          Consider adding starting prices or pricing guides to your website.
          This can help potential clients understand what to expect before
          reaching out.
        </p>
        <p>
          Keep your navigation simple and organized. According to the{' '}
          <a href="https://www.nngroup.com/articles/homepage-design-principles/" target="_blank" rel="noreferrer">
            Nielsen Norman Group&apos;s homepage design guidelines
          </a>
          , a well-designed homepage should help visitors understand what a
          business offers and find the information they need.
        </p>
        <p>
          Your small business homepage shouldn&apos;t make visitors work to find
          what they&apos;re looking for!
        </p>
      </section>

      <section>
        <h2>4. Testimonials and Social Proof</h2>
        <p>
          Potential customers want to know they can trust your business, and a
          great way to build that trust is through testimonials and social
          proof.
        </p>
        <p>
          Include reviews from previous clients, links to your social media
          pages, and examples of your completed work. If relevant, showcase
          awards, certifications, or recognizable brands you&apos;ve worked with.
        </p>
        <p>
          A great way to get more customer reviews is to simply ask! Send a
          friendly follow-up email after completing a project or service and
          include a direct link where customers can leave honest feedback.
        </p>
        <p>
          Keep in mind that platforms like Google prohibit offering discounts,
          free services, or other incentives in exchange for reviews. You can
          learn more in{' '}
          <a href="https://support.google.com/business/answer/7400114" target="_blank" rel="noreferrer">
            Google&apos;s review policies
          </a>
          .
        </p>
      </section>

      <section>
        <h2>5. A Strong Call to Action (CTA)</h2>
        <p>
          This one&apos;s my favorite! Every small business homepage should have a
          clear next step.
        </p>
        <p>
          What do you want your visitors to do next? Book a consultation,
          request a quote, shop products, or submit an inquiry?
        </p>
        <p>
          Make your buttons specific and actionable. Instead of using generic
          text like “Learn More,” try “Explore Our Services” or “Book a
          Consultation.”
        </p>
        <p>
          Place your primary CTA near the top of your homepage. Repeat it
          naturally throughout longer pages, and make sure your buttons are
          easy to find and click.
        </p>
        <p>
          The{' '}
          <a href="https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context" target="_blank" rel="noreferrer">
            Web Content Accessibility Guidelines (WCAG)
          </a>
          {' '}also recommend descriptive link text so users can understand where
          a link will take them.
        </p>
        <p>
          A beautiful homepage is great, but a homepage that helps turn visitors
          into clients is even better!
        </p>
      </section>

      <section className="blog-conclusion">
        <h2>Final Thoughts</h2>
        <p>
          Your homepage doesn&apos;t need to be complicated to be effective. Focus
          on clarity, consistent branding, easy navigation, trust, and clear
          calls to action.
        </p>
        <p>
          A well-designed small business homepage should represent your brand
          while encouraging visitors to take the next step.
        </p>
        <p>
          Take a few minutes to review your own homepage. Can visitors quickly
          understand what you offer? Is your contact information easy to find?
          Do you have a clear call to action?
        </p>
        <p>
          Sometimes, a few simple website updates can make a big difference.
          And if your website needs more than a quick refresh, investing in
          professional website design might be the right next step.
        </p>
        <a
          className="primary-btn"
          href="/#contact"
          onClick={onContactNavigate}
        >
          Book a free website consultation
        </a>
      </section>
    </>
  );
}
