import { effects, TLDR_EFFECT } from "../app/constants";

export const document_docs_intro = {
         name: 'doc_intro',
         folderName: 'System',
         editor: {
            state: '',
            plainText: `Clone Edit Manual
In short:
   Some buttons can be klicked AND double klicked . To store a value from the clipboard / double klick the button . With a single klick you fetch the value
Introduction
Clone Edit is a DTW - Digital Text Workstation ( from DAW : Digital Audio Workstation)
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