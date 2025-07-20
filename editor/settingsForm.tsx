import * as constants from '../app/constants'
import { useCloneEditContext } from '../app/context'

export function SettingsForm() {
	const { settings } = useCloneEditContext()

	return (
		<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 5, paddingLeft: 4 }}>
			<label htmlFor="material">App Color</label>
			<input type="text" id="material" />

			<label htmlFor="editorFont">Editor Font</label>
			<div id={'editorFont'} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
				<select>
					{Object.values(constants.fonts).map((font) => (
						<option key={font.name} value={font.name} style={{ backgroundColor: settings.inputBackgroundColor, color: settings.inputColor }}>{font.name}</option>
					))}
				</select>
			</div>
			<label htmlFor="editorTextColor">Editor Textcolor</label>
			<input type="text" id="editorTextColor" />
			<label htmlFor="editorTextSize">Editor Textsize</label>
			<input type="text" id="editorTextSize" />

			<label htmlFor="cloneFont">Clone Font</label>
			<div id={'cloneFont'} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
				<select>
					{Object.values(constants.fonts).map((font) => (
						<option key={font.name} value={font.name} style={{ backgroundColor: settings.inputBackgroundColor, color: settings.inputColor }}>{font.name}</option>
					))}
				</select>
			</div>
			<label htmlFor="cloneTextColor">Clone Color</label>
			<input type="text" id="cloneTextColor" />
			<label htmlFor="cloneTextSize">Clone Color</label>
			<input type="text" id="cloneTextSize" />
		</fieldset>
	)
}