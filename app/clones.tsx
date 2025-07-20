'use client'
import React, { useState } from 'react'
import { Clone as CloneModel } from './model'
import { useCloneEditContext } from './context'
import { TabBar } from '../components/TabBar'
import { effects } from './constants'

export default function Clones() {

	const { settings, currentDocument, source, selectedClone, effectChanged } = useCloneEditContext()

	function Controller() {
		return (
			<div style={{ display: 'flex', justifyContent: 'space-between', height: 25, overflow: 'hidden', padding: '2px 5px 2px 5px' }}>
				<div>
					<input style={{ marginRight: 3 }} type='text' value={selectedClone.name} />
					<button style={{ marginRight: 3 }}>New Clone</button>
					<button style={{ marginRight: 3 }}>Selected Up</button>
					<button style={{ marginRight: 3 }}>Selected Dn</button>
					<button style={{ marginRight: 3 }}>Ctrl - Delete</button>
					<button style={{ marginRight: 3 }}>Copy to Clipboard</button>
					<button style={{ marginRight: 3 }}>Download</button>
				</div>
			</div>
		)
	}

	function Clone({ clone }: { clone: CloneModel }) {
		return (
			<div>
				<span style={{ marginTop: -5, paddingLeft: 7, fontSize: 'small' }}>{clone.name}</span>
				{clone.id === selectedClone.id &&
					<Controller />
				}
				<div style={{ display: 'grid', gridTemplateColumns: '4fr 7fr', padding: '0px 3px 0px 3px', gap: 5, height: 90, cursor: 'pointer', zIndex: 0 }}>
					<div style={{ display: 'grid', gridTemplateColumns: '9fr 1fr', gap: 5, zIndex: 2 }}>
						<div>
							<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 5, paddingLeft: 4 }}>
								<label htmlFor="effect">Effect</label>
								<select value={clone.effect.name} onChange={(e) => effectChanged(clone, e.target.value)} id="effect">
									{Object.values(effects).map((effect, index) => (
										<option key={index} value={effect.name} style={{ backgroundColor: settings.inputBackgroundColor, color: settings.inputColor }}>{effect.name}</option>
									))}
								</select>
								{clone.effect.params.map((param, ix) => (
									<>
										<label htmlFor="editorTextColor">{param.name}</label>
										<input type="text" id="editorTextColor" value={param.value} />
									</>

								))}
							</fieldset>
						</div>
						<TabBar vertical buttonNames={['Up', 'St', 'FX']} onTabClick={(tabName) => console.log(`Tab clicked: ${tabName}`)} />
					</div>
					<textarea
						value={clone.effect.update(source, ...clone.effect.params)}
						// rows={14}
						placeholder={'Guess what'}
						style={{
							height: '100%',
							resize: 'none',
							background: settings.editorBackgroundColor, // Gradient background
							color: settings.editorTextColor, // Text color
							// border: 'none', // Remove border
							padding: '0px 12px 0px 6px', // Padding
							margin: 0,
							border: `1px solid ${'black'}`, // Border color
							fontSize: settings.cloneFontSize,
						}}
						readOnly
					/>
				</div>

			</div>
		)
	}

	return (
		<div style={{ background: settings.componentColor }}>
			{/* <Controller /> */}
			<div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
				{currentDocument.clones.map((clone, ix) => (
					<Clone key={ix} clone={clone} />
				))}
			</div>
		</div>
	)
}