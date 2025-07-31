import { Effect } from "../../app/model"

export const effect_welcome: Effect = {
      name: 'welcome',
      args: [],
      update: (text: string) => {
         if(text) {
            return `This is a serverless app (so far) ! Nothing you type is being sent over network ! Checkout the Developer Tools on key F12 and there the network analysis tab to be sure : only GET - methods that fetch data FROM the server !`
         }
         return `Welcome to Clone Edit 😀
I m the output of an "effect" that usually works on the text you type
Check out the file menu below the edit field on the right with the system/docs and examples folders
Have fun 🥳`
      }
   }