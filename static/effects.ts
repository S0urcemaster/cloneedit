import { effect_caesar_cypher } from '../static/effects/caesar_cypher'
import { effect_welcome } from '../static/effects/welcome'
import { effect_replace_text } from '../static/effects/replace_text'
import { effect_replace_list } from '../static/effects/replace_list'
import { effect_no_whitespace } from '../static/effects/no_whitespace'
import { effect_substring } from '../static/effects/substring'
import { effect_tldr } from './effects/tldr'
import { replace_chars } from './effects/replace_chars'
import { effect_help } from './effects/effects_help'

export const CAESAR_CIPHER_EFFECT = 'caesarcipher'
export const HELP_EFFECT = 'help'
export const NO_WHITESPACE_EFFECT = 'nowhitespace'
export const REPLACE_CHARS_EFFECT = 'replacechars'
export const SUBSTRING_EFFECT = 'substring'
export const REPLACE_LIST_EFFECT = 'replacelist'
export const REPLACE_TEXT_EFFECT = 'replacetext'
export const TLDR_EFFECT = 'tldr'
export const WELCOME_EFFECT = 'welcome'

export type Effect = {
	name: string
	args?: string[]
	update: (text: string, ...args: string[]) => string
   // doc: () => void
}

export const effects: Record<string, Effect> = {
   [CAESAR_CIPHER_EFFECT]: effect_caesar_cypher,
   [HELP_EFFECT]: effect_help,
   [WELCOME_EFFECT]: effect_welcome,
   [REPLACE_TEXT_EFFECT]: effect_replace_text,
   [REPLACE_LIST_EFFECT]: effect_replace_list,
   [NO_WHITESPACE_EFFECT]: effect_no_whitespace,
   [REPLACE_CHARS_EFFECT]: replace_chars,
   [SUBSTRING_EFFECT]: effect_substring,
   [TLDR_EFFECT]: effect_tldr,
}
