import { ReactEventHandler, useEffect, useRef, useState } from 'react';
import { TabBar } from '../components/TabBar';
import { EditForm } from '../editor/editForm';
import { FilesForm } from '../editor/filesForm';
import { InfoForm } from '../editor/infoForm';
import { SettingsForm } from '../editor/settingsForm';
import * as constants from './constants';
import { useCloneEditContext } from './context';

import { $getRoot, $getSelection } from 'lexical';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
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
	console.error(error);
}

function EditorContent({ onChange, settings }) {
	const [editor] = useLexicalComposerContext(); // Now safe, as it's inside LexicalComposer
	const contentEditable = useRef<HTMLDivElement>(null);

	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			const plainText = editorState.read(() => $getRoot().getTextContent());
			onChange(plainText);
		});
	}, [editor, onChange]);

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
			<AutoFocusPlugin />
		</div>
	);
}

function Source() {
	const { currentDocument, settings, source, sourceChanged, setSourceSelection } =
		useCloneEditContext();
	const [text, setText] = useState(currentDocument.editor.text);

	const initialConfig = {
		namespace: 'cloneedit',
		theme: lexicalTheme,
		onError,
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			sourceChanged(text);
		}, 500); // 1-second debounce

		return () => clearTimeout(timer); // Cleanup on re-render
	}, [text, sourceChanged]);

	useEffect(() => {
		setText(currentDocument.editor.text);
	}, [currentDocument]);

	useEffect(() => {
		setText(source);
	}, [source]);

	const handleEditorChange = (plainText) => {
		setText(plainText);
	};

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<EditorContent onChange={handleEditorChange} settings={settings} />
		</LexicalComposer>
	);
}

export default function Editor() {
	const { settings } = useCloneEditContext();

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
			<Source />
			<Head />
		</div>
	);
}