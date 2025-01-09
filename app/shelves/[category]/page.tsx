import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CategoryPostTable } from '@/components/category-post-table'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  if (!params.category) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-8 max-w-3xl">
        <h2 id="categoryTitle" className="text-2xl font-bold mb-6">
          Posts in {decodeURIComponent(params.category)}
        </h2>
        <CategoryPostTable category={params.category} />
      </main>
      <SiteFooter />
    </div>
  )
}

