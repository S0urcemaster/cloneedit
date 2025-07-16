import React, { useState } from 'react'
import { Clone as CloneModel, effects } from './model'
import { useCloneEditContext } from './context'
import { TabBar } from './components/TabBar'

export default function Clones() {

	const { state, effectChanged } = useCloneEditContext()

	function Controller() {
		return (
			<div style={{ display: 'flex', justifyContent: 'space-between', height: 25, overflow: 'hidden', padding: '2px 5px 2px 5px' }}>
				<div>
					<button style={{ marginRight: 3 }}>New Clone</button>
					<button style={{ marginRight: 3 }}>Selected Up</button>
					<button style={{ marginRight: 3 }}>Selected Dn</button>
					<button style={{ marginRight: 3 }}>Delete Selected</button>
					<button style={{ marginRight: 3 }}>Copy to Clipboard</button>
					<button style={{ marginRight: 3 }}>Download</button>
					<button style={{ marginRight: 3 }}>I</button>
				</div>
			</div>
		)
	}

	function Clone({ clone }: { clone: CloneModel }) {
		return (
			<div style={{ display: 'grid', gridTemplateColumns: '4fr 7fr', padding: 3, gap: 5, height: 90 }}>
				<div style={{ display: 'grid', gridTemplateColumns: '9fr 1fr', gap: 5 }}>
					<div>
						<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 5, paddingLeft: 4 }}>
							<label htmlFor="effect">Effect</label>
							<select onChange={(e) => effectChanged(clone, e.target.value)} id="effect">
								{Object.values(effects).map((effect, index) => (
									<option key={index} value={effect.name}>{effect.name}</option>
								))}
							</select>

							<label htmlFor="editorTextColor">Editor Textcolor</label>
							<input type="text" id="editorTextColor" />
							<label htmlFor="editorTextSize">Editor Textsize</label>
							<input type="text" id="editorTextSize" />
						</fieldset>
					</div>
					<TabBar vertical buttonNames={['Up', 'St', 'FX']} onTabClick={(tabName) => console.log(`Tab clicked: ${tabName}`)} />
				</div>
				<div style={{
					overflow: 'auto',
					whiteSpace: 'pre-wrap',
					wordBreak: 'break-word',
					padding: 5, background: state.settings.editorBackgroundColor,
					color: state.settings.editorTextColor,
					font: state.settings.editorFont,
					fontSize: state.settings.cloneFontSize,
				}}>
					{clone.effect.update(state.documents[0].editor.text)}
				</div>
			</div>
		)
	}

	return (
		<div style={{ backgroundColor: state.settings.componentColor }}>
			<Controller />
			<div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
				{state.documents[0].clones.map((clone, ix) => (
					<Clone key={ix} clone={clone} />
				))}
			</div>
		</div>
	)
}