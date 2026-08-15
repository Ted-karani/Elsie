import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Lock, LockOpen, Star, X, Crown, Medal, Target, Sparkle, Ghost, Gift } from "@phosphor-icons/react"
import { ACHIEVEMENTS, SECRET_MESSAGES } from "../data/elsieData"
import type { Achievement } from "../types"

interface Props {
  achievements: Achievement[]
  unlockedIds: Record<string, boolean>
  onUnlockAchievement: (id: string) => Achievement | null
  showToast: (message: string) => void
}

// ─── ACHIEVEMENTS PANEL ───────────────────────────────────────────────
function AchievementsPanel({ achievements, unlockedIds, onUnlockAchievement, showToast }: Props) {
  const unlockedCount = achievements.filter((a) => unlockedIds[a.id]).length

  return (
    <div className="space-y-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Trophy size={32} className="mx-auto text-amber-400" />
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">Achievements</h1>
        <p className="mt-1 text-sm text-zinc-400">
          {unlockedCount} / {achievements.length} unlocked
        </p>
        <div className="mx-auto mt-2 h-2 w-48 overflow-hidden rounded-full bg-zinc-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-pink-400 to-sky-300"
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      <div className="space-y-2">
        {achievements.map((ach, i) => {
          const isUnlocked = unlockedIds[ach.id]
          return (
            <motion.div
              key={ach.id}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                isUnlocked
                  ? "border-pink-500/40 bg-pink-500/10"
                  : ach.secret
                    ? "border-purple-500/20 bg-purple-500/5"
                    : "border-zinc-800/60 bg-zinc-900/40"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <span className="text-2xl">{ach.icon}</span>
              <div className="flex-1">
                <h3 className={`text-sm font-semibold ${isUnlocked ? "text-white" : "text-zinc-500"}`}>
                  {ach.title}
                  {ach.secret && !isUnlocked && (
                    <span className="ml-1 text-[10px] text-purple-400">[Secret]</span>
                  )}
                </h3>
                <p className={`text-xs ${isUnlocked ? "text-pink-100/60" : "text-pink-100/30"}`}>
                  {ach.description}
                </p>
              </div>
              {isUnlocked ? (
                <LockOpen size={16} className="text-pink-300" />
              ) : (
                <Lock size={16} className="text-pink-100/20" />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ─── SECRET ROOM ──────────────────────────────────────────────────────
function SecretRoom({ onUnlockAchievement, showToast }: Pick<Props, "onUnlockAchievement" | "showToast">) {
  const [foundIndex, setFoundIndex] = useState<number | null>(null)
  const [secretCount, setSecretCount] = useState(0)

  const handleTap = useCallback(() => {
    const idx = Math.floor(Math.random() * SECRET_MESSAGES.length)
    setFoundIndex(idx)
    setSecretCount((c) => c + 1)
    if (secretCount === 0) {
      const ach = onUnlockAchievement("secret-1")
      if (ach) showToast(`🕵️ Achievement: ${ach.title}`)
    }
    if (secretCount + 1 >= 5) {
      const ach = onUnlockAchievement("secret-all")
      if (ach) showToast(`🏆 Achievement: ${ach.title}`)
    }
  }, [secretCount, onUnlockAchievement, showToast])

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Ghost size={40} className="mx-auto text-purple-400" />
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">YOU FOUND THE SECRET</h1>
        <p className="mt-1 text-sm text-pink-100/60">
          This is a hidden room. You're not supposed to be here. But since you are...
        </p>
      </motion.div>

      <motion.div
        className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-8 text-center backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.button
          onClick={handleTap}
          className="mb-4 text-6xl transition-transform active:scale-90"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          👻
        </motion.button>
        <p className="text-sm text-zinc-400">Tap the ghost for a secret message...</p>

        <AnimatePresence mode="wait">
          {foundIndex !== null && (
            <motion.div
              key={foundIndex}
              className="mt-4 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-sm text-purple-300">{SECRET_MESSAGES[foundIndex]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Secret lore */}
      <motion.div
        className="rounded-2xl border border-pink-500/10 bg-zinc-900/40 p-5 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="mb-2 flex items-center gap-2 font-semibold text-white">
          <Gift size={16} className="text-rose-400" />
          Hidden Lore
        </h3>
        <p className="text-sm leading-relaxed text-zinc-400">
          This entire universe was built because someone wanted to make you smile. Every line of
          code, every joke, every chaos event — it's all for you. Olise approves. I definitely
          approve. Now go explore, you secret-finding legend.
        </p>
      </motion.div>

      {/* Hidden stats */}
      <motion.div
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="rounded-xl border border-pink-500/10 bg-zinc-900/40 p-3 text-center backdrop-blur-sm">
          <p className="text-xs text-pink-100/50">Secrets Found</p>
          <p className="text-lg font-bold text-white">{secretCount}</p>
        </div>
        <div className="rounded-xl border border-pink-500/10 bg-zinc-900/40 p-3 text-center backdrop-blur-sm">
          <p className="text-xs text-pink-100/50">Messages Unlocked</p>
          <p className="text-lg font-bold text-white">{foundIndex !== null ? 1 : 0}</p>
        </div>
      </motion.div>
    </div>
  )
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────
export default function SecretAndAchievements(props: Props) {
  const [showSecret, setShowSecret] = useState(false)
  const [secretAttempts, setSecretAttempts] = useState(0)

  // Secret room easter egg: tap the trophy icon 5 times
  const handleSecretToggle = useCallback(() => {
    setSecretAttempts((c) => c + 1)
    if (secretAttempts + 1 >= 5) {
      setShowSecret((s) => !s)
      setSecretAttempts(0)
    }
  }, [secretAttempts])

  return (
    <div className="space-y-4">
      {/* Secret toggle button */}
      <div className="flex justify-center">
        <motion.button
          onClick={handleSecretToggle}
          className="group flex items-center gap-2 rounded-full border border-pink-500/10 bg-zinc-900/40 px-4 py-2 text-xs text-pink-100/50 backdrop-blur-sm transition-all hover:border-purple-500/30 hover:text-purple-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <Sparkle size={14} />
          {showSecret ? "Hide Secrets" : "Tap 5x for secrets"}
          <Sparkle size={14} />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {showSecret ? (
          <motion.div
            key="secret"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SecretRoom onUnlockAchievement={props.onUnlockAchievement} showToast={props.showToast} />
          </motion.div>
        ) : (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AchievementsPanel {...props} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}