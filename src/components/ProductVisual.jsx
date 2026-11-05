// Image produit : fichier de public/images (voir data/images.js), avec le dégradé en repli
import { useState } from 'react'
import { getImage } from '../data/images'

export default function ProductVisual({ image, className = '' }) {
  const img = getImage(image)
  const sources = img.file ? [`/images/${img.file}`] : []
  const [index, setIndex] = useState(0)

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: img.gradient }}
      role="img"
      aria-label={img.alt}
    >
      {index < sources.length && (
        <img
          key={sources[index]}
          src={sources[index]}
          alt={img.alt}
          loading="lazy"
          onError={() => setIndex(index + 1)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  )
}
