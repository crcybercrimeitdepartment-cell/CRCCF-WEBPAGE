/**
 * LazySection.jsx
 * Renders children only when the section enters the viewport.
 * Prevents below-fold components from executing JS, running timers, or
 * fetching images until the user scrolls near them.
 *
 * Props:
 *  - threshold  : 0–1, how much of the element must be visible (default: 0.05)
 *  - rootMargin : IntersectionObserver rootMargin string (default: "200px")
 *                 "200px" means start loading 200px before it enters view
 *  - fallback   : JSX to show while not yet in view (default: transparent div)
 *  - className  : extra classes to pass to the wrapper div
 *  - style      : extra inline styles for the wrapper div
 */
import { useRef, useState, useEffect } from 'react'

export default function LazySection({
  children,
  threshold = 0.05,
  rootMargin = '200px',
  fallback = null,
  className = '',
  style,
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If IntersectionObserver isn't supported, just render immediately
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Once visible, never hide again
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={ref} className={className} style={style}>
      {isVisible ? children : fallback}
    </div>
  )
}
