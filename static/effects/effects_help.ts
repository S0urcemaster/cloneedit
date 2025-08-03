import { Effect } from "../../app/model"

export const effect_help: Effect = {
      name: 'help',
      update: (text: string) => {
         return `Effects Help
Each line is an effect, like: "substring 0 10" which returns the letters of your input
Description of available effects:
> caesarcypher offset
offset: positive number to translate each letter to
> help
This help
> nowhitespace
Removes all whitespace
> replacechars pair1 pair2 pair3 ...
Example : "replacechars ab ,. !@" will replace a , and ! into b . and @
> replacetext \\from\\ \\to\\
Will replace one single text with another

         `
      }
   }