import { useState } from 'react';
import { TabBar } from './components/TabBar';
import * as constants from './constants'
import { useCloneEditContext } from './context';
import { Document } from './model';

export default function Editor() {

	const {
		currentDocument, settings,
		availableFolders, availableFiles,
		folderChanged,
		fileChanged
	} = useCloneEditContext()
	const [tab, setTab] = useState('Edit')

	// unique inside each editor so we can share the editor state by placing this component inside Editor
	// instead of passing the appState as a prop
	function Head() {
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
				}
				{tab === 'Files' &&
					<div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
						<div style={{ display: 'flex', gap: 5 }}>
							<button style={{ flex: 1 }}>Backup</button>
							<button style={{ flex: 1 }}>Restore</button>
						</div>
						<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 5, paddingLeft: 4 }}>
							<label htmlFor="folder">Folder</label>
							<div style={{ display: 'flex', gap: 3 }}>
								<input type="text" id="folder" />
								<div style={{ display: 'flex', gap: 3 }}>
									<button style={{}}>New</button>
									<button style={{}}>Ren</button>
									<button style={{}}>Del</button>
								</div>
							</div>
						</fieldset>

						<select size={4} value={currentDocument.name} onChange={(e) => fileChanged(e.target.value)}>
							{availableFiles.map((file, index) => (
								<option key={index} value={file}>{file}</option>
							))}
						</select>

						<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 5, paddingLeft: 4 }}>
							<label htmlFor="folder">Folder</label>
							<div style={{ display: 'flex', gap: 3 }}>
								<input type="text" id="folder" />
								<div style={{ display: 'flex', gap: 3 }}>
									<button style={{}}>New</button>
									<button style={{}}>Ren</button>
									<button style={{}}>Del</button>
								</div>
							</div>
						</fieldset>

						<select size={3} value={currentDocument.folder} onChange={(e) => folderChanged(e.target.value)}>
							{availableFolders.map((folder, index) => (
								<option key={index} value={folder}>{folder}</option>
							))}
						</select>
					</div>
				}
				{tab === 'Settings' &&
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
				}
			</div>
		)
	}

	function Source() {
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
					/>
				</div>
			</>
		);
	}
	return (
		<>
			<div style={{ display: 'grid', gridTemplateColumns: '3fr 7fr', padding: 5, gap: 5, backgroundColor: settings.componentColor }}>
				<Head />
				<Source />
			</div>
		</>
	)
}