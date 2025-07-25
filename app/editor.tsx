import { useEffect, useRef, useState } from 'react'
import { TabBar } from '../components/TabBar'
import { EditForm } from '../editor/editForm'
import { FilesForm } from '../editor/filesForm'
import { InfoForm } from '../editor/infoForm'
import { SettingsForm } from '../editor/settingsForm'
import * as constants from './constants'
import { useCloneEditContext } from './context'

import { $createParagraphNode, $createRangeSelection, $createTextNode, $getRoot, $getSelection, $getTextContent, $isRangeSelection, $setSelection } from 'lexical'
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

	return (
		<div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 0, paddingBottom: 0 }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 1 }}>
				<h1 className={constants.fonts[constants.FONT_GEMUNU_LIBRE].font.className + ' cloneedit-color'}
					style={{ fontSize: 28, paddingLeft: 5, height: 25, marginTop: -5 }}>Clone Edit</h1>
				<TabBar
					buttonNames={['Edit', 'Files', 'Settings', 'Info']}
					onTabClick={(tabName: string) => setTab(tabName)}
				/>
			</div>
			{tab === 'Edit' &&
				<EditForm />
			}
			{tab === 'Files' &&
				<FilesForm />
			}
			{tab === 'Settings' &&
				<SettingsForm />
			}
			{tab === 'Info' &&
				<InfoForm />
			}
		</div>
	)
}

const lexicalTheme = {
	paragraph: 'editor-paragraph',
	placeholder: 'editor-placeholder',
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
	console.error(error)
}


function OnChangePlugin({ onChange }) {
	const [editor] = useLexicalComposerContext();
	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			onChange(editorState);
		})
	}, [editor, onChange])
	return null;
}

function EditorContent({ settings }) {
	const [editor] = useLexicalComposerContext()
	const { insert, setEditorState, plainText, setPlainText } = useCloneEditContext()
	const contentEditable = useRef<HTMLDivElement>(null)

	useEffect(() => {
		editor.update(() => {
			$getSelection()?.insertText(insert)
		})
	}, [insert])
	
	function onChange(editorState) {
		console.log('onChange', editorState)
		const editorStateJSON = editorState.toJSON()
		setEditorState(JSON.stringify(editorStateJSON))
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
				fontSize: settings.cloneFontSize,
				fontFamily: settings.editorFont,
			}}
			onClick={() => contentEditable.current?.focus()}
		>
			<RichTextPlugin
				contentEditable={<ContentEditable style={{ outline: 'none' }} ref={contentEditable} />}
				ErrorBoundary={LexicalErrorBoundary}
			/>
			<HistoryPlugin />
			<OnChangePlugin onChange={onChange} />
			{/* <AutoFocusPlugin /> */}
		</div>
	)
}

export default function Editor() {
	const { settings, setEditorState } = useCloneEditContext()

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
		console.log('handleEditorChange', plainText)
		// setText(plainText)
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				padding: '0px 0px 1px 0px',
				gap: 2,
				background: settings.componentColor,
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