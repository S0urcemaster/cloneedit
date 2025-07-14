'use client'
import React, { CSSProperties, ReactElement, useEffect, useState } from 'react'
import Results from './view/results'
import Requests from './view/requests'
import MenuHead from './view/maskHead'
import MaskList from './view/maskList'
import Mask from './view/mask'
import { defaultModel } from './model'
import ModelHead from './view/requestHead'

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
		<>
			<div style={{ display: 'grid', gridTemplateRows: '3fr 1fr' }}>
				<div style={{ display: 'grid', gridTemplateRows: '1fr 0fr', padding: 5, backgroundColor: '#25597C' }}>
					<Mask appState={state} appEvents={events} />
					<MenuHead appState={state} showConfig={() => setName('config')} />
				</div>
				<div style={{ marginTop: 1, backgroundColor: '#25597C' }}>
					<MaskList appState={state} />
				</div>
			</div>
			<div style={{ display: 'grid', gridTemplateRows: '3fr 1fr', paddingLeft: 1 }}>
				<div style={{ display: 'grid', gridTemplateRows: '1fr 0fr', padding: 5, backgroundColor: '#25597C' }}>
					<Results appState={state} appEvents={events} />
					<ModelHead appState={state} showConfig={() => setName('config')} />
				</div>
				<div style={{ display: 'grid', gridTemplateRows: '0fr 1fr', padding: 5, backgroundColor: '#25597C', marginTop: 1 }}>
					<Requests appState={state} />
				</div>
			</div>
		</>
	)
}