import { useEffect, useState } from "react"
import { useCloneEditContext } from "../app/context"

export function FilesForm() {

	const { availableFolders, currentFolder, availableFiles, currentFile,
		folderChanged, fileChanged: contextFileChanged, setCurrentFile, currentDocument } = useCloneEditContext()

	const [folderInputText, setFolderInputText] = useState(currentFolder)
	const [fileInputText, setFileInputText] = useState(currentFile)

	const [file, setFile] = useState(currentFile)

	useEffect(() => {
		setFolderInputText(currentFolder)
	}, [currentFolder])

	useEffect(() => {
		setFileInputText(currentFile)
	}, [currentFile])

	useEffect(() => {
		setFile(currentDocument.name)
	}, [currentDocument])

	function fileChanged(file: string) {
		setFile(file)
		contextFileChanged(file)
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

			<div style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: 2 }}>
				<div>
					{/* file */}
					<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2, paddingLeft: 4 }}>

						<label htmlFor="file">File</label>
						<div style={{ display: 'flex', gap: 2 }}>
							<input type="text" id="file" value={fileInputText} onChange={e => setFileInputText(e.target.value)} />
							<div style={{ display: 'flex', gap: 2 }}>
								<button style={{}}>New</button>
								<button style={{}}>Ren</button>
								<button style={{}}>Del</button>
							</div>
						</div>
					</fieldset>

					<select size={4} value={file} onChange={e => fileChanged(e.target.value)} style={{ width: '100%', height: '100%' }}>
						{availableFiles.map((file, index) => (
							<option key={index} value={file}>{file}</option>
						))}
					</select>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					{/* folder */}
					<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2, paddingLeft: 4 }}>

						<label htmlFor="folder">Folder</label>
						<div style={{ display: 'flex', gap: 2 }}>

							<input type="text" id="folder" value={folderInputText} onChange={e => setFolderInputText(e.target.value)} disabled />
							<div style={{ display: 'flex', gap: 2 }}>
								<button style={{}}>New</button>
								<button style={{}}>Ren</button>
								<button style={{}}>Del</button>
							</div>
						</div>
					</fieldset>

					<select size={3} value={currentFolder} onChange={e => folderChanged(e.target.value)} style={{ width: '100%', height: '100%' }}>
						{availableFolders.map((folder, index) => (
							<option key={index} value={folder}>{folder}</option>
						))}
					</select>

					<div style={{ display: 'flex', gap: 2 }}>
						<button style={{ flex: 1 }}>Backup</button>
						<button style={{ flex: 1 }}>Restore</button>
					</div>
				</div>
			</div>
		</div>
	)
}