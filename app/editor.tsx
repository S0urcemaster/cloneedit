import { useEffect, useRef, useState } from 'react'
import { TabBar } from '../components/TabBar'
import { EditForm } from '../editor/editForm'
import { FilesForm } from '../editor/filesForm'
import { InfoForm } from '../editor/infoForm'
import { useCloneEditContext } from './context'

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
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { SafetyButton } from '../components/SafetyButton'
import { FeedbackButton } from '../components/FeedbackButton'
import ChineseButton from '../components/ChineseButton'


const editorCommands: Record<string, string> = {
	['selectall']: '选',
	['delete']: '删',
	['undo']: '撤',
}

const menuCommands: Record<string, string> = {
	['char']: '字',
	['file']: '文',
	['info']: '信',
}

function Head() {
	const { settings, currentFolder, currentFile, setEditorActions } = useCloneEditContext()

	const [tab, setTab] = useState(menuCommands['char'])

	function history(direction: string) {
	}

	function showDocs() {

	}

	function copyToClipboard(): boolean {
		return true
	}

	function copyFinished(success: boolean) {

	}

	return (
		<div className='head' style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 1, paddingBottom: 0, flexGrow: 1 }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingBottom: 1, gap: 1 }}>
				<ChineseButton disabled style={{}}>{editorCommands['selectall']}</ChineseButton>
				<SafetyButton className='chineseButton' style={{ color: settings.redColor, fontSize: 24 }} onClick={() => setEditorActions([['clear']])}>{menuCommands['info']}</SafetyButton>
				{/* <button className='redButton' style={{ fontSize: 30 }} onClick={() => setEditorActions([['clear']])}>{editorCommands['delete']}</button> */}
				{/* <FeedbackButton style={{ fontSize: 30 }} evaluation={copyToClipboard} evaluated={copyFinished}>{editorCommands['undo']}</FeedbackButton> */}
				<ChineseButton disabled style={{color: settings.cloneeditColor}}>{editorCommands['undo']}</ChineseButton>
				<div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
					<h1 className={fonts[FONT_GEMUNU_LIBRE].font.className + ' appTitleVisibility'}
						style={{ fontSize: 28, paddingLeft: 5, height: 25, marginTop: -8, color: settings.cloneeditColor, cursor: 'help', whiteSpace: 'nowrap' }} onClick={showDocs}>
						<div style={{ display: 'flex' }}>
							<div>Cl</div><div style={{ fontSize: 'normal', marginTop: 4 }}>克</div><div>ne Edit</div>
						</div>
					</h1>
				</div>
				<ChineseButton style={{color: settings.blueColor}} onMouseDown={() => setTab(menuCommands['char'])}>{menuCommands['char']}</ChineseButton>
				<ChineseButton style={{color: settings.yellowColor}} onMouseDown={() => setTab(menuCommands['file'])}>{menuCommands['file']}</ChineseButton>
				<ChineseButton style={{color: settings.cloneeditColor}} onMouseDown={() => setTab(menuCommands['info'])}>{menuCommands['info']}</ChineseButton>
			</div>
			{tab === menuCommands['char'] &&
				<EditForm />
			}
			{tab === menuCommands['file'] &&
				<FilesForm />
			}
			{/* {tab === 'Dcmnt' &&
				<SettingsForm />
			} */}
			{tab === menuCommands['info'] &&
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

	const emptyEditor = useRef(true)

	useEffect(() => {
		if (!currentDocument || !currentDocument.editor) return
		if (emptyEditor.current) {
			emptyEditor.current = false
			let state = currentDocument.editor.state
			log('EditorContent/[currentDocument]/state', state)
			editor.update(() => {
				if (state) {
					const parser = new DOMParser()
					const dom = parser.parseFromString(state, 'text/html')
					const nodes = $generateNodesFromDOM(editor, dom)
					log('EditorContent/[currentDocument]/nodes', nodes)
					const children = $getRoot().getChildren()
					for (let i = 0; i < children.length; i++) {
						children[i].remove(true)
					}
					$getRoot().append(...nodes)
				}
			})
		}
		return () => {
			emptyEditor.current = true
		}
	}, [currentDocument])

	useEffect(() => {
		editorActions?.map((action) => {
			switch (action[0]) {
				case 'clear': clear()
					break
				case 'insert':
					insert(action[1])
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
			const children = $getRoot().getChildren()
			for (let i = 0; i < children.length; i++) {
				children[i].remove(true)
			}
		})
	}

	function onChange(editorState) { // debounced from onChangePlugin
		log('EditorContent/onChange/editorState', editorState)
		editor.read(() => {
			// setPlainText($getRoot().getTextContent())
			const htmlString = $generateHtmlFromNodes(editor)
			setEditorState(htmlString)
			setPlainText($getRoot().getChildren().map(paragraph => {
				return paragraph.getTextContent()
			}).join('\n'))
			log('editorContent/onChange/htmlString', htmlString)
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
