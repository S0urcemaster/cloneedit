export type App = {
	currentSystem: number
	systems: System[]
}

export type System = {
	name: string
	definition: string // AI instruction
	currentRequest?: number
	requests: Request[]
}

export type Request = {
	text: string
	response: string
	model: string
}

export const emptyModel: App = {
	currentSystem: 0,
	systems: [
		{
			name: '',
			definition: '',
			requests: [
				{
					text: '',
					response: '',
					model: ''
				}
			]
		}
	]
}

export const defaultModel: App = {
	currentSystem: 0,
	systems: [
		{
			name: 'default',
			definition: 'default',
			requests: [
				{
					text: 'default',
					response: 'default',
					model: 'default'
				}
			]
		},
		{
			name: 'individual',
			definition: 'default',
			requests: [
				{
					text: 'default',
					response: 'default',
					model: 'default'
				}
			]
		},
	]
}