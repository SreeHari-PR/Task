"use client"

import { useEffect, useState, useRef } from "react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(1)
  const previousScrollY = useRef(0)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    setWindowHeight(window.innerHeight || 1)
    setScrollY(window.scrollY)
    previousScrollY.current = window.scrollY

    let rafId = null
    let lastTime = 0
    const fps = 60
    const interval = 1000 / fps

    // Smooth scroll animation using requestAnimationFrame
    const smoothScroll = (time) => {
      rafId = requestAnimationFrame(smoothScroll)
      if (time - lastTime < interval) return
      lastTime = time

      const currentScrollY = window.scrollY

      // Detect if user has scrolled
      if (currentScrollY > 10 && !hasScrolled) {
        setHasScrolled(true)
      }

      const scrollDelta = Math.abs(currentScrollY - previousScrollY.current)
      const lerpFactor = scrollDelta > 30 ? 0.15 : 0.08

      const smoothedScrollY = previousScrollY.current + (currentScrollY - previousScrollY.current) * lerpFactor

      setScrollY(smoothedScrollY)
      previousScrollY.current = smoothedScrollY
    }

    rafId = requestAnimationFrame(smoothScroll)

    const handleResize = () => {
      setWindowHeight(window.innerHeight || 1)
    }

    // Set body height to allow scrolling
    const body = document.body
    body.style.height = "300vh"

    window.addEventListener("resize", handleResize)

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [hasScrolled])

  // Calculate section transitions based on scroll position
  const firstToSecondProgress = Math.min(Math.max(scrollY / windowHeight, 0), 1)
  const secondToThirdProgress = Math.min(Math.max((scrollY - windowHeight) / windowHeight, 0), 1)

  // Calculate section opacities for smooth transitions
  const firstSectionOpacity = Math.min(Math.max(1 - firstToSecondProgress * 1.5, 0), 1)
  const secondSectionOpacity = Math.min(
    Math.max(firstToSecondProgress * 2 - 0.5, 0),
    Math.max(1 - secondToThirdProgress * 1.5, 0),
  )
  const thirdSectionOpacity = Math.min(Math.max(secondToThirdProgress * 2 - 0.5, 0), 1)

  // Visibility states for performance
  const firstSectionVisibility = firstSectionOpacity > 0.01 ? "visible" : "hidden"
  const secondSectionVisibility = secondSectionOpacity > 0.01 ? "visible" : "hidden"
  const thirdSectionVisibility = thirdSectionOpacity > 0.01 ? "visible" : "hidden"

  // Sample image URLs for the cubes
  const cubeImages = [
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300&text=Media",
    "/placeholder.svg?height=300&width=300&text=Content",
    "/placeholder.svg?height=300&width=300&text=Digital",
    "/placeholder.svg?height=300&width=300&text=Creative",
    "/placeholder.svg?height=300&width=300&text=Innovation",
  ]

  return (
    <div className="relative">
      {/* First Section - Hero with Logo */}
      <section
        className="flex min-h-screen flex-col items-center justify-center bg-[#2D1A0C] text-white p-4 fixed w-full"
        style={{
          opacity: firstSectionOpacity,
          visibility: firstSectionVisibility,
          transition: "opacity 0.8s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "opacity, transform",
        }}
      >
        <div className="flex flex-col items-center justify-center max-w-3xl text-center">
          <div className="mb-8">
            <Logo scrollY={scrollY} progress={firstToSecondProgress} hasScrolled={hasScrolled} images={cubeImages} />
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-normal leading-tight">
            The First Media Company crafted For the <span className="block">Digital First generation</span>
          </h1>
        </div>
      </section>

      {/* Second Section - Content with Background Cubes */}
      <section
        className="flex min-h-screen flex-col items-center justify-center bg-[#2D1A0C] text-white p-4 fixed w-full"
        style={{
          opacity: secondSectionOpacity,
          visibility: secondSectionVisibility,
          transition: "opacity 0.8s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "opacity, transform",
        }}
      >
        <div className="relative w-full max-w-6xl mx-auto h-screen flex items-center justify-center">
          <CubesOnFourSides progress={firstToSecondProgress} hasScrolled={hasScrolled} images={cubeImages} />
          <div className="flex flex-col items-center justify-center max-w-xl text-center z-10 px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-normal leading-tight mb-6">
              Where innovation meets precision.
            </h2>
            <p className="text-base md:text-lg">
              Our company unites visionary thinkers, creative architects, and analytical experts, collaborating
              seamlessly to transform challenges into opportunities. Together, we deliver tailored solutions that drive
              impact and inspire growth.
            </p>
          </div>
        </div>
      </section>

      {/* Third Section - Light Background */}
      <section
        className="flex min-h-screen flex-col items-center justify-center bg-[#fff3eb] text-white p-4 fixed w-full"
        style={{
          opacity: thirdSectionOpacity,
          visibility: thirdSectionVisibility,
          transition: "opacity 0.8s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "opacity, transform",
        }}
      >
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-normal leading-tight mb-6 text-black">next page </h2>
        </div>
      </section>
    </div>
  )
}

function CubesOnFourSides({ progress, hasScrolled, images }) {
  const showCubes = progress > 0.5
  const opacity = Math.min(Math.max((progress - 0.5) * 2, 0), 1)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const baseCubeSize = 42
  const cubeSize = baseCubeSize + baseCubeSize * progress

  const cubePositions = [
    { top: "8%", left: "25%", isRotated: false, delay: 100, imageIndex: 0 },
    { top: "8%", right: "25%", isRotated: false, delay: 200, imageIndex: 1 },
    { top: "50%", right: "8%", isRotated: false, delay: 300, transitionToSquare: true, imageIndex: 2 },
    { bottom: "8%", left: "25%", isRotated: false, delay: 400, imageIndex: 3 },
    { bottom: "8%", right: "25%", isRotated: false, delay: 500, imageIndex: 4 },
    { top: "50%", left: "8%", isRotated: false, delay: 600, transitionToSquare: true, imageIndex: 5 },
  ]

  return (
    <div className="absolute inset-0">
      {cubePositions.map((position, index) => (
        <div
          key={index}
          className="absolute transition-all duration-1000 ease-out"
          style={{
            ...position,
            transform: position.top === "50%" ? "translateY(-50%)" : "",
            opacity: showCubes ? opacity : 0,
            transitionDelay: `${position.delay}ms`,
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "transform, opacity",
          }}
        >
          <div
            className="cube perspective-800"
            style={{
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              transform: position.isRotated
                ? `rotate(45deg) scale(${1 + progress * 0.3})`
                : position.transitionToSquare
                  ? `rotate(${45 - progress * 45}deg) scale(${1 + progress * 0.3})`
                  : `scale(${1 + progress * 0.3})`,
              transition:
                "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), width 0.8s cubic-bezier(0.16, 1, 0.3, 1), height 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform, width, height",
            }}
          >
            <div
              className="cube-face cube-face-front"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[position.imageIndex % images.length]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-back"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[(position.imageIndex + 1) % images.length]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-right"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[(position.imageIndex + 2) % images.length]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-left"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[(position.imageIndex + 3) % images.length]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-top"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[(position.imageIndex + 4) % images.length]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-bottom"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[(position.imageIndex + 5) % images.length]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Logo({ scrollY = 0, progress = 0, hasScrolled = false, images = [] }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const getTransform = (index, isRotated = false) => {
    const yMultiplier = [0.05, 0.02, 0.05, 0.08, 0.1, 0.08][index] * 0.5
    const zMultiplier = [-0.1, -0.05, -0.1, -0.02, -0.01, -0.02][index] * 0.5
    const rotateXDeg = scrollY * 0.025
    const rotateYDeg = scrollY * 0.015
    const xOffset = progress * 100 * (index % 3 === 0 ? -1 : index % 3 === 2 ? 1 : 0)
    const yOffset = scrollY * yMultiplier + progress * 50 * (index < 3 ? -1 : 1)
    const scale = 1 + progress * 0.5

    let baseTransform = `translateX(${xOffset}px) translateY(${yOffset}px) translateZ(${scrollY * zMultiplier}px) rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg) scale(${scale})`

    if (isRotated) {
      baseTransform += " rotate(45deg)"
    }

    return baseTransform
  }

  const baseCubeSize = 28
  const cubeSize = baseCubeSize * (1 + progress * 0.5)

  return (
    <div className="relative w-40 h-32 group cursor-pointer perspective-800">
      <div className="absolute flex items-center justify-center w-full">
        <div className="flex items-center">
          <div
            className={`cube transition-all duration-700 ease-out
              ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{
              transform: getTransform(0, true),
              transitionDelay: "100ms",
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform, width, height",
            }}
          >
            <div
              className="cube-face cube-face-front"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[0]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-back"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[1]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-right"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[2]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-left"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[3]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-top"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[4]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-bottom"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[5]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          <div
            className={`cube mx-3 transition-all duration-700 ease-out
              ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{
              transform: getTransform(1),
              transitionDelay: "200ms",
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform, width, height",
            }}
          >
            <div
              className="cube-face cube-face-front"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[1]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-back"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[2]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-right"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[3]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-left"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[4]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-top"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[5]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-bottom"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[0]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          <div
            className={`cube transition-all duration-700 ease-out
              ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{
              transform: getTransform(2, true),
              transitionDelay: "300ms",
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform, width, height",
            }}
          >
            <div
              className="cube-face cube-face-front"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[2]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-back"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[3]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-right"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[4]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-left"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[5]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-top"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[0]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-bottom"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[1]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 flex items-center justify-center w-full">
        <div className="flex space-x-3">
          <div
            className={`cube transition-all duration-700 ease-out
              ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{
              transform: getTransform(3),
              transitionDelay: "400ms",
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform, width, height",
            }}
          >
            <div
              className="cube-face cube-face-front"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[3]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-back"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[4]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-right"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[5]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-left"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[0]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-top"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[1]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-bottom"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[2]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          <div
            className={`cube transition-all duration-700 ease-out
              ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{
              transform: getTransform(4),
              transitionDelay: "500ms",
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform, width, height",
            }}
          >
            <div
              className="cube-face cube-face-front"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[4]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-back"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[5]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-right"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[0]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-left"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[1]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-top"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[2]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-bottom"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[3]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          <div
            className={`cube transition-all duration-700 ease-out
              ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{
              transform: getTransform(5),
              transitionDelay: "600ms",
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform, width, height",
            }}
          >
            <div
              className="cube-face cube-face-front"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[5]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-back"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[0]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-right"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[1]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-left"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[2]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-top"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[3]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="cube-face cube-face-bottom"
              style={{
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                backgroundImage: hasScrolled ? `url(${images[4]})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
