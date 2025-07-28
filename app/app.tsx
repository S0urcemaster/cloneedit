'use client'
import Editor from './editor'
import Clones from './clones'
import { CloneEditContextProvider } from './context'
import { Player } from './player'

export default function App() {

	return (
		<CloneEditContextProvider>
			<Player />
			<Editor />
			<Clones />
		</CloneEditContextProvider>
	)
}