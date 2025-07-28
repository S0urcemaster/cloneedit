import { useEffect, useRef, useState } from 'react'
import { TabBar } from '../components/TabBar'
import { EditForm } from '../editor/editForm'
import { FilesForm } from '../editor/filesForm'
import { InfoForm } from '../editor/infoForm'
import { SettingsForm } from '../editor/settingsForm'
import * as constants from './constants'
import { action_clear, action_getplaintext, action_insert, useCloneEditContext } from './context'

import { $createNodeSelection, $createParagraphNode, $createPoint, $createRangeSelection, $createTextNode, $getRoot, $getSelection, $getTextContent, $isElementNode, $isParagraphNode, $isRangeSelection, $isTextNode, $setSelection, BaseSelection, LexicalNode, ParagraphNode, RangeSelection, TextNode } from 'lexical'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

function Head() {
	const { settings } = useCloneEditContext()

	const [tab, setTab] = useState('Edit')

	function history(direction: string) {
	}

	function showDocs() {

	}

	return (
		<div className='head' style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 1, paddingBottom: 0, flexGrow: 1 }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1, paddingBottom: 1  }}>
				<TabBar
					buttonNames={['Undo', 'Redo']}
					onTabClick={(direction: string) => history(direction)}
				/>
				<h1 className={constants.fonts[constants.FONT_GEMUNU_LIBRE].font.className + ' appTitleVisibility'}
					style={{ fontSize: 28, paddingLeft: 5, height: 25, marginTop: -8, color: settings.brightColor, cursor: 'help' }} onClick={showDocs}>Clone Edit</h1>
				<TabBar
					buttonNames={['Edit', 'File', 'Info']}
					onTabClick={(tabName: string) => setTab(tabName)}
				/>
			</div>
			<div style={{}}>
				{tab === 'Edit' &&
					<EditForm />
				}
				{tab === 'File' &&
					<FilesForm />
				}
				{/* {tab === 'Dcmnt' &&
				<SettingsForm />
			} */}
				{tab === 'Info' &&
					<InfoForm />
				}
			</div>
		</div>
	)
}

const lexicalTheme = {
	paragraph: 'editor-paragraph',
	placeholder: 'editor-placeholder'
}

function onError(error) {
	console.error(error)
}

function OnChangePlugin({ onChange }) {
	const [editor] = useLexicalComposerContext()
	const timeoutRef = useRef(null)

	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			// Clear any existing timeout
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
			// Set new timeout
			timeoutRef.current = setTimeout(() => {
				onChange(editorState)
			}, 250)
		})
	}, [editor, onChange])
	return null
}

function EditorContent({ settings }) {
	const [editor] = useLexicalComposerContext()
	const { editorActions, setPlainText } = useCloneEditContext()
	const contentEditable = useRef<HTMLDivElement>(null)

	useEffect(() => {
		editorActions?.map((action) => {
			switch (action[0]) {
				case action_clear: clear()
					break
				case action_insert: insert(action[1])
					break
				case action_getplaintext: insert(action[1])
					break
				default:
			}
		})
	}, [editorActions])

	function insert(insert: string) {
		editor.update(() => {
			const root = $getRoot()
			let paragraph = root.getLastChild()
			let text: TextNode
			if (!paragraph) {
				paragraph = $createParagraphNode()
				root.append(paragraph)
				$setSelection(paragraph.selectStart())
			}
			if ($isParagraphNode(paragraph)) {
				text = paragraph.getFirstChild()
				if (!text) {
					text = $createTextNode('')
					paragraph.append(text)
				}
			}
			// get the selection or create one
			let selection = $getSelection() as RangeSelection
			if (!selection) {
				// no selection after document reload
				selection = $createRangeSelection()
				selection.anchor = $createPoint(text.getKey(), 0, 'text')
				selection.focus = selection.anchor
				$setSelection(selection)
			}
			selection.insertText(insert)
		})
	}

	function clear() {
		editor.update(() => {
			$getRoot().clear()
			let firstChild = $getRoot().getFirstChild() as ParagraphNode
			if (!firstChild) firstChild = $createParagraphNode();
			(firstChild as ParagraphNode).append($createTextNode('x'))
		})
	}

	function onChange(editorState) {
		editor.read(() => {
			setPlainText($getRoot().getTextContent())
		})
	}

	return (
		<div
			className={constants.fonts[constants.FONT_LEXEND].font.className}
			style={{
				height: 300,
				overflowY: 'scroll',
				background: settings.editorBackgroundColor,
				padding: '5px 6px 0px 6px',
				fontSize: settings.editorFontSize,
				fontFamily: settings.editorFont
			}}
			onClick={() => contentEditable.current?.focus()}
		>
			<RichTextPlugin
				contentEditable={<ContentEditable style={{ outline: 'none' }} ref={contentEditable} />}
				ErrorBoundary={LexicalErrorBoundary}
			/>
			<HistoryPlugin />
			<OnChangePlugin onChange={onChange} />
		</div>
	)
}
export default function Editor() {
	const { settings } = useCloneEditContext()

	const initialConfig = {
		namespace: 'cloneedit',
		theme: lexicalTheme,
		onError,
	}

	const handleEditorChange = (plainText) => {
		// console.log('handleEditorChange', plainText)
		// setText(plainText)
	}

	return (
		<div id='editor'
			style={{
				display: 'flex',
				flexDirection: 'column',
				padding: '0px 0px 1px 0px',
				background: settings.material,
				width: '100%',
				marginTop: 20,
			}}
		>
			<LexicalComposer initialConfig={initialConfig}>
				<EditorContent settings={settings} />
			</LexicalComposer>
			<Head />
		</div>
	)
}