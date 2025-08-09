'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Account, App as AppModel, Clone as CloneModel, Document, Settings } from './model'
import { lib } from '../static/lib'
import { useFolderAndFileManagement } from './hooks'
import { defaultState, log } from '../static/constants'
import { effects } from '../static/effects'
import { loadStorage, saveStorage } from './localStorage'

export type CloneEditContext = {
	account: Account
	currentDocument?: Document
	clones: CloneModel[]
	settings: Settings
	availableFolders: string[]
	currentFolder: string
	availableFiles: string[]
	currentFile: string
	selectedClone?: CloneModel
	editorActions: EditorAction[]
	plainText: string
	setAccount: (account: Account) => void
	folderChanged: (folder: string) => void
	fileChanged: (file: string) => void
	setCurrentFile: (file: string) => void
	setSelectedClone: (clone: CloneModel) => void
	setEditorActions: (actions: EditorAction[]) => void
	setEditorState: (state: any) => void
	setPlainText: (text: string) => void
	updateEffectCommand: (command: string) => void
	cloneIdChanged: (id: number) => void
	sourceIdChanged: (id: number) => void
}

const CloneEditContext = createContext<CloneEditContext>({} as CloneEditContext)

export type EditorAction = [
	name: string,
	payload?: string
]

export function CloneEditContextProvider({ children }: { children: ReactNode }) {

	const [state, setState] = useState<AppModel | undefined>()

	const [account, setAccount] = useState<Account>()

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

	const [clones, setClones] = useState<CloneModel[]>()

	useEffect(() => {
		log('✅ useEffect: mounted')
		const storage = loadStorage()
		log('context/storage', storage)
		// if(state.version === defaultState.version) setState(storage.state)
		// else setState(defaultState)
		setState(defaultState) // dev
	}, [])

	useEffect(() => {
		if (!state) return
		setAccount(state.account)
		setCurrentDocument(state.documents[0])
		setSettings(state.settings)
		log('context/[state]/state', state)
	}, [state])

	useEffect(() => {
		log('context/[currentDocument]/currentDocument', currentDocument)
		if (!currentDocument) return
		if(!currentDocument.editor?.state) setEditorActions([['clear']])
		setClones(currentDocument.clones) // avoid focus jumps when working with clones
		setSelectedClone(currentDocument.clones[0])
	}, [currentDocument])

	useEffect(() => {
		// if(!clones) return
		// setSelectedClone(clones[0])
	}, [clones])

	function setEditorState(editorState: string) {
		log('context/setEditorState/editorState', editorState)
		// if (editorState.startsWith('{"root":{"children":[{"children":[]')) return
		currentDocument.editor.state = editorState
		saveStorage({ state: state })
		log('context/setEditorState/loadStorage', loadStorage())
	}

	function updateEffectCommand(command: string) {
		if(!command) return
		log('context/updateEffectCommand/clone, command', selectedClone, `"${command}"`)
		let id = -1
		const ourClone = currentDocument.clones.find((c, ix) => {
			if(c.id === selectedClone.id) {
				id = ix
				return true
			}
		})
		const effs = lib.fromTextEffects(command)
		ourClone.effects = effs
		clones.splice(id, 1, ourClone)
		setClones([...clones])
		setSelectedClone({...ourClone})
		// setCurrentDocument({ ...currentDocument, clones: updatedClones })
	}

	function cloneIdChanged(newId: number) {
		if(!currentDocument) return
		// Handle edge cases for newId
		const maxId = currentDocument.clones.length
		const adjustedId = Math.max(0, Math.min(newId, maxId)) // Clamp ID between 0 and list length

		// Create a new array without the clone to be repositioned
		const updatedClones = currentDocument.clones.filter(c => c.id !== selectedClone.id)

		// Insert the clone at the new position (adjustedId as index)
		const insertIndex = adjustedId === 0 ? 0 : Math.min(adjustedId - 1, updatedClones.length)
		updatedClones.splice(insertIndex, 0, { ...selectedClone, id: adjustedId })

		// Reassign IDs sequentially starting from 1
		const reindexedClones = updatedClones.map((c, index) => ({
			...c,
			id: index + 1, // IDs start at 1
		}))

		// Update the document with the new clones array
		setCurrentDocument({ ...currentDocument, clones: reindexedClones })

		// Update selectedClone if it was the moved clone
		if (selectedClone.id === selectedClone.id) {
			const newSelectedClone = reindexedClones.find(c => c.id === insertIndex + 1) || reindexedClones[0]
			setSelectedClone(newSelectedClone)
		}
	}

	function sourceIdChanged(newId: number) {

	}

	return (
		<CloneEditContext.Provider value={{
			account,
			currentDocument,
			clones,
			settings,
			availableFolders,
			currentFolder,
			availableFiles,
			currentFile,
			selectedClone,
			editorActions,
			plainText,
			setAccount,
			updateEffectCommand,
			folderChanged,
			fileChanged,
			setCurrentFile,
			setSelectedClone,
			setEditorActions,
			setEditorState,
			setPlainText,
			cloneIdChanged,
			sourceIdChanged,
		}}>
			{children}
		</ CloneEditContext.Provider>
	)
}
export function useCloneEditContext() {
	return useContext(CloneEditContext)
}
