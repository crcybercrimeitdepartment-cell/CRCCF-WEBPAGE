/**
 * LazyImage.jsx
 * Drop-in replacement for <img loading="lazy" decoding="async"> with:
 *  - Native loading="lazy"
 *  - Skeleton placeholder that prevents layout shift
 *  - Smooth fade-in on load
 *  - Explicit width/height reservation
 *
 * Usage:
 *  <LazyImage src={url} alt="description" width={800} height={450} className="..." />
 *
 * For above-the-fold images, pass eager={true} to skip lazy loading.
 */
import { useState } from 'react'

export default function LazyImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  style,
  eager = false,
  objectFit = 'cover',
  ...rest
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <span
      className="inline-block relative overflow-hidden"
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        maxWidth: '100%',
        ...style,
      }}
    >
      {/* Skeleton shimmer shown until image loads */}
      {!loaded && !error && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-slate-200 animate-pulse rounded-[inherit]"
        />
      )}

      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        style={{ objectFit, width: '100%', height: '100%', ...(!width && !height ? { height: 'auto' } : {}) }}
        {...rest}
      />
    </span>
  )
}
