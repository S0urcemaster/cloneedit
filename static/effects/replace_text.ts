import { Effect } from "../../app/model"

export const effect_replace_text: Effect = {
      name: 'replacetext',
      update: (text: string, search: string, replace: string) => {
         return 'Replace Text not implemented yet' // Implementierung fehlt
         // return text.replace(new RegExp(search, 'g'), replace)
      }
   }