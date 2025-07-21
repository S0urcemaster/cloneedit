import { useEffect, useState } from 'react';
import { TabBar } from '../components/TabBar';
import * as constants from './constants'
import { useCloneEditContext } from './context';
import { FilesForm } from '../editor/filesForm';
import { EditForm } from '../editor/editForm';
import { SettingsForm } from '../editor/settingsForm';
import { InfoForm } from '../editor/infoForm';

function Head() {
	const {

	} = useCloneEditContext()

	const [tab, setTab] = useState('Edit')

	return (
		<div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 0, paddingBottom: 2 }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<h1 className={constants.fonts[constants.FONT_GEMUNU_LIBRE].font.className + ' cloneedit-color'}
					style={{ position: 'relative', top: -5, left: 1, fontSize: 28 }}>Clone Edit</h1>
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
function Source() {
	const {
		currentDocument, settings, sourceChanged
	} = useCloneEditContext()
	const [text, setText] = useState(currentDocument.editor.text)

	useEffect(() => {
		const timer = setTimeout(() => {
			sourceChanged(text)
		}, 500); // 1 Sekunde warten

		return () => clearTimeout(timer); // Reset bei erneutem Tippen
	}, [text]);

	useEffect(() => {
		setText(currentDocument.editor.text)
	}, [currentDocument])

	return (
		<>
			<div className={constants.fonts[constants.FONT_LEXEND].font.className}
				style={{ height: 300, flexGrow: 1 }}>
				<textarea
					value={text}
					// rows={14}
					placeholder={'Guess what'}
					style={{
						height: '100%',
						width: '100%',
						resize: 'none',
						background: settings.editorBackgroundColor, // Gradient background
						color: settings.editorTextColor, // Text color
						// border: 'none', // Remove border
						padding: '6px 12px 6px 12px', // Padding
						margin: 0, fontSize: settings.editorFontSize,
						border: `1px solid ${settings.brightColor}`, // Border color
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
			<div className='screenFlexDirection' style={{ display: 'flex', gridTemplateColumns: '3fr 7fr', padding: 5, gap: 5, background: settings.componentColor }}>
				<Head />
				<Source />
			</div>
		</>
	)
}