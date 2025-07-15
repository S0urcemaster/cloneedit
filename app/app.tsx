'use client'
import Editor from './editor'
import Clones from './clones'
import { CloneEditContextProvider } from './context'
import { defaultState } from './model'

export default function App() {

	return (
		<CloneEditContextProvider initialState={defaultState}>
			<Editor />
			<Clones />
		</CloneEditContextProvider>
	)
}