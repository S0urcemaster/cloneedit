import { effects, SUBSTRING_EFFECT } from "../effects";

export const document_bluesky_x = {
         name: 'X and Bluesky Split',
         folderName: 'Examples',
         editor: {
            state: '',
            memory: [],
            snippets: [],
            plainText: '',
         },
         clones: [
            {
               id: 1,
               name: 'X Part 1',
               effects: [{
                  ...effects[SUBSTRING_EFFECT], args: ['0', '280']
               }],
            },
            {
               id: 2,
               name: 'X Part 2',
               effects: [{
                  ...effects[SUBSTRING_EFFECT], args: ['280', '560']
               }],
            },
            {
               id: 3,
               name: 'X Part 3',
               effects: [{
                  ...effects[SUBSTRING_EFFECT], args: ['560', '840']
               }],
            },
            {
               id: 4,
               name: 'Bluesky Part 1',
               effects: [{
                  ...effects[SUBSTRING_EFFECT], args: ['0', '300']
               }],
            },
            {
               id: 5,
               name: 'Bluesky Part 2',
               effects: [{
                  ...effects[SUBSTRING_EFFECT], args: ['300', '600']
               }],
            },
            {
               id: 6,
               name: 'Bluesky Part 3',
               effects: [{
                  ...effects[SUBSTRING_EFFECT], args: ['600', '900']
               }],
            },
         ]
      }