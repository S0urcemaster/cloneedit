import { ReactNode, CSSProperties, useState, useRef, useEffect } from "react"
import { useCloneEditContext } from "../app/context"
import { lib } from "../static/lib"
import { log } from "../static/constants"

export function RotateButton({ values, timeout, disabled, style, className, mouseDown, callback }: { values: string[], timeout: number, disabled?: boolean, style?: CSSProperties, className?: string, mouseDown?: boolean, callback: (value: string) => void }) {

   const [currentId, setCurrentId] = useState(0)
   const initRef = useRef(null)
   const timeoutRef = useRef(null)
   const { settings } = useCloneEditContext()
   const [currentValue, setCurrentValue] = useState<string>(values[0])

   const instantCurrentValue = useRef(null)

   useEffect(() => {
      log('currentId', currentId)
      setCurrentValue(values[currentId])
      instantCurrentValue.current = values[currentId]
   }, [currentId])

   useEffect(() => {
      // if(currentValue) {
      //    callback(currentValue)
      // }
   }, [currentValue])

   function startTimeout() {
      log('rotatedOffset', lib.getRotatedOffset(values.length, currentId, 1))

      timeoutRef.current = setTimeout(() => {
         // setCurrentValue(values[currentId])
         // callback(currentValue)
         callback(instantCurrentValue.current)
         timeoutRef.current = null
         // instantCurrentValue.current = values[lib.getRotatedOffset(values.length, -1)]
         // setCurrentValue(values[currentId])
      }, timeout)
   }

   function cancelTimeout() {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
   }

   function timerRunning() {
      return timeoutRef.current
   }

   function increaseCurrentId() {
      if (currentId < values.length - 1)
         setCurrentId(currentId + 1)
      else setCurrentId(0)
   }

   function setClick() {
      if (timerRunning()) {
         cancelTimeout()
         increaseCurrentId()
      } else {
      }
      startTimeout()
   }

   function setDown() {
      if (timerRunning()) {
         cancelTimeout()
         increaseCurrentId()
      } else {
      }
      startTimeout()
   }

   function getValue() {
      if (currentId === 0) return values[currentId]
      else return values[currentId - 1]
   }

   return (
      <>
         {
            mouseDown ?
               <button disabled={disabled} className={className} style={{ color: settings.redColor, ...style }} onMouseDown={setDown}>{currentValue}</button>
               :
               <button disabled={disabled} className={className} style={{ color: settings.redColor, ...style }} onClick={setClick}>{currentValue}</button>
         }
         {/* {currentId >0 ?
            mouseDown ?
               <button disabled={disabled} className={className} style={{ color: settings.redColor, ...style }} onMouseDown={setDown}>⭳</button>
               :
               <button disabled={disabled} className={className} style={{ color: settings.redColor, ...style }} onClick={setClick}>⭳</button>
            :
            mouseDown ?
               <button disabled={disabled} className={className} style={{ ...style }} onMouseDown={() => setCurrentId(true)}>{children}</button>
               :
               <button disabled={disabled} className={className} style={{ ...style }} onClick={() => setSet(true)}>{children}</button>
         } */}
      </>
   )
}