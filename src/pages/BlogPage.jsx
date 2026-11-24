import { blogPosts } from '../posts';
import { pageMeta, pageRoutes } from '../routes';

function BlogCard({ post, onNavigate }) {
  const meta = pageMeta[post.page];

  return (
    <article className="blog-card">
      <div
        className="blog-card-art"
        aria-hidden="true"
        style={post.image ? { '--blog-post-image': `url("${post.image}")` } : undefined}
      />
      <div className="blog-card-copy">
        <div className="blog-meta">
          <span>{meta.category}</span>
          <span>{post.readingTime}</span>
        </div>
        <h2>
          <a href={pageRoutes[post.page]} onClick={(event) => onNavigate(event, post.page)}>
            {meta.articleSchema.headline}
          </a>
        </h2>
        <p>{meta.description}</p>
        <a
          className="blog-read-link"
          href={pageRoutes[post.page]}
          onClick={(event) => onNavigate(event, post.page)}
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
        <h1>PRACTICAL WEB IDEAS FOR SMALL BUSINESSES.</h1>
        <p>
          Straightforward guidance on web design, performance, SEO, and creating
          a digital presence that supports your next stage of growth.
        </p>
      </header>

      <div className="blog-card-grid">
        {blogPosts.map((post) => (
          <BlogCard key={post.page} post={post} onNavigate={onNavigate} />
        ))}
      </div>
    </main>
  );
}

export function BlogPostPage({ post, onContactNavigate, onNavigate }) {
  const meta = pageMeta[post.page];
  const relatedPosts = blogPosts.filter((relatedPost) => relatedPost.page !== post.page);
  const publishedDate = meta.articleSchema.datePublished;
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${publishedDate}T00:00:00Z`));
  const Content = post.Content;

  return (
    <main className="blog-post-page">
      <article className="blog-article" itemScope itemType="https://schema.org/Article">
        <header
          className="blog-article-header"
          style={post.image ? { '--blog-post-image': `url("${post.image}")` } : undefined}
        >
          <div className="blog-meta blog-article-meta">
            <span>{meta.category}</span>
            <time dateTime={publishedDate} itemProp="datePublished">{formattedDate}</time>
            <span>{post.readingTime}</span>
          </div>
          <h1 itemProp="headline">{meta.articleSchema.headline}</h1>
          <p className="blog-deck" itemProp="description">{post.deck}</p>
        </header>

        <div className="blog-article-content" itemProp="articleBody">
          <Content onContactNavigate={onContactNavigate} onNavigate={onNavigate} />
          <ul className="blog-tags" aria-label="Article tags">
            {meta.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </article>
      <section className="related-content" aria-labelledby="related-content-heading">
        <h2 id="related-content-heading">Related Content</h2>
        <div className="related-content-grid">
          {relatedPosts.map((relatedPost) => {
            const relatedMeta = pageMeta[relatedPost.page];
            return (
              <article className="related-content-card" key={relatedPost.page}>
                <a
                  className="related-content-link"
                  href={pageRoutes[relatedPost.page]}
                  onClick={(event) => onNavigate(event, relatedPost.page)}
                >
                  <div
                    className="related-content-art"
                    aria-hidden="true"
                    style={{
                      '--related-content-image': `url("${relatedPost.image || '/assets/photos/blog-post-hero.jpg'}")`,
                    }}
                  />
                  <div className="related-content-copy">
                    <span className="related-content-category">{relatedMeta.category}</span>
                    <h3>{relatedMeta.articleSchema.headline}</h3>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
