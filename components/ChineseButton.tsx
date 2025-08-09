import { CSSProperties, ReactNode } from "react"

 
 export default ({children, style, disabled, onMouseDown, onClick}: {children: ReactNode, style?: CSSProperties, disabled?: boolean, onMouseDown?: () => void, onClick?: () => void}) => {
   return (
      <button className="chineseButton" style={{fontSize: 24, ...style}} disabled={disabled} onClick={onClick} onMouseDown={onMouseDown}>{children}</button>
   )
 }