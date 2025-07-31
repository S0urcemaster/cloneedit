import { effects, TLDR_EFFECT } from "../effects";

export const document_settings = {
   name: 'Settings',
   folderName: 'System',
   editor: {
      state: '',
      plainText: `cloneEditColor: #654984
editorBackground: #654654
`,
      memory: [],
      snippets: [],
   },
   clones: [
      {
         id: 1,
         name: 'tldr',
         effect: {
            ...effects[TLDR_EFFECT], args: []
         },
      },
   ]
}