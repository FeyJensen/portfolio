import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

test('registered blog posts appear in the index and render at their routes', async () => {
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  try {
    const [{ default: App }, { blogPosts }, { pageMeta, pageRoutes }] = await Promise.all([
      server.ssrLoadModule('/src/App.jsx'),
      server.ssrLoadModule('/src/posts/index.js'),
      server.ssrLoadModule('/src/routes.js'),
    ]);
    const render = (path) => renderToStaticMarkup(React.createElement(App, { initialPath: path }));

    const home = render('/');
    assert.match(home, /Websites Starting at \$350\./);
    assert.match(home, /href="\/pricing\/"/);
    assert.match(home, /href="https:\/\/www\.linkedin\.com\/in\/fey-jensen-7bb826120\/"/);
    assert.match(home, /href="https:\/\/www\.instagram\.com\/feyviolin"/);
    assert.match(home, /Helpful Ideas for Your Website/);
    assert.match(home, /Explore all articles/);
    assert.ok(
      home.indexOf('The Ultimate Year-End Website Audit Checklist') <
        home.indexOf('5 Things Every Small Business Homepage Needs to Attract More Clients'),
    );
    assert.match(home, /href="\/blog\/year-end-website-audit-checklist\/"/);

    const pricingPage = render('/pricing/');
    assert.match(pricingPage, /Website design that fits your next step/);
    assert.match(pricingPage, /\$350/);
    assert.match(pricingPage, /\$550/);
    assert.match(pricingPage, /\$750/);
    assert.match(pricingPage, /Up to 5 pages/);
    assert.match(pricingPage, /foundational on-page SEO/i);
    assert.match(pricingPage, /href="\/#contact"/);
    assert.match(pricingPage, /class="site-footer/);
    assert.equal(pageMeta.pricing.title, 'Website Design Pricing for Small Businesses | Fey Jensen');

    const existingIndex = render('/blog/');
    const newestAuditIndex = existingIndex.indexOf('The Ultimate Year-End Website Audit Checklist');
    const homepageIndex = existingIndex.indexOf('5 Things Every Small Business Homepage Needs to Attract More Clients');
    const updatesIndex = existingIndex.indexOf('5 Website Updates Every Small Business Should Make Before 2027');
    const redesignIndex = existingIndex.indexOf('7 Signs Your Small Business Needs a Website Redesign Before 2027');
    assert.ok(newestAuditIndex < homepageIndex);
    assert.ok(homepageIndex < updatesIndex);
    assert.ok(updatesIndex < redesignIndex);
    for (const post of blogPosts) {
      const relatedMarkup = render(pageRoutes[post.page]).match(
        /<section class="related-content"[\s\S]*?<\/section>/,
      )?.[0];
      assert.ok(relatedMarkup, `Related content should render for ${post.page}`);
      for (const relatedPost of blogPosts.filter(({ page }) => page !== post.page)) {
        assert.ok(
          relatedMarkup.includes(`href="${pageRoutes[relatedPost.page]}"`),
          `${post.page} should link to ${relatedPost.page}`,
        );
      }
      assert.ok(!relatedMarkup.includes(`href="${pageRoutes[post.page]}"`));
    }

    assert.match(existingIndex, /href="\/blog\/small-business-homepage-attract-more-clients\/"/);
    const homepagePost = render('/blog/small-business-homepage-attract-more-clients/');
    assert.match(homepagePost, /5 Things Every Small Business Homepage Needs to Attract More Clients/);
    assert.match(homepagePost, /November 24, 2026/);
    assert.match(homepagePost, /1\. A Clear Headline/);
    assert.match(homepagePost, /5\. A Strong Call to Action \(CTA\)/);
    assert.match(homepagePost, /small-business-homepage\.jpg/);
    assert.match(homepagePost, /7 Signs Your Small Business Needs a Website Redesign Before 2027/);
    assert.equal(pageMeta['blog-post-small-business-homepage'].articleSchema.keywords.length, 6);

    assert.match(existingIndex, /href="\/blog\/small-business-website-redesign\/"/);
    const existingPost = render('/blog/small-business-website-redesign/');
    assert.match(existingPost, /November 20, 2026/);
    assert.match(existingPost, /7\. Your website isn’t ready for your 2027 business goals/);
    assert.match(existingPost, /href="\/#contact"/);
    assert.match(render('/blog/7-signs-your-small-business-needs-a-website-redesign-before-2027/'), /November 20, 2026/);

    assert.match(existingIndex, /href="\/blog\/small-business-website-updates-2027\/"/);
    const updatesPost = render('/blog/small-business-website-updates-2027');
    assert.match(updatesPost, /5 Website Updates Every Small Business Should Make Before 2027/);
    assert.match(updatesPost, /5\. Test Your Website&#x27;s Loading Speed and Accessibility/);
    assert.match(updatesPost, /href="\/blog\/small-business-website-redesign\/"/);
    assert.match(updatesPost, /href="\/#contact">Book a free website consultation<\/a>/);
    assert.match(updatesPost, /small-business-website-updates-2027\.jpg/);
    assert.equal(pageMeta['blog-post-website-updates-2027'].articleSchema.keywords.length, 6);

    assert.match(existingIndex, /href="\/blog\/year-end-website-audit-checklist\/"/);
    const auditPost = render('/blog/year-end-website-audit-checklist/');
    assert.match(auditPost, /The Ultimate Year-End Website Audit Checklist/);
    assert.match(auditPost, /November 25, 2026/);
    assert.match(auditPost, /6\. Evaluate Your Website From a Client&#x27;s Perspective/);
    assert.match(auditPost, /Website Maintenance/);
    assert.match(auditPost, /Website Audits/);
    assert.match(auditPost, /href="\/blog\/small-business-website-redesign\/"/);
    assert.match(auditPost, /href="\/blog\/small-business-homepage-attract-more-clients\/"/);
    assert.match(auditPost, /Traffic Acquisition Report/);
    assert.match(auditPost, /year-end-website-audit\.jpg/);
    assert.equal(pageMeta['blog-post-year-end-website-audit'].title, 'The Ultimate Year-End Website Audit Checklist for 2027');
    assert.equal(pageMeta['blog-post-year-end-website-audit'].focusKeyword, 'Website audit checklist');
    assert.equal(pageMeta['blog-post-year-end-website-audit'].tags.length, 6);

    pageRoutes['blog-test'] = '/blog/test/';
    pageMeta['blog-test'] = {
      category: 'Test category',
      description: 'Test description',
      tags: ['Test tag'],
      articleSchema: { headline: 'Another post', datePublished: '2026-01-02' },
    };
    blogPosts.push({
      page: 'blog-test',
      readingTime: '1 min read',
      deck: 'Test deck',
      Content: () => React.createElement('p', null, 'Test article body'),
    });

    const index = render('/blog/');
    assert.match(index, /href="\/blog\/test\/"/);
    assert.match(index, /Another post/);
    assert.match(index, /small-business-website-redesign/);
    const post = render('/blog/test/');
    assert.match(post, /Test article body/);
    assert.match(post, /January 2, 2026/);
    assert.match(post, /Test tag/);
    assert.match(post, /class="site-footer/);
  } finally {
    await server.close();
  }
});
