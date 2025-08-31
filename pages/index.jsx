// pages/index.jsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { incrementAndGetCounter } from '../lib/counter';

export async function getServerSideProps() {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDir);
  const posts = filenames.map(name => {
    const file = fs.readFileSync(path.join(postsDir, name), 'utf-8');
    const { data } = matter(file);
    return {
      slug: name.replace(/\.md$/, ''),
      meta: data,
    };
  });
  posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
  
  let count = 'N/A';
  try {
    count = await incrementAndGetCounter();
  } catch (error) {
    console.error('Failed to fetch counter:', error);
  }
  
  return { props: { posts, count } };
}

export default function Home({ posts, count }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1>最新文章</h1>
        <mdui-chip>
          <mdui-icon slot="icon" name="people"></mdui-icon>
          {count} 位访客
        </mdui-chip>
      </div>

      <mdui-list>
        {posts.map(p => (
          <Link href={`/posts/${p.slug}`} key={p.slug} passHref legacyBehavior>
            <a style={{ textDecoration: 'none' }}>
              <mdui-card clickable style={{ marginBottom: '16px' }}>
                <mdui-list-item
                  headline={p.meta.title}
                  description={new Date(p.meta.date).toLocaleDateString()}
                />
              </mdui-card>
            </a>
          </Link>
        ))}
      </mdui-list>
    </div>
  );
}