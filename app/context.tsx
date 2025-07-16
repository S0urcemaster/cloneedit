import { createContext, ReactNode, useContext, useState } from 'react'
import { App as AppModel, Clone as CloneModel, defaultState } from './model'

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
	state: AppModel
	filterChanged: (clone: CloneModel, filterName: string) => void
}

const CloneEditContext = createContext<CloneEditContext>({} as CloneEditContext)

export function CloneEditContextProvider({ initialState, children }: { initialState: AppModel, children: ReactNode }) {

	const [state, setState] = useState(initialState)

	function filterChanged(clone: CloneModel, filterName: string) {
		// find the clone / update its value and update the state
		const updatedClones = state.documents[0].clones.map(c => {
			if (c.id === clone.id) {
				return { ...c, filter: filterName }
			}
			return c
		})
		const updatedDocument = { ...state.documents[0], clones: updatedClones }
	}

	return (
		<CloneEditContext.Provider value={{
			state: state,
			filterChanged: filterChanged
		}}>
			{children}
		</ CloneEditContext.Provider>
	)
}
export function useCloneEditContext() {
	return useContext(CloneEditContext)
}