import React, { useState } from 'react'
import { App as AppState, Clone as CloneModel } from './model'

export default function Clones({ appState }: { appState: AppState }) {

	const [clones, setClones] = useState(appState.editors[0].clones)

	function Controller() {
		return (
			<div style={{ display: 'flex', justifyContent: 'space-between', height: 25, overflow: 'hidden', paddingTop: 0, paddingBottom: 2 }}>
				<h1 style={{ position: 'relative', top: -5, left: 1, fontSize: 28 }}>Controller</h1>
				<div>
					<button style={{ marginRight: 3, width: 35 }}>Del</button>
					<button style={{ marginRight: 3, width: 50 }}>Dupl</button>
					<button style={{ marginRight: 3, width: 55 }}>New</button>
					<button style={{ marginRight: 3, width: 20 }}>I</button>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between', height: 25, overflow: 'hidden', paddingTop: 3 }}>
					<div>
						<button style={{ marginRight: 3, width: 90 }}>Run</button>
						<button style={{ marginRight: 3 }}>Delete</button>
					</div>
					<select>
						<option value="gpt-2">Llama 3</option>
						<option value="gpt-3">Vicuna-13B</option>
						<option value="gpt-4">h2oGPT</option>
					</select>
				</div>
			</div>
		)
	}

	function Clone({ clone }: { clone: CloneModel }) {
		return (
			<div style={{ border: '1px solid #ccc', height: 50 }}>
				{clone.id}
			</div>
		)
	}

	return (
		<div>

			<Controller />
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{clones.map((clone, ix) => (
					<Clone key={ix} clone={clone} />
				))}
			</div>
		</div>
	)
}