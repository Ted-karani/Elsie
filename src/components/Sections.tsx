import type { TabId, Achievement } from "../types"
import { motion, AnimatePresence } from "framer-motion"
import ElsieHQ from "./ElsieHQ"
import LaughLab from "./LaughLab"
import MemoryArchive from "./MemoryArchive"
import CatTribute from "./CatTribute"
import ArcadeGame from "./ArcadeGame"
import SecretAndAchievements from "./SecretAndAchievements"

interface Props {
  activeTab: TabId
  onUnlockAchievement: (id: string) => Achievement | null
  onUpdateStats: (patch: Partial<{ laughCount: number; chaosCount: number; beautyMeter: number; gameHighScore: number }>) => void
  showToast: (message: string) => void
  achievements: Achievement[]
  unlockedIds: Record<string, boolean>
  beautyMeter: number
  onBumpBeautyMeter: () => void
}

export default function Sections(props: Props) {
  const renderContent = () => {
    switch (props.activeTab) {
      case "hq":
        return (
          <ElsieHQ
            onUnlockAchievement={props.onUnlockAchievement}
            showToast={props.showToast}
            beautyMeter={props.beautyMeter}
            onBumpBeautyMeter={props.onBumpBeautyMeter}
          />
        )
      case "laugh":
        return <LaughLab onUnlockAchievement={props.onUnlockAchievement} onUpdateStats={props.onUpdateStats} showToast={props.showToast} />
      case "memories":
        return <MemoryArchive onUnlockAchievement={props.onUnlockAchievement} showToast={props.showToast} />
      case "cat":
        return <CatTribute onUnlockAchievement={props.onUnlockAchievement} showToast={props.showToast} />
      case "game":
        return <ArcadeGame onUnlockAchievement={props.onUnlockAchievement} onUpdateStats={props.onUpdateStats} showToast={props.showToast} />
      case "achievements":
        return <SecretAndAchievements achievements={props.achievements} unlockedIds={props.unlockedIds} onUnlockAchievement={props.onUnlockAchievement} showToast={props.showToast} />
      default:
        return null
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={props.activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  )
}
