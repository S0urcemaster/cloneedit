
import { Gemunu_Libre, Funnel_Sans, Lexend } from 'next/font/google'
import { App, Effect } from './model'

export const CAESAR_EFFECT = 'caesar'
export const REPLACE_TEXT_EFFECT = 'replaceText'
export const REPLACE_LIST_EFFECT = 'replaceList'
export const NO_WHITESPACE_EFFECT = 'noWhitespace'
export const SUBSTRING_EFFECT = 'substring'

export const effects: Record<string, Effect> = {
	[CAESAR_EFFECT]: {
		name: 'Caesar Cipher',
		params: ['shift'],
		update: (text: string, shift: string) => {
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
		params: ['search', 'replace'],
		update: (text: string, search: string, replace: string) => {
			return 'Replace Text not implemented yet'; // Implementierung fehlt
			// return text.replace(new RegExp(search, 'g'), replace);
		}
	},
	[REPLACE_LIST_EFFECT]: {
		name: 'Replace List',
		params: ['searchList', 'replaceList'],
		update: (text: string, searchList: string, replaceList: string) => {
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
		params: ['Start', 'End'],
		update: (text: string, start: string, end: string) => {
			const startIndex = parseInt(start, 10);
			const endIndex = parseInt(end, 10);
			if (isNaN(startIndex) || isNaN(endIndex)) {
				return text; // Invalid indices, return original text
			}
			return text.substring(startIndex, endIndex);
		}
	}
}

export const defaultState: App = {
	documents: [
		{
			name: 'Default',
			folderName: 'User',
			editor: {
				text: '',
				memory: [],
				snippets: []
			},
			clones: [
				{
					id: 1,
					source: 0,
					effect: effects[NO_WHITESPACE_EFFECT]
				},
				{
					id: 2,
					source: 0,
					effect: effects[CAESAR_EFFECT]
				},
				{
					id: 3,
					source: 0,
					effect: effects[REPLACE_TEXT_EFFECT]
				},
				{
					id: 4,
					source: 0,
					effect: effects[REPLACE_LIST_EFFECT]
				}
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
					source: 0,
					effect: effects[NO_WHITESPACE_EFFECT]
				},
			]
		},
		{
			name: 'Default',
			folderName: 'Examples',
			editor: {
				text: 'Let me work with some example text . I hope AI cann fill this with 300 words . so here it goes : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				memory: [],
				snippets: []
			},
			clones: [
				{
					id: 1,
					source: 0,
					effect: effects[NO_WHITESPACE_EFFECT]
				},
			]
		},
		// {
		// 	name: 'Default',
		// 	folderName: 'Multi AI',
		// 	editor: {
		// 		text: 'Let me work with some example text . I hope AI cann fill this with 300 words . so here it goes : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		// 		memory: [],
		// 		snippets: []
		// 	},
		// 	clones: [
		// 		{
		// 			id: 1,
		// 			source: 0,
		// 			effect: effects[NO_WHITESPACE_EFFECT]
		// 		},
		// 	]
		// },
	],

	settings: {
		border: 0,
		// componentColor: '#447a9eff',
		componentColor: 'linear-gradient(to right, #4f6675ff, #6ba2c6ff)',
		editorBackgroundColor: 'linear-gradient(to top, #1d1a22, #425c76ff)',
		editorFont: 'Funnel Sans',
		editorTextColor: '#deffcbff',
		editorFontSize: 22,
		cloneFontSize: 18,
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