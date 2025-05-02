"use client"

import { useState, useEffect } from "react"
import { motion, useTransform, type MotionValue } from "framer-motion"

interface ImageCubeProps {
  index: number
  hasScrolled: boolean
  imageUrl: string | null
  progress: MotionValue<number>
  size?: number
  rotated?: boolean
  isSecondSection?: boolean
  customImage?: boolean
  imagePosition?: "top-left" | "top-right" | "middle-left" | "middle-right" | "bottom-left" | "bottom-right"
}

export function ImageCube({
  index,
  hasScrolled,
  imageUrl,
  progress,
  size = 40,
  rotated = false,
  isSecondSection = false,
  customImage = false,
  imagePosition,
}: ImageCubeProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Define default values for transforms
  const defaultRotate = [0, 0, 0]
  const defaultTranslate = [0, 0, 0]
  const defaultScale = [1, 1.1, 1]
  const defaultFaceDepth = [20, 10, 0]

  // Smooth transition from cube to square based on scroll progress
  const rotateX = useTransform(progress, [0, 0.5, 1], defaultRotate)
  const rotateY = useTransform(progress, [0, 0.5, 1], defaultRotate)
  const faceDepth = useTransform(progress, [0, 0.5, 1], defaultFaceDepth)

  // Depth transition - from deep to flat
  const translateZ = useTransform(progress, [0, 0.5, 1], [0, 50, 0])

  // Scale transition - grow slightly then normalize
  const scale = useTransform(progress, [0, 0.5, 1], defaultScale)

  // Rotation transition for rotated cubes
  const rotateZ = useTransform(progress, [0, 1], rotated ? [45, 0] : [0, 0])

  // Different movement patterns for each cube
  const translateXValues = isSecondSection
    ? [0, 0, 0] // No horizontal movement for second section
    : [0, index % 3 === 0 ? -50 : index % 3 === 2 ? 50 : 0, index % 3 === 0 ? -100 : index % 3 === 2 ? 100 : 0]

  const translateYValues = isSecondSection
    ? [0, 0, 0] // No vertical movement for second section
    : [0, index < 3 ? -25 : 25, index < 3 ? -50 : 50]

  const translateX = useTransform(progress, [0, 0.5, 1], translateXValues)
  const translateY = useTransform(progress, [0, 0.5, 1], translateYValues)

  // Calculate opacity for non-front faces to fade them out during transition
  const nonFrontFaceOpacity = useTransform(progress, [0, 0.7, 1], [1, 0.3, 0])

  // Set loaded state
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Get the correct image section based on position
  const getImageStyle = (): { backgroundPosition?: string } => {
    if (!customImage || !imagePosition) return {}

    // Extract the specific part of the image based on position
    const positions = {
      "top-left": { backgroundPosition: "25% 15%" },
      "top-right": { backgroundPosition: "75% 15%" },
      "middle-left": { backgroundPosition: "25% 50%" },
      "middle-right": { backgroundPosition: "75% 50%" },
      "bottom-left": { backgroundPosition: "25% 85%" },
      "bottom-right": { backgroundPosition: "75% 85%" },
    }

    return positions[imagePosition] || {}
  }

  // Calculate face styles with transition
  const getFaceStyle = (face: string) => {
    const baseStyle = {
      backgroundImage: hasScrolled && imageUrl ? `url(${imageUrl})` : "none",
      backgroundSize: customImage ? "600%" : "cover",
      backgroundPosition: customImage ? getImageStyle()?.backgroundPosition || "center" : "center",
      transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    }

    return baseStyle
  }

  return (
    <motion.div
      className="relative"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        perspective: "800px",
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 0.8,
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          translateX,
          translateY,
          translateZ,
          scale,
          rotateZ,
        }}
      >
        {/* Front face - always visible */}
        <motion.div
          className="absolute w-full h-full bg-white border border-white/30"
          style={{
            ...getFaceStyle("front"),
            translateZ: faceDepth,
            backfaceVisibility: "hidden",
          }}
        />

        {/* Other faces with fading opacity */}
        <motion.div
          className="absolute w-full h-full bg-white/80 border border-white/30"
          style={{
            ...getFaceStyle("back"),
            rotateY: 180,
            translateZ: faceDepth,
            backfaceVisibility: "hidden",
            opacity: nonFrontFaceOpacity,
          }}
        />

        <motion.div
          className="absolute w-full h-full bg-white/90 border border-white/30"
          style={{
            ...getFaceStyle("right"),
            rotateY: 90,
            translateZ: faceDepth,
            backfaceVisibility: "hidden",
            opacity: nonFrontFaceOpacity,
          }}
        />

        <motion.div
          className="absolute w-full h-full bg-white/90 border border-white/30"
          style={{
            ...getFaceStyle("left"),
            rotateY: -90,
            translateZ: faceDepth,
            backfaceVisibility: "hidden",
            opacity: nonFrontFaceOpacity,
          }}
        />

        <motion.div
          className="absolute w-full h-full bg-white/90 border border-white/30"
          style={{
            ...getFaceStyle("top"),
            rotateX: 90,
            translateZ: faceDepth,
            backfaceVisibility: "hidden",
            opacity: nonFrontFaceOpacity,
          }}
        />

        <motion.div
          className="absolute w-full h-full bg-white/90 border border-white/30"
          style={{
            ...getFaceStyle("bottom"),
            rotateX: -90,
            translateZ: faceDepth,
            backfaceVisibility: "hidden",
            opacity: nonFrontFaceOpacity,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
