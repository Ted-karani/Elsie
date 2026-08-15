import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkle } from "@phosphor-icons/react"

const BOOT_LINES = [
  { text: "Waking up ELSIE.EXE...", delay: 200 },
  { text: "Loading sparkle engine...", delay: 550 },
  { text: "Sweetness levels: immeasurable", delay: 950 },
  { text: "Michael Olise compatibility: 100%", delay: 1350 },
  { text: "Softness reserves: fully stocked", delay: 1750 },
  { text: "Butterflies: deploying...", delay: 2150 },
  { text: "One universe, made just for her", delay: 2600 },
  { text: "Ready. Tap to step in.", delay: 3100 },
]

interface Props {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)

  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 3,
        size: 8 + Math.random() * 10,
      })),
    [],
  )

  useEffect(() => {
    if (visibleLines < BOOT_LINES.length) {
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), BOOT_LINES[visibleLines]?.delay ?? 300)
      return () => clearTimeout(timer)
    } else {
      const t = setTimeout(() => setReady(true), 400)
      return () => clearTimeout(t)
    }
  }, [visibleLines])

  useEffect(() => {
    const target = (visibleLines / BOOT_LINES.length) * 100
    const t = setTimeout(() => setProgress(target), 50)
    return () => clearTimeout(t)
  }, [visibleLines])

  const handleEnter = useCallback(() => {
    if (ready) onComplete()
  }, [ready, onComplete])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleEnter()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [handleEnter])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden p-6"
        style={{
          background:
            "radial-gradient(circle at 30% 15%, rgba(244,143,177,0.35), transparent 55%), radial-gradient(circle at 80% 85%, rgba(103,232,249,0.18), transparent 50%), linear-gradient(160deg, #2a0f1c 0%, #1a0e14 55%, #150a17 100%)",
        }}
        exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: "easeInOut" } }}
      >
        {/* Falling petals/sparkles */}
        <div className="pointer-events-none absolute inset-0">
          {petals.map((p) => (
            <motion.span
              key={p.id}
              className="absolute top-0 select-none text-pink-300/70"
              style={{ left: `${p.left}%`, fontSize: p.size }}
              initial={{ y: -20, opacity: 0, rotate: 0 }}
              animate={{ y: "110vh", opacity: [0, 0.8, 0.8, 0], rotate: 180 }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
            >
              {p.id % 3 === 0 ? "🌸" : p.id % 3 === 1 ? "✨" : "💗"}
            </motion.span>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-sm">
          {/* Logo */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-400/30 to-sky-300/20 backdrop-blur-sm"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart size={30} weight="fill" className="text-pink-300" />
            </motion.div>
            <h1 className="bg-gradient-to-r from-pink-300 via-rose-200 to-sky-200 bg-clip-text text-2xl font-bold tracking-wide text-transparent">
              ELSIE.EXE
            </h1>
            <p className="mt-1.5 text-xs italic text-pink-200/60">"A little universe, built just for you"</p>
          </motion.div>

          {/* Progress bar */}
          <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-300 to-sky-300"
              style={{ boxShadow: "0 0 12px rgba(244,143,177,0.6)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Boot lines */}
          <div className="min-h-[130px] space-y-1.5 font-mono text-[11px]">
            <AnimatePresence>
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Sparkle size={10} weight="fill" className="shrink-0 text-pink-300/70" />
                  <span className="text-pink-100/80">{line.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Enter prompt */}
          <AnimatePresence>
            {ready && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <motion.button
                  onClick={handleEnter}
                  className="rounded-full bg-gradient-to-r from-pink-400 to-rose-300 px-8 py-3 text-sm font-semibold text-[#2a0f1c] shadow-lg shadow-pink-500/30"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(244,143,177,0.4)",
                      "0 0 22px rgba(244,143,177,0.7)",
                      "0 0 0px rgba(244,143,177,0.4)",
                    ],
                  }}
                  transition={{ boxShadow: { duration: 1.8, repeat: Infinity } }}
                >
                  step into your universe 💗
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
