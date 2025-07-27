'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { App as AppModel, Clone as CloneModel, Document, Settings } from './model'
import { lib } from './lib'
import { defaultState } from './constants'
import { useFolderAndFileManagement } from './hooks'

export type CloneEditContext = {
	currentDocument: Document
	settings: Settings
	availableFolders: string[]
	currentFolder: string
	availableFiles: string[]
	currentFile: string
	selectedClone: CloneModel
	editorActions: EditorAction[]
	plainText: string
	effectChanged: (clone: CloneModel, effectName: string) => void
	folderChanged: (folder: string) => void
	fileChanged: (file: string) => void
	setCurrentFile: (file: string) => void
	setSelectedClone: (clone: CloneModel) => void
	setEditorActions: (actions: EditorAction[]) => void
	setPlainText: (text: string) => void
}

const CloneEditContext = createContext<CloneEditContext>({} as CloneEditContext)

export const action_clear = 'clear'
export const action_insert = 'insert'
export const action_getplaintext = 'getplaintext'

export type EditorAction = [
	name: string,
	payload: string
]

export function CloneEditContextProvider({ children }: { children: ReactNode }) {

	const [state, setState] = useState<AppModel>(defaultState)

	const {
		currentDocument,
		currentFolder,
		availableFolders,
		availableFiles,
		currentFile,
		folderChanged,
		fileChanged,
		setCurrentFile,
	} = useFolderAndFileManagement(state)

	const [plainText, setPlainText] = useState('')

	const [settings, setSettings] = useState({ ...state.settings })

	const [editorActions, setEditorActions] = useState<EditorAction[]>([])

	const [selectedClone, setSelectedClone] = useState<CloneModel>(currentDocument.clones[0])

	useEffect(() => {
		console.log('✅ useEffect: mounted')
	}, [])

	useEffect(() => {
		setEditorActions([[action_clear, ''], [action_insert, currentDocument.editor.plainText]])
	}, [currentDocument])

	function effectChanged(clone: CloneModel, effectName: string) {
		// find the clone / update its value and update the state
		// const updatedClones = state.documents[0].clones.map(c => {
		// 	if (c.id === clone.id) {
		// 		return { ...c, effect: effectName }
		// 	}
		// 	return c
		// })
		// const updatedDocument = { ...currentDocument, clones: updatedClones }
	}

	return (
		<CloneEditContext.Provider value={{
			currentDocument: currentDocument,
			settings: settings,
			availableFolders: availableFolders,
			currentFolder: currentFolder,
			availableFiles: availableFiles,
			currentFile: currentFile,
			selectedClone: selectedClone,
			editorActions: editorActions,
			plainText: plainText,
			effectChanged: effectChanged,
			folderChanged: folderChanged,
			fileChanged: fileChanged,
			setCurrentFile: setCurrentFile,
			setSelectedClone: setSelectedClone,
			setEditorActions: setEditorActions,
			setPlainText: setPlainText,
		}}>
			{children}
		</ CloneEditContext.Provider>
	)
}
export function useCloneEditContext() {
	return useContext(CloneEditContext)
}
