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

					<button style={{}}>M1</button>
					<button style={{}}>M2</button>
					<button style={{}}>M3</button>
					<button style={{}}>M4</button>
					<button style={{}}>M5</button>
					<button style={{}}>M6</button>
					<button style={{}}>M7</button>
					<button style={{}}>M8</button>

					<button style={{}}>S1</button>
					<button style={{}}>S2</button>
					<button style={{}}>S3</button>
					<button style={{}}>S4</button>
					<button style={{}}>S5</button>
					<button style={{}}>S6</button>
					<button style={{}}>S7</button>
					<button style={{}}>S8</button>

					{smileys.map((smiley, ix) => (
						<button key={ix} style={{}} onClick={() => setEditorActions([[action_insert, smiley]])}>{smiley}</button>
					))}


		</div>
	)
}