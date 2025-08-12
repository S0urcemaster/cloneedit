'use client'
import Editor from './editor'
import Effects from './clones'
import { useCloneEditContext } from './context'
import { Player } from './player'

export default function App() {

	const { settings } = useCloneEditContext()

	return (
		<>
			<Player />
			<div style={{ borderTop: `1px solid ${settings.lightDarkColor}`, borderBottom: `1px solid ${settings.selectedColor}`}}></div>
			<Editor />
			<div style={{ borderTop: `1px solid ${settings.lightDarkColor}`, borderBottom: `1px solid ${settings.effectEditorColor}`}}></div>
			<Effects />
		</>
	)
}