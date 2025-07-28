import { useCloneEditContext } from "./context"
import * as constants from './constants'

export function Player() {
   const { settings } = useCloneEditContext()

   return (
      <div className='player' style={{ display: 'flex', justifyContent: 'space-between', position: 'fixed', height: 21, background: settings.material, padding: '1px 0 0 0' }}>
         <div style={{ display: 'flex', gap: 1, width: '100%' }}>
            <button style={{ height: 19, flexGrow: 1, color: settings.editorTextColor }}><div style={{ marginTop: -7, fontSize: 'x-large' }}>‣</div></button>
            <button style={{ height: 19, flexGrow: 1 }}><div style={{ marginTop: -2, fontSize: 'medium' }}>-</div></button>
            <button style={{ height: 19, flexGrow: 1 }}><div style={{ marginTop: -1, fontSize: 'medium' }}>+</div></button>
            <button style={{ height: 19, flexGrow: 1 }}><div style={{ marginTop: -1, fontSize: 'medium' }}>➀</div></button>
            <button style={{ height: 19, flexGrow: 1, color: settings.editorTextColor }}><div style={{ marginTop: -1, fontSize: 'medium' }}>➋</div></button>
            <button style={{ height: 19, flexGrow: 1 }}><div style={{ marginTop: -1, fontSize: 'medium' }}>➂</div></button>
            <button style={{ height: 19, flexGrow: 1 }}><div style={{ marginTop: -1, fontSize: 'medium' }}>➃</div></button>
            <button style={{ height: 19, flexGrow: 1 }}><div style={{ marginTop: -1, fontSize: 'medium' }}>➄</div></button>
            {/* <button style={{ height: 19, flexGrow: 1 }}><div style={{ marginTop: -1, fontSize: 'medium' }}>➅</div></button> */}
         <button className={constants.fonts[constants.FONT_GEMUNU_LIBRE].font.className} style={{whiteSpace: 'nowrap', paddingRight: 5, color: settings.brightColor, height: 19, flexGrow: 1}}>Digi Playa</button>
         </div>
      </div>
   )
}