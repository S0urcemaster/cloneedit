'use client'
import { useEffect, useState } from "react"
import { useCloneEditContext } from "../components/context"

export function FilesForm() {

	const { availableFolders, currentFolder, availableFiles, currentFile, currentDocument,
		folderChanged, fileChanged, setCurrentFile } = useCloneEditContext()

	const [folderName, setFolderName] = useState(currentFolder)
	const [fileName, setFileName] = useState(currentFile)

	useEffect(() => {
		setFolderName(currentFolder)
	}, [currentFolder])

	useEffect(() => {
		setFileName(currentFile)
	}, [currentFile])

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
			<div style={{ display: 'flex', gap: 5 }}>
				<button style={{ flex: 1 }}>Backup</button>
				<button style={{ flex: 1 }}>Restore</button>
			</div>

			{/* file */}
			<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 5, paddingLeft: 4 }}>

				<label htmlFor="file">File</label>
				<div style={{ display: 'flex', gap: 3 }}>

					<input type="text" id="file" value={fileName} onChange={e => setFileName(e.target.value)} />
					<div style={{ display: 'flex', gap: 3 }}>
						<button style={{}}>New</button>
						<button style={{}}>Ren</button>
						<button style={{}}>Del</button>
					</div>
				</div>
			</fieldset>

			<select size={4} value={currentFile} onChange={(e) => fileChanged(e.target.value)}>
				{availableFiles.map((file, index) => (
					<option key={index} value={file}>{file}</option>
				))}
			</select>

			{/* folder */}
			<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 5, paddingLeft: 4 }}>

				<label htmlFor="folder">Folder</label>
				<div style={{ display: 'flex', gap: 3 }}>

					<input type="text" id="folder" value={folderName} onChange={e => setFolderName(e.target.value)} disabled />
					<div style={{ display: 'flex', gap: 3 }}>
						<button style={{}} disabled>New</button>
						<button style={{}} disabled>Ren</button>
						<button style={{}} disabled>Del</button>
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