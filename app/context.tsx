'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { App as AppModel, Clone as CloneModel, Document, Settings } from './model'
import { lib } from '../static/lib'
import { useFolderAndFileManagement } from './hooks'
import { defaultState, log } from '../static/constants'
import { effects } from '../static/effects'
import { loadStorage, saveStorage } from './localStorage'

export type CloneEditContext = {
	currentDocument?: Document
	settings: Settings
	availableFolders: string[]
	currentFolder: string
	availableFiles: string[]
	currentFile: string
	selectedClone?: CloneModel
	editorActions: EditorAction[]
	plainText: string
	folderChanged: (folder: string) => void
	fileChanged: (file: string) => void
	setCurrentFile: (file: string) => void
	setSelectedClone: (clone: CloneModel) => void
	setEditorActions: (actions: EditorAction[]) => void
	setEditorState: (state: any) => void
	setPlainText: (text: string) => void
	updateEffectCommand: (command: string) => void
	cloneIdChanged: (clone: CloneModel, id: number) => void
}

const CloneEditContext = createContext<CloneEditContext>({} as CloneEditContext)

export type EditorAction = [
	name: string,
	payload?: string
]

export function CloneEditContextProvider({ children }: { children: ReactNode }) {

	const [state, setState] = useState<AppModel | undefined>()

	const {
		currentDocument,
		currentFolder,
		availableFolders,
		availableFiles,
		currentFile,
		folderChanged,
		fileChanged,
		setCurrentFile,
		setCurrentDocument,
	} = useFolderAndFileManagement(state)

	const [plainText, setPlainText] = useState('')

	const [settings, setSettings] = useState<Settings | undefined>(defaultState.settings)

	const [editorActions, setEditorActions] = useState<EditorAction[]>([])

	const [selectedClone, setSelectedClone] = useState<CloneModel | undefined>()

	useEffect(() => {
		log('✅ useEffect: mounted')
		const storage = loadStorage()
		log('context/storage', storage)
		// setState(storage.state)
		setState(defaultState) // dev
	}, [])

	useEffect(() => {
		if (!state) return
		setCurrentDocument(state.documents[0])
		setSettings(state.settings)
		log('context/[state]/state', state)
	}, [state])

	useEffect(() => {
		log('context/[currentDocument]/currentDocument', currentDocument)
		if (!currentDocument) return
		if(!currentDocument.editor?.state) setEditorActions([['clear']])
	}, [currentDocument])

	function setEditorState(editorState: string) {
		log('context/setEditorState/editorState', editorState)
		// if (editorState.startsWith('{"root":{"children":[{"children":[]')) return
		currentDocument.editor.state = editorState
		saveStorage({ state: state })
		log('context/setEditorState/loadStorage', loadStorage())
		// setCurrentDocument({...currentDocument}) // editor already up to date . when save ?
	}

	function updateEffectCommand(command: string) {
		if(!command) return
		log('context/updateEffectCommand/clone, command', selectedClone, `"${command}"`)
		const ourClone = currentDocument.clones.find(c => {
			return c.id === selectedClone.id
		})
		const effs = lib.fromTextEffects(command)
		ourClone.effects = effs
		selectedClone.effects = effs
		setSelectedClone({...selectedClone})
		// setCurrentDocument({ ...currentDocument, clones: updatedClones })
	}

	function cloneIdChanged(clone: CloneModel, newId: number) {
		// Handle edge cases for newId
		const maxId = currentDocument.clones.length
		const adjustedId = Math.max(0, Math.min(newId, maxId)) // Clamp ID between 0 and list length

		// Create a new array without the clone to be repositioned
		const updatedClones = currentDocument.clones.filter(c => c.id !== clone.id)

		// Insert the clone at the new position (adjustedId as index)
		const insertIndex = adjustedId === 0 ? 0 : Math.min(adjustedId - 1, updatedClones.length)
		updatedClones.splice(insertIndex, 0, { ...clone, id: adjustedId })

		// Reassign IDs sequentially starting from 1
		const reindexedClones = updatedClones.map((c, index) => ({
			...c,
			id: index + 1, // IDs start at 1
		}))

		// Update the document with the new clones array
		setCurrentDocument({ ...currentDocument, clones: reindexedClones })

		// Update selectedClone if it was the moved clone
		if (selectedClone.id === clone.id) {
			const newSelectedClone = reindexedClones.find(c => c.id === insertIndex + 1) || reindexedClones[0]
			setSelectedClone(newSelectedClone)
		}
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
			updateEffectCommand: updateEffectCommand,
			folderChanged: folderChanged,
			fileChanged: fileChanged,
			setCurrentFile: setCurrentFile,
			setSelectedClone: setSelectedClone,
			setEditorActions: setEditorActions,
			setEditorState: setEditorState,
			setPlainText: setPlainText,
			cloneIdChanged,
		}}>
			{children}
		</ CloneEditContext.Provider>
	)
}
export function useCloneEditContext() {
	return useContext(CloneEditContext)
}
