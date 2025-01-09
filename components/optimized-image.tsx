import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
}

export function OptimizedImage({ src, alt, className }: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className={className}
      loading="lazy"
      quality={75}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 800px"
    />
  )
}

