import { useEffect, useState } from 'react';
import { TabBar } from '../components/TabBar';
import * as constants from '../components/constants'
import { useCloneEditContext } from '../components/context';
import { FilesForm } from '../editor/filesForm';
import { EditForm } from '../editor/editForm';
import { SettingsForm } from '../editor/settingsForm';

// unique inside each editor so we can share the editor state by placing this component inside Editor
// instead of passing the appState as a prop
function Head() {
	const {

	} = useCloneEditContext()

	const [tab, setTab] = useState('Edit')

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', paddingTop: 0, paddingBottom: 2 }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<h1 className={constants.fonts[constants.FONT_GEMUNU_LIBRE].font.className} style={{ position: 'relative', top: -5, left: 1, fontSize: 28, color: 'black' }}>Clone Edit</h1>
				<TabBar
					buttonNames={['Edit', 'Files', 'Settings']}
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
		</div>
	)
}
function Source() {
	const {
		currentDocument, settings, sourceChanged
	} = useCloneEditContext()
	const [text, setText] = useState(currentDocument.editor.text)

	useEffect(() => {
		const timer = setTimeout(() => {
			sourceChanged(text)
		}, 1000); // 1 Sekunde warten

		return () => clearTimeout(timer); // Reset bei erneutem Tippen
	}, [text]);

	useEffect(() => {
		console.log('source changed', currentDocument.editor.text)
		setText(currentDocument.editor.text)
	}, [currentDocument])

	return (
		<>
			<div className={constants.fonts[constants.FONT_LEXEND].font.className} style={{ display: 'flex', flexDirection: 'column', height: 300 }}>
				<textarea
					value={text}
					// rows={14}
					placeholder={'Guess what'}
					style={{
						height: '100%',
						resize: 'none',
						background: settings.editorBackgroundColor, // Gradient background
						color: settings.editorTextColor, // Text color
						// border: 'none', // Remove border
						padding: '6px 12px 6px 12px', // Padding
						margin: 0, fontSize: settings.editorFontSize,
						border: `1px solid ${'black'}`, // Border color
					}}
					onChange={e => setText(e.target.value)}
				/>
			</div>
		</>
	);
}

export default function Editor() {

	const {
		settings,
	} = useCloneEditContext()

	return (
		<>
			<div style={{ display: 'grid', gridTemplateColumns: '3fr 7fr', padding: 5, gap: 5, backgroundColor: settings.componentColor }}>
				<Head />
				<Source />
			</div>
		</>
	)
}