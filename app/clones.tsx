'use client'
import React, { useState } from 'react'
import { Clone as CloneModel } from './model'
import { useCloneEditContext } from './context'
import { TabBar } from '../components/TabBar'
import { effects } from './constants'


function Controller() {
	const { selectedClone } = useCloneEditContext()

	return (
		<div style={{ height: 25, overflow: 'hidden', padding: '2px 5px 2px 5px' }}>
			<input style={{ marginRight: 3 }} type='text' value={selectedClone.name} />
			<button style={{ marginRight: 3 }}>Ren</button>
			<button style={{ marginRight: 3 }}>New</button>
			<button style={{ marginRight: 3 }}>Del</button>
			#
			<input type="number" min="0" max="100" step="1" value="0" />
			<button style={{ marginRight: 3 }}>Copy to Clipboard</button>
			<button style={{ marginRight: 3 }}>Download</button>
		</div>
	)
}

function Clone({ clone }: { clone: CloneModel }) {
	const { settings, source, selectedClone, effectChanged, setSelectedClone } = useCloneEditContext()

	function HorizontalCloneName() { // maybe use some time
		return (
			<div style={{ marginTop: 0, padding: '0 7px 0 5px', overflow: 'hidden', width: 20, backgroundColor: settings.darkColor }}>
				<p style={{
					fontSize: 'small', backgroundColor: settings.brightColor, color: settings.darkColor,
					padding: '1px 0 3px 5px', margin: '0px 0 0px 0', pointerEvents: 'none',
					transform: 'rotate(-90deg)', transformOrigin: 'left top', whiteSpace: 'nowrap', display: 'inline-block',
					position: 'relative', bottom: -80
				}}>{clone.name}</p>
			</div>
		)
	}

	return (
		<div>
			{clone.id === selectedClone.id ?
				<Controller /> :
				<div style={{ height: 25, overflow: 'hidden', padding: '2px 5px 2px 5px' }}>
					<input style={{ marginRight: 3, width: '100%' }} type='text' value={selectedClone.name} />
				</div>
			}
			<div className='clonesGridDirection' style={{ display: clone.id === selectedClone.id ? 'grid' : 'block' }}>
				{clone.id === selectedClone.id &&
					<div style={{ display: 'grid', gridTemplateColumns: 'auto 0fr' }}>
						<div>
							<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 5, paddingLeft: 4, overflowY: 'auto' }}>
								<label htmlFor="effect">Effect</label>
								<select value={clone.effect.name} onChange={(e) => effectChanged(clone, e.target.value)} id="effect">
									{Object.values(effects).map((effect, index) => (
										<option key={index} value={effect.name}>{effect.name}</option>
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
				}
				<div style={{ flexGrow: 1 }}>
					<textarea onClick={() => setSelectedClone(clone)}
						value={clone.effect.update(source, ...clone.effect.params)}
						// rows={14}
						placeholder={'Guess what'}
						style={{
							height: '100%',
							width: '100%',
							resize: 'none',
							background: settings.editorBackgroundColor, // Gradient background
							color: settings.editorTextColor, // Text color
							// border: 'none', // Remove border
							padding: '0px 12px 0px 6px', // Padding
							margin: 0,
							border: `1px solid ${settings.brightColor}`, // Border color
							fontSize: settings.cloneFontSize,
						}}
						readOnly
					/>
				</div>
			</div>

		</div>
	)
}

export default function Clones() {

	const { settings, currentDocument } = useCloneEditContext()

	return (
		<div style={{ background: settings.componentColor }}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
				{currentDocument.clones.map((clone, ix) => (
					<Clone key={ix} clone={clone} />
				))}
			</div>
		</div>
	)
}