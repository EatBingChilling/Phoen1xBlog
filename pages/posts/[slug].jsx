// pages/posts/[slug].jsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import Head from 'next/head';

// 建议使用 getStaticProps + getStaticPaths，因为博客内容是静态的，性能更好
export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDir);
  const paths = filenames.map(name => ({
    params: { slug: name.replace(/\.md$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const file = fs.readFileSync(path.join(process.cwd(), 'posts', `${slug}.md`), 'utf-8');
  const { data, content } = matter(file);
  const html = new MarkdownIt().render(content);

  return {
    props: {
      post: {
        meta: data,
        html,
      },
    },
  };
}

export default function PostPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.meta.title} - 我的博客</title>
      </Head>
      <article>
        <h1>{post.meta.title}</h1>
        <p style={{ color: 'var(--mdui-color-on-surface-variant)' }}>
          发布于 {new Date(post.meta.date).toLocaleDateString()}
        </p>
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </>
  );
}