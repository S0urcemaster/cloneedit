import React, { useEffect, useRef, useState } from "react"
import { account_section_height, log } from "../static/constants"
import { useCloneEditContext } from "../app/context"
import { time } from "console"

type CircleType = "blue" | "green" | "black"

interface Circle {
  id: number
  x: number
  y: number
  type: CircleType
  color: string
}

const circlePoints: Record<CircleType, number> = {
  blue: 3,
  green: 5,
  black: -5,
}

const timeoutStart = 1500

export default ({ update }: { update: (tokens: number) => void }) => {
  const radius = 20
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [score, setScore] = useState(0)
  const scoreRef = useRef(null)
  const [circle, setCircle] = useState<Circle | null>(null)
  const [circleId, setCircleId] = useState(0)
  const [size, setSize] = useState({ width: 0, height: 0 })

  const timeoutRef = useRef(timeoutStart)

  const { settings } = useCloneEditContext()

  // Beobachte Containergröße
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setSize({ width, height })
      }
    })

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    let active = true
    const runGame = async () => {
      while (active) {
        if (size.width > 0 && size.height > 0) {
          // Kreis innerhalb der aktuellen Fläche setzen
          const x = Math.random() * (size.width - radius * 2)
          const y = Math.random() * (size.height - radius * 2)
          const type: CircleType = ["blue", "green", "black"][
            Math.floor(Math.random() * 3)
          ] as CircleType
          let color = ''
          switch (type) {
            case 'blue':
              color = settings.blueColor
              break
            case 'green':
              color = settings.greenColor
              break
            case 'black':
              color = settings.darkColor
              break
          }
          setCircleId((id) => id + 1)
          setCircle({ id: circleId, x, y, type, color })

          // 500 ms sichtbar
          await new Promise((res) => setTimeout(res, timeoutRef.current - scoreRef.current * 10))
          setCircle(null)
          timeoutRef.current += 10

          // 250 ms Pause
          await new Promise((res) => setTimeout(res, 250))
        } else {
          // Falls Container noch keine Größe hat, kurz warten
          await new Promise((res) => setTimeout(res, 100))
        }
      }
    }
    runGame()
    return () => {
      active = false
    }
  }, [size])

  const handleClick = (points: number) => {
    log('score', score)
    setScore((prev) => prev + points)
    scoreRef.current = score
    update(points)
    setCircle(null) // Kreis verschwindet nach Klick
    timeoutRef.current = timeoutStart
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: account_section_height - 5,
        margin: "10px",
      }}
    >
      {circle && (
        <div
          onClick={() => handleClick(circlePoints[circle.type])}
          style={{
            position: "absolute",
            left: circle.x,
            top: circle.y,
            width: radius * 2,
            height: radius * 2,
            borderRadius: "50%",
            backgroundColor: circle.color,
            cursor: "pointer",
          }}
        />
      )}
    </div>
  )
}
