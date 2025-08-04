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


	const fileCommands: Record<string, string> = {
		['new']: '新', // 新 Neu
		['rename']: '名',
		['delete']: '删', // 删 Löschen
	}

	const storageCommands: Record<string, string> = {
		['backub']: '备',
		['restore']: '复', // 名 Duplizieren ( Kopieren )
		['delete']: '删', // 删 Löschen
	}

	return (
		<div id='filesForm' style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '0.1rem' }}>

			{/* file */}
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }} >
				<div className='filesInputFlip' style={{ display: 'flex', gap: '0.1rem' }}>
					<div style={{ position: 'relative', flexGrow: 1 }}>
						<div style={{ position: 'absolute', right: 5, top: 1, color: settings.darkColor, opacity: 0.5, pointerEvents: 'none' }}>File</div>
						<input disabled type="text" id="file" value={fileInputText} onChange={e => setFileInputText(e.target.value)} style={{ width: '100%' }} />
					</div>
					<div style={{ display: 'flex', gap: '0.1rem', flex: 1 }}>
						<button disabled style={{ flex: 1, fontSize: 30 }}>{fileCommands['new']}</button>
						<button disabled style={{ flex: 1, fontSize: 30 }}>{fileCommands['rename']}</button>
						<button disabled style={{ flex: 1, fontSize: 30, color: settings.redColor }}>{fileCommands['delete']}</button>
					</div>
				</div>
				<SingleSelect options={availableFiles} value={availableFiles[0]} onChange={fileChanged} style={{ width: '100%', height: '100%' }} />
			</div>

			{/* folder */}
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
				<div className='filesInputFlip' style={{ display: 'flex', gap: '0.1rem' }}>
					<div style={{ position: 'relative', flexGrow: 1 }}>
						<div style={{ position: 'absolute', right: 5, top: 1, color: settings.darkColor, opacity: 0.5, pointerEvents: 'none' }}>Folder</div>
						<input disabled type="text" id="folder" value={folderInputText} onChange={e => setFolderInputText(e.target.value)} style={{ width: '100%' }} />
					</div>
					<div style={{ display: 'flex', gap: '0.1rem', flex: 1 }}>
						<button disabled style={{ flex: 1, fontSize: 30 }}>{fileCommands['new']}</button>
						<button disabled style={{ flex: 1, fontSize: 30 }}>{fileCommands['rename']}</button>
						<button disabled style={{ flex: 1, fontSize: 30, color: settings.redColor }}>{fileCommands['delete']}</button>
					</div>
				</div>
				<SingleSelect options={availableFolders} value={availableFolders[0]} onChange={folderChanged} style={{ width: '100%', height: '100%' }} />
				<div style={{ display: 'flex', gap: '0.1rem' }}>
						<button disabled style={{ flex: 1, fontSize: 30 }}>{fileCommands['new']}</button>
						<button disabled style={{ flex: 1, fontSize: 30 }}>{fileCommands['rename']}</button>
						<button disabled style={{ flex: 1, fontSize: 30, color: settings.redColor }}>{fileCommands['delete']}</button>
				</div>
			</div>

		</div>
	)
}