import { fonts, FONT_GEMUNU_LIBRE } from "../static/constants"
import { useCloneEditContext } from "./context"

export function Player() {
   const { settings } = useCloneEditContext()

   return (
      <div className='player' style={{ display: 'flex', justifyContent: 'space-between', height: 25, background: settings.material, padding: '0px 0 0 0'}}>
         <div style={{ display: 'flex', gap: '0.1rem', width: '100%' }}>
            <button style={{ height: 25, width: 'unset', minWidth: 'unset', flexGrow: 1, color: settings.editorColor }}><div style={{ marginTop: -4, fontSize: 'x-large' }}>‣</div></button>
            <button style={{ height: 25, width: 'unset', minWidth: 'unset', flexGrow: 1 }}><div style={{ marginTop: 1, fontSize: 'medium' }}>-</div></button>
            <button style={{ height: 25, width: 'unset', minWidth: 'unset', flexGrow: 1 }}><div style={{ marginTop: 2, fontSize: 'medium' }}>+</div></button>
            <button style={{ height: 25, width: 'unset', minWidth: 'unset', flexGrow: 1 }}><div style={{ marginTop: 2, fontSize: 'medium' }}>➀</div></button>
            <button style={{ height: 25, width: 'unset', minWidth: 'unset', flexGrow: 1, color: settings.editorColor }}><div style={{ marginTop: 2, fontSize: 'medium' }}>➋</div></button>
            <button style={{ height: 25, width: 'unset', minWidth: 'unset', flexGrow: 1 }}><div style={{ marginTop: 2, fontSize: 'medium' }}>➂</div></button>
            <button style={{ height: 25, width: 'unset', minWidth: 'unset', flexGrow: 1 }}><div style={{ marginTop: 2, fontSize: 'medium' }}>➃</div></button>
            <button style={{ height: 25, width: 'unset', minWidth: 'unset', flexGrow: 1 }}><div style={{ marginTop: 2, fontSize: 'medium' }}>➄</div></button>
            {/* <button style={{ height: 25, width: 'unset', minWidth: 'unset', flexGrow: 1 }}><div style={{ marginTop: -1, fontSize: 'medium' }}>➅</div></button> */}
            <button className={fonts[FONT_GEMUNU_LIBRE].font.className} style={{ whiteSpace: 'nowrap', paddingRight: 5, color: settings.darkColor, height: 25, width: 'unset', minWidth: 'unset', flexGrow: 1, cursor: 'help' }}><div style={{ marginTop: 2 }}>♫</div></button>
         </div>
      </div>
   )
}