import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GameController, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Star, Trophy, ArrowClockwise } from "@phosphor-icons/react"
import type { Achievement } from "../types"
import PhotoSlot from "./PhotoSlot"

const OLISE_GALLERY = [
  { filename: "olise-1.jpg", caption: "Player of the Match. Obviously." },
  { filename: "olise-2.jpg", caption: "no notes" },
  { filename: "olise-3.jpg", caption: "he's THAT guy" },
  { filename: "olise-4.jpg", caption: "the peace sign of a champion" },
  { filename: "olise-5.jpg", caption: "GOAT behavior (also a cat, coincidence?)" },
  { filename: "olise-6.jpg", caption: "we don't deserve him" },
  { filename: "olise-7.jpg", caption: "Olympic. Legendary. Iconic." },
]

interface Props {
  onUnlockAchievement: (id: string) => Achievement | null
  onUpdateStats: (patch: Partial<{ gameHighScore: number }>) => void
  showToast: (message: string) => void
}

// Grid-based Snake
const CELL_SIZE = 20
const GRID_SIZE = 15
const CANVAS_SIZE = CELL_SIZE * GRID_SIZE
const TICK_MS = 140

interface Cell {
  x: number
  y: number
}

type Direction = "up" | "down" | "left" | "right"

function randomCell(exclude: Cell[]): Cell {
  let cell: Cell
  do {
    cell = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) }
  } while (exclude.some((c) => c.x === cell.x && c.y === cell.y))
  return cell
}

export default function ArcadeGame({ onUnlockAchievement, onUpdateStats, showToast }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<"menu" | "playing" | "gameover">("menu")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const snakeRef = useRef<Cell[]>([{ x: 7, y: 7 }])
  const dirRef = useRef<Direction>("right")
  const nextDirRef = useRef<Direction>("right")
  const foodRef = useRef<Cell>({ x: 10, y: 7 })
  const isStarFoodRef = useRef(false)
  const foodsEatenRef = useRef(0)
  const scoreRef = useRef(0)
  const intervalRef = useRef<number | null>(null)
  const touchDirRef = useRef<Direction | null>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Background
    ctx.fillStyle = "#2a0f1c"
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Grid lines
    ctx.strokeStyle = "rgba(244,143,177,0.06)"
    ctx.lineWidth = 1
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }

    // Food
    const food = foodRef.current
    ctx.font = `${CELL_SIZE - 2}px sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(
      isStarFoodRef.current ? "⭐" : "💗",
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2 + 1,
    )

    // Snake
    const snake = snakeRef.current
    snake.forEach((seg, i) => {
      const isHead = i === 0
      ctx.fillStyle = isHead ? "#f9a8d4" : `rgba(244,143,177,${0.85 - i * 0.03})`
      const pad = isHead ? 1 : 2
      ctx.beginPath()
      ctx.roundRect(seg.x * CELL_SIZE + pad, seg.y * CELL_SIZE + pad, CELL_SIZE - pad * 2, CELL_SIZE - pad * 2, 5)
      ctx.fill()
      if (isHead) {
        ctx.fillStyle = "#2a0f1c"
        const eyeOffset = 5
        ctx.beginPath()
        ctx.arc(seg.x * CELL_SIZE + eyeOffset, seg.y * CELL_SIZE + eyeOffset, 1.5, 0, Math.PI * 2)
        ctx.arc(seg.x * CELL_SIZE + CELL_SIZE - eyeOffset, seg.y * CELL_SIZE + eyeOffset, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    })
  }, [])

  const endGame = useCallback(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current)
    setGameState("gameover")
    const finalScore = scoreRef.current
    setHighScore((prev) => {
      const newHigh = Math.max(prev, finalScore)
      if (newHigh > prev) onUpdateStats({ gameHighScore: newHigh })
      return newHigh
    })
    if (finalScore >= 100) {
      const ach = onUnlockAchievement("game-100")
      if (ach) showToast(`⚽ Achievement: ${ach.title}`)
    }
  }, [onUnlockAchievement, onUpdateStats, showToast])

  const tick = useCallback(() => {
    dirRef.current = nextDirRef.current
    const snake = snakeRef.current
    const head = snake[0]
    let newHead: Cell

    switch (dirRef.current) {
      case "up":
        newHead = { x: head.x, y: head.y - 1 }
        break
      case "down":
        newHead = { x: head.x, y: head.y + 1 }
        break
      case "left":
        newHead = { x: head.x - 1, y: head.y }
        break
      case "right":
        newHead = { x: head.x + 1, y: head.y }
        break
    }

    // Wall collision
    if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
      endGame()
      return
    }
    // Self collision
    if (snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
      endGame()
      return
    }

    const newSnake = [newHead, ...snake]
    const food = foodRef.current

    if (newHead.x === food.x && newHead.y === food.y) {
      const points = isStarFoodRef.current ? 30 : 10
      scoreRef.current += points
      setScore(scoreRef.current)
      foodsEatenRef.current += 1
      isStarFoodRef.current = foodsEatenRef.current % 4 === 0
      foodRef.current = randomCell(newSnake)
      snakeRef.current = newSnake
    } else {
      newSnake.pop()
      snakeRef.current = newSnake
    }

    draw()
  }, [draw, endGame])

  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }]
    dirRef.current = "right"
    nextDirRef.current = "right"
    foodRef.current = randomCell(snakeRef.current)
    isStarFoodRef.current = false
    foodsEatenRef.current = 0
    scoreRef.current = 0
    setScore(0)
    setGameState("playing")

    if (intervalRef.current) window.clearInterval(intervalRef.current)
    intervalRef.current = window.setInterval(tick, TICK_MS)
  }, [tick])

  const setDirection = useCallback((dir: Direction) => {
    const current = dirRef.current
    const opposite: Record<Direction, Direction> = { up: "down", down: "up", left: "right", right: "left" }
    if (opposite[dir] === current) return
    nextDirRef.current = dir
  }, [])

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (gameState !== "playing") return
      const map: Record<string, Direction> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      }
      if (map[e.key]) {
        e.preventDefault()
        setDirection(map[e.key])
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [gameState, setDirection])

  // Initial draw + cleanup
  useEffect(() => {
    draw()
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [draw])

  const handleTouchStart = useCallback(
    (dir: Direction) => {
      touchDirRef.current = dir
      setDirection(dir)
    },
    [setDirection],
  )

  return (
    <div className="space-y-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold tracking-tight text-white">OLISE SNAKE: ELSIE EDITION</h1>
        <p className="mt-1 text-sm text-pink-100/60">Collect hearts. Dodge yourself. Simple as that.</p>
      </motion.div>

      <motion.div
        className="mx-auto overflow-hidden rounded-2xl border border-pink-500/15 bg-zinc-900/40 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="relative flex justify-center">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="max-w-full"
            style={{ aspectRatio: "1/1" }}
          />

          <AnimatePresence>
            {gameState === "menu" && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GameController size={48} className="mb-4 text-pink-300" />
                <h2 className="text-xl font-bold text-white">OLISE SNAKE</h2>
                <p className="mt-2 text-sm text-pink-100/60">Arrow keys or the D-pad below</p>
                <motion.button
                  onClick={startGame}
                  className="mt-6 rounded-xl bg-gradient-to-r from-pink-400/80 to-rose-400/80 px-8 py-3 font-semibold text-[#2a0f1c] shadow-lg shadow-pink-500/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  START GAME
                </motion.button>
              </motion.div>
            )}

            {gameState === "gameover" && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Trophy size={48} className="mb-4 text-amber-400" />
                <h2 className="text-xl font-bold text-white">Game Over</h2>
                <p className="mt-2 text-3xl font-bold text-pink-300">{score}</p>
                <p className="text-sm text-pink-100/50">points</p>
                {score >= highScore && score > 0 && (
                  <p className="mt-1 text-xs text-amber-300">NEW HIGH SCORE!</p>
                )}
                <motion.button
                  onClick={startGame}
                  className="mt-6 flex items-center gap-2 rounded-xl border border-pink-500/30 px-6 py-2.5 text-sm font-medium text-pink-100/80 transition-all hover:border-pink-400/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ArrowClockwise size={16} />
                  PLAY AGAIN
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Live score bar */}
      {gameState === "playing" && (
        <div className="mx-auto flex max-w-[280px] items-center justify-between text-sm text-pink-100/70">
          <span>Score: <span className="font-bold text-pink-300">{score}</span></span>
          <span className="text-xs text-pink-100/40">Best: {highScore}</span>
        </div>
      )}

      {/* Touch Controls */}
      <motion.div
        className="mx-auto grid max-w-[280px] grid-cols-3 gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div />
        <button
          onTouchStart={() => handleTouchStart("up")}
          onMouseDown={() => handleTouchStart("up")}
          className="flex h-14 items-center justify-center rounded-xl bg-zinc-900/60 text-pink-100/70 active:bg-pink-500/25 active:scale-90"
        >
          <ArrowUp size={24} />
        </button>
        <div />
        <button
          onTouchStart={() => handleTouchStart("left")}
          onMouseDown={() => handleTouchStart("left")}
          className="flex h-14 items-center justify-center rounded-xl bg-zinc-900/60 text-pink-100/70 active:bg-pink-500/25 active:scale-90"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onTouchStart={() => handleTouchStart("down")}
          onMouseDown={() => handleTouchStart("down")}
          className="flex h-14 items-center justify-center rounded-xl bg-zinc-900/60 text-pink-100/70 active:bg-pink-500/25 active:scale-90"
        >
          <ArrowDown size={24} />
        </button>
        <button
          onTouchStart={() => handleTouchStart("right")}
          onMouseDown={() => handleTouchStart("right")}
          className="flex h-14 items-center justify-center rounded-xl bg-zinc-900/60 text-pink-100/70 active:bg-pink-500/25 active:scale-90"
        >
          <ArrowRight size={24} />
        </button>
      </motion.div>

      {/* Score legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-pink-100/50">
        <span className="flex items-center gap-1">💗 Heart: +10</span>
        <span className="flex items-center gap-1">
          <Star size={12} className="text-amber-300" weight="fill" /> Olise Star: +30
        </span>
      </div>

      {/* Olise Gallery */}
      <motion.div
        className="overflow-hidden rounded-2xl border border-sky-500/15 bg-zinc-900/40 p-4 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <Star size={16} weight="fill" className="text-sky-300" />
          The Man Himself
        </h3>
        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
          {OLISE_GALLERY.map((item) => (
            <div key={item.filename} className="w-24 shrink-0">
              <PhotoSlot filename={item.filename} alt="Olise" aspect="aspect-square" rounded="rounded-xl" />
              <p className="mt-1 text-center text-[9px] leading-tight text-sky-200/60">{item.caption}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
