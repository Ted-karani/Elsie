import { useMemo } from "react"

interface Props {
  count?: number
  className?: string
}

const SYMBOLS = ["💗", "✨", "💫", "🩷"]

// Cheap CSS-only ambient background — no framer-motion cost per frame.
export default function FloatingHearts({ count = 10, className = "" }: Props) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 10,
        size: 10 + Math.random() * 14,
        drift: (Math.random() - 0.5) * 80,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      })),
    [count],
  )

  return (
    <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 select-none opacity-0"
          style={
            {
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
              "--drift": `${p.drift}px`,
            } as React.CSSProperties
          }
        >
          {p.symbol}
        </span>
      ))}
    </div>
  )
}
