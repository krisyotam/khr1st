'use client'

import { useEffect } from 'react'

export function ViewCounter({ slug, initialViews }: { slug: string, initialViews: number }) {
  useEffect(() => {
    fetch('/api/increment-views', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    })
  }, [slug])

  return <p className="text-sm text-muted-foreground mb-4">{initialViews} views</p>
}

