import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react"
import { log } from "../static/constants"

export function FeedbackButton({ duration, children, disabled, style, className, mouseDown, successNode, failureNode, evaluation, evaluated }: { duration: number, children: ReactNode, disabled?: boolean, style?: CSSProperties, className?: string, mouseDown?: boolean, successNode: ReactNode, failureNode: ReactNode, evaluation: () => boolean, evaluated: (to: boolean) => void }) {

   const [success, setSuccess] = useState<boolean|undefined>()

   const timeoutRef = useRef(null)

   useEffect(() => {
      if (success !== undefined) {
         if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
               setSuccess(undefined)
               timeoutRef.current = null
            }, duration)
         }
      }
   }, [success])

   function evaluate() {
      const success = evaluation()
      setSuccess(success)
      evaluated(success)
   }

   return (
      <>
         {success !== undefined ?
            success === true ? 
               <button disabled={disabled} className={className} style={{ ...style }}>{successNode}</button>
               :
               <button disabled={disabled} className={className} style={{ ...style }}>{failureNode}</button>
            :
            mouseDown ?
               <button disabled={disabled} className={className} style={{ ...style }} onMouseDown={evaluate}>{children}</button>
               :
               <button disabled={disabled} className={className} style={{ ...style }} onClick={evaluate}>{children}</button>
         }
      </>
   )
}