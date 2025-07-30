'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Clone as CloneModel } from './model'
import { useCloneEditContext } from './context'
import { TabBar } from '../components/TabBar'
import { effects } from './constants'
import { lib } from './lib'

const log = console.log

function Controller({ clone }: { clone: CloneModel }) {

	const { settings, selectedClone,
		updateEffectCommand, cloneIdChanged } = useCloneEditContext()

	const [cloneId, setCloneId] = useState(selectedClone.id)

	useEffect(() => {
		setCloneId(clone.id)
	}, [clone])

	function nameChanged(name: string) {

	}

	function idChanged(id: string) {
		if (id === '') return
		setCloneId(parseInt(id)) // Update local state
	}

	function handleIdSubmit() {
		if (cloneId !== selectedClone.id) {
			cloneIdChanged(clone, cloneId) // Submit to context
			log(`Clone ID changed to: ${cloneId}`)
		}
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		// Erlaube nur Ziffern, Enter, Done, Go, Backspace, Delete, Tab, Pfeiltasten
		const allowedKeys = [
			'Enter',
			'Done',
			'Go',
			'Backspace',
			'Delete',
			'Tab',
			'ArrowLeft',
			'ArrowRight',
			'ArrowUp',
			'ArrowDown',
		]
		const isDigit = /^\d$/.test(e.key)

		if (!isDigit && !allowedKeys.includes(e.key)) {
			e.preventDefault() // Blockiere ungültige Tasten
			return
		}

		// Bei Enter, Done oder Go die Eingabe abschicken
		if (e.key === 'Enter' || e.key === 'Done' || e.key === 'Go') {
			handleIdSubmit()
		}
	}

	function positionChanged(name: string) {

	}

	function formValueChanged(ix: number, value: string) {

	}

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
		}, 250);

		log(`Timeout set for updateCommand with: ${line}`);
	}

	return (
		<div id='controller' style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ display: 'flex', gap: '0.1rem', flexWrap: 'wrap' }}>
				<input style={{ width: 49, paddingLeft: 18 }} type='text' value={clone.id} onChange={e => idChanged(e.target.value)} onBlur={handleIdSubmit} onKeyDown={handleKeyDown} onFocus={(e) => {
					e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
					e.target.select() // Wählt den gesamten Text im Input aus
				}} />
				{/* <button style={{ fontWeight: 'bold', fontSize: 'x-large' }}>⇡</button>
				<button style={{ cursor: 'default' }} disabled>{selectedClone.id}</button>
				<button style={{ fontWeight: 'bold', fontSize: 'x-large' }}>⇣</button> */}
				<input style={{ flexGrow: 1 }} type='text' value={clone.name} onChange={e => nameChanged(e.target.value)} />
				<div style={{display: 'flex', gap: 1}}>
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
						background: settings.effectEditorBackground, // Gradient background
						color: settings.effectEditorColor, // Text color
						padding: '0px 12px 0px 6px', // Padding
						margin: 0,
						// border: `1px solid ${settings.brightColor}`, // Border color
						fontSize: settings.effectEditorSize,
						fontFamily: 'monospace',

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
			<div style={{ overflow: 'hidden', padding: '0px 0px 0px 0px' }}>
				<div style={{ width: '100%', backgroundColor: settings.brightColor, color: settings.darkColor, paddingBottom: 3, paddingLeft: 5 }}>{clone.name}</div>
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
						color: settings.brightColor, // Text color
						padding: '0px 12px 0px 6px', // Padding
						margin: 0,
						fontSize: settings.cloneFontSize,
					}}
					readOnly
				/>
			</div>
		</div>
	)
}

export default function Clones() {

	const { settings, currentDocument, selectedClone } = useCloneEditContext()

	return (
		<div id='clones' style={{ background: settings.material }}>
			<div style={{ borderTop: `1px solid ${settings.effectEditorColor}`}}></div>
			<Controller clone={selectedClone} />
			<div style={{ display: 'flex', flexDirection: 'column', height: 250, overflowY: 'scroll' }}>
				{currentDocument.clones.map((clone, ix) => (
					<Clone key={ix} clone={clone} />
				))}
			</div>
		</div>
	)
}