
import { Gemunu_Libre, Funnel_Sans, Lexend } from 'next/font/google'
import { App, Effect, EffectParam } from './model'

export const smileys = [
	'🪱', '😀', '😅', '😂', '🤣', '😋', '🥳',
	'🫤', '🤨', '🤔', '🤫', '🥱', '🥹', '🥺',
	'😢', '😭', '🤩', '😍', '🥰', '🤮', '🤢',
	'😊', '☺️'
]

export const CAESAR_EFFECT = 'caesar'
export const REPLACE_TEXT_EFFECT = 'replaceText'
export const REPLACE_LIST_EFFECT = 'replaceList'
export const NO_WHITESPACE_EFFECT = 'noWhitespace'
export const SUBSTRING_EFFECT = 'substring'
export const TLDR_EFFECT = 'tldr'

export const effects: Record<string, Effect> = {
	[CAESAR_EFFECT]: {
		name: 'Caesar Cipher',
		params: [{ name: 'Offset' }],
		update: (text: string, offset: EffectParam) => {
			const shiftValue = Number(offset.value)
			return text.split('').map(char => {
				if (char.match(/[a-z]/i)) {
					const code = char.charCodeAt(0)
					const base = code >= 65 && code <= 90 ? 65 : 97
					// Ensure positive result for negative shifts
					const shiftedCode = (code - base + shiftValue) % 26
					return String.fromCharCode((shiftedCode < 0 ? shiftedCode + 26 : shiftedCode) + base)
				}
				return char
			}).join('')
		}
	},
	[REPLACE_TEXT_EFFECT]: {
		name: 'Replace Text',
		params: [{ name: 'search' }, { name: 'replace' }],
		update: (text: string, search: EffectParam, replace: EffectParam) => {
			return 'Replace Text not implemented yet' // Implementierung fehlt
			// return text.replace(new RegExp(search, 'g'), replace)
		}
	},
	[REPLACE_LIST_EFFECT]: {
		name: 'Replace List',
		params: [{ name: 'searchList' }, { name: 'replaceList' }],
		update: (text: string, searchList: EffectParam, replaceList: EffectParam) => {
			return 'Replace List not implemented yet' // Implementierung fehlt
			// const searches = searchList.split('\n')
			// const replaces = replaceList.split('\n')
			// let updatedText = text
			// for (let i = 0 i < searches.length i++) {
			// 	const search = searches[i]
			// 	const replace = replaces[i] ?? ''
			// 	if (search) {
			// 		updatedText = updatedText.replace(new RegExp(search, 'g'), replace)
			// 	}
			// }
			// return updatedText
		}
	},
	[NO_WHITESPACE_EFFECT]: {
		name: 'No Whitespace',
		params: [],
		update: (text: string) => {
			return text.replace(/\s+/g, '')
		}
	},
	[SUBSTRING_EFFECT]: {
		name: 'Substring',
		params: [{ name: '[Start' }, { name: ']End' }],
		update: (text: string, start: EffectParam, end: EffectParam) => {
			const startIndex = parseInt(start.value, 10)
			const endIndex = parseInt(end.value, 10)
			if (isNaN(startIndex) || isNaN(endIndex)) {
				return 'error not a number'
			}
			return text.substring(startIndex, endIndex)
		}
	},
	[TLDR_EFFECT]: {
		name: 'TLDR',
		params: [],
		update: () => {
			return 'not implemented'
		}
	}
}

export const defaultState: App = {
	documents: [
		{
			name: 'X and Bluesky',
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
					name: 'X Part 1',
					source: 0,
					effect: {
						...effects[SUBSTRING_EFFECT], params: [{ name: 'Start', value: '0' }, { name: 'End', value: '280' }]
					},
				},
				{
					id: 2,
					name: 'X Part 2',
					source: 0,
					effect: {
						...effects[SUBSTRING_EFFECT], params: [{ name: 'Start', value: '280' }, { name: 'End', value: '560' }]
					},
				},
				{
					id: 3,
					name: 'X Part 3',
					source: 0,
					effect: {
						...effects[SUBSTRING_EFFECT], params: [{ name: 'Start', value: '560' }, { name: 'End', value: '840' }]
					},
				},
				{
					id: 4,
					name: 'Bluesky Part 1',
					source: 0,
					effect: {
						...effects[SUBSTRING_EFFECT], params: [{ name: 'Start', value: '0' }, { name: 'End', value: '300' }]
					},
				},
				{
					id: 5,
					name: 'Bluesky Part 2',
					source: 0,
					effect: {
						...effects[SUBSTRING_EFFECT], params: [{ name: 'Start', value: '300' }, { name: 'End', value: '600' }]
					},
				},
				{
					id: 6,
					name: 'Bluesky Part 3',
					source: 0,
					effect: {
						...effects[SUBSTRING_EFFECT], params: [{ name: 'Start', value: '600' }, { name: 'End', value: '900' }]
					},
				},
			]
		},
		{
			name: 'Caesar Cypher',
			folderName: 'User',
			editor: {
				state: '',
				memory: [],
				snippets: [],
				plainText: ''
			},
			clones: [
				{
					id: 1,
					name: '1',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '1' }],
					},
				},
				{
					id: 2,
					name: '2',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '2' }],
					},
				},
				{
					id: 3,
					name: '3',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '3' }],
					},
				},
				{
					id: 4,
					name: '4',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '4' }],
					},
				},
				{
					id: 5,
					name: '5',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '5' }],
					},
				},
				{
					id: 6,
					name: '6',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '6' }],
					},
				},
				{
					id: 7,
					name: '7',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '7' }],
					},
				},
				{
					id: 8,
					name: '8',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '8' }],
					},
				},
				{
					id: 9,
					name: '9',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '9' }],
					},
				},
				{
					id: 10,
					name: '10',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '10' }],
					},
				},
				{
					id: 11,
					name: '11',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '11' }],
					},
				},
				{
					id: 12,
					name: '12',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '12' }],
					},
				},
				{
					id:13 ,
					name: '13',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '13' }],
					},
				},
				{
					id:14 ,
					name: '14',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '14' }],
					},
				},
				{
					id:15 ,
					name: '15',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '15' }],
					},
				},
				{
					id:16 ,
					name: '16',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '16' }],
					},
				},
				{
					id:17 ,
					name: '17',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '17' }],
					},
				},
				{
					id:18 ,
					name: '18',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '18' }],
					},
				},
				{
					id:19 ,
					name: '19',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '19' }],
					},
				},
				{
					id:20 ,
					name: '20',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '20' }],
					},
				},
				{
					id:21 ,
					name: '21',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '21' }],
					},
				},
				{
					id:22 ,
					name: '22',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '22' }],
					},
				},
				{
					id:23 ,
					name: '23',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '23' }],
					},
				},
				{
					id:24 ,
					name: '24',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '24' }],
					},
				},
				{
					id:25 ,
					name: '25',
					source: 0,
					effect: {
						...effects[CAESAR_EFFECT], params: [{ name: 'Offset', value: '25' }],
					},
				},
			]
		},
		{
			name: 'Text Split',
			folderName: 'Examples',
			editor: {
				state: '',
				plainText: 'AI cann fill this with 300 words . so here it goes : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				memory: [],
				snippets: [],
			},
			clones: [
				{
					id: 1,
					name: 'Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct ',
					source: 0,
					effect: {
						...effects[SUBSTRING_EFFECT], params: [{ name: 'Start', value: '0' }, { name: 'End', value: '279' }]
					},
				},
				{
					id: 2,
					name: 'Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct ',
					source: 0,
					effect: {
						...effects[SUBSTRING_EFFECT], params: [{ name: 'Start', value: '280' }, { name: 'End', value: '559' }]
					},
				},
				{
					id: 3,
					name: 'Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct ',
					source: 0,
					effect: {
						...effects[SUBSTRING_EFFECT], params: [{ name: 'Start', value: '560' }, { name: 'End', value: '839' }]
					},
				},
			]
		},
		{
			name: 'Text Split1',
			folderName: 'Examples',
			editor: {
				state: '',
				plainText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				memory: [],
				snippets: [],
			},
			clones: [
				{
					id: 1,
					name: 'Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct ',
					source: 0,
					effect: {
						...effects[SUBSTRING_EFFECT], params: [{ name: 'Start', value: '0' }, { name: 'End', value: '10' }]
					},
				},
				{
					id: 2,
					name: 'Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct ',
					source: 0,
					effect: {
						...effects[SUBSTRING_EFFECT], params: [{ name: 'Start', value: '0' }, { name: 'End', value: '10' }]
					},
				},
			]
		},
		{
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
					source: 0,
					effect: {
						...effects[TLDR_EFFECT], params: [{ name: 'Start', value: '0' }, { name: 'End', value: '10' }]
					},
				},
			]
		},
		{
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
					source: 0,
					effect: {
						...effects[TLDR_EFFECT], params: [{ name: 'Start', value: '0' }, { name: 'End', value: '10' }]
					},
				},
			]
		},
	],

	settings: {
		border: 0,
		material: 'linear-gradient(to right, #5d7c8fff, #6ba2c6ff)',
		materialMedian: '#638da8',
		selectedColor: '#88caff',
		editorBackgroundColor: 'linear-gradient(to top, #1d1a22, #425c76ff)',
		editorFont: 'Funnel Sans',
		editorTextColor: '#deffcbff',
		editorFontSize: 20,
		cloneFontSize: 18,
		brightColor: '#b3d1e3',
		darkColor: '#1d1a22',
		mezzoDarkColor: '#252935',
		lightDarkColor: '#3b4c57ff',
		cloneeditColor: '#88caff',
		inputColor: '#b7e7ff',
	}
}


type Font = {
	name: string
	font: any
}

export const gemunuLibreFont = Gemunu_Libre({
	subsets: ['latin'],
})

export const funnelSansFont = Funnel_Sans({
	subsets: ['latin'],
})

export const lexendFont = Lexend({
	subsets: ['latin'],
})

export const FONT_GEMUNU_LIBRE = 'Gemunu Libre'
export const FONT_FUNNEL_SANS = 'Funnel Sans'
export const FONT_LEXEND = 'Lexend'

export const fonts: Record<string, Font> = {
	[FONT_GEMUNU_LIBRE]: {
		name: 'Gemunu Libre',
		font: gemunuLibreFont,
	},
	[FONT_FUNNEL_SANS]: {
		name: 'Funnel Sans',
		font: funnelSansFont,
	},
	[FONT_LEXEND]: {
		name: 'Lexend',
		font: lexendFont,
	},
}