import { effects } from '../static/effects'
import { App as AppModel, Document, Effect } from './model'

export const lib = {

	findDoc: (state: AppModel, folder: string, file: string): Document => {
		return state.documents.find(doc => {
			const equalsFolder = doc.folderName === folder
			const equalsFile = doc.name === file
			return equalsFolder && equalsFile
		})
	},

	extractFolders: (state: AppModel): string[] => {
		const folders = new Set<string>()
		state.documents.forEach(doc => {
			folders.add(doc.folderName)
		})
		return Array.from(folders)
	},

	validateCommand: (command: string): boolean => {
		return true
	},

	parseCommand: (command: string): Effect => {
		if (!lib.validateCommand(command)) return null
		const split = command.trim().split(/\s+/)
		const effect = Object.values(effects).find(effect => {
			return effect.name.toLowerCase() === split[0].toLowerCase()
		})
		effect.args = split.slice(1)

		return effect
	},

	joinCommand: (effect: Effect): string => {
		return effect.name +' ' +effect.args.join(' ')
	}
}
