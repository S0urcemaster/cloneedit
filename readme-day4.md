# Clone Edit Tag 4

- refactor Filter -> Effect
- Der Kontext wird ausgebaut

```
// context.tsx

// define
export type CloneEditContext = {
	currentDocument: Document
	settings: Settings
	availableFolders: string[]
	availableFiles: string[]
	effectChanged: (clone: CloneModel, effectName: string) => void
	folderChanged: (folder: string) => void
	fileChanged: (file: string) => void
}

// propagate
<CloneEditContext.Provider value={{
			currentDocument: currentDocument,
			settings: settings,
			availableFolders: availableFolders,
			availableFiles: availableFiles,
			effectChanged: effectChanged,
			folderChanged: folderChanged,
			fileChanged: fileChanged,
		}}>
```
... und benutzt
```
// editor.tsx
const { 
		currentDocument, settings, 
		availableFolders, availableFiles, 
		folderChanged,
		fileChanged
	} = useCloneEditContext()
```