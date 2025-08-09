import { effects as storedEffects } from './effects'
import { App as AppModel, Document, Effect } from '../app/model'
import { log } from './constants'

export const lib = {

	getRotatedOffset: (range: number, value: number, offset: number): number => {
		return (offset +range +value) % range;
	},

	updateEach: (source: string, effects: Effect[]): string => {
		if(!effects || effects.length === 0) {
			return 'no valid effect name'
		}
		let result = source
		let errors = ''
		effects.map(effect => {
			const eff = storedEffects[effect.name]
			if(!eff) {
				errors += 'no such effect : ' +effect.name +' ' +storedEffects[effect.name]
			} else {
				effect.args ? result = eff.update(result, ...effect.args) : result += eff.update(result)
			}
		})
		return errors ? errors +'\n' +result : result
	},

	toTextEffects: (effects: Effect[]): string => {
		return effects.map(eff => {
			log('lib/toTextEffects', effects)
			if(eff.args) {
				return `${eff.name} ${eff.args?.join(' ')}`
			}
			return eff.name
		}).join('\n')
	},

	fromTextEffects: (text: string): Effect[] => {
		return text.split('\n').map(line => {
			const items = line.trim().split(' ')
			return {...Object.values(storedEffects).find(e => e.name === items[0]), name: items[0], args: items.splice(1)} // add update()
		})
	},

	reviveEffects: (state: AppModel): AppModel => {
		return {...state, documents: state.documents.map((doc) => {
				doc.clones = doc.clones.map(clone => {
					return {
						...clone, effects: clone.effects.map(eff => {
							const proto = Object.values(storedEffects).find(ef => eff.name == ef.name)
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
		const effect = Object.values(storedEffects).find(effect => {
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
