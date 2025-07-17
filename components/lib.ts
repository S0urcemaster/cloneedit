import { App as AppModel } from '../app/model'

export const lib = {

	extractFolders: (state: AppModel): string[] => {
		const folders = new Set<string>()
		state.documents.forEach(doc => {
			folders.add(doc.folderName)
		})
		return Array.from(folders)

	}
}
