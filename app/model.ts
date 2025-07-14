// Ganz oben weiter oben geht nicht
export type App = {
	// Multi Document
	editors: Editor[]
	settings: Settings // Globale Einstellungen : Schriftart , Rand
	// Filter werden hart kodiert
}

export type Editor = {
	name: String
	text: String
	fontSize: number
	clones: Clone[]

}

export type Clone = {
	id: number // unique id benötigt pro Objekt
	source: number // id 0 für editor und 1 bis x für Klone
	filter: Filter // Konstantenname / id da hart kodiert . K.A. wie das generalisiert / lass ich mich überraschen
}

export type Filter = {
	name : string
	params: string[]
	update : (text: string, ...args: string[]) => string
}

export const CAESAR_FILTER = 'caesar'
export const REPLACE_TEXT_FILTER = 'replaceText'
export const REPLACE_LIST_FILTER = 'replaceList'

// dann ein hart kodiertes Filter Objekt
export const filters: Record<string, Filter> = {
	[CAESAR_FILTER]: {
		name: 'Caesar Cipher',
		params: ['shift'],
		update: (text: string, shift: string) => {
			return text.split('').map(char => {
				if (char.match(/[a-z]/i)) {
					const code = char.charCodeAt(0);
					const base = code >= 65 && code <= 90 ? 65 : 97;
					return String.fromCharCode(((code - base + Number(shift)) % 26) + base);
				}
				return char;
			}).join('');
		}
	},
	[REPLACE_TEXT_FILTER]: {
		name: 'Replace Text',
		params: ['search', 'replace'],
		update: (text: string, search: string, replace: string) => {
			return text.replace(new RegExp(search, 'g'), replace);
		}
	},
	[REPLACE_LIST_FILTER]: {
		name: 'Replace List',
		params: ['searchList', 'replaceList'],
		update: (text: string, searchList: string, replaceList: string) => {
			const searches = searchList.split('\n');
			const replaces = replaceList.split('\n');
			let updatedText = text;
			for (let i = 0; i < searches.length; i++) {
				const search = searches[i];
				const replace = replaces[i] ?? '';
				if (search) {
					updatedText = updatedText.replace(new RegExp(search, 'g'), replace);
				}
			}
			return updatedText;
		}
	}
}

export type Settings = {
}

// Und testen wir ob das ganze funktioniert im defaultModel
export const defaultModel: App = {
	editors: [
		{
			name: 'Default',
			text: '',
			fontSize: 16,
			clones: [
				{
					id: 1,
					source: 0,
					filter: filters[CAESAR_FILTER]
				},
				{
					id: 2,
					source: 0,
					filter: filters[REPLACE_TEXT_FILTER]
				},
				{
					id: 3,
					source: 0,
					filter: filters[REPLACE_LIST_FILTER]
				}
			]
		},
		{
			name: 'Editor 2',
			text: 'Dies ist der Text des Editors 2.',
			fontSize: 16,
			clones: []
		}
	],
	settings: {}
}