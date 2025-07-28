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

	return (
		<div style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: 2 }}>

			{/* file */}
			<div style={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
				<div className='filesInputFlip' style={{ display: 'flex', gap: 1 }}>
					<div style={{ position: 'relative', width: '100%', paddingBottom: 1, flexGrow: 1 }}>
						<div style={{ position: 'absolute', right: 5, top: 1, color: settings.darkColor, opacity: 0.5, pointerEvents: 'none' }}>File</div>
						<input type="text" id="file" value={fileInputText} onChange={e => setFileInputText(e.target.value)} style={{ width: '100%' }} />
					</div>
					<div style={{ display: 'flex', gap: 2, width: '100%' }}>
						<button style={{flexGrow: 1}}>New</button>
						<button style={{flexGrow: 1}}>Ren</button>
						<button style={{flexGrow: 1}}>Del</button>
					</div>
				</div>
				<SingleSelect options={availableFiles} value={availableFiles[0]} onChange={fileChanged} style={{ width: '100%', height: '100%' }} />
			</div>

			{/* folder */}
			<div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<div className='filesInputFlip' style={{ display: 'flex', gap: 1 }}>
					<div style={{ position: 'relative', width: '100%', paddingBottom: 1 }}>
						<div style={{ position: 'absolute', right: 5, top: 1, color: settings.darkColor, opacity: 0.5, pointerEvents: 'none' }}>Folder</div>
						<input type="text" id="folder" value={folderInputText} onChange={e => setFolderInputText(e.target.value)} style={{ width: '100%' }} />
					</div>
					<div style={{ display: 'flex', gap: 2, width: '100%' }}>
						<button style={{flexGrow: 1}}>New</button>
						<button style={{flexGrow: 1}}>Ren</button>
						<button style={{flexGrow: 1}}>Del</button>
					</div>
				</div>
				<SingleSelect options={availableFolders} value={availableFolders[0]} onChange={folderChanged} style={{ width: '100%', height: '100%' }} />
				<div style={{ display: 'flex', gap: 2 }}>
					<button style={{ flex: 1 }}>Backup</button>
					<button style={{ flex: 1 }}>Restore</button>
				</div>
			</div>

		</div>
	)
}