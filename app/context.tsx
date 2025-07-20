'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Clone as CloneModel, Document, Settings } from './model'
import { lib } from './lib'
import { defaultState } from './constants'

export type CloneEditContext = {
	currentDocument: Document
	settings: Settings
	availableFolders: string[]
	currentFolder: string
	availableFiles: string[]
	currentFile: string
	source: string
	selectedClone: CloneModel
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
	const [selectedClone, setSelectedClone] = useState<CloneModel>(currentDocument.clones[0])

	useEffect(() => {
		console.log('✅ useEffect: mounted');
		setAvailableFolders(lib.extractFolders(state))
		folderChanged(state.documents[0].folderName)
	}, [])

	function folderChanged(folder: string) {
		setCurrentFolder(folder)
	}

	useEffect(() => {
		// set available files based on the selected folder
		const files = new Set<string>()
		state.documents.forEach(doc => {
			if (doc.folderName === currentFolder) {
				files.add(doc.name)
			}
		})
		setAvailableFiles(Array.from(files))
	}, [currentFolder])

	useEffect(() => {
		setCurrentFile(availableFiles[0])
	}, [availableFiles])

	useEffect(() => {
		fileChanged(currentFile)
	}, [currentFile])

	function fileChanged(file: string) {
		// set currentDocument to document from state with keys folder and name
		const doc = state.documents.find(doc => {
			const equalsFolder = doc.folderName === currentFolder
			const equalsFile = doc.name === file
			return equalsFolder && equalsFile
		})
		setCurrentDocument(doc)
	}

	useEffect(() => {
		setCurrentFile(currentDocument.name)
		setSource(currentDocument.editor.text)
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
			selectedClone: selectedClone,
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
