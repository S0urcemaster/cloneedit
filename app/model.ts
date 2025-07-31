
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
	state: string
	plainText: string
	memory: string[]
	snippets: string[]
}

export type Clone = {
	id: number // unique id benötigt pro Objekt
	name: string
	sourceId?: number // one source per Clone
	effect: Effect
}

export type Effect = {
	name: string
	args: string[]
	update: (text: string, ...args: string[]) => string // remove from model to not having it sorted back into the state tree after de-serialization
}

export type Settings = {
	brightColor: string
	buttonBackground: string
	buttonColor: string
	cloneeditColor: string
	cloneFontSize: number
	cloneTitleBackground: string
	darkColor: string
	editorBackground: string
	editorColor: string
	editorFont: string
	editorFontSize: number
	effectEditorBackground: string
	effectEditorColor: string
	effectEditorFontSize: number
	inputBackground: string
	lightDarkColor: string
	material: string
	materialMedian: string
	mezzoDarkColor: string
	selectedColor: string
	width: number // probably percent
}