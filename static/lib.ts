import { effects } from './effects'
import { App as AppModel, Document, Effect } from '../app/model'
import { log } from './constants'

export const lib = {

	updateEach: (source: string, effects: Effect[]): string => {
		const args = effects[0].args
		let result = args ? effects[0].update(source, ...effects[0].args) : effects[0].update(source)
		for(let i = 1; i < effects.length; i++) {
			result += effects[i].update(result, ...effects[i].args)
		}
		return result
	},

	toTextEffects: (effects: Effect[]): string => {
		return effects.map(eff => {
			log('eff.args', eff.args)
			if(eff.args) {
				return `${eff.name} ${eff.args?.join(' ')}`
			}
			return eff.name
		}).join('\n')
	},

	fromTextEffects: (text: string): Effect[] => {
		return text.split('\n').map(line => {
			const items = line.trim().split(' ')
			return {...Object.values(effects).find(e => e.name === items[0]), name: items[0], args: items.splice(1)} // add update()
		})
	},

	reviveEffects: (state: AppModel): AppModel => {
		return {...state, documents: state.documents.map((doc) => {
				doc.clones = doc.clones.map(clone => {
					return {
						...clone, effects: clone.effects.map(eff => {
							const proto = Object.values(effects).find(ef => eff.name == ef.name)
							return { ...proto, name: eff.name, args: eff.args }
						})
					}
				})
				return doc
			})
		}
	},

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
		if(effect.args) {
			return effect.name + ' ' + effect.args.join(' ')
		}
		if(!effect.args) {
			return effect.name
		}
	}
}
