import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Smiley, Fire, Brain, Sparkle, Shuffle } from "@phosphor-icons/react"
import { SILLY_JOKES, SPICY_JOKES, NONCHALANT_FACTS, CHAOS_EVENTS } from "../data/elsieData"
import type { SpicyJoke, NonchalantFact, ChaosEvent, Achievement } from "../types"

interface Props {
  onUnlockAchievement: (id: string) => Achievement | null
  onUpdateStats: (patch: Partial<{ laughCount: number; chaosCount: number }>) => void
  showToast: (message: string) => void
}

type Mode = "silly" | "spicy" | "nonchalant"

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const MODES: { id: Mode; label: string; icon: React.ElementType; color: string }[] = [
  { id: "silly", label: "Silly", icon: Smiley, color: "amber" },
  { id: "spicy", label: "Spicy", icon: Fire, color: "rose" },
  { id: "nonchalant", label: "Nonchalant", icon: Brain, color: "sky" },
]

export default function LaughLab({ onUpdateStats, onUnlockAchievement, showToast }: Props) {
  const [mode, setMode] = useState<Mode>("silly")
  const [current, setCurrent] = useState<SpicyJoke | NonchalantFact | null>(null)
  const [generatedCount, setGeneratedCount] = useState(0)
  const [chaosResult, setChaosResult] = useState<ChaosEvent | null>(null)
  const [chaosCount, setChaosCount] = useState(0)

  const sourceFor = (m: Mode) => (m === "silly" ? SILLY_JOKES : m === "spicy" ? SPICY_JOKES : NONCHALANT_FACTS)

  const generate = useCallback(() => {
    const item = getRandomItem(sourceFor(mode))
    setCurrent(item)
    const total = generatedCount + 1
    setGeneratedCount(total)
    onUpdateStats({ laughCount: 1 })
    if (total >= 10) {
      const ach = onUnlockAchievement("laugh-10")
      if (ach) showToast(`😂 Achievement: ${ach.title}`)
    }
    if (total >= 50) {
      const ach = onUnlockAchievement("laugh-50")
      if (ach) showToast(`🤣 Achievement: ${ach.title}`)
    }
  }, [mode, generatedCount, onUpdateStats, onUnlockAchievement, showToast])

  const switchMode = useCallback((m: Mode) => {
    setMode(m)
    setCurrent(null)
  }, [])

  const triggerChaos = useCallback(() => {
    const event = getRandomItem(CHAOS_EVENTS)
    setChaosResult(event)
    setChaosCount((c) => c + 1)
    onUpdateStats({ chaosCount: 1 })

    const newCount = chaosCount + 1
    if (newCount >= 5) {
      const ach = onUnlockAchievement("chaos-5")
      if (ach) showToast(`🌀 Achievement: ${ach.title}`)
    }
    if (newCount >= 20) {
      const ach = onUnlockAchievement("chaos-20")
      if (ach) showToast(`💥 Achievement: ${ach.title}`)
    }
  }, [chaosCount, onUpdateStats, onUnlockAchievement, showToast])

  const activeModeMeta = MODES.find((m) => m.id === mode)!

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold tracking-tight text-white">Joke Vault</h1>
        <p className="mt-1 text-sm text-pink-100/60">Warning: may cause uncontrollable giggling. Or blushing.</p>
      </motion.div>

      {/* Mode switcher */}
      <motion.div
        className="flex gap-1.5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {MODES.map((m) => {
          const Icon = m.icon
          const isActive = mode === m.id
          return (
            <button
              key={m.id}
              onClick={() => switchMode(m.id)}
              className={`flex flex-1 flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-xs font-medium transition-all ${
                isActive
                  ? "border-pink-400/40 bg-pink-500/15 text-pink-200"
                  : "border-pink-500/10 bg-zinc-900/40 text-pink-100/50"
              }`}
            >
              <Icon size={16} />
              {m.label}
            </button>
          )
        })}
      </motion.div>

      {/* Generator card */}
      <motion.div
        className="overflow-hidden rounded-2xl border border-pink-500/15 bg-zinc-900/40 p-6 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="mb-4 text-center">
          <activeModeMeta.icon size={36} className="mx-auto text-pink-300" />
          <h3 className="mt-2 font-semibold text-white">
            {mode === "silly" ? "SILLY MODE" : mode === "spicy" ? "SPICY MODE" : "NONCHALANT FACT GENERATOR"}
          </h3>
          <p className="text-xs text-pink-100/50">
            {mode === "spicy" ? "You asked for this. No takebacks." : "Tap to generate."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.text}
              className="mb-4 rounded-xl border border-pink-500/15 bg-pink-950/30 p-4 text-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="text-4xl">{current.emoji}</span>
              <p className="mt-2 text-sm text-pink-50">{current.text}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={generate}
          className="w-full rounded-xl bg-gradient-to-r from-pink-400/80 to-rose-400/80 px-6 py-3 font-semibold text-[#2a0f1c] shadow-lg shadow-pink-500/20 transition-all active:scale-[0.97]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="flex items-center justify-center gap-2">
            <Sparkle size={18} weight="fill" />
            GENERATE
          </span>
        </motion.button>
      </motion.div>

      {/* Chaos Generator */}
      <motion.div
        className="overflow-hidden rounded-2xl border border-sky-500/15 bg-zinc-900/40 p-6 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mb-4 text-center">
          <Sparkle size={40} className="mx-auto text-sky-300" />
          <h3 className="mt-2 font-semibold text-white">CHAOS GENERATOR</h3>
          <p className="text-xs text-pink-100/50">Summon chaos. Embrace the unknown.</p>
        </div>

        {chaosResult && (
          <motion.div
            key={chaosResult.text + chaosCount}
            className="mb-4 rounded-xl border border-sky-500/15 bg-sky-950/20 p-4 text-center"
            initial={{ opacity: 0, y: 10, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <span className="text-4xl">{chaosResult.emoji}</span>
            <p className="mt-2 text-sm text-pink-50">{chaosResult.text}</p>
            <p className="mt-1 text-[10px] text-pink-100/40">
              Chaos Impact: {"🔥".repeat(chaosResult.impact)}
            </p>
          </motion.div>
        )}

        <motion.button
          onClick={triggerChaos}
          className="w-full rounded-xl bg-gradient-to-r from-sky-400/70 to-cyan-400/70 px-6 py-3 font-semibold text-[#0e2530] shadow-lg shadow-sky-500/20 transition-all active:scale-[0.97]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="flex items-center justify-center gap-2">
            <Shuffle size={20} />
            SUMMON CHAOS
          </span>
        </motion.button>
      </motion.div>
    </div>
  )
}
