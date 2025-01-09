import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CategoryTable } from '@/components/category-table'

export default function ShelvesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-8 max-w-3xl">
        <CategoryTable />
      </main>
      <SiteFooter />
    </div>
  )
}

