'use client'
import React, { CSSProperties, ReactElement, useEffect, useState } from 'react'
import { defaultModel } from './model'
import Editor from './editor'
import Clones from './clones'
import { CloneEditContextProvider } from './context'

export default function App() {

	const [state, setState] = useState(defaultModel)

	useEffect(() => {
		// query()
	}, [])

	function setName(name: string) {
		// state.systems[state.currentSystem].name = name
		// setState({ ...state })
	}

	const events = {
		nameChanged: (value: string) => {
			// setName(value)
		},
		definitionChanged: (value: string) => {
			// state.systems[state.currentSystem].definition = value
			// setState({ ...state })
		},
		requestChanged: (value: string) => {
			// state.systems[state.currentSystem].requests[state.systems[state.currentSystem].currentRequest].text = value
			// setState({ ...state })
		}
	}

	return (
		<CloneEditContextProvider initialState={state}>
			<Editor appState={state} />
			<Clones appState={state} />
		</CloneEditContextProvider>
	)
}