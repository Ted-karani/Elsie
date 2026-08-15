import { useState } from "react"
import { Camera, Heart } from "@phosphor-icons/react"

interface Props {
  filename: string
  alt: string
  caption?: string
  className?: string
  aspect?: string // tailwind aspect-ratio class, e.g. "aspect-square" | "aspect-[4/5]"
  rounded?: string
  fit?: "cover" | "contain"
  maxHeight?: string // e.g. "18rem" — only used when fit="contain"
}

// Drop a matching file into /public/photos/ and it appears automatically.
// Until then, this renders a soft placeholder so nothing ever looks broken.
export default function PhotoSlot({
  filename,
  alt,
  caption,
  className = "",
  aspect = "aspect-square",
  rounded = "rounded-2xl",
  fit = "cover",
  maxHeight = "18rem",
}: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex ${fit === "contain" ? "aspect-square" : aspect} w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-pink-300/40 bg-gradient-to-br from-pink-100/10 via-rose-200/10 to-sky-200/10 p-4 text-center ${rounded} ${className}`}
      >
        <Camera size={28} className="text-pink-300/70" weight="light" />
        <p className="text-[11px] leading-snug text-pink-200/70">
          {caption || "Photo coming soon"}
        </p>
        <Heart size={12} className="text-pink-300/50" weight="fill" />
      </div>
    )
  }

  if (fit === "contain") {
    return (
      <div className={`flex justify-center overflow-hidden ${rounded} ${className}`}>
        <img
          src={`/photos/${filename}`}
          alt={alt}
          onError={() => setFailed(true)}
          className="w-full object-contain"
          style={{ maxHeight }}
        />
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${rounded} ${className}`}>
      <img
        src={`/photos/${filename}`}
        alt={alt}
        onError={() => setFailed(true)}
        className={`h-full w-full ${aspect} object-cover`}
      />
    </div>
  )
}
