import { useEffect, useRef, useState } from 'react'
import { TabBar } from '../components/TabBar'
import { EditForm } from '../editor/editForm'
import { FilesForm } from '../editor/filesForm'
import { InfoForm } from '../editor/infoForm'
import { action_clear, action_getplaintext, action_insert, useCloneEditContext } from './context'

import { $createNodeSelection, $createParagraphNode, $createPoint, $createRangeSelection, $createTextNode, $getRoot, $getSelection, $getTextContent, $insertNodes, $isElementNode, $isParagraphNode, $isRangeSelection, $isTextNode, $setSelection, $setState, BaseSelection, LexicalEditor, LexicalNode, ParagraphNode, RangeSelection, TextNode } from 'lexical'
// import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { fonts, FONT_GEMUNU_LIBRE, FONT_LEXEND, log } from '../static/constants'
import { $updateStateFromJSON } from 'lexical/LexicalNodeState'
import { $createRootNode } from 'lexical/nodes/LexicalRootNode'

function Head() {
	const { settings } = useCloneEditContext()

	const [tab, setTab] = useState('克')

	function history(direction: string) {
	}

	function showDocs() {

	}

	return (
		<div className='head' style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 1, paddingBottom: 0, flexGrow: 1 }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1, paddingBottom: 1 }}>
				<TabBar disabled
					buttonNames={['选', '删', '撤']} // 选 (alles) auswählen, 删 löschen, 撤 rückgängig
					onTabClick={(direction: string) => history(direction)}
					buttonStyle={{ fontSize: 30 }}
				/>
				<h1 className={fonts[FONT_GEMUNU_LIBRE].font.className + ' appTitleVisibility'}
					style={{ fontSize: 28, paddingLeft: 5, height: 25, marginTop: -8, color: settings.cloneeditColor, cursor: 'help', whiteSpace: 'nowrap' }} onClick={showDocs}>
					<div style={{ display: 'flex' }}>
						<div>Cl</div><div style={{ fontSize: 'normal', marginTop: 4 }}>克</div><div>ne Edit</div>
					</div>
				</h1>
				<TabBar buttonStyle={{fontSize: 30}}
					buttonNames={['克', '文', '信']} // 克 Klon, 文 Datei (Dokument), 信 Info
					onTabClick={(tabName: string) => setTab(tabName)}
				/>
			</div>
			{tab === '克' &&
				<EditForm />
			}
			{tab === '文' &&
				<FilesForm />
			}
			{/* {tab === 'Dcmnt' &&
				<SettingsForm />
			} */}
			{tab === '信' &&
				<InfoForm />
			}
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

function EditorContent({ }) {
	const [editor] = useLexicalComposerContext()
	const { settings, editorActions, currentDocument, setPlainText, setEditorState } = useCloneEditContext()
	const contentEditable = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!currentDocument?.editor?.state) return
		const parsedEditorState = JSON.parse(currentDocument.editor.state)
		log('parsedEditorState', parsedEditorState)
		editor.update(() => {
			$getRoot().updateFromJSON(parsedEditorState)
			// $insertNodes(parsedEditorState)
			// const root = $createRootNode()
			// root.updateFromJSON(parsedEditorState)
			// editor.setRootElement(root)
		})
	}, [currentDocument])

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

	function onChange(editorState) { // debounced from onChangePlugin
		log('onChangePlugin', editorState)
		editor.read(() => {
			setPlainText($getRoot().getTextContent())
			setEditorState(JSON.stringify(editorState.toJSON()))
			log('$getRoot', $getRoot().getTextContent())
		})
	}

	return (
		<div
			className={fonts[FONT_LEXEND].font.className}
			style={{
				height: 300,
				overflowY: 'scroll',
				background: settings.editorBackground,
				padding: '5px 6px 0px 6px',
				color: settings.editorColor,
				fontSize: settings.editorFontSize,
			}}
			onClick={() => contentEditable.current?.focus()}
		>
			<RichTextPlugin
				contentEditable={
					<ContentEditable style={{ outline: 'none' }} tabIndex={-1} disabled ref={contentEditable} />
				}
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
				// marginTop: 26,

			}}
		>
			<LexicalComposer initialConfig={initialConfig}>
				<EditorContent />
			</LexicalComposer>
			<Head />
		</div>
	)
}

function $updateEditorFromJson(parsedEditorState: any, editor: LexicalEditor) {
	throw new Error('Function not implemented.')
}
