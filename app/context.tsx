import { createContext, ReactNode, useContext } from 'react'
import { App as AppModel } from './model'

export type LocalStorage = {
	download: Function
	upload: Function
	// setWorktime: (worktime: Worktime) => void
	// downloadWorktime: (year: number) => void
	// uploadWorktime: (file: any, year: number) => void
	storageLoaded: boolean
}

type StorageState = {
	worktime: any
}

const initialStorageState: StorageState = {
	worktime: { 2023: { year: 2023, months: [] } },
}

function loadStorage() {
	let storage = JSON.parse(localStorage.getItem('cloneedit')!)
	if (!storage) {
		saveStorage(initialStorageState)
		storage = JSON.parse(localStorage.getItem('cloneedit')!)
	} else {
		if (!storage.worktime) {
			storage.worktime = initialStorageState.worktime
		} else {
			if ('year' in storage.worktime) {
				storage.worktime = initialStorageState.worktime
			}
		}
		saveStorage(storage)
	}
	return storage
}

function saveStorage(storage: StorageState) {
	localStorage.setItem('cloneedit', JSON.stringify(storage))
}

export type CloneEditContext = {
	state: AppModel
}

const CloneEditContext = createContext<CloneEditContext>({} as CloneEditContext)

export function CloneEditContextProvider({ initialState, children }: { initialState: AppModel, children: ReactNode }) {
	return (
		<CloneEditContext.Provider value={{ state: initialState }}>
			{children}
		</CloneEditContext.Provider>
	)
}
export function useCloneEditContext() {
	return useContext(CloneEditContext)
}