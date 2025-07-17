'use client'
import { useState } from "react"
import { useCloneEditContext } from "../components/context"

export function FilesForm() {

	const { availableFolders, currentFolder, availableFiles, currentFile, folderChanged, fileChanged, setCurrentFile } = useCloneEditContext()

	const [state, setState] = useState('Social Media')
	return (
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

			<select size={4} value={currentFile} onChange={(e) => setCurrentFile(e.target.value)}>
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

			<select size={3} value={currentFolder} onChange={e => folderChanged(e.target.value)}>
				{availableFolders.map((folder, index) => (
					<option key={index} value={folder}>{folder}</option>
				))}
			</select>
		</div>
	)
}