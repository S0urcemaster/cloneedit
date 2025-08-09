
export type App = {
	// Multi Document
	version: string
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
	effects: Effect[]
}

export type Effect = {
	name: string
	args?: string[]
	update: (text: string, ...args: string[]) => string
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
	redColor: string
	blueColor: string
	yellowColor: string
	greenColor: string
	selectedColor: string
	width: number // probably percent
}