export function SiteFooter() {
  return (
    <footer className="">
      <div className="container mx-auto h-16 flex items-center justify-between max-w-3xl text-sm text-muted-foreground">
        <a 
          href="https://github.com/krisyotam" 
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kris Yotam (@krisyotam)
        </a>
        <a 
          href="https://gitserver.vercel.app/" 
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
      </div>
    </footer>
  )
}

