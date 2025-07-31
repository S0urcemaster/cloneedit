
import { Gemunu_Libre, Funnel_Sans, Lexend } from 'next/font/google'
import { App, Effect } from './model'
import { lib } from './lib'
import { effect_caesar_cypher } from '../effects/caesar_cypher'
import { effect_welcome } from '../effects/welcome'
import { effect_replace_text } from '../effects/replace_text'
import { effect_replace_list } from '../effects/replace_list'
import { effect_no_whitespace } from '../effects/no_whitespace'
import { effect_substring } from '../effects/substring'
import { effect_tldr } from '../effects/effect_tldr'
import { document_default } from '../documents/default'
import { document_bluesky_x } from '../documents/bluesky_x'
import { document_caesar_cypher } from '../documents/caesar_cypher'
import { document_docs_intro } from '../documents/docs_intro'
import { document_settings } from '../documents/settings'
import { settings_default_light } from '../static/themes/default_light'

export const log = console.log

export const smileys = [
	'🪱', '😀', '😅', '😂', '🤣', '😋', '🥳',
	'🫤', '🤨', '🤔', '🤫', '🥱', '🥹', '🥺',
	'😢', '😭', '🤩', '😍', '🥰', '🤮', '🤢',
	'😊', '☺️', '☯', '🇩🇪', '🏳️‍🌈', '🇵🇱', '🇪🇺',
	'🌍', '🗽', '🎗️', '🎲','♦️','🎲','🎲',
]

export const CAESAR_EFFECT = 'caesar'
export const WELCOME_EFFECT = 'help'
export const REPLACE_TEXT_EFFECT = 'replaceText'
export const REPLACE_LIST_EFFECT = 'replaceList'
export const NO_WHITESPACE_EFFECT = 'noWhitespace'
export const SUBSTRING_EFFECT = 'substring'
export const TLDR_EFFECT = 'tldr'

export const effects: Record<string, Effect> = {
	[CAESAR_EFFECT]: effect_caesar_cypher,
	[WELCOME_EFFECT]: effect_welcome,
	[REPLACE_TEXT_EFFECT]: effect_replace_text,
	[REPLACE_LIST_EFFECT]: effect_replace_list,
	[NO_WHITESPACE_EFFECT]: effect_no_whitespace,
	[SUBSTRING_EFFECT]: effect_substring,
	[TLDR_EFFECT]: effect_tldr,
}

export const defaultState: App = {
	documents: [
		document_default,
		document_bluesky_x,
		document_caesar_cypher,
		document_docs_intro,
		document_settings,
	],
// light
	settings: settings_default_light
// dark

}


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