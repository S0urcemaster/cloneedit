import { Effect } from "../effects"

export const effect_no_whitespace: Effect = {
   name: 'nowhitespace',
   update: (text: string) => {
      return text.replace(/\s+/g, '')
   }
}