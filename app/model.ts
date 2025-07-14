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

export type Filter = string

export const CAESAR_FILTER = 'caesar'
export const REPLACE_TEXT_FILTER = 'replaceText'
export const REPLACE_LIST_FILTER = 'replaceList'

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
					filter: CAESAR_FILTER
				},
				{
					id: 2,
					source: 1,
					filter: REPLACE_TEXT_FILTER
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