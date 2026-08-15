import { type TabId } from "../types"
import {
  House,
  Confetti,
  BookOpen,
  PawPrint,
  GameController,
  Trophy,
} from "@phosphor-icons/react"

interface Props {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  achievementCount: number
  totalAchievements: number
}

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "hq", label: "HQ", icon: House },
  { id: "laugh", label: "Jokes", icon: Confetti },
  { id: "memories", label: "Archive", icon: BookOpen },
  { id: "cat", label: "Cat", icon: PawPrint },
  { id: "game", label: "Arcade", icon: GameController },
  { id: "achievements", label: "Trophies", icon: Trophy },
]

export default function HubNav({ activeTab, onTabChange, achievementCount, totalAchievements }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-pink-500/10 bg-[#1a0e14]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 pb-safe pt-2">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] transition-all active:scale-90 ${
                isActive ? "text-pink-300" : "text-pink-100/40 hover:text-pink-100/70"
              }`}
            >
              <Icon
                size={20}
                weight={isActive ? "fill" : "regular"}
                className="transition-transform"
              />
              <span className="font-medium">{tab.label}</span>
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-pink-400" />
              )}
              {tab.id === "achievements" && achievementCount > 0 && (
                <span className="absolute -right-1 -top-0.5 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-pink-500 px-1 text-[8px] font-bold text-white">
                  {achievementCount}/{totalAchievements}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
