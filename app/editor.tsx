'use client'
import { useState } from 'react';
import { TabBar } from '../components/TabBar';
import * as constants from './constants'
import { useCloneEditContext } from '../components/context';
import { FilesForm } from '../editor/filesForm';

// unique inside each editor so we can share the editor state by placing this component inside Editor
// instead of passing the appState as a prop
function Head() {
	const {
		currentDocument, settings,
		availableFolders, availableFiles,
		folderChanged, currentFolder,
		fileChanged, sourceChanged
	} = useCloneEditContext()

	const [tab, setTab] = useState('Edit')

	function EditForm() {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

				<div id={'memory'} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
					<button style={{}}>Undo</button>
					<button style={{}}>Redo</button>
				</div>
				<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 5, paddingLeft: 4 }}>

					<label htmlFor="letters">Letters</label>
					<span>10,546</span>
					<label htmlFor="words">Words</label>
					<span>1984</span>

					<label htmlFor="memory">Memory</label>
					<div id={'memory'} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
						<button style={{}}>M1</button>
						<button style={{}}>M2</button>
						<button style={{}}>M3</button>
						<button style={{}}>M4</button>
						<button style={{}}>M5</button>
						<button style={{}}>M6</button>
					</div>

					<label htmlFor="snippets">Snippets</label>
					<div id={'snippets'} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
						<button style={{}}>S1</button>
						<button style={{}}>S2</button>
						<button style={{}}>S3</button>
						<button style={{}}>S4</button>
						<button style={{}}>S5</button>
						<button style={{}}>S6</button>
					</div>

				</fieldset>
			</div>
		)
	}

	function SettingsForm() {
		return (
			<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 5, paddingLeft: 4 }}>
				<label htmlFor="material">App Color</label>
				<input type="text" id="material" />

				<label htmlFor="editorFont">Editor Font</label>
				<div id={'editorFont'} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
					<select>
						{Object.values(constants.fonts).map((font) => (
							<option key={font.name} value={font.name}>{font.name}</option>
						))}
					</select>
				</div>
				<label htmlFor="editorTextColor">Editor Textcolor</label>
				<input type="text" id="editorTextColor" />
				<label htmlFor="editorTextSize">Editor Textsize</label>
				<input type="text" id="editorTextSize" />

				<label htmlFor="cloneFont">Clone Font</label>
				<div id={'cloneFont'} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
					<select>
						{Object.values(constants.fonts).map((font) => (
							<option key={font.name} value={font.name}>{font.name}</option>
						))}
					</select>
				</div>
				<label htmlFor="cloneTextColor">Clone Color</label>
				<input type="text" id="cloneTextColor" />
				<label htmlFor="cloneTextSize">Clone Color</label>
				<input type="text" id="cloneTextSize" />
			</fieldset>
		)
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', paddingTop: 0, paddingBottom: 2 }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<h1 className={constants.fonts[constants.FONT_GEMUNU_LIBRE].font.className} style={{ position: 'relative', top: -5, left: 1, fontSize: 28, color: 'black' }}>Clone Edit</h1>
				<TabBar
					buttonNames={['Edit', 'Files', 'Settings']}
					onTabClick={(tabName: string) => setTab(tabName)}
				/>
			</div>
			{tab === 'Edit' &&
				<EditForm />
			}
			{tab === 'Files' &&
				<FilesForm />
			}
			{tab === 'Settings' &&
				<SettingsForm />
			}
		</div>
	)
}
function Source() {
	const {
		currentDocument, settings, sourceChanged
	} = useCloneEditContext()
	return (
		<>
			<div className={constants.fonts[constants.FONT_LEXEND].font.className} style={{ display: 'flex', flexDirection: 'column', height: 300 }}>
				<textarea
					value={currentDocument.editor.text}
					// rows={14}
					placeholder={'Guess what'}
					style={{
						height: '100%',
						resize: 'none',
						background: settings.editorBackgroundColor, // Gradient background
						color: settings.editorTextColor, // Text color
						// border: 'none', // Remove border
						padding: '6px 12px 6px 12px', // Padding
						margin: 0, fontSize: settings.editorFontSize,
						border: `1px solid ${'black'}`, // Border color
					}}
					onChange={(e) => {
						sourceChanged(e.target.value);
					}}
				/>
			</div>
		</>
	);
}

export default function Editor() {

	const {
		settings,
	} = useCloneEditContext()

	return (
		<>
			<div style={{ display: 'grid', gridTemplateColumns: '3fr 7fr', padding: 5, gap: 5, backgroundColor: settings.componentColor }}>
				<Head />
				<Source />
			</div>
		</>
	)
}