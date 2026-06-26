import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Camera, Sparkles, Image as ImageIcon, Film, Aperture } from 'lucide-react'

export default function GalleryAnimatedBg() {
  const iconList = [Camera, Sparkles, ImageIcon, Film, Aperture]
  
  const iconsData = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      IconComponent: iconList[i % iconList.length],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {iconsData.map((data, i) => {
        const { IconComponent, left, top, duration, delay } = data

        return (
          <motion.div
            key={i}
            className="absolute text-[rgba(147,197,253,0.7)]"
            style={{ left, top }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          >
            <IconComponent strokeWidth={1.5} size={40} />
          </motion.div>
        )
      })}
    </div>
  )
}

