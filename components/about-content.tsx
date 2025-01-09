'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FlapProps {
  title: string
  children: React.ReactNode
}

function Flap({ title, children }: FlapProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4">
      <button
        className="w-full flex justify-between items-center p-4 bg-secondary rounded-lg text-left font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-secondary/50 rounded-lg">
          {children}
        </div>
      )}
    </div>
  )
}

export function AboutContent() {
  return (
    <div className="space-y-6">
      <Flap title="Technical Contributions">
        <p>
          Looking forward to contributing more soon, particularly in areas focused on enhancing developer tools, improving open-source libraries, and optimizing performance across web platforms.
        </p>
      </Flap>

      <Flap title="My Devices">
        <p className="mb-2">I use a variety of devices, all minimalist setups, all optimized for productivity and development.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>MacBook Pro (MacBookPro9,2) as my daily driver for writing and mathematics work.</li>
          <li>Headless MacBook Pro (MacBookPro9,1) for web-development, scripting, and software-engineering.</li>
          <li>ThinkPad (T420) for pentesting.</li>
          <li>HHKB (Type S) 60%</li>
          <li>IBM (Model M) 100%</li>
          <li>Custom Build: Motherboard: B450M | CPU: Ryzen 7 5700G | GPU: Radeon RX 6800 | RAM: 32GB Corsair Vengeance DDR4 | SSD: 2TB Samsung 980 Pro | HDD: 8TB Seagate BarraCuda.</li>
        </ul>
      </Flap>

      <Flap title="My Software & OS">
        <p className="mb-2">I believe in using powerful, efficient tools that fit my needs. Here's a list of the key software and OS I use:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Gentoo Linux on my custom build.</li>
          <li>Asashi Linux on my (MacBookPro9,1)</li>
          <li>Arch Linux on my (MacBookPro9,2)</li>
          <li>Black Arch on my (ThinkPad T420)</li>
          <li>Akamai for Cloud VMs.</li>
          <li>Thorium with privacy-focused extensions.</li>
          <li>Surf for light weight browsing.</li>
        </ul>
      </Flap>

      <Flap title="My Philosophy">
        <p className="mb-2">
          "Everything should be as simple as it can be, but not simpler." This mantra drives my work. I believe in simplicity, clarity, and frugality in design. My goal is to create software that prioritizes usability and performance, designed for experienced users who value simplicity and efficiency.
        </p>
        <p className="mb-2">
          I view complexity as the enemy of good software. By stripping away unnecessary features and focusing on the core purpose, I aim to craft software that is not only easy to maintain but also fast, secure, and sustainable. True progress is achieved through intentional subtraction, where each decision is made with purpose, and every line of code has meaning.
        </p>
        <p>
          My work is rooted in the belief that simplicity is the key to ingenuity. Software should empower users, respect their privacy, and prioritize functionality over form.
        </p>
      </Flap>

      <Flap title="Contact">
  <p className="mb-2">If you'd like to get in touch, feel free to reach out to me through the following channels:</p>
  <ul className="list-disc pl-5 space-y-2">
    <li><a href="mailto:krisyotam@protonmail.com" className="text-blue-500 hover:underline">Email</a></li>
    <li><a href="https://github.com/krisyotam" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a></li>
    <li><a href="https://www.linkedin.com/in/krisyotam/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn</a></li>
  </ul>
  <p className="mt-2">I'm always open to discussing new projects, collaborations, or opportunities!</p>
</Flap>

    </div>
  )
}

