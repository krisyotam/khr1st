import Link from 'next/link'
import { Post } from '@/lib/types'

interface PostTableProps {
  posts: Post[]
}

export function PostTable({ posts }: PostTableProps) {
  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>
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
          <th className="w-16 text-right text-xs uppercase tracking-wider text-muted-foreground font-mono py-2">
            Views
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
            <td className="py-3 font-mono text-sm text-right text-muted-foreground">
              {post.views}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

