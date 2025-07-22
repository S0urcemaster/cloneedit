
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
		params: [{ name: 'shift' }],
		update: (text: string, shift: EffectParam) => {
			return 'Caesar Cipher not implemented yet'; // Implementierung fehlt
			// return text.split('').map(char => {
			// 	if (char.match(/[a-z]/i)) {
			// 		const code = char.charCodeAt(0);
			// 		const base = code >= 65 && code <= 90 ? 65 : 97;
			// 		return String.fromCharCode(((code - base + Number(shift)) % 26) + base);
			// 	}
			// 	return char;
			// }).join('');
		}
	},
	[REPLACE_TEXT_EFFECT]: {
		name: 'Replace Text',
		params: [{ name: 'search' }, { name: 'replace' }],
		update: (text: string, search: EffectParam, replace: EffectParam) => {
			return 'Replace Text not implemented yet'; // Implementierung fehlt
			// return text.replace(new RegExp(search, 'g'), replace);
		}
	},
	[REPLACE_LIST_EFFECT]: {
		name: 'Replace List',
		params: [{ name: 'searchList' }, { name: 'replaceList' }],
		update: (text: string, searchList: EffectParam, replaceList: EffectParam) => {
			return 'Replace List not implemented yet'; // Implementierung fehlt
			// const searches = searchList.split('\n');
			// const replaces = replaceList.split('\n');
			// let updatedText = text;
			// for (let i = 0; i < searches.length; i++) {
			// 	const search = searches[i];
			// 	const replace = replaces[i] ?? '';
			// 	if (search) {
			// 		updatedText = updatedText.replace(new RegExp(search, 'g'), replace);
			// 	}
			// }
			// return updatedText;
		}
	},
	[NO_WHITESPACE_EFFECT]: {
		name: 'No Whitespace',
		params: [],
		update: (text: string) => {
			return text.replace(/\s+/g, '');
		}
	},
	[SUBSTRING_EFFECT]: {
		name: 'Substring',
		params: [{ name: '[Start' }, { name: ']End' }],
		update: (text: string, start: EffectParam, end: EffectParam) => {
			// console.log('update substring', text, start, end)
			const startIndex = parseInt(start.value, 10);
			const endIndex = parseInt(end.value, 10);
			if (isNaN(startIndex) || isNaN(endIndex)) {
				return text; // Invalid indices, return original text
			}
			// console.log('startend', startIndex, endIndex)
			return text.substring(startIndex, endIndex);
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
				text: '',
				memory: [],
				snippets: []
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
			name: 'X',
			folderName: 'User',
			editor: {
				text: 'Let me work with some example text . I hope AI cann fill this with 300 words . so here it goes : Lorem ipsum dolor sit amet, consectetur adipiscing elit.la pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				memory: [],
				snippets: []
			},
			clones: [
				{
					id: 1,
					name: 'Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct ',
					source: 0,
					effect: { ...effects[NO_WHITESPACE_EFFECT] }
				},
			]
		},
		{
			name: 'Text Split',
			folderName: 'Examples',
			editor: {
				text: 'AI cann fill this with 300 words . so here it goes : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				memory: [],
				snippets: []
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
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				memory: [],
				snippets: []
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
					id: 1,
					name: 'Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct Eff ct ',
					source: 0,
					effect: {
						...effects[SUBSTRING_EFFECT], params: [{ name: 'Start', value: '0' }, { name: 'End', value: '10' }]
					},
				},
			]
		},
		{
			name: 'Introduction',
			folderName: 'Documentation',
			editor: {
				text: `Clone Edit Documentation
Introduction
Clone Edit is a DTW - Digital Text Workstation ( from DAW : Digital Audio Workstation)
				`,
				memory: [],
				snippets: []
			},
			clones: [
				{
					id: 1,
					name: ';tldr',
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
		// componentColor: '#447a9eff',
		componentColor: 'linear-gradient(to right, #5d7c8fff, #6ba2c6ff)',
		editorBackgroundColor: 'linear-gradient(to top, #1d1a22, #425c76ff)',
		editorFont: 'Funnel Sans',
		editorTextColor: '#deffcbff',
		editorFontSize: 22,
		cloneFontSize: 18,
		brightColor: '#b3d1e3',
		darkColor: '#1d1a22',
		mezzoDarkColor: '#252935',
		cloneeditColor: '#88caff'
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