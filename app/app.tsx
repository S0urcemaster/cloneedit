'use client'
import Editor from './editor'
import Clones from './clones'
import { CloneEditContextProvider } from '../components/context'

export default function App() {

	return (
		<CloneEditContextProvider>
			<Editor />
			<Clones />
		</CloneEditContextProvider>
	)
}