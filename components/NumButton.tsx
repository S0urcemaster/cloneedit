import { useState } from "react"

export function NumButton({ value, disabled, onChange }: { value: number, disabled?: boolean, onChange: (value: number) => void }) {

   const [state, setState] = useState(value)

   function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      // Erlaube nur Ziffern, Enter, Done, Go, Backspace, Delete, Tab, Pfeiltasten
      const allowedKeys = [
         'Enter',
         'Done',
         'Go',
         'Backspace',
         'Delete',
         'Tab',
         'ArrowLeft',
         'ArrowRight',
         'ArrowUp',
         'ArrowDown',
      ]
      const isDigit = /^\d$/.test(e.key)

      if (!isDigit && !allowedKeys.includes(e.key)) {
         e.preventDefault() // Blockiere ungültige Tasten
         return
      }

      // Bei Enter, Done oder Go die Eingabe abschicken
      if (e.key === 'Enter' || e.key === 'Done' || e.key === 'Go') {
         onChange(parseInt(e.key))
      }
   }

   return (
      <input disabled={disabled} style={{ width: 49, paddingLeft: 18 }} type='text' value={state} onChange={e => setState(parseInt(e.target.value))} onKeyDown={handleKeyDown} onFocus={(e) => {
         e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
         e.target.select() // Wählt den gesamten Text im Input aus
      }} />
   )
}