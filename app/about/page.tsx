import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AboutContent } from '@/components/about-content'
import { ProfileImage } from '@/components/profile-image'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">About</h1>
        <div className="flex items-start mb-6">
          <div className="flex-grow">
            <p className="mb-4">
              I'm a software engineer and creator of open-source projects. My tech journey began in my teens, tampering with systems to bypass school blocks and exploring web development.
            </p>
            <p className="mb-4">
              I've contributed to various projects, focusing on collaborative coding and open-source communities. "Everything should be as simple as it can be, but not simpler." This mantra drives my work. I believe in simplicity, clarity, and usability. My goal is to craft software that prioritizes performance and functionality, empowering users while remaining efficient, secure, and easy to maintain.
            </p>
          </div>
          <div className="ml-6 flex-shrink-0">
            <ProfileImage />
          </div>
        </div>
        <AboutContent />
      </main>
      <SiteFooter />
    </div>
  )
}

