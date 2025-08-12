import { Instruction } from "../../app/model"

export const effect_welcome: Instruction = {
      name: 'welcome',
      update: (text: string) => {
         if(text) {
            return `25.08.01 Terms: This is a serverless app (so far)! Nothing you type is being sent over network! Checkout the Developer Tools on key F12 and there the network analysis tab to be sure: Only GET-methods that fetch data FROM the server!
No Cookies set, no data stored - I m programming this for me in the first place and will do it as I need it but any suggestion is welcome`
         }
         return `Welcome to Clone Edit 😀
I m the output of an "effect" that usually works on the text you type
Check out the file menu below the edit field on the right with the system/docs and examples folders
Have fun 🥳`
      }
   }