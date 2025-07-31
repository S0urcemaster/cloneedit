import { Effect } from '../app/model'
import { effect_caesar_cypher } from '../static/effects/caesar_cypher'
import { effect_welcome } from '../static/effects/welcome'
import { effect_replace_text } from '../static/effects/replace_text'
import { effect_replace_list } from '../static/effects/replace_list'
import { effect_no_whitespace } from '../static/effects/no_whitespace'
import { effect_substring } from '../static/effects/substring'
import { effect_tldr } from '../static/effects/effect_tldr'

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