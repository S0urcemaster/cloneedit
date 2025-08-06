'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Clone as CloneModel } from './model'
import { useCloneEditContext } from './context'
import { lib } from '../static/lib'
import { log } from '../static/constants'
import { useClipboard } from './hooks'
import { NumButton } from '../components/NumButton'

function Controller({clone}: {clone: CloneModel}) {

	const { settings, plainText, updateEffectCommand, cloneIdChanged, sourceIdChanged } = useCloneEditContext()

	const { copyToClipboard } = useClipboard()

	const [cloneId, setCloneId] = useState(0)
	const [sourceId, setSourceId] = useState(0)

	const [command, setCommand] = useState('')

	const timeoutId = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (!clone) return
		setCloneId(clone.id)
		setCommand(lib.toTextEffects(clone.effects))
	}, [clone])

	useEffect(() => {
		if(!clone) return
		// if(command.endsWith(' ')) return
		log('Controller/commandChanged', command)

		if (timeoutId.current !== null) {
			clearTimeout(timeoutId.current)
			log('Previous timeout cancelled')
		}

		timeoutId.current = setTimeout(() => {
			log(`Controller/commandChanged called with: ${command}`)
			updateEffectCommand(command)
			timeoutId.current = null
		}, 500)

		log(`Timeout set for updateCommand with: ${command}`)
		return () => {
			clearTimeout(timeoutId.current)
		}
	}, [command])

	useEffect(() => {
		cloneIdChanged(cloneId)
	}, [cloneId])

	useEffect(() => {
		sourceIdChanged(cloneId)
	}, [sourceId])

	function nameChanged(name: string) {

	}

	function positionChanged(name: string) {

	}

	function formValueChanged(ix: number, value: string) {

	}

	return (
		<div id='controller' style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ display: 'flex', gap: '0.1rem', flexWrap: 'wrap' }}>
				<NumButton value={cloneId} onChange={id => setCloneId(id)} />
				<NumButton value={sourceId} onChange={id => setSourceId(id)} />
				<input disabled style={{ flexGrow: 1 }} type='text' value={clone ? clone.name : ''} onChange={e => nameChanged(e.target.value)} />
				<div style={{ display: 'flex', gap: 1 }}>
					<button disabled style={{ flex: 1, fontSize: 30 }}>{cloneCommands['new']}</button>
					<button disabled style={{ flex: 1, fontSize: 30 }}>{cloneCommands['duplicate']}</button>
					<button disabled style={{ flex: 1, fontSize: 30, color: settings.redColor }}>{cloneCommands['delete']}</button>
					<button style={{ fontSize: 30 }} onClick={() => copyToClipboard(lib.updateEach(plainText, clone.effects))}>{cloneCommands['copy']}</button>
				</div>
			</div>

			<div style={{ display: 'flex' }}>
				<textarea disabled={!clone && true}
					spellCheck={false}
					value={command}
					onChange={e => setCommand(e.target.value)}
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
						// cursor: 'progress',
					}}
				/>
			</div>
		</div>
	)
}

const cloneCommands: Record<string, string> = {
	['new']: '新', // 新 Neu
	['duplicate']: '拷', // 名 Duplizieren ( Kopieren )
	['delete']: '删', // 删 Löschen
	['copy']: '复', // 删 Kopieren ( Zwischenspeicher )
}

function Clone({ clone }: { clone?: CloneModel }) {
	const { settings, selectedClone, setSelectedClone, plainText } = useCloneEditContext()
	const { copyToClipboard } = useClipboard()

	useEffect(() => {
		if(!clone || !selectedClone) return
		log('Clone/[clone]/clone, selectedClone', clone, selectedClone.id)
	}, [clone, selectedClone])

	function deselect() {
		setSelectedClone(undefined)
	}

	return (
		<div className='clone' style={{}}>
			<div style={{ display: 'flex', overflow: 'hidden', padding: '0px 0px 0px 0px', gap: 1 }} onClick={deselect}>
				<div style={{ width: '100%', background: settings.cloneTitleBackground, color: settings.darkColor, padding: '2px 0 3px 5px' }}>{clone.name}</div>
				<button style={{ width: 99, minWidth: 99, height: 25, flex: 0, fontSize: 19 }} onClick={() => copyToClipboard(lib.updateEach(plainText, clone.effects))}>{cloneCommands['copy']}</button>
			</div>
			<div style={{ flexGrow: 1, }}>
				<textarea onClick={() => setSelectedClone(clone)}
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

	const { settings, clones, selectedClone } = useCloneEditContext()

	return (
		<div id='clones' style={{ background: settings.material }}>
			<Controller clone={selectedClone} />
			<div style={{ display: 'flex', flexDirection: 'column', height: 250, overflowY: 'scroll' }}>
				{clones?.map((clone, ix) => (
					<Clone key={ix} clone={clone} />
				))}
			</div>
		</div>
	)
}