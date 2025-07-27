import { useEffect, useRef, useState } from 'react'
import { TabBar } from '../components/TabBar'
import { EditForm } from '../editor/editForm'
import { FilesForm } from '../editor/filesForm'
import { InfoForm } from '../editor/infoForm'
import { SettingsForm } from '../editor/settingsForm'
import * as constants from './constants'
import { useCloneEditContext } from './context'

import { $createNodeSelection, $createParagraphNode, $createPoint, $createRangeSelection, $createTextNode, $getRoot, $getSelection, $getTextContent, $isElementNode, $isParagraphNode, $isRangeSelection, $isTextNode, $setSelection, BaseSelection, LexicalNode, ParagraphNode, RangeSelection, TextNode } from 'lexical'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

function Head() {
	const {

	} = useCloneEditContext()

	const [tab, setTab] = useState('Edit')

	function history(direction: string) {

	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 0, paddingBottom: 0, flexGrow: 1 }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 1, flexGrow: 1 }}>
				<TabBar
					buttonNames={['Undo', 'Redo']}
					onTabClick={(direction: string) => history(direction)}
				/>
				<h1 className={constants.fonts[constants.FONT_GEMUNU_LIBRE].font.className + ' cloneedit-color'}
					style={{ fontSize: 28, paddingLeft: 5, height: 25, marginTop: -8 }}>Clone Edit</h1>
				<TabBar
					buttonNames={['Edit', 'File', 'Info']}
					onTabClick={(tabName: string) => setTab(tabName)}
				/>
			</div>
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
	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			const timeout = setTimeout(() => {
				onChange(editorState)
			}, 300)
			return () => clearTimeout(timeout)
		})
	}, [editor, onChange])
	return null
}

function EditorContent({ settings }) {
	const [editor] = useLexicalComposerContext()
	const { insert, setInsert } = useCloneEditContext()
	const contentEditable = useRef<HTMLDivElement>(null)

	// useEffect(() => {
	// 	if (editorState) {
	// 		try {
	// 			const parsedState = editor.parseEditorState(editorState)
	// 			editor.setEditorState(parsedState)
	// 		} catch (error) {
	// 			console.error('Failed to parse editorState:', error)
	// 			editor.update(() => {
	// 				$getRoot().clear()
	// 				const paragraph = $createParagraphNode()
	// 				const text = $createTextNode('')
	// 				$getRoot().append(paragraph.append(text))
	// 			})
	// 		}
	// 	} else {
	// 		editor.update(() => {
	// 			$getRoot().clear()
	// 			const paragraph = $createParagraphNode()
	// 			const text = $createTextNode('')
	// 			$getRoot().append(paragraph.append(text))
	// 		})
	// 	}
	// }, [editorState, editor])

	useEffect(() => {
		editor.update(() => {
			const root = $getRoot()
			// there must be a paragraph always
			let paragraph = root.getLastChild()
			let text: TextNode
			if($isParagraphNode(paragraph)) {
				text = paragraph.getFirstChild()
				if(!text) {
					text = $createTextNode('')
					paragraph.append(text)
				}
			}
			// get the selection or create one
			let selection = $getSelection() as RangeSelection
			if(!selection) {
				// no selection after document reload
				selection = $createRangeSelection()
				selection.anchor = $createPoint(text.getKey(), 0, 'text')
				selection.focus = selection.anchor
				$setSelection(selection)
			}
			selection.insertText(insert)

			// const lastNode = root.getLastChild()
			// let textNode
			// if ($isElementNode(lastNode)) {
			// 	textNode = lastNode.getLastChild() && $isTextNode(lastNode.getLastChild())
			// 		? lastNode.getLastChild()
			// 		: $createTextNode('')
			// 	lastNode.append(textNode)
			// } else {
			// 	const paragraph = $createParagraphNode()
			// 	textNode = $createTextNode('')
			// 	paragraph.append(textNode)
			// 	root.append(paragraph)
			// }

			// const selection = $createRangeSelection()
			// const anchor = $createPoint(textNode.getKey(), textNode.getTextContent().length, 'text')
			// selection.anchor = anchor
			// selection.focus = anchor
			// $setSelection(selection)

			// selection.insertText(insert)
			// if ($isRangeSelection(selection)) {
			// 	$setSelection({ ...$getSelection() })

			// }
		})
		setInsert('')
		// Only focus if editor is not already focused to avoid disrupting typing
	}, [insert])

	function onChange(editorState) {
		// Debounce to prevent excessive updates during typing
		// const timeout = setTimeout(() => {
		// 	setEditorState(JSON.stringify(editorState.toJSON()))
		// }, 300)
		// return () => clearTimeout(timeout)
	}

	return (
		<div
			className={constants.fonts[constants.FONT_LEXEND].font.className}
			style={{
				height: 300,
				overflowY: 'scroll',
				background: settings.editorBackgroundColor,
				padding: '5px 6px 0px 6px',
				fontSize: settings.cloneFontSize,
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

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		sourceChanged(text)
	// 	}, 500) // 1-second debounce

	// 	return () => clearTimeout(timer) // Cleanup on re-render
	// }, [text, sourceChanged])

	const handleEditorChange = (plainText) => {
		// console.log('handleEditorChange', plainText)
		// setText(plainText)
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				padding: '0px 0px 1px 0px',
				gap: 2,
				background: settings.material,
				width: '100%',
			}}
		>
			<LexicalComposer initialConfig={initialConfig}>
				<EditorContent settings={settings} />
			</LexicalComposer>
			<Head />
		</div>
	)
}