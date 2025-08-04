import { useEffect, useState } from "react"
import { useCloneEditContext } from "../app/context"
import { SingleSelect } from "../components/SingleSelect"

export function FilesForm() {

	const { availableFolders, currentFolder, availableFiles, currentFile,
		folderChanged, fileChanged: contextFileChanged, setCurrentFile, currentDocument, settings } = useCloneEditContext()

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

	const fileCommands = [
		'新', // 新 Neu
		'名', // 名 Umbenennen ( Name )
		'删', // 删 Löschen
	]

	const storageCommands = [
		'备', // 备 Backup ( vorbereiten, sichern )
		'复', // 复 Restore ( wiederholen, zurückspielen )
		'删', // 删 Löschen ( Reset to Defaults )
	]

	return (
		<div id='filesForm' style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '0.1rem' }}>

			{/* file */}
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }} >
				<div className='filesInputFlip' style={{ display: 'flex', gap: '0.1rem' }}>
					<div style={{ position: 'relative', flexGrow: 1 }}>
						<div style={{ position: 'absolute', right: 5, top: 1, color: settings.darkColor, opacity: 0.5, pointerEvents: 'none' }}>File</div>
						<input type="text" id="file" value={fileInputText} onChange={e => setFileInputText(e.target.value)} style={{ width: '100%' }} />
					</div>
					<div style={{ display: 'flex', gap: '0.1rem', flex: 1 }}>
						{fileCommands.map((command, ix) => (
							<button style={{flex: 1}}>{command}</button>
						))}
					</div>
				</div>
				<SingleSelect options={availableFiles} value={availableFiles[0]} onChange={fileChanged} style={{ width: '100%', height: '100%' }} />
			</div>

			{/* folder */}
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
				<div className='filesInputFlip' style={{ display: 'flex', gap: '0.1rem' }}>
					<div style={{ position: 'relative', flexGrow: 1 }}>
						<div style={{ position: 'absolute', right: 5, top: 1, color: settings.darkColor, opacity: 0.5, pointerEvents: 'none' }}>Folder</div>
						<input type="text" id="folder" value={folderInputText} onChange={e => setFolderInputText(e.target.value)} style={{ width: '100%' }} />
					</div>
					<div style={{ display: 'flex', gap: '0.1rem', flex: 1 }}>
						{fileCommands.map((command, ix) => (
							<button style={{}}>{command}</button>
						))}
					</div>
				</div>
				<SingleSelect options={availableFolders} value={availableFolders[0]} onChange={folderChanged} style={{ width: '100%', height: '100%' }} />
				<div style={{ display: 'flex', gap: '0.1rem' }}>
					{storageCommands.map((command, ix) => (
						<button style={{flex: 1}}>{command}</button>
					))}
				</div>
			</div>

		</div>
	)
}