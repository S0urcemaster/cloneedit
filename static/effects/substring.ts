import { Effect } from "../effects"

export const effect_substring: Effect = {
   name: 'substring',
   update: (text: string, start: string, end: string) => {
      const startIndex = parseInt(start, 10)
      const endIndex = parseInt(end, 10)
      if (isNaN(startIndex) || isNaN(endIndex)) {
         return 'error not a number'
      }
      return text.substring(startIndex, endIndex)
   }
}