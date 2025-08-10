import { Effect } from "../effects"

const usage = `Usage : replacechars ab xy 12`

export const replace_chars: Effect = {
   name: 'replacechars',
   update: (text: string, ...args: string[]) => {
      const map: Record<string, string> = {}
  
      for (const pair of args) {
        if (pair.length !== 2) {
          return usage
        }
        const [from, to] = pair
        map[from] = to
      }
  
      const pattern = new RegExp(`[${Object.keys(map).join('')}]`, 'g')
  
      return text.replace(pattern, (match) => map[match] ?? match)
    }
}
