import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react"
import { log } from "../static/constants"

export function SafetyButton({ children, disabled, style, className, onClick, onMouseDown }: { children: ReactNode, disabled?: boolean, style?: CSSProperties, className?: string, onClick?: () => void, onMouseDown?: () => void }) {

   const [safety, setSafety] = useState(false)
   const timeoutRef = useRef(null)

   useEffect(() => {
      if (safety) {
         if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
               setSafety(false)
               timeoutRef.current = null
            }, 1000)
         }
      } else {
         clearTimeout(timeoutRef.current)
         timeoutRef.current = null
      }
   }, [safety])

   function safetyClick() {
      setSafety(false)
      onClick()
   }

   function safetyDown() {
      setSafety(false)
      onMouseDown()
   }

   return (
      <>
         {safety ?
            onMouseDown ? 
               <button disabled={disabled} className={className} style={{ ...style }} onMouseDown={safetyDown}>⚠</button>
               :
               <button disabled={disabled} className={className} style={{ ...style }} onClick={safetyClick}>⚠</button>
            :
            onMouseDown ?
               <button disabled={disabled} className={className} style={{ ...style }} onMouseDown={() => setSafety(true)}>{children}</button>
               :
               <button disabled={disabled} className={className} style={{ ...style }} onClick={() => setSafety(true)}>{children}</button>
         }
      </>
   )
}