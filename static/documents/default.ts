import { effects, WELCOME_EFFECT } from "../effects";

export const document_default = {
         name: 'Default',
         folderName: 'User',
         editor: {
            state: '',
            memory: [],
            snippets: [],
            plainText: '',
         },
         clones: [
            {
               id: 1,
               name: 'Welcome',
               effects: [{
                  ...effects[WELCOME_EFFECT]
               }],
            },
         ]
      }