// Ganz oben weiter oben geht nicht
export type App = {
	// Multi Document
	editors: Editor[]
	settings: Settings // Globale Einstellungen : Schriftart , Rand
	// Filter werden hart kodiert
}

export type Editor = {
	name: string
	text: string
	fontSize: number
	clones: Clone[]

}

export type Clone = {
	id: number // unique id benötigt pro Objekt
	source: number // id 0 für editor und 1 bis x für Klone
	filter: Filter // Konstantenname / id da hart kodiert . K.A. wie das generalisiert / lass ich mich überraschen
}

export const fonts = [
	'Arial',
]

export type Filter = {
	name: string
	params: string[]
	update: (text: string, ...args: string[]) => string
}

export const CAESAR_FILTER = 'caesar'
export const REPLACE_TEXT_FILTER = 'replaceText'
export const REPLACE_LIST_FILTER = 'replaceList'
export const NO_WHITESPACE_FILTER = 'noWhitespace'

// dann ein hart kodiertes Filter Objekt
export const filters: Record<string, Filter> = {
	[CAESAR_FILTER]: {
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
	[REPLACE_TEXT_FILTER]: {
		name: 'Replace Text',
		params: ['search', 'replace'],
		update: (text: string, search: string, replace: string) => {
			return 'Replace Text not implemented yet'; // Implementierung fehlt
			// return text.replace(new RegExp(search, 'g'), replace);
		}
	},
	[REPLACE_LIST_FILTER]: {
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
	[NO_WHITESPACE_FILTER]: {
		name: 'No Whitespace',
		params: [],
		update: (text: string) => {
			return text.replace(/\s+/g, '');
		}
	}
}

// Und testen wir ob das ganze funktioniert im defaultModel
export const defaultState: App = {
	editors: [
		{
			name: 'Default',
			text: 'Let me work with some example text . I hope AI cann fill this with 300 words . so here it goes : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			fontSize: 16,
			clones: [
				{
					id: 1,
					source: 0,
					filter: filters[NO_WHITESPACE_FILTER]
				},
				{
					id: 2,
					source: 0,
					filter: filters[CAESAR_FILTER]
				},
				{
					id: 3,
					source: 0,
					filter: filters[REPLACE_TEXT_FILTER]
				},
				{
					id: 4,
					source: 0,
					filter: filters[REPLACE_LIST_FILTER]
				}
			]
		},
	],

	settings: {
		font: 'Arial',
		border: 0,
		textColor: '#c7c7c7ff',
		componentColor: '#25597C',
		editorBackgroundColor: 'linear-gradient(to top, #1d1a22, #425c76ff)'
	}
}

export type Settings = {
	font: string
	border: number // probably percent
	textColor: string
	componentColor: string
	editorBackgroundColor: string
}