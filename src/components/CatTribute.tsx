import { useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, PawPrint } from "@phosphor-icons/react"
import { CAT_TRIBUTE } from "../data/elsieData"
import type { Achievement } from "../types"
import PhotoSlot from "./PhotoSlot"

interface Props {
  onUnlockAchievement: (id: string) => Achievement | null
  showToast: (message: string) => void
}

export default function CatTribute({ onUnlockAchievement, showToast }: Props) {
  useEffect(() => {
    const ach = onUnlockAchievement("cat-visit")
    if (ach) showToast(`🐾 Achievement: ${ach.title}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-6 pb-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-400/20 to-sky-300/10"
        >
          <PawPrint size={26} weight="fill" className="text-pink-300" />
        </motion.div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{CAT_TRIBUTE.title}</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <PhotoSlot
          filename={CAT_TRIBUTE.photoFilename}
          alt="Her cat"
          caption="a photo of them, whenever you're ready to add it"
          aspect="aspect-[4/3]"
          className="mx-auto max-w-sm"
        />
      </motion.div>

      <motion.div
        className="mx-auto max-w-md overflow-hidden rounded-2xl border border-pink-500/15 bg-gradient-to-br from-pink-950/40 to-zinc-900/40 p-6 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="text-center text-sm leading-relaxed text-pink-100/80">{CAT_TRIBUTE.message}</p>
      </motion.div>

      <motion.div
        className="mx-auto flex max-w-md items-center justify-center gap-2 text-xs text-pink-200/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Heart size={12} weight="fill" className="text-pink-400/60" />
        <span>Take your time here. There's no rush, and no wrong way to feel.</span>
        <Heart size={12} weight="fill" className="text-pink-400/60" />
      </motion.div>
    </div>
  )
}
