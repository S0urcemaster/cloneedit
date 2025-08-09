import { useState, useRef, useEffect, CSSProperties, ReactNode } from "react"
import { useCloneEditContext } from "../app/context"

export function MemoryButton({ children, disabled, style, className, mouseDown, getCallback, setCallback }: { children: ReactNode, disabled?: boolean, style: CSSProperties, className: string, mouseDown?: boolean, setCallback: () => void, getCallback: () => void }) {

   const [set, setSet] = useState(false)
   const timeoutRef = useRef(null)
   const { settings } = useCloneEditContext()

   useEffect(() => {
      if (set) {
         if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
               getCallback()
               setSet(false)
            }, 1000)
         }
      } else {
         clearTimeout(timeoutRef.current)
         timeoutRef.current = null
      }
   }, [set])

   function setClick() {
      setSet(false)
      setCallback()
   }

   function setDown() {
      setSet(false)
      setCallback()
   }

   return (
      <>
         {set ?
            mouseDown ?
               <button disabled={disabled} className={className} style={{ color: settings.redColor, ...style }} onMouseDown={setDown}>⭳</button>
               :
               <button disabled={disabled} className={className} style={{ color: settings.redColor, ...style }} onClick={setClick}>⭳</button>
            :
            mouseDown ?
               <button disabled={disabled} className={className} style={{ ...style }} onMouseDown={() => setSet(true)}>{children}</button>
               :
               <button disabled={disabled} className={className} style={{ ...style }} onClick={() => setSet(true)}>{children}</button>
         }
      </>
   )
}