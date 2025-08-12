import { Instruction } from "../../app/model"

export const effect_no_whitespace: Instruction = {
   name: 'nowhitespace',
   update: (text: string) => {
      return text.replace(/\s+/g, '')
   }
}