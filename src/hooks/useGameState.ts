import { useState, useCallback, useEffect } from "react"
import type { GameState, Achievement } from "../types"
import { ACHIEVEMENTS } from "../data/elsieData"

const STORAGE_KEY = "elsie-exe-state"

const DEFAULT_STATE: GameState = {
  achievements: {},
  stats: {
    laughCount: 0,
    chaosCount: 0,
    beautyMeter: 0,
    gameHighScore: 0,
    secretsFound: 0,
  },
  soundEnabled: true,
}

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { ...DEFAULT_STATE, ...parsed }
    }
  } catch {
    // corrupted state, reset
  }
  return DEFAULT_STATE
}

export function useGameState() {
  const [state, setState] = useState<GameState>(loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const updateStats = useCallback(
    (patch: Partial<GameState["stats"]>) => {
      setState((prev) => ({
        ...prev,
        stats: { ...prev.stats, ...patch },
      }))
    },
    [],
  )

  const unlockAchievement = useCallback(
    (id: string): Achievement | null => {
      const achievement = ACHIEVEMENTS.find((a) => a.id === id)
      if (!achievement || state.achievements[id]) return null
      setState((prev) => ({
        ...prev,
        achievements: { ...prev.achievements, [id]: true },
      }))
      return achievement
    },
    [state.achievements],
  )

  const isAchievementUnlocked = useCallback(
    (id: string) => !!state.achievements[id],
    [state.achievements],
  )

  const getUnlockedAchievements = useCallback((): Achievement[] => {
    return ACHIEVEMENTS.filter((a) => state.achievements[a.id])
  }, [state.achievements])

  const allAchievements = ACHIEVEMENTS

  const toggleSound = useCallback(() => {
    setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))
  }, [])

  const resetState = useCallback(() => {
    setState(DEFAULT_STATE)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    state,
    updateStats,
    unlockAchievement,
    isAchievementUnlocked,
    getUnlockedAchievements,
    allAchievements,
    toggleSound,
    resetState,
  }
}