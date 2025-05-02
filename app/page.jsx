"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ImageCube } from "@/components/image-cube"

export default function Home() {
  const { scrollY } = useScroll()
  const [hasScrolled, setHasScrolled] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Smooth scroll progress values with spring physics
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Track if user has scrolled
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 10 && !hasScrolled) {
      setHasScrolled(true)
    }
  })

  // Calculate section transitions based on scroll position
  const firstSectionOpacity = useTransform(smoothScrollY, [0, windowHeight * 0.8], [1, 0])
  const secondSectionOpacity = useTransform(
    smoothScrollY,
    [windowHeight * 0.2, windowHeight * 0.8, windowHeight * 1.2, windowHeight * 1.8],
    [0, 1, 1, 0],
  )
  const thirdSectionOpacity = useTransform(smoothScrollY, [windowHeight * 1.2, windowHeight * 1.8], [0, 1])

  // Calculate progress for animations with smoother transition
  const firstToSecondProgress = useTransform(smoothScrollY, [windowHeight * 0.3, windowHeight * 0.8], [0, 1], {
    clamp: true,
  })
  const secondToThirdProgress = useTransform(smoothScrollY, [windowHeight, windowHeight * 2], [0, 1], { clamp: true })

  // Sample image URLs for the cubes - will be replaced with actual images
  const cubeImages = [
    "/placeholder.svg?height=300&width=300&text=Blue",
    "/placeholder.svg?height=300&width=300&text=Pink",
    "/placeholder.svg?height=300&width=300&text=Gray",
    "/placeholder.svg?height=300&width=300&text=Green",
    "/placeholder.svg?height=300&width=300&text=Purple",
    "/placeholder.svg?height=300&width=300&text=Dark",
  ]

  useEffect(() => {
    setWindowHeight(window.innerHeight)

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    // Set body height to allow scrolling
    document.body.style.height = "300vh"

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative">
      {/* First Section - Hero with Logo */}
      <motion.section
        className="flex min-h-screen flex-col items-center justify-center bg-[#2D1A0C] text-white p-4 fixed w-full"
        style={{
          opacity: firstSectionOpacity,
          pointerEvents: hasScrolled ? "none" : "auto",
        }}
      >
        <div className="flex flex-col items-center justify-center max-w-3xl text-center">
          <div className="mb-8 relative h-32 w-full">
            <LogoCubes progress={firstToSecondProgress} hasScrolled={hasScrolled} images={cubeImages} />
          </div>
          <motion.h1
            className="text-3xl md:text-5xl font-serif font-normal leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The First Media Company crafted For the <span className="block">Digital First generation</span>
          </motion.h1>
        </div>
      </motion.section>

      {/* Second Section - Content with Background Cubes */}
      <motion.section
        className="flex min-h-screen flex-col items-center justify-center bg-[#2D1A0C] text-white p-4 fixed w-full"
        style={{
          opacity: secondSectionOpacity,
          pointerEvents: hasScrolled ? "auto" : "none",
        }}
      >
        <div className="relative w-full max-w-6xl mx-auto h-screen flex items-center justify-center">
          {/* Top row squares */}
          <div className="absolute top-[15%] left-[25%] transform -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: hasScrolled ? 1 : 0, scale: hasScrolled ? 1 : 0.8 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              <ImageCube
                index={0}
                hasScrolled={hasScrolled}
                imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-R4ZBP9niPs21tUXLghfP4as7d7RWTd.png"
                progress={firstToSecondProgress}
                size={120}
                isSecondSection={true}
                customImage={true}
                imagePosition="top-left"
              />
            </motion.div>
          </div>

          <div className="absolute top-[15%] right-[25%] transform translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: hasScrolled ? 1 : 0, scale: hasScrolled ? 1 : 0.8 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <ImageCube
                index={1}
                hasScrolled={hasScrolled}
                imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-R4ZBP9niPs21tUXLghfP4as7d7RWTd.png"
                progress={firstToSecondProgress}
                size={120}
                isSecondSection={true}
                customImage={true}
                imagePosition="top-right"
              />
            </motion.div>
          </div>

          {/* Middle row squares */}
          <div className="absolute top-1/2 left-[15%] transform -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: hasScrolled ? 1 : 0, scale: hasScrolled ? 1 : 0.8 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <ImageCube
                index={2}
                hasScrolled={hasScrolled}
                imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-R4ZBP9niPs21tUXLghfP4as7d7RWTd.png"
                progress={firstToSecondProgress}
                size={120}
                isSecondSection={true}
                customImage={true}
                imagePosition="middle-left"
              />
            </motion.div>
          </div>

          <div className="absolute top-1/2 right-[15%] transform -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: hasScrolled ? 1 : 0, scale: hasScrolled ? 1 : 0.8 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <ImageCube
                index={3}
                hasScrolled={hasScrolled}
                imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-R4ZBP9niPs21tUXLghfP4as7d7RWTd.png"
                progress={firstToSecondProgress}
                size={120}
                isSecondSection={true}
                customImage={true}
                imagePosition="middle-right"
              />
            </motion.div>
          </div>

          {/* Bottom row squares */}
          <div className="absolute bottom-[15%] left-[25%] transform -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: hasScrolled ? 1 : 0, scale: hasScrolled ? 1 : 0.8 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <ImageCube
                index={4}
                hasScrolled={hasScrolled}
                imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-R4ZBP9niPs21tUXLghfP4as7d7RWTd.png"
                progress={firstToSecondProgress}
                size={120}
                isSecondSection={true}
                customImage={true}
                imagePosition="bottom-left"
              />
            </motion.div>
          </div>

          <div className="absolute bottom-[15%] right-[25%] transform translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: hasScrolled ? 1 : 0, scale: hasScrolled ? 1 : 0.8 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <ImageCube
                index={5}
                hasScrolled={hasScrolled}
                imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-R4ZBP9niPs21tUXLghfP4as7d7RWTd.png"
                progress={firstToSecondProgress}
                size={120}
                isSecondSection={true}
                customImage={true}
                imagePosition="bottom-right"
              />
            </motion.div>
          </div>

          {/* Central text content */}
          <motion.div
            className="flex flex-col items-center justify-center max-w-xl text-center z-10 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-normal leading-tight mb-6">
              Where innovation meets precision.
            </h2>
            <p className="text-base md:text-lg">
              Symphonia unites visionary thinkers, creative architects, and analytical experts, collaborating seamlessly
              to transform challenges into opportunities. Together, we deliver tailored solutions that drive impact and
              inspire growth.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Third Section - Light Background */}
      <motion.section
        className="flex min-h-screen flex-col items-center justify-center bg-[#fff3eb] text-white p-4 fixed w-full"
        style={{
          opacity: thirdSectionOpacity,
          pointerEvents: hasScrolled ? "auto" : "none",
        }}
      >
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center p-4 md:p-8">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-normal leading-tight mb-6 text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
        </div>
      </motion.section>
    </div>
  )
}

function LogoCubes({ progress, hasScrolled, images }) {
  // Cube positions for the logo formation
  const cubePositions = [
    { x: -30, y: -15, z: 0, rotated: true },
    { x: 0, y: -15, z: 0, rotated: false },
    { x: 30, y: -15, z: 0, rotated: true },
    { x: -30, y: 15, z: 0, rotated: false },
    { x: 0, y: 15, z: 0, rotated: false },
    { x: 30, y: 15, z: 0, rotated: false },
  ]

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-3 gap-3">
        {cubePositions.map((pos, index) => (
          <ImageCube
            key={index}
            index={index}
            hasScrolled={hasScrolled}
            imageUrl={hasScrolled ? images[index % images.length] : null}
            progress={progress}
            rotated={pos.rotated}
            isSecondSection={false}
          />
        ))}
      </div>
    </div>
  )
}
