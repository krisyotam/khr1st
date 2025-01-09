import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getPostBySlug, getViews } from '@/lib/ghost'
import { ViewCounter } from '@/components/view-counter'

export const revalidate = 3600; // Revalidate every hour

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  const views = await getViews(params.slug)

  if (!post) {
    notFound()
  }

  function getTimeAgo(date: string) {
    const years = new Date().getFullYear() - new Date(date).getFullYear()
    return `${years}y ago`
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-8 max-w-3xl">
        <article className="post">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="font-mono text-sm text-muted-foreground mb-8">
            <a href="https://x.com/krisyotam" target="_blank" rel="noopener noreferrer" className="hover:underline">
              @krisyotam
            </a> | {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} ({getTimeAgo(post.published_at)})
          </p>
          <ViewCounter slug={post.slug} initialViews={views} />
          <section className="content markdown-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}

