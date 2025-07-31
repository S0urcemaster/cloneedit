import { Effect } from "../app/model"

export const effect_no_whitespace: Effect = {
   name: 'NoWhitespace',
   args: [],
   update: (text: string) => {
      return text.replace(/\s+/g, '')
   }
}