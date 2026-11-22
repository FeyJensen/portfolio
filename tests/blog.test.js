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

    const existingIndex = render('/blog/');
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
