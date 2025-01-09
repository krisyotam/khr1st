import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

export function SiteHeader() {
  return (
    <header className="">
      <div className="container mx-auto h-16 flex items-center justify-between max-w-3xl">
        <div>
          <Link 
            href="/" 
            className="text-lg font-bold hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-sm transition-colors"
          >
            Kris Yotam
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link 
            href="/about"
            className="text-sm font-mono hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-sm transition-colors"
          >
            About
          </Link>
          <Link 
            href="/shelves"
            className="text-sm font-mono hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-sm transition-colors"
          >
            Shelves
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

