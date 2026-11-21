import { pageMeta, pageRoutes } from '../routes';

const postMetadata = pageMeta['blog-post-website-redesign'];

const post = {
  slug: pageRoutes['blog-post-website-redesign'],
  title: '7 Signs Your Small Business Needs a Website Redesign Before 2027',
  description: postMetadata.description,
  category: postMetadata.category,
  tags: postMetadata.tags,
  publishedDate: '2026-11-20',
  readingTime: '6 min read',
};

function BlogCard({ onNavigate }) {
  return (
    <article className="blog-card">
      <div className="blog-card-art" aria-hidden="true">
        <span>2027</span>
        <img src="/assets/photos/PinkStar.png" alt="" />
        <img src="/assets/photos/PurpleStar.png" alt="" />
      </div>
      <div className="blog-card-copy">
        <div className="blog-meta">
          <span>{post.category}</span>
          <span>{post.readingTime}</span>
        </div>
        <h2>
          <a
            href={post.slug}
            onClick={(event) => onNavigate(event, 'blog-post-website-redesign')}
          >
            {post.title}
          </a>
        </h2>
        <p>{post.description}</p>
        <a
          className="blog-read-link"
          href={post.slug}
          onClick={(event) => onNavigate(event, 'blog-post-website-redesign')}
        >
          Read the article <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

export function BlogPage({ onNavigate }) {
  return (
    <main className="blog-page">
      <header className="blog-index-header">
        <span className="eyebrow">The Fey Jensen blog</span>
        <h1>Practical ideas for a website that works harder.</h1>
        <p>
          Straightforward guidance on web design, performance, SEO, and creating
          a digital presence that supports your next stage of growth.
        </p>
      </header>

      <div className="blog-card-grid">
        <BlogCard onNavigate={onNavigate} />
      </div>
    </main>
  );
}

export function BlogPostPage({ onContactNavigate }) {
  return (
    <main className="blog-post-page">
      <article className="blog-article" itemScope itemType="https://schema.org/Article">
        <header className="blog-article-header">
          <div className="blog-meta blog-article-meta">
            <span>{post.category}</span>
            <time dateTime={post.publishedDate} itemProp="datePublished">
              November 20, 2026
            </time>
            <span>{post.readingTime}</span>
          </div>
          <h1 itemProp="headline">{post.title}</h1>
          <p className="blog-deck" itemProp="description">
            As 2027 approaches, now is the perfect time to evaluate your small
            business website and decide whether a refresh could support your
            next stage of growth.
          </p>
        </header>

        <div className="blog-article-content" itemProp="articleBody">
          <p>
            Whether you are looking to attract more clients, increase your
            prices, or improve your online presence, a small business website
            redesign could be the next step in growing your business. Here are
            seven signs it is time to give your website a refresh.
          </p>

          <section>
            <h2>1. Your website no longer reflects your brand</h2>
            <blockquote>
              “I want to start charging my clients more.” “I haven’t updated my
              site in years. What do I do?” “My website doesn’t reflect the
              quality of my work.”
            </blockquote>
            <p>
              Sound familiar? You’re not alone. The ever-changing landscape of
              web design can be scary and expensive. But it doesn’t have to be.
              Start small with your brand design: make your colors and fonts
              consistent, then create clear, cohesive brand guidelines.
            </p>
            <p>
              Moving away from an outdated website design and creating a more
              cohesive online presence can help clients take you more seriously
              and better understand the value behind your prices.
            </p>
          </section>

          <section>
            <h2>2. Your website isn’t mobile-friendly</h2>
            <p>
              Approximately 60% of global web traffic comes from mobile devices
              (<a href="https://gs.statcounter.com/platform-market-share/" target="_blank" rel="noreferrer">Statcounter</a>).
            </p>
            <p>
              Mobile-friendly web design is also important for SEO because
              Google primarily uses the mobile version of your website to index
              and rank your content in search results
              (<a href="https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing" target="_blank" rel="noreferrer">Google Search Central</a>).
            </p>
            <p>
              If your small business website isn’t optimized for mobile
              devices, you could be missing out on potential customers.
            </p>
          </section>

          <section>
            <h2>3. Your website takes too long to load</h2>
            <p>
              This is a big one. When testing your website on your own computer,
              your browser caches certain website resources. So when you reload
              the page, you won’t always experience what a first-time visitor
              does.
            </p>
            <p>
              A simple way to begin optimizing your website is to keep images
              under 500 KB whenever possible without sacrificing quality.
              Consider modern image formats like WebP for faster loading.
            </p>
            <p>
              Use <a href="https://pagespeed.web.dev/" target="_blank" rel="noreferrer">Google PageSpeed Insights</a>
              <span> as a free resource to test your website’s performance and identify
              areas for improvement.</span>
            </p>
          </section>

          <section>
            <h2>4. You’re struggling to show up on Google</h2>
            <p>
              SEO stands for search engine optimization. It involves following
              best practices to improve your website’s visibility on search
              engines like Google.
            </p>
            <p>
              It can sound overwhelming at first, but page titles, meta
              descriptions, and descriptive image alt text can help make your
              website more accessible and easier to discover.
            </p>
            <p>
              SEO is especially important for small businesses because local
              search optimization can help potential customers in your area find
              the products or services you offer
              (<a href="https://support.google.com/business/answer/7091" target="_blank" rel="noreferrer">Google Business Profile</a>).
            </p>
          </section>

          <section>
            <h2>5. Your website isn’t turning visitors into customers</h2>
            <p>
              Think of how you navigate a website. According to research from
              the <a href="https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/" target="_blank" rel="noreferrer">Nielsen Norman Group</a>,
              the first 10 seconds are particularly important in determining
              whether a visitor stays or leaves.
            </p>
            <p>
              Complicated navigation, difficult-to-find contact information,
              and a lack of testimonials could be reasons you are losing sales.
            </p>
            <p>
              Effective small business web design should not only look good; it
              should make it easy for potential clients to understand what you
              offer and take the next step.
            </p>
          </section>

          <section>
            <h2>6. Updating your website feels like a chore</h2>
            <p>
              To be honest, it can be. Best practices and trends are always
              changing. Your website may have been great when you first got
              started, but if you want people to take you more seriously and
              bring in more clients, it is important to keep your website
              updated, functional, and secure.
            </p>
            <p>
              Regular website maintenance is an important part of running a
              small business. For example, <a href="https://wordpress.org/documentation/article/updating-wordpress/" target="_blank" rel="noreferrer">WordPress</a>
              <span> recommends keeping website software current to benefit from
              security fixes and improvements.</span>
            </p>
            <p>
              If making simple updates feels overwhelming, it might be time to
              consider a website platform that better suits your business needs.
            </p>
          </section>

          <section>
            <h2>7. Your website isn’t ready for your 2027 business goals</h2>
            <p>
              More clients can mean more work, so it is time to automate. You
              may need better integrations, automation, and booking
              capabilities.
            </p>
            <p>
              From automated inquiry forms and appointment scheduling to email
              marketing integrations, custom website development can help
              streamline your day-to-day operations.
            </p>
            <p>
              Less time spent on miscellaneous tasks means more time focusing
              on your clients’ individual needs.
            </p>
          </section>

          <section className="blog-conclusion">
            <h2>So, what now?</h2>
            <p>Start 2027 with a website that works for you.</p>
            <p>
              Not every small business needs a complete website redesign.
              Sometimes, strategic improvements to performance, accessibility,
              SEO, and user experience are enough.
            </p>
            <p>
              Whether you are looking for a simple website refresh or a complete
              redesign, I can help.
            </p>
            <a
              className="primary-btn"
              href="/#contact"
              onClick={onContactNavigate}
            >
              Book a free website consultation
            </a>
          </section>
          <ul className="blog-tags" aria-label="Article tags">
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </article>
    </main>
  );
}
