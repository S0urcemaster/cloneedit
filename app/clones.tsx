import React, { useState } from 'react'
import { Clone as CloneModel } from './model'
import { useCloneEditContext } from './context'

export default function Clones() {

	const { state } = useCloneEditContext()

	function Controller() {
		return (
			<div style={{ display: 'flex', justifyContent: 'space-between', height: 25, overflow: 'hidden', padding: '2px 5px 2px 5px' }}>
				<div>
					<button style={{ marginRight: 3 }}>New Clone</button>
					<button style={{ marginRight: 3 }}>Selected Up</button>
					<button style={{ marginRight: 3 }}>Selected Dn</button>
					<button style={{ marginRight: 3 }}>Delete Selected</button>
					<button style={{ marginRight: 3 }}></button>
					<button style={{ marginRight: 3 }}>I</button>
				</div>
			</div>
		)
	}

	function Clone({ clone }: { clone: CloneModel }) {
		return (
			<div style={{ padding: 3, }}>
				<div style={{
					height: 50,
					overflow: 'auto',
					whiteSpace: 'pre-wrap',
					wordBreak: 'break-word',
					padding: 5, background: state.settings.editorBackgroundColor,
					color: state.settings.textColor,
				}}>
					{clone.filter.update(state.editors[0].text)}
				</div>
			</div>
		)
	}

	return (
		<div style={{ backgroundColor: state.settings.componentColor }}>
			<Controller />
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{state.editors[0].clones.map((clone, ix) => (
					<Clone key={ix} clone={clone} />
				))}
			</div>
		</div>
	)
}