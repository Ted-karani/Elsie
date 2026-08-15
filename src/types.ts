export interface Memory {
  id: string
  title: string
  date: string
  description: string
  emoji: string
  category: "funny" | "deep" | "chaos" | "music" | "olise" | "us"
  image?: string
}

export interface LaughOutcome {
  text: string
  rarity: "common" | "uncommon" | "rare" | "legendary"
  emoji: string
}

export interface ChaosEvent {
  text: string
  emoji: string
  impact: number
}

export interface SpicyJoke {
  text: string
  emoji: string
}

export interface NonchalantFact {
  text: string
  emoji: string
}

export interface MemeSlot {
  id: string
  filename: string
  caption: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  secret?: boolean
}

export interface GameState {
  achievements: Record<string, boolean>
  stats: {
    laughCount: number
    chaosCount: number
    beautyMeter: number
    gameHighScore: number
    secretsFound: number
  }
  soundEnabled: boolean
}

export type TabId = "hq" | "laugh" | "memories" | "cat" | "game" | "achievements"