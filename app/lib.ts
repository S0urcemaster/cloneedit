import { effects } from './constants'
import { App as AppModel, Document, Effect } from './model'

const log = console.log

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
		log('command', command)
		if (!lib.validateCommand(command)) return null
		const split = command.trim().split(/\s+/)
		log('split', split)
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
