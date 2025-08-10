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
               sourceId: 0,
               name: 'Influenza',
               effects: 'replacechars .·'
            },
            {
               id: 2,
               sourceId: 0,
               name: 'Welcome',
               effects: 'welcome'
            },
            {
               id: 3,
               sourceId: 0,
               name: 'Effects Help',
               effects: 'help'
            },
         ]
      }