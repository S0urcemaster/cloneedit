import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react"
import { log } from "../static/constants"

export function FeedbackButton({ children, disabled, style, className, mouseDown, evaluation, evaluated }: { children: ReactNode, disabled?: boolean, style?: CSSProperties, className?: string, mouseDown?: boolean, evaluation: () => boolean, evaluated: (to: boolean) => void }) {

   const [success, setSuccess] = useState<boolean|undefined>()

   const timeoutRef = useRef(null)

   useEffect(() => {
      if (success !== undefined) {
         if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
               setSuccess(undefined)
               timeoutRef.current = null
            }, 1000)
         }
      }
   }, [success])

   function evaluate() {
      setSuccess(evaluation())
      evaluated(true)
   }

   return (
      <>
         {success !== undefined ?
            success === true ? 
               <button disabled={disabled} className={className} style={{ ...style }}>☺</button>
               :
               <button disabled={disabled} className={className} style={{ ...style }}>☹</button>
            :
            mouseDown ?
               <button disabled={disabled} className={className} style={{ ...style }} onMouseDown={evaluate}>{children}</button>
               :
               <button disabled={disabled} className={className} style={{ ...style }} onClick={evaluate}>{children}</button>
         }
      </>
   )
}