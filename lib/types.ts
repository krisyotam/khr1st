export interface Post {
  title: string
  slug: string
  published_at: string
  views: number
  tags?: {
    name: string
    slug: string
  }[]
}

export interface FullPost extends Post {
  html: string
  primary_author?: {
    slug: string
  }
}

