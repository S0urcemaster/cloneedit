'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Clone as CloneModel } from './model'
import { useCloneEditContext } from './context'
import { lib } from '../static/lib'
import { log } from '../static/constants'
import { useClipboard } from './hooks'

function Controller({ clone }: { clone: CloneModel }) {

	const { settings, selectedClone, plainText,
		updateEffectCommand, cloneIdChanged } = useCloneEditContext()

	const { copyToClipboard } = useClipboard()

	const [cloneId, setCloneId] = useState(0)

	useEffect(() => {
		if (!clone) return
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
				<input style={{ width: 49, paddingLeft: 18 }} type='text' value={clone ? clone.id : 0} onChange={e => idChanged(e.target.value)} onBlur={handleIdSubmit} onKeyDown={handleKeyDown} onFocus={(e) => {
					e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
					e.target.select() // Wählt den gesamten Text im Input aus
				}} />
				{/* <button style={{ fontWeight: 'bold', fontSize: 'x-large' }}>⇡</button>
				<button style={{ cursor: 'default' }} disabled>{selectedClone.id}</button>
				<button style={{ fontWeight: 'bold', fontSize: 'x-large' }}>⇣</button> */}
				<input style={{ flexGrow: 1 }} type='text' value={clone ? clone.name : ''} onChange={e => nameChanged(e.target.value)} />
				<div style={{ display: 'flex', gap: 1 }}>
					<button style={{}}>✱</button>
					<button style={{}}>⁑</button>
					<button style={{}}>✖</button>
					<button style={{}} onClick={() => copyToClipboard(lib.updateEach(plainText, clone.effects))}>♻</button>
				</div>
			</div>

			<div style={{ display: 'flex' }}>
				<textarea
					spellCheck={false}
					value={clone ? lib.toTextEffects(clone.effects) : ''}
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
						fontSize: settings.effectEditorFontSize,
						fontFamily: 'monospace',

					}}
				/>
			</div>
		</div>
	)
}

function Clone({ clone }: { clone?: CloneModel }) {
	const { settings, selectedClone, setSelectedClone, plainText } = useCloneEditContext()
	const { copyToClipboard } = useClipboard()

	useEffect(() => {
		log('clone', clone)
	}, [clone])

	function deselect() {
		setSelectedClone(undefined)
	}

	return (
		<div className='clone' style={{}}>
			<div style={{ display: 'flex', overflow: 'hidden', padding: '0px 0px 0px 0px', gap: 1 }} onClick={deselect}>
				<div style={{ width: '100%', background: settings.cloneTitleBackground, color: settings.darkColor, padding: '2px 0 3px 5px' }}>{clone.name}</div>
				<button style={{ width: 99, minWidth: 99, height: 25, flex: 0 }} onClick={() => copyToClipboard(lib.updateEach(plainText, clone.effects))}>♻</button>
			</div>
			<div style={{ flexGrow: 1, }}>
				<textarea onClick={() => setSelectedClone(clone)}
					// value={clone.effects[0].args ? 
					// 	clone.effects[0].update(plainText, ...clone.effects[0].args) : 
					// 	clone.effects[0].update(plainText)}
					value={lib.updateEach(plainText, clone.effects)}
					rows={selectedClone?.id == clone.id ? 8 : 3}
					placeholder={'zero effect'}
					style={{
						overflowY: selectedClone && selectedClone.name === clone.name ? 'scroll' : 'hidden',
						height: '100%',
						width: '100%',
						resize: 'none',
						background: settings.editorBackground, // Gradient background
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
			<Controller clone={selectedClone} />
			<div style={{ display: 'flex', flexDirection: 'column', height: 250, overflowY: 'scroll' }}>
				{currentDocument?.clones.map((clone, ix) => (
					<Clone key={ix} clone={clone} />
				))}
			</div>
		</div>
	)
}