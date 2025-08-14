'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useCloneEditContext } from './context'
import { lib } from '../static/lib'
import { log } from '../static/constants'
import { useClipboard } from './hooks'
import ChineseButton from '../components/ChineseButton'
import { Effect as EffectModel, Instruction } from './model'

function Controller() {

	const { settings, plainText, selectedEffectId, currentDocument } = useCloneEditContext()

	const [selectedEffect, setSelectedEffect] = useState<string>()

	const [effectString, setEffectString] = useState('')
	const [effectObject, setEffectObject] = useState<EffectModel>()
	const [prevEffectString, setPrevEffectString] = useState<string>()
	const [changed, setChanged] = useState(false)

	const { copyToClipboard } = useClipboard()

	useEffect(() => {
		log('Controller/[selectedEffect]/selectedEffectId', selectedEffectId)
		if (!currentDocument || selectedEffectId !== undefined) return
		setSelectedEffect(currentDocument.effects[selectedEffectId])
	}, [selectedEffectId])

	useEffect(() => {
		log('Controller/[selectedEffect]/selectedEffect', selectedEffect)
		if (!selectedEffect) return
		setEffectString(selectedEffect)
		setPrevEffectString(selectedEffect)
		setChanged(false)
	}, [selectedEffect])

	useEffect(() => {
		if (prevEffectString !== effectString) setChanged(true)
	}, [effectString])

	function nameChanged(name: string) {

	}

	function runCommand() {
		if (changed) {
			// updateSelectedClone({ effects: effectString })
			setPrevEffectString(effectString)
			setChanged(false)
		}
	}

	return (
		<div id='controller' style={{ display: 'flex', flexDirection: 'row' }}>
			<div style={{ display: 'flex' }}>
				<textarea disabled={!selectedEffect && true}
					spellCheck={false}
					value={effectString}
					onChange={e => setEffectString(e.target.value)}
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
			<div style={{ display: 'flex', gap: '0.1rem', flexWrap: 'wrap' }}>
					<ChineseButton disabled style={{ flex: 1 }}>{cloneCommands['new']}</ChineseButton>
					<ChineseButton disabled style={{ flex: 1 }}>{cloneCommands['duplicate']}</ChineseButton>
					<ChineseButton disabled style={{ flex: 1, color: settings.redColor }}>{cloneCommands['delete']}</ChineseButton>
					<ChineseButton disabled style={{ flex: 1 }}>{cloneCommands['copy']}</ChineseButton>
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

function Effect({ id, instructionsString }: { id: number, instructionsString?: string }) {
	const { settings, plainText, selectedEffectId, setSelectedEffectId } = useCloneEditContext()
	const { copyToClipboard } = useClipboard()

	const [effectObject, setEffectObject] = useState<EffectModel>()

	const [instructions, setInstructions] = useState<Instruction[]>([])

	const [name, setName] = useState<string>()
	const [sourceId, setSourceId] = useState<number>()

	useEffect(() => {
		// if (!instructionString) return
		log('Effect/[instructionsString]/instructionsString', instructionsString)
		const all = lib.fromTextInstructions(instructionsString)
		log('all' ,all)
		if(!all) return
		setName(all[0].name)
		setSourceId(parseInt(all[0].args[0]))
		setInstructions(all.splice(1))
	}, [instructionsString, plainText])

	useEffect(() => {
		log('Effect/[instructions]/instructions', instructions)
	}, [instructions])

	function deselect() {
		setSelectedEffectId(undefined)
	}

	return (
		<div className='effect' style={{}}>
			<div style={{ display: 'flex', overflow: 'hidden', padding: '0px 0px 0px 0px', gap: 1 }} onClick={deselect}>
				<div style={{ width: '100%', background: settings.cloneTitleBackground, color: settings.darkColor, padding: '2px 0 3px 5px' }}>{instructions[0]?.name}</div>
				<button style={{ width: 99, minWidth: 99, height: 25, flex: 0, fontSize: 19 }} onClick={() => copyToClipboard(lib.updateEach(plainText, instructions))}>{cloneCommands['copy']}</button>
			</div>
			<div style={{ flexGrow: 1, }}>
				<textarea onClick={() => setSelectedEffectId(id)}
					value={lib.updateEach(plainText, instructions)}
					rows={id == selectedEffectId ? 8 : 3}
					placeholder={'zero effect'}
					style={{
						overflowY: selectedEffectId && id == selectedEffectId ? 'scroll' : 'hidden',
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

export default function Effects() {

	const { settings, effects } = useCloneEditContext()

	return (
		<div id='clones' style={{ background: settings.material }}>
			<Controller />
			<div style={{ display: 'flex', flexDirection: 'column', height: 250, overflowY: 'scroll' }}>
				{effects?.map((effect, ix) => (
					<Effect key={ix} id={ix} instructionsString={effect} />
				))}
			</div>
		</div>
	)
}