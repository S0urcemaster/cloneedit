import { smileys } from "../app/constants";
import { action_insert, useCloneEditContext } from "../app/context";

export function EditForm() {

	const { setEditorActions } = useCloneEditContext()
	return (
		<div id='editForm' style={{ display: 'flex', flexDirection: 'row', gap: 1, flexWrap: 'wrap' }}>


				{/* <label htmlFor="letters">Letters</label>
				<span>10,546</span>
				<label htmlFor="words">Words</label>
				<span>1984</span> */}

					<button style={{width: 49, height: 40}}>M1</button>
					<button style={{width: 49, height: 40}}>M2</button>
					<button style={{width: 49, height: 40}}>M3</button>
					<button style={{width: 49, height: 40}}>M4</button>
					<button style={{width: 49, height: 40}}>M5</button>
					<button style={{width: 49, height: 40}}>M6</button>

					<button style={{width: 49, height: 40}}>S1</button>
					<button style={{width: 49, height: 40}}>S2</button>
					<button style={{width: 49, height: 40}}>S3</button>
					<button style={{width: 49, height: 40}}>S4</button>
					<button style={{width: 49, height: 40}}>S5</button>
					<button style={{width: 49, height: 40}}>S6</button>

					{smileys.map((smiley, ix) => (
						<button key={ix} style={{width: 49, height: 40}} onClick={() => setEditorActions([[action_insert, smiley]])}>{smiley}</button>
					))}

		</div>
	)
}