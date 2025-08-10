'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Clone as CloneModel } from './model'
import { useCloneEditContext } from './context'
import { lib } from '../static/lib'
import { log } from '../static/constants'
import { useClipboard } from './hooks'
import { NumButton } from '../components/NumButton'
import ChineseButton from '../components/ChineseButton'

function Controller({ selectedClone }: { selectedClone: CloneModel }) {

	const { settings, plainText, updateSelectedClone } = useCloneEditContext()

	const { copyToClipboard } = useClipboard()

	const [cloneId, setCloneId] = useState(0)
	const [sourceId, setSourceId] = useState(0)
	const [name, setName] = useState('')
	const [effectStr, setEffectStr] = useState('')
	const [prevEffect, setPrevEffect] = useState<string>()
	const [changed, setChanged] = useState(false)

	useEffect(() => {
		log('cloneId, sourcId', cloneId, sourceId)
		updateSelectedClone({ id: cloneId, sourceId: sourceId })
	}, [cloneId, sourceId])

	useEffect(() => {
		log('Controller/[selectedClone]/selectedClone', selectedClone)
		if (!selectedClone) return
		setCloneId(selectedClone.id || 0)
		setSourceId(selectedClone.sourceId || 0)
		setName(selectedClone.name || '')
		setEffectStr(selectedClone.effects || '')
		setPrevEffect(selectedClone.effects || '')
		setChanged(false)
	}, [selectedClone])

	useEffect(() => {
		if(prevEffect !== effectStr) setChanged(true)
	}, [effectStr])

	useEffect(() => {
	}, [cloneId])

	useEffect(() => {
	}, [sourceId])

	function nameChanged(name: string) {

	}

	function runCommand() {
		if(changed) {
			updateSelectedClone({ effects: effectStr })
			setPrevEffect(effectStr)
			setChanged(false)
		}
	}

	return (
		<div id='controller' style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ display: 'flex', gap: '0.1rem', flexWrap: 'wrap' }}>
				<NumButton value={cloneId} onChange={id => setCloneId(id)} />
				<NumButton value={sourceId} onChange={id => setSourceId(id)} />
				<input style={{ flexGrow: 1 }} type='text' value={name} onChange={e => nameChanged(e.target.value)} />
				<div style={{ display: 'flex', gap: 1 }}>
					<ChineseButton disabled style={{ flex: 1 }}>{cloneCommands['new']}</ChineseButton>
					<ChineseButton disabled style={{ flex: 1 }}>{cloneCommands['duplicate']}</ChineseButton>
					<ChineseButton disabled style={{ flex: 1, color: settings.redColor }}>{cloneCommands['delete']}</ChineseButton>
					<ChineseButton disabled style={{ flex: 1 }} onClick={() => copyToClipboard(lib.updateEach(plainText, selectedClone.effects))}>{cloneCommands['copy']}</ChineseButton>
				</div>
			</div>

			<div style={{ display: 'flex' }}>
				<textarea disabled={!selectedClone && true}
					spellCheck={false}
					value={effectStr}
					onChange={e => setEffectStr(e.target.value)}
					rows={2}
					placeholder={'Type Effect'}
					style={{
						height: '100%',
						flex: 1,
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
				<button className='chineseButton' style={{ flex: 0, height: 42, minWidth: 50, marginTop: 1, fontSize: 26, border: changed ? `1px solid ${settings.greenColor}` : 'none' }} onClick={runCommand}>{cloneCommands['run']}</button>
			</div>
		</div>
	)
}

const cloneCommands: Record<string, string> = {
	['new']: '新', // 新 Neu
	['duplicate']: '拷', // 名 Duplizieren ( Kopieren )
	['delete']: '删', // 删 Löschen
	['copy']: '复', // 删 Kopieren ( Zwischenspeicher )
	['run']: '⤷',
}

function Clone({ clone }: { clone?: CloneModel }) {
	const { settings, selectedClone, setSelectedClone, plainText } = useCloneEditContext()
	const { copyToClipboard } = useClipboard()

	useEffect(() => {
		if (!clone || !selectedClone) return
		log('Clone/[clone]/clone', clone)
	}, [clone])

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
			<Controller selectedClone={selectedClone} />
			<div style={{ display: 'flex', flexDirection: 'column', height: 250, overflowY: 'scroll' }}>
				{clones?.map((clone, ix) => (
					<Clone key={ix} clone={clone} />
				))}
			</div>
		</div>
	)
}