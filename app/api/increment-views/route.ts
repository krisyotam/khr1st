import { incrementViews } from '@/lib/ghost'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { slug } = await request.json()
    if (typeof slug !== 'string') {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
    }

    await incrementViews(slug)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error incrementing views:', error)
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 })
  }
}

