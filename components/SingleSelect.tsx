import React, { CSSProperties, ReactElement, useState } from 'react'
import { useCloneEditContext } from '../app/context'

export const SingleSelect = ({ options, value, onChange, style }: {options: string[], value: string, onChange: any, style?: CSSProperties}) => {

   const [selectedValue, setSelectedValue] = useState(value)
   const { settings } = useCloneEditContext()

   const handleSelect = (value) => {
      setSelectedValue(value)
      onChange(value)
   }
   return (
      <div style={{
         width: '200px',
         maxHeight: '200px',
         overflowY: 'auto',
         background: settings.brightColor,
         ...style
       }}>
         <div style={{ display: 'flex', flexDirection: 'column' }}>
            {options.map((option) => (
               <div
               style={{
                  cursor: 'default',
                  padding: '3px 5px',
                  backgroundColor: selectedValue === option ? settings.selectedColor : 'transparent',
                  color: selectedValue === option ? settings.darkColor : settings.darkColor,
                }}
                  key={option}
                  className={`select-item ${selectedValue === option ? 'selected' : ''}`}
                  onMouseDown={() => handleSelect(option)}
               >
                  {option}
               </div>
            ))}
         </div>
      </div>
   )
}