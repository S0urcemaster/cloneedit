import { effects, NO_WHITESPACE_EFFECT, CAESAR_EFFECT, REPLACE_TEXT_EFFECT, REPLACE_LIST_EFFECT } from "./constants"

export type App = {
	// Multi Document
	documents: Document[]
	settings: Settings // Globale Einstellungen : Schriftart , Rand
}

export type Document = {
	name: string
	folderName: string
	editor: Editor
	clones: Clone[]
}

export type Editor = {
	text: string
	memory: string[]
	snippets: string[]
}

export type Clone = {
	id: number // unique id benötigt pro Objekt
	source: number // id 0 für editor und 1 bis x für Klone
	effect: Effect // Konstantenname / id da hart kodiert . K.A. wie das generalisiert / lass ich mich überraschen
}

export type Effect = {
	name: string
	params: string[]
	update: (text: string, ...args: string[]) => string
}

export type Settings = {
	border: number // probably percent
	componentColor: string
	editorBackgroundColor: string
	editorTextColor: string
	editorFont: string
	editorFontSize: number
	cloneFontSize: number
}