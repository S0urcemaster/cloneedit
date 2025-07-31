import { effects, WELCOME_EFFECT } from "../app/constants";

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
               effect: {
                  ...effects[WELCOME_EFFECT]
               },
            },
         ]
      }