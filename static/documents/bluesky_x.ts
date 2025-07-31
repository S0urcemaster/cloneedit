import { effects, SUBSTRING_EFFECT } from "../app/constants";

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
               effect: {
                  ...effects[SUBSTRING_EFFECT], args: ['0', '280']
               },
            },
            {
               id: 2,
               name: 'X Part 2',
               effect: {
                  ...effects[SUBSTRING_EFFECT], args: ['280', '560']
               },
            },
            {
               id: 3,
               name: 'X Part 3',
               effect: {
                  ...effects[SUBSTRING_EFFECT], args: ['560', '840']
               },
            },
            {
               id: 4,
               name: 'Bluesky Part 1',
               effect: {
                  ...effects[SUBSTRING_EFFECT], args: ['0', '300']
               },
            },
            {
               id: 5,
               name: 'Bluesky Part 2',
               effect: {
                  ...effects[SUBSTRING_EFFECT], args: ['300', '400']
               },
            },
            {
               id: 6,
               name: 'Bluesky Part 3',
               effect: {
                  ...effects[SUBSTRING_EFFECT], args: ['600', '900']
               },
            },
         ]
      }