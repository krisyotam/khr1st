import { PostTable } from '@/components/post-table'
import { Post } from '@/lib/types'

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p>No posts available at the moment. Please check back later.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <PostTable posts={posts} />
    </div>
  )
}

