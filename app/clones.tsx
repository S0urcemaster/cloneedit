'use client'
import React, { useRef, useState } from 'react'
import { Clone as CloneModel } from './model'
import { useCloneEditContext } from './context'
import { TabBar } from '../components/TabBar'
import { effects } from './constants'
import { lib } from './lib'

const log = console.log

function cloneNameChanged(name: string) {

}

function positionChanged(name: string) {

}

function formValueChanged(ix: number, value: string) {

}

function Controller({ clone }: { clone: CloneModel }) {
	const { settings, selectedClone, updateEffectCommand } = useCloneEditContext()

	function commandChanged(line: string) {
		const timeoutId = useRef<NodeJS.Timeout | null>(null);

		if (timeoutId.current !== null) {
			clearTimeout(timeoutId.current);
			log('Previous timeout cancelled');
		}

		timeoutId.current = setTimeout(() => {
			updateEffectCommand(clone, line);
			log(`updateCommand called with: ${line}`);
			timeoutId.current = null;
		}, 300000);

		log(`Timeout set for updateCommand with: ${line}`);
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
				<button style={{ fontWeight: 'bold', fontSize: 'x-large' }}>⇡</button>
				<button style={{ cursor: 'default' }} disabled>{selectedClone.id}</button>
				<button style={{ fontWeight: 'bold', fontSize: 'x-large' }}>⇣</button>
				<input style={{ flexGrow: 1 }} type='text' value={clone.name} onChange={e => cloneNameChanged(e.target.value)} />
				<div style={{}}>
					<button style={{}}>✱</button>
					<button style={{}}>⁑</button>
					<button style={{}}>✖</button>
					<button style={{}}>♻</button>
				</div>
			</div>

			<div style={{ display: 'flex' }}>
				<textarea
					value={lib.joinCommand(clone.effect)}
					onChange={e => commandChanged(e.target.value)}
					rows={2}
					placeholder={'Type Effect'}
					style={{
						height: '100%',
						width: '100%',
						resize: 'none',
						background: settings.editorBackgroundColor, // Gradient background
						color: settings.editorTextColor, // Text color
						padding: '0px 12px 0px 6px', // Padding
						margin: 0,
						// border: `1px solid ${settings.brightColor}`, // Border color
						fontSize: settings.cloneFontSize,
					}}
				/>
			</div>
		</div>
	)
}

function Clone({ clone }: { clone: CloneModel }) {
	const { settings, selectedClone, setSelectedClone, plainText } = useCloneEditContext()

	return (
		<div className='clone' style={{}}>
			<div style={{ height: 25, overflow: 'hidden', padding: '0px 0px 0px 0px' }}>
				<div style={{ marginRight: 3, width: '100%', backgroundColor: settings.mezzoDarkColor, color: settings.brightColor, paddingBottom: 5 }}>{clone.name}</div>
			</div>
			<div style={{ flexGrow: 1 }}>
				<textarea onClick={() => setSelectedClone(clone)}
					value={clone.effect.update(plainText, ...clone.effect.args)}
					rows={selectedClone.id == clone.id ? 8 : 3}
					placeholder={'zero effect'}
					style={{
						height: '100%',
						width: '100%',
						resize: 'none',
						background: settings.editorBackgroundColor, // Gradient background
						color: settings.editorTextColor, // Text color
						padding: '0px 12px 0px 6px', // Padding
						margin: 0,
						// border: `1px solid ${settings.brightColor}`, // Border color
						fontSize: settings.cloneFontSize,
					}}
					readOnly
				/>
			</div>

			{/* {clone.id === selectedClone.id &&
				<CloneForm clone={clone} />
			} */}
		</div>
	)
}

export default function Clones() {

	const { settings, currentDocument, selectedClone } = useCloneEditContext()

	return (
		<div id='clones' style={{ background: settings.material }}>

			<Controller clone={selectedClone} />

			<div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
				{currentDocument.clones.map((clone, ix) => (
					<Clone key={ix} clone={clone} />
				))}
			</div>
		</div>
	)
}