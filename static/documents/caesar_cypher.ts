import { effects, CAESAR_CIPHER_EFFECT } from "../effects";

export const document_caesar_cypher = {
   name: 'Caesar Cypher',
   folderName: 'Examples',
   editor: {
      state: '',
      memory: [],
      snippets: [],
      plainText: ''
   },
   clones: [
      {
         id: 1,
         sourceId: 0,
         name: '1',
         effects: 'caesarcipher 1'
      },
      {
         id: 2,
         sourceId: 0,
         name: '2',
         effects: 'caesarcipher 2'
      },
      {
         id: 3,
         sourceId: 0,
         name: '3',
         effects: 'caesarcipher 3'
      },
      {
         id: 4,
         name: '4',
         effects: 'caesarcipher 4'
      },
   ]
}