import Link from 'next/link'
import { getPosts } from '@/lib/ghost'
import { formatDate } from '@/lib/utils'

interface CategoryPostTableProps {
  category: string
}

export async function CategoryPostTable({ category }: CategoryPostTableProps) {
  const allPosts = await getPosts()
  
  const posts = allPosts.filter(post => 
    post.tags?.some(tag => tag.slug === category)
  )

  if (posts.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No posts found in this category
      </div>
    )
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="w-24 text-left text-xs uppercase tracking-wider text-muted-foreground font-mono py-2">
            Date
          </th>
          <th className="text-left text-xs uppercase tracking-wider text-muted-foreground font-mono py-2">
            Title
          </th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.slug} className="border-t border-border hover:bg-accent transition-colors">
            <td className="py-3 font-mono text-sm text-muted-foreground">
              {new Date(post.published_at).getFullYear()}
            </td>
            <td className="py-3 font-mono text-sm">
              <Link 
                href={`/post/${post.slug}`}
                className="block w-full h-full"
              >
                {post.title}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

