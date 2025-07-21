import { useEffect, useState } from "react"
import { useCloneEditContext } from "../app/context"

export function FilesForm() {

	const { availableFolders, currentFolder, availableFiles, currentFile, currentDocument, settings,
		folderChanged, fileChanged, setCurrentFile } = useCloneEditContext()

	const [folderInputText, setFolderInputText] = useState(currentFolder)
	const [fileInputText, setFileInputText] = useState(currentFile)

	useEffect(() => {
		setFolderInputText(currentFolder)
	}, [currentFolder])

	useEffect(() => {
		console.log(`${FilesForm.name}/useEffect/currentFile \t\t\t\t\t\t\t\t\t\t ${currentFile}`);
		setFileInputText(currentFile)
	}, [currentFile])

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<div style={{ display: 'flex', gap: 2 }}>
				<button style={{ flex: 1 }}>Backup</button>
				<button style={{ flex: 1 }}>Restore</button>
			</div>

			{/* file */}
			<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2, paddingLeft: 4 }}>

				<label htmlFor="file">File</label>
				<div style={{ display: 'flex', gap: 2 }}>
					{/* TODO : Bug reset auf 0 manchmal */}
					<input type="text" id="file" value={fileInputText} onChange={e => setFileInputText(e.target.value)} />
					<div style={{ display: 'flex', gap: 2 }}>
						<button style={{}}>New</button>
						<button style={{}}>Ren</button>
						<button style={{}}>Del</button>
					</div>
				</div>
			</fieldset>

			<select size={4} value={currentFile} onChange={e => fileChanged(e.target.value)}>
				{availableFiles.map((file, index) => (
					<option key={index} value={file}>{file}</option>
				))}
			</select>

			{/* folder */}
			<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2, paddingLeft: 4 }}>

				<label htmlFor="folder">Folder</label>
				<div style={{ display: 'flex', gap: 2 }}>

					<input type="text" id="folder" value={folderInputText} onChange={e => setFolderInputText(e.target.value)} disabled />
					<div style={{ display: 'flex', gap: 2 }}>
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