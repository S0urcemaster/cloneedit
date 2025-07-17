'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Clone as CloneModel, defaultState, Document, Settings } from '../app/model'
import { lib } from './lib'

export type CloneEditContext = {
	currentDocument: Document
	settings: Settings
	availableFolders: string[]
	currentFolder: string
	availableFiles: string[]
	currentFile: string
	source: string
	effectChanged: (clone: CloneModel, effectName: string) => void
	folderChanged: (folder: string) => void
	fileChanged: (file: string) => void
	setCurrentFile: (file: string) => void
	sourceChanged: (source: string) => void
}

const CloneEditContext = createContext<CloneEditContext>({} as CloneEditContext)

export function CloneEditContextProvider({ children }: { children: ReactNode }) {

	const [state, setState] = useState(defaultState)

	const [currentDocument, setCurrentDocument] = useState({ ...state.documents[0] })
	const [settings, setSettings] = useState({ ...state.settings })

	const [availableFolders, setAvailableFolders] = useState<string[]>([])
	const [currentFolder, setCurrentFolder] = useState<string>(currentDocument.folderName)
	const [availableFiles, setAvailableFiles] = useState<string[]>([])
	const [currentFile, setCurrentFile] = useState<string>(currentDocument.name)

	const [source, setSource] = useState<string>(currentDocument.editor.text)

	useEffect(() => {
		console.log('✅ useEffect: mounted');

		console.log('currentDocument []', currentDocument)
		setAvailableFolders(lib.extractFolders(state))
		folderChanged(state.documents[0].folderName)
		fileChanged(state.documents[0].name)

		return () => {
			console.log('❌ useEffect: unmounted');
		};
	}, [])

	useEffect(() => {
		// console.log('currentDocument', currentDocument)
		// console.log('Current folder:', currentFolder)
		// console.log('Available folders:', availableFolders)
		// console.log('Available files:', availableFiles)
	}, [availableFiles])

	useEffect(() => {
		console.log('currentFolder', currentFolder)
	}, [currentFolder])

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

	function folderChanged(folder: string) {
		// set available files based on the selected folder
		const files = new Set<string>()
		state.documents.forEach(doc => {
			if (doc.folderName === folder) {
				files.add(doc.name)
			}
		})
		setAvailableFiles(Array.from(files))
		setCurrentFolder(folder)
		console.log('Folder changed to:', folder)
	}

	function fileChanged(file: string) {
		// set currentDocument to document from state with keys folder and name
		setCurrentDocument(state.documents.find(doc => doc.folderName === currentDocument.folderName && doc.name === file))
		setCurrentFile(file)
		// setSource(currentDocument.editor.text)
	}

	function sourceChanged(source: string) {
		currentDocument.editor.text = source
		setCurrentDocument({ ...currentDocument })
	}

	return (
		<CloneEditContext.Provider value={{
			currentDocument: currentDocument,
			settings: settings,
			availableFolders: availableFolders,
			currentFolder: currentFolder,
			availableFiles: availableFiles,
			currentFile: currentFile,
			source: source,
			effectChanged: effectChanged,
			folderChanged: folderChanged,
			fileChanged: fileChanged,
			setCurrentFile: setCurrentFile,
			sourceChanged: sourceChanged,
		}}>
			{children}
		</ CloneEditContext.Provider>
	)
}
export function useCloneEditContext() {
	return useContext(CloneEditContext)
}
