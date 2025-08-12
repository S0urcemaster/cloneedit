'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Account, App as AppModel, Document, Settings } from './model'
import { useFolderAndFileManagement } from './hooks'
import { defaultState, log } from '../static/constants'
import { loadStorage, saveStorage } from './localStorage'

export type CloneEditContext = {
	account: Account
	availableFiles: string[]
	availableFolders: string[]
	effects: string[]
	currentDocument?: Document
	currentFile: string
	currentFolder: string
	editorActions: EditorAction[]
	plainText: string
	selectedEffectId?: number
	settings: Settings
	addEffect: (effect: string) => void
	folderChanged: (folder: string) => void
	fileChanged: (file: string) => void
	setAccount: (account: Account) => void
	setCurrentFile: (file: string) => void
	setEditorActions: (actions: EditorAction[]) => void
	setEditorState: (state: any) => void
	setPlainText: (text: string) => void
	setSelectedEffectId: (n: number) => void
	// updateSelectedClone: ({ id, sourceId, name, effects }: { id?: number, sourceId?: number, name?: string, effects?: string }) => void
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

	const [selectedEffectId, setSelectedEffectId] = useState<number>()

	const [effects, setEffects] = useState<string[]>([])

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
		setEffects(currentDocument.effects)
		setSelectedEffectId(0)
	}, [currentDocument])

	useEffect(() => {
		// if(!clones) return
		// setSelectedClone(clones[0])
	}, [effects])

	function addEffect(effect: string) {

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
		log('context/updateEffect/selectedClone, effectStr', selectedEffectId, `"${effectStr}"`)
		setSelectedEffectId(0)
	}

	// function updateSelectedClone(data: { id?: number, sourceId?: number, name?: string, effects?: string }) {
	// 	if (data.id && data.id !== selectedEffect.id) {
	// 		cloneIdChanged(data.id)
	// 	}
	// 	else if (data.sourceId && data.sourceId !== selectedEffect.sourceId) {
	// 		selectedEffect.sourceId = data.sourceId < 0 ? 0 : data.sourceId > effects.length ? 0 : data.sourceId
	// 	}
	// 	else if (data.name && data.name !== selectedEffect.name) {
	// 		selectedEffect.name = data.name
	// 	}
	// 	if (data.effects && data.effects !== selectedEffect.effects) {
	// 		updateEffect(data.effects)
	// 		setEffects([...effects])
	// 	}
	// 	log('updateSelectedClone/selectedClone', selectedEffect)
	// 	setSelectedEffect({ ...selectedEffect })
	// }

	// function cloneIdChanged(newId: number) {
	// 	if (!currentDocument) return
	// 	log('context/cloneIdChanged/newId', newId)
	// 	// Handle edge cases for newId
	// 	const maxId = currentDocument.effects.length
	// 	const adjustedId = Math.max(0, Math.min(newId, maxId)) // Clamp ID between 0 and list length

	// 	// Create a new array without the clone to be repositioned
	// 	const updatedClones = currentDocument.effects.filter(c => c.id !== selectedEffect.id)

	// 	// Insert the clone at the new position (adjustedId as index)
	// 	const insertIndex = adjustedId === 0 ? 0 : Math.min(adjustedId - 1, updatedClones.length)
	// 	updatedClones.splice(insertIndex, 0, { ...selectedEffect, id: adjustedId })

	// 	// Reassign IDs sequentially starting from 1
	// 	const reindexedClones = updatedClones.map((c, index) => ({
	// 		...c,
	// 		id: index + 1, // IDs start at 1
	// 	}))

	// 	// Update the document with the new clones array
	// 	setCurrentDocument({ ...currentDocument, effects: reindexedClones })

	// 	// Update selectedClone if it was the moved clone
	// 	if (selectedEffect.id === selectedEffect.id) {
	// 		const newSelectedClone = reindexedClones.find(c => c.id === insertIndex + 1) || reindexedClones[0]
	// 		setSelectedEffect(newSelectedClone)
	// 	}
	// }

	return (
		<CloneEditContext.Provider value={{
			account,
			availableFiles,
			availableFolders,
			currentDocument,
			effects,
			currentFile,
			currentFolder,
			editorActions,
			plainText,
			selectedEffectId,
			settings,
			addEffect,
			fileChanged,
			folderChanged,
			setAccount,
			setCurrentFile,
			setEditorActions,
			setEditorState,
			setPlainText,
			setSelectedEffectId,
			// updateSelectedClone,
		}}>
			{children}
		</ CloneEditContext.Provider>
	)
}
export function useCloneEditContext() {
	return useContext(CloneEditContext)
}
