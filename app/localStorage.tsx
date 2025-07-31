import { defaultState } from '../static/constants'
import { App as AppModel } from './model'

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

export function loadStorage(): StorageState {
	let storage = JSON.parse(localStorage.getItem('cloneedit')!)
	if (!storage) {
		saveStorage(initialStorageState)
		storage = JSON.parse(localStorage.getItem('cloneedit')!)
	} else {
		saveStorage(storage)
	}
	return storage
}

export function saveStorage(storage: StorageState) {
	localStorage.setItem('cloneedit', JSON.stringify(storage))
}
