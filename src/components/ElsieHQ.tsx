import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MusicNote, BookOpen, Smiley, Sparkle, Heart, ArrowClockwise } from "@phosphor-icons/react"
import { MEMORIES, SILLY_JOKES, SPICY_JOKES, NONCHALANT_FACTS, CHAOS_EVENTS, SOUNDTRACK, COMPLIMENTS, MEMES, LYRIC_SCREENSHOT } from "../data/elsieData"
import type { Achievement } from "../types"
import PhotoSlot from "./PhotoSlot"

interface Props {
  onUnlockAchievement: (id: string) => Achievement | null
  showToast: (message: string) => void
  beautyMeter: number
  onBumpBeautyMeter: () => void
}

export default function ElsieHQ({ onUnlockAchievement, showToast, beautyMeter, onBumpBeautyMeter }: Props) {
  const [logoCount, setLogoCount] = useState(0)
  const [complimentIndex, setComplimentIndex] = useState(0)
  const [burst, setBurst] = useState(false)

  const handleLogoClick = useCallback(() => {
    const newCount = logoCount + 1
    setLogoCount(newCount)
    if (newCount === 5) {
      const ach = onUnlockAchievement("easter-egg")
      if (ach) showToast(`🥚 Achievement: ${ach.title}`)
    }
  }, [logoCount, onUnlockAchievement, showToast])

  const nextCompliment = useCallback(() => {
    setComplimentIndex((i) => (i + 1) % COMPLIMENTS.length)
  }, [])

  const handleMeterTap = useCallback(() => {
    const wasUnder = beautyMeter < 100
    onBumpBeautyMeter()
    if (wasUnder && beautyMeter + 7 >= 100) {
      setBurst(true)
      setTimeout(() => setBurst(false), 1400)
      const ach = onUnlockAchievement("beauty-max")
      if (ach) showToast(`💗 Achievement: ${ach.title}`)
    }
  }, [beautyMeter, onBumpBeautyMeter, onUnlockAchievement, showToast])

  const meterPct = Math.min(beautyMeter, 140)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button onClick={handleLogoClick} className="mb-3 text-4xl transition-transform active:scale-90">
          💗
        </button>
        <h1 className="bg-gradient-to-r from-pink-300 via-rose-200 to-sky-200 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
          ELSIE HQ
        </h1>
        <p className="mt-1 text-sm text-pink-100/60">
          Welcome to your universe. I built this whole thing because you're you.
        </p>
      </motion.div>

      {/* Her photos strip */}
      <motion.div
        className="grid grid-cols-3 gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <PhotoSlot filename="her-1.jpg" alt="Her" caption="her, obviously" aspect="aspect-square" />
        <PhotoSlot filename="her-2.jpg" alt="Her" caption="another favourite" aspect="aspect-square" />
        <PhotoSlot filename="her-3.jpg" alt="Her" caption="one more :)" aspect="aspect-square" />
        <PhotoSlot filename="her-4.jpg" alt="Her" caption="and this one" aspect="aspect-square" />
        <PhotoSlot filename="her-5.jpg" alt="Her" caption="couldn't pick just one" aspect="aspect-square" />
        <div className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border border-pink-500/15 bg-gradient-to-br from-pink-900/20 to-sky-900/10 text-center">
          <span className="text-xl">💗</span>
          <span className="px-2 text-[10px] text-pink-100/50">every single one, honestly</span>
        </div>
      </motion.div>

      {/* Origin Story */}
      <motion.div
        className="overflow-hidden rounded-2xl border border-pink-500/15 bg-gradient-to-br from-pink-950/40 to-zinc-900/40 p-5 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg">💥</span>
          <h3 className="font-semibold text-white">The Incident That Started Everything</h3>
        </div>
        <p className="text-sm leading-relaxed text-pink-100/70">
          The moment our worlds collided. One conversation, one laugh, and suddenly the universe
          rearranged itself. I didn't stand a chance. And honestly? I wouldn't change a thing.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-pink-100/70">
          We haven't even met in person yet — and somehow you've already become one of my favourite
          parts of the week. I can only imagine how much fun this turns into once we actually do.
        </p>
      </motion.div>

      {/* Compliment generator */}
      <motion.div
        className="overflow-hidden rounded-2xl border border-pink-500/15 bg-zinc-900/40 p-5 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <Heart size={18} weight="fill" className="text-pink-400" />
          <h3 className="font-semibold text-white">Just So You Know</h3>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={complimentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="min-h-[48px] text-sm leading-relaxed text-pink-100/80"
          >
            {COMPLIMENTS[complimentIndex]}
          </motion.p>
        </AnimatePresence>
        <motion.button
          onClick={nextCompliment}
          className="mt-3 flex items-center gap-1.5 rounded-full bg-pink-500/15 px-3 py-1.5 text-xs font-medium text-pink-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          <ArrowClockwise size={12} />
          another one
        </motion.button>
      </motion.div>

      {/* Appreciation Meter */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-900/30 to-sky-900/10 p-5 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {burst && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="absolute top-0 text-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  animation: `confetti-fall ${0.9 + Math.random() * 0.6}s ease-in forwards`,
                  animationDelay: `${Math.random() * 0.2}s`,
                }}
              >
                {["💗", "✨", "🩷", "💫"][i % 4]}
              </span>
            ))}
          </div>
        )}
        <div className="mb-3 flex items-center gap-2">
          <Sparkle size={18} weight="fill" className="text-sky-300" />
          <h3 className="font-semibold text-white">Appreciation Meter</h3>
        </div>
        <p className="mb-3 text-xs text-pink-100/60">
          Tap it. Watch it go places it really shouldn't be able to go.
        </p>
        <div className="mb-3 h-4 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-300 to-sky-300"
            animate={{ width: `${Math.min((meterPct / 140) * 100, 100)}%` }}
            transition={{ duration: 0.3 }}
            style={beautyMeter >= 100 ? { animation: "meter-pulse 1.2s ease-in-out infinite" } : undefined}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            {beautyMeter}%{beautyMeter > 100 ? " 🚨" : ""}
          </span>
          <motion.button
            onClick={handleMeterTap}
            className="rounded-full bg-pink-500/20 px-4 py-2 text-xs font-semibold text-pink-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
          >
            tap to boost
          </motion.button>
        </div>
        {beautyMeter > 100 && (
          <p className="mt-2 text-[11px] text-pink-300/70">Yeah, it broke. That's kind of the point.</p>
        )}
      </motion.div>

      {/* Memes */}
      <motion.div
        className="overflow-hidden rounded-2xl border border-pink-500/15 bg-zinc-900/40 p-5 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <Smiley size={18} className="text-amber-300" />
          <h3 className="font-semibold text-white">Exhibits: How You Made Me Feel</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {MEMES.map((m) => (
            <div key={m.id}>
              <PhotoSlot filename={m.filename} alt={m.caption} caption={m.caption} aspect="aspect-square" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Lyric screenshot + Spotify */}
      <motion.div
        className="overflow-hidden rounded-2xl border border-pink-500/15 bg-zinc-900/40 p-5 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <MusicNote size={18} className="text-sky-300" />
          <h3 className="font-semibold text-white">Our Soundtrack</h3>
        </div>
        <p className="mb-3 text-sm text-pink-100/70">
          <span className="font-medium text-pink-100">{SOUNDTRACK.title}</span> by {SOUNDTRACK.artist} —
          the song that hits different because it's ours.
        </p>
        <div className="mb-3 overflow-hidden rounded-xl border border-pink-500/20 bg-gradient-to-br from-pink-950/50 via-[#241019] to-sky-950/30 p-3">
          <PhotoSlot
            filename={LYRIC_SCREENSHOT.filename}
            alt="Lyric screenshot"
            caption={LYRIC_SCREENSHOT.caption}
            fit="contain"
            maxHeight="20rem"
            rounded="rounded-lg"
          />
        </div>
        <p className="mb-3 text-center text-xs italic text-pink-200/60">
          I hope this actually works out between us. I really do.
        </p>
        <iframe
          src={SOUNDTRACK.embedUrl}
          width="100%"
          height="80"
          allow="encrypted-media"
          className="rounded-lg"
          title="Spotify Player"
        />
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        {[
          { label: "Memories", value: MEMORIES.length, icon: BookOpen, color: "text-sky-300" },
          { label: "Jokes", value: SILLY_JOKES.length + SPICY_JOKES.length + NONCHALANT_FACTS.length, icon: Smiley, color: "text-amber-300" },
          { label: "Chaos", value: CHAOS_EVENTS.length, icon: Sparkle, color: "text-pink-300" },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-pink-500/10 bg-zinc-900/40 p-3 text-center backdrop-blur-sm"
            >
              <Icon size={20} className={`mx-auto mb-1 ${stat.color}`} />
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-pink-100/50">{stat.label}</p>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
