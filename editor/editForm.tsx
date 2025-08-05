import { action_insert, useCloneEditContext } from "../app/context";
import { smileys } from "../static/constants";

const otherButtons = ['·', '', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8']

export function EditForm() {

	const { setEditorActions } = useCloneEditContext()
	return (
		<div id='editForm' style={{ display: 'flex', flexDirection: 'row', gap: '0.1rem', flexWrap: 'wrap', justifyContent: 'unset' }}>

			{/* <label htmlFor="letters">Letters</label>
				<span>10,546</span>
				<label htmlFor="words">Words</label>
				<span>1984</span> */}
			{otherButtons.map((button, ix) => (
				<button disabled key={ix} style={{}}>{button}</button>
			))}
			{smileys.map((smiley, ix) => (
				<button key={ix} style={{}} onClick={() => setEditorActions([[action_insert, smiley]])}>{smiley}</button>
			))}

		</div>
	)
}