import { PostList } from '@/components/post-list'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getPosts } from '@/lib/ghost'

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  try {
    console.log('Fetching posts in Home component');
    const posts = await getPosts();
    console.log(`Fetched ${posts.length} posts`);
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto py-8 max-w-3xl">
          <PostList posts={posts} />
        </main>
        <SiteFooter />
      </div>
    )
  } catch (error) {
    console.error('Error in Home component:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack available');
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="mb-4">We're having trouble loading the blog posts. Please try again later.</p>
        <p className="text-sm text-gray-500">
          Error details: {error instanceof Error ? error.message : JSON.stringify(error)}
        </p>
      </div>
    )
  }
}

