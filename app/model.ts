
export type App = {
	// Multi Document
	version: string
	documents: Document[]
	settings: Settings // Globale Einstellungen : Schriftart , Rand
	account: Account
}

export type Account = {
	name: string
	id: string
	type: string
	tokens: number
}

export type Document = {
	name: string
	folderName: string
	editor: Editor
	effects: string[]
}

export type Editor = {
	state: string // lexical html serialized
	plainText: string // for hardcoded stuff
	memory: string[]
	snippets: string[]
}

export type Effect = {
	name: string
	sourceId: number
	instructions: string // string because it should be stored even if the input is incorrect
}

export interface Instruction { // the string 
	name: string
	args?: string[]
	update: (text: string, ...args: string[]) => string
	// doc: () => void
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