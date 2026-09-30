import { useState, useCallback, useEffect } from "react"
import { Toaster, toast } from "sonner"
import LoadingScreen from "./components/LoadingScreen"
import HubNav from "./components/HubNav"
import Sections from "./components/Sections"
import FloatingHearts from "./components/FloatingHearts"
import { useGameState } from "./hooks/useGameState"
import type { TabId, Achievement } from "./types"
import FarewellLetter from "./components/FarewellLetter"

export default function App() {
  const [booted, setBooted] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>("hq")
  const {
    state,
    updateStats,
    unlockAchievement,
    getUnlockedAchievements,
    allAchievements,
    toggleSound,
  } = useGameState()

  const showToast = useCallback((message: string) => {
    toast(message, {
      style: {
        background: "#241019",
        border: "1px solid rgba(244,143,177,0.3)",
        color: "#fce7f3",
      },
      duration: 3000,
    })
  }, [])

  const handleUnlockAchievement = useCallback(
    (id: string): Achievement | null => {
      const ach = unlockAchievement(id)
      if (ach) {
        toast(`🏆 Achievement: ${ach.title}`, {
          description: ach.description,
          style: {
            background: "linear-gradient(135deg, rgba(244,143,177,0.18), rgba(103,232,249,0.12))",
            border: "1px solid rgba(244,143,177,0.4)",
            color: "#fce7f3",
          },
          duration: 4000,
        })
      }
      return ach
    },
    [unlockAchievement],
  )

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleBumpBeautyMeter = useCallback(() => {
    updateStats({ beautyMeter: state.stats.beautyMeter + 7 })
  }, [state.stats.beautyMeter, updateStats])

  // Keyboard shortcut: 1-6 to switch tabs
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tabMap: Record<string, TabId> = {
        "1": "hq",
        "2": "laugh",
        "3": "memories",
        "4": "cat",
        "5": "game",
        "6": "achievements",
      }
      if (e.key in tabMap) {
        handleTabChange(tabMap[e.key])
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [handleTabChange])

  if (!booted) {
    return <LoadingScreen onComplete={() => setBooted(true)} />
  }

  const unlockedAchievements = getUnlockedAchievements()
  const unlockedIds: Record<string, boolean> = {}
  unlockedAchievements.forEach((a) => {
    unlockedIds[a.id] = true
  })

  return (
    <div className="relative min-h-[100dvh] bg-[#1a0e14] text-foreground">
      <FloatingHearts count={9} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "13px",
          },
        }}
      />

      {/* Top bar */}
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-pink-500/10 bg-[#1a0e14]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">💗</span>
            <h1 className="bg-gradient-to-r from-pink-300 to-sky-200 bg-clip-text text-sm font-bold tracking-tight text-transparent">
              ELSIE.EXE
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className="rounded-full p-1.5 text-pink-100/40 transition-colors hover:text-pink-100/80 active:scale-90"
              aria-label="Toggle sound"
            >
              {state.soundEnabled ? "🔊" : "🔇"}
            </button>
            <span className="text-[10px] text-pink-100/30">v2.0</span>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="relative z-10 mx-auto max-w-lg px-4 pb-28 pt-16">
        <Sections
          activeTab={activeTab}
          onUnlockAchievement={handleUnlockAchievement}
          onUpdateStats={updateStats}
          showToast={showToast}
          achievements={allAchievements}
          unlockedIds={unlockedIds}
          beautyMeter={state.stats.beautyMeter}
          onBumpBeautyMeter={handleBumpBeautyMeter}
        />
      </main>

      {/* Bottom navigation */}
      <HubNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        achievementCount={unlockedAchievements.length}
        totalAchievements={allAchievements.length}
      />
      <FarewellLetter />
    </div>
  )
}
