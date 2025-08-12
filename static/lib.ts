import { effects as storedEffects } from './effects'
import { App as AppModel, Document, Effect, Instruction } from '../app/model'
import { log } from './constants'

export const lib = {

	getRotatedOffset: (range: number, value: number, offset: number): number => {
		return (offset +range +value) % range;
	},

	updateEach: (source: string, insts: Instruction[]): string => {
		if(!insts || insts.length === 0) {
			return 'no valid effect name'
		}
		let result = source
		let errors = ''
		insts.map(effect => {
			const eff = storedEffects[effect.name]
			if(!eff) {
				errors += 'no such effect : ' +effect.name +' ' +storedEffects[effect.name]
			} else {
				effect.args ? result = eff.update(result, ...effect.args) : result += eff.update(result)
			}
		})
		return errors ? errors +'\n' +result : result
	},

	toTextInstructions: (inst: Instruction[]): string => {
		return inst.map(eff => {
			log('lib/toTextEffects', inst)
			if(eff.args) {
				return `${eff.name} ${eff.args?.join(' ')}`
			}
			return eff.name
		}).join('\n')
	},

	fromTextInstructions: (text: string): Instruction[] => {
		if(!text) return undefined
		const split = text.split('\n')
		const nameLineItems = split[0].trim().split(' ')
		if(nameLineItems.length < 2) return null
		if(!Number.isInteger(nameLineItems[1])) return null
		return [{name: nameLineItems[0], args: [nameLineItems[1]], update: () => nameLineItems[0]}, ...split.splice(1).map(line => {
			const items = line.trim().split(' ')
			if(items.length < 1) return
			return {...Object.values(storedEffects).find(e => e.name === items[0]), name: split[0], args: items.splice(1)}
		})]
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

	parseInstruction: (command: string): Instruction => {
		if (!lib.validateCommand(command)) return null
		const split = command.trim().split(/\s+/)
		const effect = Object.values(storedEffects).find(effect => {
			return effect.name.toLowerCase() === split[0].toLowerCase()
		})
		effect.args = split.slice(1)

		return effect
	},

	joinInstruction: (effect: Instruction): string => {
		if(effect.args) {
			return effect.name + ' ' + effect.args.join(' ')
		}
		if(!effect.args) {
			return effect.name
		}
	}
}
