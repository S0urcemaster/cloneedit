
import { Gemunu_Libre, Funnel_Sans, Lexend } from 'next/font/google'

type Font = {
	name: string
	font: any
}

export const gemunuLibreFont = Gemunu_Libre({
	subsets: ['latin'],
})

export const funnelSansFont = Funnel_Sans({
	subsets: ['latin'],
})

export const lexendFont = Lexend({
	subsets: ['latin'],
})

export const FONT_GEMUNU_LIBRE = 'Gemunu Libre'
export const FONT_FUNNEL_SANS = 'Funnel Sans'
export const FONT_LEXEND = 'Lexend'

export const fonts: Record<string, Font> = {
	[FONT_GEMUNU_LIBRE]: {
		name: 'Gemunu Libre',
		font: gemunuLibreFont,
	},
	[FONT_FUNNEL_SANS]: {
		name: 'Funnel Sans',
		font: funnelSansFont,
	},
	[FONT_LEXEND]: {
		name: 'Lexend',
		font: lexendFont,
	},
}