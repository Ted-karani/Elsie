import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Smiley, Heart, Sparkle, MusicNote, Star, Check, X, Calendar, ArrowRight, Image } from "@phosphor-icons/react"
import { MEMORIES } from "../data/elsieData"
import type { Memory, Achievement } from "../types"

interface Props {
  onUnlockAchievement: (id: string) => Achievement | null
  showToast: (message: string) => void
}

const CATEGORIES = [
  { id: "all", label: "All", icon: BookOpen },
  { id: "funny", label: "Funny", icon: Smiley },
  { id: "deep", label: "Deep", icon: Heart },
  { id: "chaos", label: "Chaos", icon: Sparkle },
  { id: "music", label: "Music", icon: MusicNote },
  { id: "olise", label: "Olise", icon: Star },
  { id: "us", label: "Us", icon: Image },
]

export default function MemoryArchive({ onUnlockAchievement, showToast }: Props) {
  const [filter, setFilter] = useState<string>("all")
  const [expandedMemory, setExpandedMemory] = useState<Memory | null>(null)
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set())

  const filtered = filter === "all" ? MEMORIES : MEMORIES.filter((m) => m.category === filter)

  const handleView = useCallback(
    (memory: Memory) => {
      setExpandedMemory(memory)
      const newViewed = new Set(viewedIds)
      newViewed.add(memory.id)
      setViewedIds(newViewed)
      if (newViewed.size >= MEMORIES.length) {
        const ach = onUnlockAchievement("memories-all")
        if (ach) showToast(`📚 Achievement: ${ach.title}`)
      }
    },
    [viewedIds, onUnlockAchievement, showToast],
  )

  return (
    <div className="space-y-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold tracking-tight text-white">Memory Archive</h1>
        <p className="mt-1 text-sm text-pink-100/60">Our story, one card at a time.</p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const isActive = filter === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? "bg-pink-500/20 text-pink-300 ring-1 ring-pink-500/40"
                  : "bg-zinc-900/50 text-pink-100/50 hover:text-pink-100/80"
              }`}
            >
              <Icon size={12} />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Memory Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map((memory, i) => (
          <motion.button
            key={memory.id}
            onClick={() => handleView(memory)}
            className="group relative overflow-hidden rounded-2xl border border-pink-500/10 bg-zinc-900/40 p-4 text-left backdrop-blur-sm transition-all hover:border-pink-500/30 active:scale-[0.98]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -2 }}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-2xl">{memory.emoji}</span>
              {viewedIds.has(memory.id) && (
                <Check size={14} className="text-pink-400" />
              )}
            </div>
            <h3 className="text-sm font-semibold text-white">{memory.title}</h3>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-pink-100/40">
              <Calendar size={10} />
              {memory.date}
            </div>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-pink-100/60">
              {memory.description}
            </p>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-pink-300 opacity-0 transition-opacity group-hover:opacity-100">
              <span>Tap to expand</span>
              <ArrowRight size={10} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Expanded Memory Modal */}
      <AnimatePresence>
        {expandedMemory && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setExpandedMemory(null)}
            />
            <motion.div
              className="relative max-h-[80vh] w-full max-w-md overflow-y-auto rounded-2xl border border-pink-500/20 bg-[#1f0f18] p-6 shadow-2xl"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                onClick={() => setExpandedMemory(null)}
                className="absolute right-4 top-4 rounded-full p-1 text-pink-100/40 hover:text-pink-100/80"
              >
                <X size={18} />
              </button>
              <div className="mb-4 text-center">
                <span className="text-5xl">{expandedMemory.emoji}</span>
              </div>
              <h2 className="text-center text-lg font-bold text-white">{expandedMemory.title}</h2>
              <div className="mt-2 flex items-center justify-center gap-1 text-xs text-pink-100/50">
                <Calendar size={12} />
                {expandedMemory.date}
                <span className="mx-1">·</span>
                <span className="capitalize">{expandedMemory.category}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-pink-100/80">
                {expandedMemory.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}