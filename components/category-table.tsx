import Link from 'next/link'
import { getPosts } from '@/lib/ghost'

export async function CategoryTable() {
  const posts = await getPosts()
  
  const categories: Record<string, { name: string; count: number; slug: string }> = {};

  posts.forEach(post => {
    post.tags?.forEach(tag => {
      if (!tag.name.startsWith('#')) {
        if (!categories[tag.name]) {
          categories[tag.name] = { name: tag.name, count: 0, slug: tag.slug };
        }
        categories[tag.name].count++;
      }
    });
  });

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left text-xs uppercase tracking-wider text-muted-foreground font-mono py-2">
            Category
          </th>
          <th className="w-16 text-right text-xs uppercase tracking-wider text-muted-foreground font-mono py-2">
            Articles
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(categories).map(([name, { count, slug }]) => (
          <tr key={slug} className="border-t border-border hover:bg-accent transition-colors">
            <td className="py-3 font-mono text-sm">
              <Link 
                href={`/shelves/${slug}`}
                className="block w-full h-full"
              >
                {name}
              </Link>
            </td>
            <td className="py-3 font-mono text-sm text-right text-muted-foreground">
              {count}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

