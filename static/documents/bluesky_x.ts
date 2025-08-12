import { Document } from "../../app/model";
import { effects, SUBSTRING_EFFECT } from "../effects";

export const document_bluesky_x: Document = {
         name: 'X and Bluesky Split',
         folderName: 'Examples',
         editor: {
            state: '',
            memory: [],
            snippets: [],
            plainText: '',
         },
         effects: [
            {
               id: 1,
               sourceId: 0,
               name: 'X Part 1',
               effects: 'substring 0 280',
            },
            {
               id: 2,
               sourceId: 0,
               name: 'X Part 2',
               effects: 'substring 280 560',
            },
            {
               id: 3,
               sourceId: 0,
               name: 'X Part 3',
               effects: 'substring 560 840',
            },
            {
               id: 4,
               sourceId: 0,
               name: 'Bluesky Part 1',
               effects: 'substring 0 300',
            },
            {
               id: 5,
               sourceId: 0,
               name: 'Bluesky Part 2',
               effects: 'substring 300 600',
            },
            {
               id: 6,
               sourceId: 0,
               name: 'Bluesky Part 3',
               effects: 'substring 600 900',
            },
         ]
      }