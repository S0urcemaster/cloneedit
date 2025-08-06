import { effects, HELP_EFFECT, REPLACE_CHARS_EFFECT, WELCOME_EFFECT } from "../effects";

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
               name: 'Influenza',
               effects: [{
                  ...effects[REPLACE_CHARS_EFFECT], args: ['.·']
               }],
            },
            {
               id: 2,
               name: 'Welcome',
               effects: [{
                  ...effects[WELCOME_EFFECT]
               }],
            },
            {
               id: 3,
               name: 'Effects Help',
               effects: [{
                  ...effects[HELP_EFFECT]
               }],
            },
         ]
      }