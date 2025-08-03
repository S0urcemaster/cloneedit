import { Effect } from "../../app/model"


export const replace_chars: Effect = {
   name: 'replacechars',
   update: (text: string, ...args: string[]) => {
      const map: Record<string, string> = {};
  
      for (const pair of args) {
        if (pair.length !== 2) {
          throw new Error(`Invalid replacement pair: "${pair}". Must be exactly 2 characters.`);
        }
        const [from, to] = pair;
        map[from] = to;
      }
  
      const pattern = new RegExp(`[${Object.keys(map).join('')}]`, 'g');
  
      return text.replace(pattern, (match) => map[match] ?? match);
    }
}
