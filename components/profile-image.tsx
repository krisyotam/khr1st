'use client'

import { useState } from 'react'
import Image from 'next/image'

export function ProfileImage() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href="https://x.com/krisyotam"
      target="_blank"
      rel="noopener noreferrer"
      className="block cursor-pointer"
    >
      <div
        className="relative w-48 h-48"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src="/krisyotam.jpg"
          alt="Kris Yotam"
          fill
          className={`rounded-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <Image
          src="/krisyotam-colored.jpg"
          alt="Kris Yotam (Color)"
          fill
          className={`rounded-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </a>
  )
}

