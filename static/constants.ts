
import { Gemunu_Libre, Funnel_Sans, Lexend } from 'next/font/google'
import { document_default } from './documents/default'
import { document_bluesky_x } from './documents/bluesky_x'
import { document_caesar_cypher } from './documents/caesar_cypher'
import { document_docs_intro } from './documents/docs_intro'
import { document_settings } from './documents/settings'
import { settings_default_light } from './themes/default_light'
import { App } from '../app/model'

export const log = (...args) => {
   console.log(...args)
}

export const smileys = [
   '🪱', '😀', '😅', '😂', '🤣', '😋', '🥳',
   '🫤', '🤨', '🤔', '🤫', '🥱', '🥹', '🥺',
   '😢', '😭', '🤩', '😍', '🥰', '🤮', '🤢',
   '😊', '☺️', '🇩🇪', '🏳️‍🌈', '🇪🇺',
   '🌍', '🗽', '🎗️',
   //  '🎲','♦️',
]

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