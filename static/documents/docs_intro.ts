import { effects, TLDR_EFFECT } from "../effects";

export const document_docs_intro = {
         name: 'doc_intro',
         folderName: 'System',
         editor: {
            state: `<p class="editor-paragraph" dir="ltr">
<span style="white-space: pre-wrap;">Clone Edit Manual</span></p>
<p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">Symbols</span></p>
<p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">Tabs | 克 - Clone | 文 - File | 信 - Info</span></p>
<p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">Editor | 选 - Select all | </span><span style="color: red;">删</span><span>Delete </span></p>
<p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">Symbols</span></p>
`,

            plainText: `Clone Edit Manual
Symbols
Tabs | 克 - Clone | 文 - File | 信 - Info
Editor | 选 - Select all | 
Symbols
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
               effects: [{
                  ...effects[TLDR_EFFECT], args: []
               }],
            },
         ]
      }