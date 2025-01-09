import { Redis } from '@upstash/redis'

const API_URL = process.env.GHOST_API_URL!;
const API_KEY = process.env.GHOST_CONTENT_API_KEY!;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

async function fetchFromGhost(endpoint: string) {
  const url = `${API_URL}/ghost/api/v3/content/${endpoint}`;
  console.log(`Fetching from Ghost: ${url}`);
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 } // Revalidate every hour
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Ghost API responded with status: ${res.status}. Response: ${errorText}`);
  }
  
  return res.json();
}

export async function getPosts() {
  const data = await fetchFromGhost(`posts/?key=${API_KEY}&include=tags&limit=500`);
  if (!data.posts) {
    throw new Error('No posts found in Ghost API response');
  }

  // Get all posts first
  const posts = data.posts
    .filter((post: any) => post.tags?.some((tag: any) => tag.name === "#khr1st.com"))
    .map((post: any) => ({
      title: post.title,
      slug: post.slug,
      published_at: post.published_at,
      tags: post.tags,
    }));

  // Then fetch views for all posts
  const postsWithViews = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      views: await getViews(post.slug),
    }))
  );

  return postsWithViews;
}

export async function getPostBySlug(slug: string) {
  const data = await fetchFromGhost(`posts/slug/${slug}/?key=${API_KEY}&include=authors`);
  if (!data.posts || data.posts.length === 0) {
    throw new Error(`No post found with slug: ${slug}`);
  }
  const post = data.posts[0];
  const views = await getViews(slug);
  return { ...post, views };
}

export async function getViews(slug: string): Promise<number> {
  try {
    const views = await redis.get<number>(`pageviews:${slug}`);
    return views ?? 0;
  } catch (error) {
    console.error(`Error getting views for ${slug}:`, error);
    return 0;
  }
}

export async function incrementViews(slug: string): Promise<void> {
  try {
    await redis.incr(`pageviews:${slug}`);
  } catch (error) {
    console.error(`Error incrementing views for ${slug}:`, error);
  }
}

