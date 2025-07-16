import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { App as AppModel, Clone as CloneModel, defaultState, Document, Settings } from './model'

type LocalStorage = {
	download: Function
	upload: Function
	storageLoaded: boolean
	state: AppModel
}

type StorageState = {
	state: AppModel
}

const initialStorageState: StorageState = {
	state: defaultState
}

function loadStorage() {
	let storage = JSON.parse(localStorage.getItem('cloneedit')!)
	if (!storage) {
		saveStorage(initialStorageState)
		storage = JSON.parse(localStorage.getItem('cloneedit')!)
	} else {
		saveStorage(storage)
	}
	return storage
}

function saveStorage(storage: StorageState) {
	localStorage.setItem('cloneedit', JSON.stringify(storage))
}

export type CloneEditContext = {
	currentDocument: Document
	settings: Settings
	availableFolders: string[]
	availableFiles: string[]
	effectChanged: (clone: CloneModel, effectName: string) => void
	folderChanged: (folder: string) => void
	fileChanged: (file: string) => void
}

const CloneEditContext = createContext<CloneEditContext>({} as CloneEditContext)

export function CloneEditContextProvider({ initialState, children }: { initialState: AppModel, children: ReactNode }) {

	const state = initialState // stateless, update here / then paste to state variable

	const [currentDocument, setCurrentDocument] = useState(state.documents[0])
	const [settings, setSettings] = useState(state.settings)

	const [availableFolders, setAvailableFolders] = useState<string[]>([])
	const [availableFiles, setAvailableFiles] = useState<string[]>([])

	useEffect(() => {
		folderChanged(state.documents[0].folder)
		fileChanged(state.documents[0].name)
	}, [state])

	useEffect(() => {
		console.log('Available folders:', availableFolders)
		console.log('Available files:', availableFiles)
	}, [availableFiles, availableFolders])

	function effectChanged(clone: CloneModel, effectName: string) {
		// find the clone / update its value and update the state
		const updatedClones = state.documents[0].clones.map(c => {
			if (c.id === clone.id) {
				return { ...c, effect: effectName }
			}
			return c
		})
		const updatedDocument = { ...currentDocument, clones: updatedClones }
	}

	function folderChanged(folder: string) {
		// set available files based on the selected folder
		const files = new Set<string>()
		state.documents.forEach(doc => {
			if (doc.folder === folder) {
				files.add(doc.name)
			}
		})
		setAvailableFiles(Array.from(files))
	}

	function fileChanged(file: string) {
		// set currentDocument to document from state with keys folder and name
		setCurrentDocument(state.documents.find(doc => { doc.folder === currentDocument.folder && doc.name === file }))
	}

	return (
		<CloneEditContext.Provider value={{
			currentDocument: currentDocument,
			settings: settings,
			availableFolders: availableFolders,
			availableFiles: availableFiles,
			effectChanged: effectChanged,
			folderChanged: folderChanged,
			fileChanged: fileChanged,
		}}>
			{children}
		</ CloneEditContext.Provider>
	)
}
export function useCloneEditContext() {
	return useContext(CloneEditContext)
}
