import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SkipForward, Play, Pause } from "lucide-react"

const LOCAL_STORAGE_KEY = "pomodoroSettings"

const DEFAULT_SETTINGS = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  cycles: 5,
}

const MODES = ["focus", "shortBreak", "longBreak"] as const
const MODE_LABELS = {
  focus: "Focus",
  shortBreak: "Short Break",
  longBreak: "Long Break",
}

type Mode = typeof MODES[number]

type PomodoroWidgetProps = {
  className?: string;
}

export function PomodoroWidget({ className }: PomodoroWidgetProps) {
  const [mode, setMode] = useState<Mode>("focus")
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [timeLeft, setTimeLeft] = useState(settings[mode] * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSettings((prev) => ({ ...prev, ...parsed }))
      } catch {
        console.warn("Ошибка чтения pomodoroSettings из localStorage")
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    setTimeLeft(settings[mode] * 60)
    setIsRunning(false)
  }, [mode, settings])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          handleNext()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning])

  const handleNext = () => {
    if (mode === "focus") {
      const newCount = cycleCount + 1
      setCycleCount(newCount)
      if (newCount % settings.cycles === 0) {
        setMode("longBreak")
      } else {
        setMode("shortBreak")
      }
    } else {
      setMode("focus")
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
  }

  return (
    <Card className={className}>
      <CardContent className="h-full flex flex-col items-center gap-2 justify-center">
        <CardDescription>
          {MODE_LABELS[mode]}
        </CardDescription>
        <div className="text-4xl font-mono">{formatTime(timeLeft)}</div>
        <div className="flex gap-2">
          <div className="size-9" />
          <Button
            size="icon"
            onClick={() => setIsRunning((prev) => !prev)}
          >
            {isRunning ? <Pause /> : <Play />}
          </Button>
          {isRunning ? <Button size="icon" variant="ghost" onClick={handleNext}>
            <SkipForward />
          </Button> : <div className="size-9" />}
        </div>
      </CardContent>
    </Card>
  )
}
