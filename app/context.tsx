'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Account, App as AppModel, Clone as CloneModel, Document, Settings } from './model'
import { lib } from '../static/lib'
import { useFolderAndFileManagement } from './hooks'
import { defaultState, log } from '../static/constants'
import { Effect } from '../static/effects'
import { loadStorage, saveStorage } from './localStorage'

export type CloneEditContext = {
	account: Account
	availableFiles: string[]
	availableFolders: string[]
	clones: CloneModel[]
	currentDocument?: Document
	currentFile: string
	currentFolder: string
	editorActions: EditorAction[]
	plainText: string
	selectedClone?: CloneModel
	settings: Settings
	addClone: (clone: CloneModel) => void
	folderChanged: (folder: string) => void
	fileChanged: (file: string) => void
	setAccount: (account: Account) => void
	setCurrentFile: (file: string) => void
	setEditorActions: (actions: EditorAction[]) => void
	setEditorState: (state: any) => void
	setPlainText: (text: string) => void
	setSelectedClone: (clone: CloneModel) => void
	updateSelectedClone: ({ id, sourceId, name, effects }: { id?: number, sourceId?: number, name?: string, effects?: string }) => void
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
		if (!currentDocument.editor?.state) setEditorActions([['clear']])
		setClones(currentDocument.clones) // avoid focus jumps when working with clones
		setSelectedClone(currentDocument.clones[0])
	}, [currentDocument])

	useEffect(() => {
		// if(!clones) return
		// setSelectedClone(clones[0])
	}, [clones])

	function addClone(clone: CloneModel) {

	}

	function setEditorState(editorState: string) {
		log('context/setEditorState/editorState', editorState)
		// if (editorState.startsWith('{"root":{"children":[{"children":[]')) return
		currentDocument.editor.state = editorState
		saveStorage({ state: state })
		log('context/setEditorState/loadStorage', loadStorage())
	}

	function updateEffect(effectStr: string) {
		if (!effectStr) return
		log('context/updateEffect/selectedClone, effectStr', selectedClone, `"${effectStr}"`)
		let id = -1
		const ourClone = currentDocument.clones.find((c, ix) => {
			if (c.id === selectedClone.id) {
				id = ix
				return true
			}
		})
		// const effs = lib.fromTextEffects(effectStr)
		selectedClone.effects = effectStr
		currentDocument.clones.splice(id, 1, selectedClone)
		// setClones({...currentDocument.clones})
		setSelectedClone({ ...selectedClone })
		setCurrentDocument({ ...currentDocument })
	}

	function updateSelectedClone(data: { id?: number, sourceId?: number, name?: string, effects?: string }) {
		if (data.id && data.id !== selectedClone.id) {
			cloneIdChanged(data.id)
		}
		else if (data.sourceId && data.sourceId !== selectedClone.sourceId) {
			selectedClone.sourceId = data.sourceId < 0 ? 0 : data.sourceId > clones.length ? 0 : data.sourceId
		}
		else if (data.name && data.name !== selectedClone.name) {
			selectedClone.name = data.name
		}
		if (data.effects && data.effects !== selectedClone.effects) {
			updateEffect(data.effects)
			setClones([...clones])
		}
		log('updateSelectedClone/selectedClone', selectedClone)
		setSelectedClone({ ...selectedClone })
	}

	function cloneIdChanged(newId: number) {
		if (!currentDocument) return
		log('context/cloneIdChanged/newId', newId)
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

	return (
		<CloneEditContext.Provider value={{
			account,
			availableFiles,
			availableFolders,
			currentDocument,
			clones,
			currentFile,
			currentFolder,
			editorActions,
			plainText,
			selectedClone,
			settings,
			addClone,
			fileChanged,
			folderChanged,
			setAccount,
			setCurrentFile,
			setEditorActions,
			setEditorState,
			setPlainText,
			setSelectedClone,
			updateSelectedClone,
		}}>
			{children}
		</ CloneEditContext.Provider>
	)
}
export function useCloneEditContext() {
	return useContext(CloneEditContext)
}
